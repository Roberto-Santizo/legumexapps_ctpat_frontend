import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updatePackingListItemAPI } from "@/features/frozen-items/api/frozenItemAPI";
import type { EditPackingListItemFormData } from "@/features/frozen-items/schema/frozenItemType";
import type { PackingListItemTable } from "@/features/packing-List/schemas/packingList";
import { tableItemToEditForm } from "@/features/packing-List/schemas/packingList";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { getCustomersForSelectAPI } from "@/features/customer/api/CustomerAPI";
import { getProductsForSelectAPI } from "@/features/products/api/ProductsAPI";
import { toUpper } from "@/shared/helpers/textTransformUppercase";
import BaseModal from "@/shared/components/BaseModal";

type Props = {
  open: boolean;
  onClose: () => void;
  itemId: number;
  ctpatId: number;
  itemData: PackingListItemTable;
};

// Componente interno del formulario que solo se renderiza cuando las opciones están disponibles
function EditFrozenItemFormContent({
  itemData,
  itemId,
  ctpatId,
  onClose,
  products,
  customers,
}: {
  itemData: PackingListItemTable;
  itemId: number;
  ctpatId: number;
  onClose: () => void;
  products: { id: number; name: string }[];
  customers: { id: number; name: string }[];
}) {
  const queryClient = useQueryClient();

  // El backend no envía product_id ni client_id correctamente, solo los nombres
  // El client viene agrupado como "CLIENTE - PRODUCTO" (ej: "WALMART - FROZEN PRODUCT")
  // Workaround: extraer el nombre del cliente y buscar los IDs por nombre
  const itemDataAny = itemData as unknown as Record<string, unknown>;
  const productName = itemDataAny.product as string;
  const clientNameGrouped = itemDataAny.client as string;

  // Extraer solo el nombre del cliente (antes del " - ")
  // "WALMART - FROZEN PRODUCT" -> "WALMART"
  const clientName = clientNameGrouped?.includes(" - ")
    ? clientNameGrouped.split(" - ")[0].trim()
    : clientNameGrouped;

  // Función para normalizar strings (quitar espacios extra, convertir a minúsculas)
  const normalizeString = (str: string | undefined | null): string => {
    if (!str) return "";
    return str.trim().toLowerCase();
  };

  // Buscar el product_id por el nombre del producto
  const foundProduct = products.find(product => product.name === productName);
  const productId = foundProduct?.id || itemData.product_id;

  // Buscar el client_id por el nombre del cliente (comparación normalizada)
  const normalizedClientName = normalizeString(clientName);
  const foundCustomer = customers.find(customer =>
    normalizeString(customer.name) === normalizedClientName
  );
  const clientId = foundCustomer?.id || itemData.client_id;

  // Usar el helper para convertir los datos de la tabla al formato del formulario
  const initialFormData = tableItemToEditForm(itemData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialFormData,
      // Usar los IDs encontrados por nombre (o los originales si no se encontraron)
      product_id: productId ? String(productId) : "",
      client_id: clientId ? String(clientId) : "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: EditPackingListItemFormData) => {
      return updatePackingListItemAPI({
        ctpatId,
        itemId,
        formData,
      });
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      // Invalidar la query de items (frozen-items)
      await queryClient.invalidateQueries({
        queryKey: ["frozen-items", ctpatId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["packingList", ctpatId],
      });
      // Invalidar queries del documento PDF (refetchType: 'all' para forzar refetch)
      await queryClient.invalidateQueries({
        queryKey: ["ctpat", ctpatId],
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["packing-list-frozen-totals", ctpatId],
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["packing-list-totals", ctpatId],
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["packing-list-frozen", ctpatId],
        refetchType: "all",
      });
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Convertir los IDs de string a número antes de enviar
  const onSubmit = handleSubmit((data) => {
    const formData: EditPackingListItemFormData = {
      ...data,
      product_id: Number(data.product_id),
      client_id: Number(data.client_id),
      grn: data.grn || "",
    };
    mutate(formData);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
      noValidate
    >
      {/* PRODUCTO */}
      <div className="form-group">
        <label className="form-label">
          Producto <span className="required">*</span>
        </label>
        <select
          className={`form-input ${
            errors.product_id ? "form-input-error" : "form-input-normal"
          }`}
          {...register("product_id", {
            required: "El producto es obligatorio",
          })}
        >
          <option value="">Seleccione un producto</option>
          {products.map((product) => (
            <option key={product.id} value={String(product.id)}>
              {product.name}
            </option>
          ))}
        </select>
        {errors.product_id && (
          <ErrorMessage>{errors.product_id.message}</ErrorMessage>
        )}
      </div>

      {/* NÚMERO DE PALET */}
      <div className="form-group">
        <label className="form-label">Número de palet *</label>
        <input
          type="number"
          className={`form-input ${
            errors.no_pallet ? "form-input-error" : "form-input-normal"
          }`}
          {...register("no_pallet", {
            valueAsNumber: true,
            required: "El número de palet es obligatorio",
          })}
        />
        {errors.no_pallet && (
          <ErrorMessage>{errors.no_pallet.message}</ErrorMessage>
        )}
      </div>

      {/* LOTE */}
      <div className="form-group">
        <label className="form-label">Lote *</label>
        <input
          type="text"
          className={`form-input ${
            errors.lote ? "form-input-error" : "form-input-normal"
          }`}
          {...register("lote", {
            setValueAs: toUpper,
            required: "El lote es obligatorio",
          })}
        />
        {errors.lote && <ErrorMessage>{errors.lote.message}</ErrorMessage>}
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
          })}
        />
        {errors.boxes && <ErrorMessage>{errors.boxes.message}</ErrorMessage>}
      </div>

      {/* TEMPERATURA */}
      <div className="form-group">
        <label className="form-label">Temperatura *</label>
        <input
          type="number"
          step="0.1"
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
            min: {
              value: 0.01,
              message: "El peso bruto debe ser mayor a 0",
            },
            validate: {
              positive: (value) =>
                value > 0 || "El peso bruto debe ser mayor a 0",
              notZero: (value) =>
                value !== 0 || "El peso bruto no puede ser 0",
            },
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
            min: {
              value: 0.01,
              message: "El peso neto debe ser mayor a 0",
            },
            validate: {
              positive: (value) =>
                value > 0 || "El peso neto debe ser mayor a 0",
              notZero: (value) => value !== 0 || "El peso neto no puede ser 0",
            },
          })}
        />
        {errors.net_weight && (
          <ErrorMessage>{errors.net_weight.message}</ErrorMessage>
        )}
      </div>

      {/* FECHA DE PRODUCCIÓN */}
      <div className="form-group">
        <label className="form-label">Fecha de producción *</label>
        <input
          type="date"
          className={`form-input ${
            errors.production_date ? "form-input-error" : "form-input-normal"
          }`}
          {...register("production_date", {
            required: "La fecha de producción es obligatoria",
          })}
        />
        {errors.production_date && (
          <ErrorMessage>{errors.production_date.message}</ErrorMessage>
        )}
      </div>

      {/* FECHA DE VENCIMIENTO */}
      <div className="form-group">
        <label className="form-label">Fecha de vencimiento *</label>
        <input
          type="date"
          className={`form-input ${
            errors.expiration_date ? "form-input-error" : "form-input-normal"
          }`}
          {...register("expiration_date", {
            required: "La fecha de vencimiento es obligatoria",
          })}
        />
        {errors.expiration_date && (
          <ErrorMessage>{errors.expiration_date.message}</ErrorMessage>
        )}
      </div>

      {/* GRN */}
      <div className="form-group">
        <label className="form-label">GRN</label>
        <input
          type="text"
          className="form-input form-input-normal"
          {...register("grn", {
            setValueAs: toUpper,
          })}
        />
        {errors.grn && <ErrorMessage>{errors.grn.message}</ErrorMessage>}
      </div>

      {/* PO */}
      <div className="form-group">
        <label className="form-label">PO</label>
        <input
          type="text"
          className="form-input form-input-normal"
          {...register("po", { setValueAs: toUpper })}
        />
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

      {/* BOTONES */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white disabled:opacity-50"
        >
          {isPending ? "Actualizando..." : "Actualizar"}
        </button>
      </div>
    </form>
  );
}

export default function EditFrozenItemForm({
  open,
  onClose,
  itemId,
  ctpatId,
  itemData,
}: Props) {
  // Cargar productos
  const { data: products } = useQuery({
    queryKey: ["products-select"],
    queryFn: getProductsForSelectAPI,
  });

  // Cargar clientes
  const { data: customers } = useQuery({
    queryKey: ["customers-select"],
    queryFn: getCustomersForSelectAPI,
  });

  if (!open) return null;

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Editar Ítem del Packing List"
    >
      {products?.length && customers?.length ? (
        <EditFrozenItemFormContent
          key={itemId}
          itemData={itemData}
          itemId={itemId}
          ctpatId={ctpatId}
          onClose={onClose}
          products={products}
          customers={customers}
        />
      ) : (
        <div className="flex justify-center items-center py-8">
          <span className="text-gray-500">Cargando opciones...</span>
        </div>
      )}
    </BaseModal>
  );
}
