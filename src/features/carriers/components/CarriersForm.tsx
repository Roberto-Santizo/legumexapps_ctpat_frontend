import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import type { createCarrierFormSchema } from "@/features/carriers/schemas/types";

type CarrierFormProps= {
  register: UseFormRegister<createCarrierFormSchema>;
  errors: FieldErrors<createCarrierFormSchema>
  
}

export default function CarrierForm({register, errors}: CarrierFormProps) {
  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre del transportista.
          <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper">
          <input
            id="name"
            type="text"
            placeholder="Ej. Manuel"
            className={`form-input ${
              errors.name ? "form-input-error" : "form-input-normal"
            }`}
            {...register("name", { required: "El nombre es obligatorio" })}
          />
        </div>
        {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
      </div>
    </div>
  );
}
