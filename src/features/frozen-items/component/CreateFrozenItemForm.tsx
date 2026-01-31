import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { AddItemToPackingListFormData } from "@/features/frozen-items/schema/frozenItemType";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { searchableSelectStyles, getSelectClassNames } from "@/shared/components/SearchableSelect/searchableSelectStyles";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { getProductsForSelectAPI } from "@/features/products/api/ProductsAPI";
import { getCustomersForSelectAPI } from "@/features/customer/api/CustomerAPI";
import { toUpper } from "@/shared/helpers/textTransformUppercase";

type Props = {
  register: UseFormRegister<AddItemToPackingListFormData>;
  errors: FieldErrors<AddItemToPackingListFormData>;
  control: Control<AddItemToPackingListFormData>;
};


export default function CreateFrozenItemForm({ register, errors, control }: Props) {
  const { data: products } = useQuery({
    queryKey: ["products-select"],
    queryFn: getProductsForSelectAPI,
  });

  const { data: customers } = useQuery({
    queryKey: ["customers-select"],
    queryFn: getCustomersForSelectAPI,
  });

  // Opciones para el select de productos
  const productOptions = products?.map((product) => ({
    value: product.id,
    label: `${product.name} (${product.code})`,
  })) ?? [];

  // Opciones para el select de clientes
  const customerOptions = customers?.map((c) => ({
    value: c.id,
    label: c.name,
  })) ?? [];

  return (
    <div className="space-y-6">
      {/* PRODUCTO */}
      <div className="form-group">
        <label className="form-label">
          Producto <span className="required">*</span>
        </label>
        <Controller
          name="product_id"
          control={control}
          rules={{ required: "El producto es obligatorio" }}
          render={({ field }) => (
            <Select<{ value: number; label: string }>
              {...field}
              options={productOptions}
              placeholder="Escribe para buscar producto..."
              isClearable
              isSearchable
              noOptionsMessage={() => "No se encontraron productos"}
              value={productOptions.find((opt) => opt.value === field.value) || null}
              onChange={(selected) => field.onChange(selected?.value ?? null)}
              classNames={getSelectClassNames(!!errors.product_id)}
              styles={searchableSelectStyles}
            />
          )}
        />
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
        <Controller
          name="client_id"
          control={control}
          rules={{ required: "El cliente es obligatorio" }}
          render={({ field }) => (
            <Select<{ value: number; label: string }>
              {...field}
              options={customerOptions}
              placeholder="Escribe para buscar cliente..."
              isClearable
              isSearchable
              noOptionsMessage={() => "No se encontraron clientes"}
              value={customerOptions.find((opt) => opt.value === field.value) || null}
              onChange={(selected) => field.onChange(selected?.value ?? null)}
              classNames={getSelectClassNames(!!errors.client_id)}
              styles={searchableSelectStyles}
            />
          )}
        />
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

      <div className="form-group">
        <label className="form-label">CODIGO</label>
        <input
          type="text"
          id="code"
          className={`form-input ${
            errors.code ? "form-input-error" : "form-input-normal"
          }`}
          {...register("code", {
           setValueAs: (value) => value?.toUpperCase(),
          })}
        />
      </div>
    </div>
  );
}