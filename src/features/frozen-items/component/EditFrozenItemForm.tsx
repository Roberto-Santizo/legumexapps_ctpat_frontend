import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";

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
  packingListId: number;
  itemId: number;
  ctpatId: number;
  itemData: PackingListItemTable;
};

export default function EditFrozenItemForm({
  open,
  onClose,
  packingListId,
  itemId,
  ctpatId,
  itemData,
}: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditPackingListItemFormData>();

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

  // Resetear formulario cuando se abre el modal con datos del item
  useEffect(() => {
    if (open && itemData) {      
      // Usar el helper para convertir correctamente
      const formData = tableItemToEditForm(itemData);
            
      reset(formData);
    }
  }, [open, itemData, reset]);

  // Mutación para actualizar
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: EditPackingListItemFormData) => {
      return updatePackingListItemAPI({
        packingListId,
        itemId,
        formData,
      });
    },

    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["packingList", ctpatId],
      });
      onClose();
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (!open) return null;

  return (
    <BaseModal open={open} onClose={onClose} title="Editar Ítem del Packing List">
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="space-y-6"
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
              valueAsNumber: true,
              required: "El producto es obligatorio",
            })}
          >
            <option value="">Seleccione un producto</option>
            {products?.map((product) => (
              <option key={product.id} value={product.id}>
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
              min:{
                value:0.01,
                message: "El peso bruto debe ser mayor a 0"
              },
              validate: {
                positive: (value) => value > 0 || "El peso bruto debe ser mayor a 0",
                notZero: (value) => value !== 0 || "El peso bruto no puede ser 0"
              }
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
              min:{
                value: 0.01,
                message: "El peso neto debe ser mayor a 0"
              },
              validate: {
                positive: (value) => value > 0 || "El peso neto debe ser mayor a 0",
                notZero: (value) => value !== 0 || "El peso neto no puede ser 0"
              }
            })}
          />
          {errors.net_weight && (
            <ErrorMessage>{errors.net_weight.message}</ErrorMessage>
          )}
        </div>

        {/* FECHA DE PRODUCCIÓN - AGREGADA */}
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
    </BaseModal>
  );
}