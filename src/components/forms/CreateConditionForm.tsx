import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "../utilities-components/ErrorMessage";
import type {ConditionFormData} from "@/schemas/types"

type ConditionFormProps = {
  register: UseFormRegister<ConditionFormData>;
  errors: FieldErrors<ConditionFormData>;
};

export default function ConditionForm({register,errors,}: ConditionFormProps) {
  return (
    <div className="form-container space-y-6">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="name"
            type="text"
            placeholder="Is the Bumper in Good Condion, La defense esta en buena condición"
            className={`form-input pl-10 ${
              errors.name ? "form-input-error" : "form-input-normal"
            }`}
            {...register("name", {
              required: "La descripción de la condición es obligatoria",
            })}
          />
        </div>
        {errors.name && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="type" className="form-label">
          Tipo <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <select
            id="type"
            className={`form-input pl-10 ${
              errors.type ? "form-input-error" : "form-input-normal"
            }`}
            {...register("type", {
              required: "El tipo es obligatorio",
            })}
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona un tipo
            </option>
            <option value="TRUCK_INSPECTION">INSPECCIÓN DE CONTENEDOR</option>
          </select>
        </div>
        {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
      </div>

    </div>
  );
}
