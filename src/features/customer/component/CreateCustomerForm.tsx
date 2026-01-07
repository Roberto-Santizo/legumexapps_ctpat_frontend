
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { toUpper } from "@/shared/helpers/textTransformUppercase";
import type { CreateCustomer } from "@/features/customer/schemas/types";
import type { UseFormRegister,FieldErrors } from "react-hook-form";

type CreateCustomerFormProps = {
    register: UseFormRegister<CreateCustomer>
    errors: FieldErrors<CreateCustomer>
}

export default function CreateCustomerForm({errors, register}:CreateCustomerFormProps) {

  return (
    <div className="form-container space-y-6">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre del cliente <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="name"
            type="text"
            placeholder="H.E.B"
            className={`form-input pl-10 ${
              errors.name ? "form-input-error" : "form-input-normal"
            }`}
            {...register("name", {
              setValueAs: toUpper,
              required: "El nombre del cliente es obligatorio",
            })}
          />
        </div>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="form-group">
        <label htmlFor="code" className="form-label">
          Código del cliente <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="code"
            type="text"
            placeholder="C-1"
            className={`form-input pl-10 ${
              errors.code ? "form-input-error" : "form-input-normal"
            }`}
            {...register("code", {
              required: "El código del cliente es obligatorio",
            })}
          />
        </div>
        {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
      </div>
    </div>
  );
}
