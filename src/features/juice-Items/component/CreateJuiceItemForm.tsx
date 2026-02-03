import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { searchableSelectStyles, getSelectClassNames } from "@/shared/components/SearchableSelect/searchableSelectStyles";
import { getCustomersForSelectAPI } from "@/features/customer/api/CustomerAPI";
import type {CreateJuiceItemFormData} from "@/features/juice-Items/schema/juiceItemType"
import {getJuiceForSelectAPI} from "@/features/juiceProduct/api/JuiceApi"
import {toUpper} from "@/shared/helpers/textTransformUppercase"

type Props = {
  register: UseFormRegister<CreateJuiceItemFormData>;
  errors: FieldErrors<CreateJuiceItemFormData>;
  control: Control<CreateJuiceItemFormData>;
};

export default function CreateJuiceItemForm({ register, errors, control }: Props) {
  const { data: juices } = useQuery({
    queryKey: ["juice-select"],
    queryFn: getJuiceForSelectAPI,
  });

  const { data: customers } = useQuery({
    queryKey: ["customers-select"],
    queryFn: getCustomersForSelectAPI,
  });

  // Opciones para el select de jugos
  const juiceOptions = juices?.map((juice) => ({
    value: juice.id,
    label: `${juice.name} (${juice.code})`,
  })) ?? [];

  // Opciones para el select de clientes
  const customerOptions = customers?.map((c) => ({
    value: c.id,
    label: c.name,
  })) ?? [];

  return (
    <div className="space-y-6">
      <div className="form-group">
        <label className="form-label">
          Jugo <span className="required">*</span>
        </label>
        <Controller
          name="juice_id"
          control={control}
          rules={{ required: "El jugo es obligatorio" }}
          render={({ field }) => (
            <Select<{ value: number; label: string }>
              {...field}
              options={juiceOptions}
              placeholder="Escribe para buscar jugo..."
              isClearable
              isSearchable
              noOptionsMessage={() => "No se encontraron jugos"}
              value={juiceOptions.find((opt) => opt.value === field.value) || null}
              onChange={(selected) => field.onChange(selected?.value ?? null)}
              classNames={getSelectClassNames(!!errors.juice_id)}
              styles={searchableSelectStyles}
            />
          )}
        />
        {errors.juice_id && (
          <ErrorMessage>{errors.juice_id.message}</ErrorMessage>
        )}
      </div>


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
             min:{
                value:0.01,
                message: "La cantidad de cajas debe ser mayor a 0"
              },
              validate: {
                positive: (value) => value > 0 || "Las cajas deben ser mayor a 0",
                notZero: (value) => value !== 0 || "Las cajas no pueden ser 0"
              }
          })}
        />
        {errors.boxes && <ErrorMessage>{errors.boxes.message}</ErrorMessage>}
      </div>

      <div className="form-group">
        <label className="form-label">Temperatura *</label>
        <input
          type="text"
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

      <div className="form-group">
          <label className="form-label">Cantidad de botellas / Bolsas *</label>
          <input
            type="number"
            className={`form-input ${
              errors.bottles ? "form-input-error" : "form-input-normal"
            }`}
            {...register("bottles", {
              valueAsNumber: true,
              required: "El dato de botellas es obligatorio",
              min:{
                value: 0.01,
                message: "El dato  debe ser mayor a 0"
              },
              validate: {
                positive: (value) => value > 0 || "El dato debe ser mayor a 0",
                notZero: (value) => value !== 0 || "El dato no puede ser 0"
              }
            })}
          />
          {errors.bottles && (
            <ErrorMessage>{errors.bottles.message}</ErrorMessage>
          )}
        </div>
        <div className="form-group">
            <label className="form-label">Fecha de producción *</label>
            <input
              type="date"
              className={`form-input ${
                errors.date ? "form-input-error" : "form-input-normal"
              }`}
              {...register("date", {
                required: "La fecha es obligatoria",
              })}
            />
            {errors.date && (
              <ErrorMessage>{errors.date.message}</ErrorMessage>
            )}
        </div>
        
        <div className="form-group">
          <label className="form-label">GRN *</label>
          <input
            type="text"
            className={`form-input ${
              errors.grn ? "form-input-error" : "form-input-normal"
            }`}
            {...register("grn", {
              setValueAs: toUpper, 
              required: "El dato de grn es obligatorio",
            })}
          />
          {errors.grn && (
            <ErrorMessage>{errors.grn.message}</ErrorMessage>
          )}
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

        <div className="form-group">
          <label className="form-label">Fecha de expiración *</label>
          <input
            type="text"
            className={`form-input ${
              errors.expiration_date ? "form-input-error" : "form-input-normal"
            }`}
            {...register("expiration_date", {
              setValueAs: toUpper, 
              required: "La fecha de expiración es obligatoria",
            })}
          />
          {errors.expiration_date && (
            <ErrorMessage>{errors.expiration_date.message}</ErrorMessage>
          )}
        </div>

      </div>
        
    </div>
  );
}