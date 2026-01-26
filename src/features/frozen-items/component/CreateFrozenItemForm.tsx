import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { AddItemToPackingListFormData } from "@/features/frozen-items/schema/frozenItemType";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { getProductsForSelectAPI } from "@/features/products/api/ProductsAPI";
import { getCustomersForSelectAPI } from "@/features/customer/api/CustomerAPI";
import { toUpper } from "@/shared/helpers/textTransformUppercase";

type Props = {
  register: UseFormRegister<AddItemToPackingListFormData>;
  errors: FieldErrors<AddItemToPackingListFormData>;
};


export default function CreateFrozenItemForm({ register, errors }: Props) {
  const { data: products } = useQuery({
    queryKey: ["products-select"],
    queryFn: getProductsForSelectAPI,
  });

  const { data: customers } = useQuery({
    queryKey: ["customers-select"],
    queryFn: getCustomersForSelectAPI,
  });

  return (
    <div className="space-y-6">
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
              {product.name}   ({product.code})
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

      {/* LOTE - Acepta string o number, se convierte a string */}
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
          type="text"
          step="any"
          placeholder="Ej: 1.5 o -1.5"
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
          {customers?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.client_id && (
          <ErrorMessage>{errors.client_id.message}</ErrorMessage>
        )}
      </div>

      {/* PO (OPCIONAL) */}
      <div className="form-group">
        <label className="form-label">PO</label>
        <input
          type="text"
          className="form-input form-input-normal"
          {...register("po")}
        />
      </div>

      <div className="form-group">
        <label className="form-label">GRN *</label>
        <input
          type="text"
          id="grn"
          className={`form-input ${
            errors.grn ? "form-input-error" : "form-input-normal"
          }`}
          {...register("grn", {
            required: "El GRN  es obligatoria",
           setValueAs: (value) => value?.toUpperCase(),
          })}
        />
        {errors.grn && (<ErrorMessage>{errors.grn.message}</ErrorMessage> )}
      </div>
    </div>
  );
}