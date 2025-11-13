import type { CreateRolFormData } from "../../schemas/typesAdmin";
import { ErrorMessage } from "../utilities-components/ErrorMessage";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

type RolFormProps = {
  register: UseFormRegister<CreateRolFormData>;
  errors: FieldErrors<CreateRolFormData>;
};

export default function CrearRolForm({ register, errors }: RolFormProps) {
  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre del Rol
          <span className="required">*</span>
        </label>

        <div className="input-icon-wrapper">
          <input
            id="name"
            type="text"
            placeholder="Ej. Administrador, Editor, Usuario"
            className={`form-input ${
              errors.name ? "form-input-error" : "form-input-normal"
            }`}
            {...register("name", {
              required: "El nombre del rol es obligatorio",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede exceder 50 caracteres",
              },
            })}
          />
        </div>

        {errors.name && (
          <div className="error-message-container">
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          </div>
        )}
        <p className="help-text">
          Ingresa un nombre descriptivo para identificar este rol
        </p>
      </div>
    </div>
  );
}
