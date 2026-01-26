import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import type {ConditionFormData} from "@/features/conditions/schemas/types"
import { toUpper } from "@/shared/helpers/textTransformUppercase";

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
              setValueAs: toUpper,
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
            <option value="TRUCK_INSPECTION">INSPECCION DEL TRAILER</option>
            <option value="EXTERIOR_TRUCK_INSPECTION">INSPECCIÓN EXTERIOR DEL CONTENEDOR</option>
            <option value="INTERIOR_TRUCK_INSPECTION">INSPECCIÓN INTERIOR DEL CONTENEDOR</option>
            <option value="PEST_INSPECTION">INSPECCIÓN DE CONTROL DE PESTES</option>
            <option value="CHEMICALS_INSPECTION">INSPECCIÓN DE CONTAMINACIÓN QUÍMICA</option>
            <option value="PRODUCT_INSPECTION">INSPECCIÓN DE PRODUCTO</option>
            <option value="NON-COMPLIANCE_OBSERVATIOS">OBSERVACIONES DE NO CUMPLIMIENTO</option>            
          </select>
        </div>
        {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
      </div>

    </div>
  );
}
