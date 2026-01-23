import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";

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
};

export default function EditJuiceItemModal({
  open,
  onClose,
  juicePackingListId,
  itemId,
  itemData,
}: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditJuicePackingListItemFormData>();

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

  // Resetear formulario cuando se abre el modal con datos del item
  useEffect(() => {
    if (open && itemData) {
      // Convertir los datos de la tabla al formato del formulario
      reset({
        juice_id: itemData.juice_id,
        boxes: itemData.total_boxes,
        temp: itemData.temp,
        gross_weight: itemData.gross_weight,
        net_weight: itemData.net_weight,
        client_id: itemData.client_id,
        bottles: itemData.bottles,
        date: itemData.date,
      });
    }
  }, [open, itemData, reset]);

  // Mutación para actualizar
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
      // Invalidar la query específica del packing list
      await queryClient.invalidateQueries({
        queryKey: ["juicePackingList", juicePackingListId],
      });
      // También invalidar la query por CTPAT (usada en el flujo dinámico)
      await queryClient.invalidateQueries({
        queryKey: ["juicePackingListByCtpat"],
      });
      onClose();
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (!open) return null;

  return (
    <BaseModal open={open} onClose={onClose} title="Editar Ítem de Jugo">
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
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
              valueAsNumber: true,
              required: "El jugo es obligatorio",
            })}
          >
            <option value="">Seleccione un jugo</option>
            {juices?.map((juice) => (
              <option key={juice.id} value={juice.id}>
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
              valueAsNumber: true,
              required: "El cliente es obligatorio",
            })}
          >
            <option value="">Seleccione un cliente</option>
            {customers?.map((customer) => (
              <option key={customer.id} value={customer.id}>
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
    </BaseModal>
  );
}