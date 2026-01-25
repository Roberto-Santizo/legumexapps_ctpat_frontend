import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updateJuiceItemAPI } from "@/features/juice-Items/api/JuiceItemAPI";
import type { EditJuicePackingListItemFormData } from "@/features/juice-Items/schema/juiceItemType";
import type { JuiceItemTableType } from "@/features/juicePacking-List/schema/juicePackingListType";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { getCustomersForSelectAPI } from "@/features/customer/api/CustomerAPI";
import { getJuiceForSelectAPI } from "@/features/juiceProduct/api/JuiceApi";
import BaseModal from "@/shared/components/BaseModal";

type Props = {
  open: boolean;
  onClose: () => void;
  juicePackingListId: number;
  itemId: number;
  itemData: JuiceItemTableType;
  ctpatId?: number;
};

// Componente interno del formulario que solo se renderiza cuando las opciones están disponibles
function EditJuiceItemFormContent({
  itemData,
  juicePackingListId,
  itemId,
  onClose,
  juices,
  customers,
  ctpatId,
}: {
  itemData: JuiceItemTableType;
  juicePackingListId: number;
  itemId: number;
  onClose: () => void;
  juices: { id: number; name: string }[];
  customers: { id: number; name: string }[];
  ctpatId?: number;
}) {
  const queryClient = useQueryClient();

  // El backend no envía juice_id ni client_id, solo los nombres (product y client_name)
  // El client_name viene agrupado como "CLIENTE - PRODUCTO" (ej: "WALMART - CARROT JUICE")
  // Workaround: extraer el nombre del cliente y buscar los IDs por nombre
  const itemDataAny = itemData as Record<string, unknown>;
  const productName = itemDataAny.product as string;
  const clientNameGrouped = itemDataAny.client_name as string;

  // Extraer solo el nombre del cliente (antes del " - ")
  // "WALMART - CARROT JUICE" -> "WALMART"
  const clientName = clientNameGrouped?.includes(" - ")
    ? clientNameGrouped.split(" - ")[0].trim()
    : clientNameGrouped;

  // Función para normalizar strings (quitar espacios extra, convertir a minúsculas)
  const normalizeString = (str: string | undefined | null): string => {
    if (!str) return "";
    return str.trim().toLowerCase();
  };

  // Buscar el juice_id por el nombre del producto
  const foundJuice = juices.find(juice => juice.name === productName);
  const juiceId = foundJuice?.id || itemData.juice_id;

  // Buscar el client_id por el nombre del cliente (comparación normalizada)
  const normalizedClientName = normalizeString(clientName);
  const foundCustomer = customers.find(customer =>
    normalizeString(customer.name) === normalizedClientName
  );

  const clientId = foundCustomer?.id || itemData.client_id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      juice_id: juiceId ? String(juiceId) : "",
      boxes: itemData.total_boxes,
      temp: itemData.temp,
      gross_weight: itemData.gross_weight,
      net_weight: itemData.net_weight,
      client_id: clientId ? String(clientId) : "",
      bottles: itemData.bottles,
      date: itemData.date,
      grn: (itemDataAny.grn as string) || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: EditJuicePackingListItemFormData) => {
      return updateJuiceItemAPI({
        juicePackingListId,
        juiceItemId: itemId,
        formData,
      });
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Ítem actualizado correctamente");
      await queryClient.invalidateQueries({
        queryKey: ["juicePackingList", juicePackingListId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["juicePackingListByCtpat"],
      });
      // Invalidar la query del ctpat para actualizar el documento PDF
      if (ctpatId) {
        await queryClient.invalidateQueries({
          queryKey: ["ctpat", ctpatId],
        });
      }
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    // Convertir los IDs de string a número antes de enviar
    const formData: EditJuicePackingListItemFormData = {
      ...data,
      juice_id: Number(data.juice_id),
      client_id: Number(data.client_id),
    };
    mutate(formData);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
      noValidate
    >
      {/* JUGO */}
      <div className="form-group">
        <label className="form-label">
          Jugo <span className="required">*</span>
        </label>
        <select
          className={`form-input ${
            errors.juice_id ? "form-input-error" : "form-input-normal"
          }`}
          {...register("juice_id", {
            required: "El jugo es obligatorio",
          })}
        >
          <option value="">Seleccione un jugo</option>
          {juices.map((juice) => (
            <option key={juice.id} value={String(juice.id)}>
              {juice.name}
            </option>
          ))}
        </select>
        {errors.juice_id && (
          <ErrorMessage>{errors.juice_id.message}</ErrorMessage>
        )}
      </div>

      {/* CAJAS */}
      <div className="form-group">
        <label className="form-label">Cajas *</label>
        <input
          type="number"
          className={`form-input ${
            errors.boxes ? "form-input-error" : "form-input-normal"
          }`}
          {...register("boxes", {
            valueAsNumber: true,
            required: "La cantidad de cajas es obligatoria",
            min: { value: 1, message: "Debe ser mayor a 0" },
          })}
        />
        {errors.boxes && <ErrorMessage>{errors.boxes.message}</ErrorMessage>}
      </div>

      {/* TEMPERATURA */}
      <div className="form-group">
        <label className="form-label">Temperatura *</label>
        <input
          type="number"
          className={`form-input ${
            errors.temp ? "form-input-error" : "form-input-normal"
          }`}
          {...register("temp", {
            valueAsNumber: true,
            required: "La temperatura es obligatoria",
          })}
        />
        {errors.temp && <ErrorMessage>{errors.temp.message}</ErrorMessage>}
      </div>

      {/* PESO BRUTO */}
      <div className="form-group">
        <label className="form-label">Peso bruto *</label>
        <input
          type="number"
          step="0.01"
          className={`form-input ${
            errors.gross_weight ? "form-input-error" : "form-input-normal"
          }`}
          {...register("gross_weight", {
            valueAsNumber: true,
            required: "El peso bruto es obligatorio",
            min: { value: 0.01, message: "Debe ser mayor a 0" },
          })}
        />
        {errors.gross_weight && (
          <ErrorMessage>{errors.gross_weight.message}</ErrorMessage>
        )}
      </div>

      {/* PESO NETO */}
      <div className="form-group">
        <label className="form-label">Peso neto *</label>
        <input
          type="number"
          step="0.01"
          className={`form-input ${
            errors.net_weight ? "form-input-error" : "form-input-normal"
          }`}
          {...register("net_weight", {
            valueAsNumber: true,
            required: "El peso neto es obligatorio",
            min: { value: 0.01, message: "Debe ser mayor a 0" },
          })}
        />
        {errors.net_weight && (
          <ErrorMessage>{errors.net_weight.message}</ErrorMessage>
        )}
      </div>

      {/* CLIENTE */}
      <div className="form-group">
        <label className="form-label">
          Cliente <span className="required">*</span>
        </label>
        <select
          className={`form-input ${
            errors.client_id ? "form-input-error" : "form-input-normal"
          }`}
          {...register("client_id", {
            required: "El cliente es obligatorio",
          })}
        >
          <option value="">Seleccione un cliente</option>
          {customers.map((customer) => (
            <option key={customer.id} value={String(customer.id)}>
              {customer.name}
            </option>
          ))}
        </select>
        {errors.client_id && (
          <ErrorMessage>{errors.client_id.message}</ErrorMessage>
        )}
      </div>

      {/* BOTELLAS */}
      <div className="form-group">
        <label className="form-label">Botellas *</label>
        <input
          type="number"
          className={`form-input ${
            errors.bottles ? "form-input-error" : "form-input-normal"
          }`}
          {...register("bottles", {
            valueAsNumber: true,
            required: "El dato de botellas es obligatorio",
            min: { value: 1, message: "Debe ser mayor a 0" },
          })}
        />
        {errors.bottles && (
          <ErrorMessage>{errors.bottles.message}</ErrorMessage>
        )}
      </div>

      {/* FECHA (oculta pero necesaria) */}
      <input type="hidden" {...register("date")} />

      {/* BOTONES */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors font-medium"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50 transition-colors font-medium shadow-md"
        >
          {isPending ? "Actualizando..." : "Actualizar"}
        </button>
      </div>
    </form>
  );
}

export default function EditJuiceItemModal({
  open,
  onClose,
  juicePackingListId,
  itemId,
  itemData,
  ctpatId,
}: Props) {
  // Cargar jugos
  const { data: juices } = useQuery({
    queryKey: ["juice-select"],
    queryFn: getJuiceForSelectAPI,
  });

  // Cargar clientes
  const { data: customers } = useQuery({
    queryKey: ["customers-select"],
    queryFn: getCustomersForSelectAPI,
  });

  if (!open) return null;

  return (
    <BaseModal open={open} onClose={onClose} title="Editar Ítem de Jugo">
      {juices?.length && customers?.length ? (
        <EditJuiceItemFormContent
          key={itemId}
          itemData={itemData}
          juicePackingListId={juicePackingListId}
          itemId={itemId}
          onClose={onClose}
          juices={juices}
          customers={customers}
          ctpatId={ctpatId}
        />
      ) : (
        <div className="flex justify-center items-center py-8">
          <span className="text-gray-500">Cargando opciones...</span>
        </div>
      )}
    </BaseModal>
  );
}
