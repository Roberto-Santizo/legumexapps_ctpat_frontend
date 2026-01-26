import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { getCustomersForSelectAPI } from "@/features/customer/api/CustomerAPI";
import type {CreateJuiceItemFormData} from "@/features/juice-Items/schema/juiceItemType"
import {getJuiceForSelectAPI} from "@/features/juiceProduct/api/JuiceApi"
import {toUpper} from "@/shared/helpers/textTransformUppercase"

type Props = {
  register: UseFormRegister<CreateJuiceItemFormData>;
  errors: FieldErrors<CreateJuiceItemFormData>;
};

export default function CreateJuiceItemForm({ register, errors }: Props) {
  const { data: juices } = useQuery({
    queryKey: ["juice-select"],
    queryFn: getJuiceForSelectAPI,
  });

  const { data: customers } = useQuery({
    queryKey: ["customers-select"],
    queryFn: getCustomersForSelectAPI,
  });

  return (
    <div className="space-y-6">
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
              {juice.name}  ({juice.code})
            </option>
          ))}
        </select>
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
          inputMode="decimal"
          placeholder="Ej: 1.5 o -1.5"
          className={`form-input ${
            errors.temp ? "form-input-error" : "form-input-normal"
          }`}
          {...register("temp", {
            required: "La temperatura es obligatoria",
            setValueAs: (value) => {
              const num = parseFloat(value);
              return isNaN(num) ? undefined : num;
            }
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
    </div>
  );
}