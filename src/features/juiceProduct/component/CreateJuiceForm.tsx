
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { toUpper } from "@/shared/helpers/textTransformUppercase";
import type { JuiceSchemaFormData } from "@/features/juiceProduct/schemas/types";
import type { UseFormRegister,FieldErrors } from "react-hook-form";

type CreateJuiceFormProps = {
    register: UseFormRegister<JuiceSchemaFormData>
    errors: FieldErrors<JuiceSchemaFormData>
}

export default function CreateJuiceForm({errors, register}:CreateJuiceFormProps) {

  return (
    <div className="form-container space-y-6">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre del jugo <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="name"
            type="text"
            placeholder="Strawberry Juice"
            className={`form-input pl-10 ${
              errors.name ? "form-input-error" : "form-input-normal"
            }`}
            {...register("name", {
              setValueAs: toUpper,
              required: "El nombre del jugo es obligatorio",
            })}
          />
        </div>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="form-group">
        <label htmlFor="code" className="form-label">
          Código del jugo <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="code"
            type="text"
            placeholder="JS-1"
            className={`form-input pl-10 ${
              errors.code ? "form-input-error" : "form-input-normal"
            }`}
            {...register("code", {
              required: "El código del jugo es obligatorio",
            })}
          />
        </div>
        {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
      </div>

      <div className="form-group">
        <label htmlFor="presentation" className="form-label">
          Presentación del jugo <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="presentation"
            type="text"
            placeholder="12X15 ML"
            className={`form-input pl-10 ${
              errors.presentation ? "form-input-error" : "form-input-normal"
            }`}
            {...register("presentation", {
              required: "La presentación del jugo es obligatorio",
            })}
          />
        </div>
        {errors.presentation && <ErrorMessage>{errors.presentation.message}</ErrorMessage>}
      </div>

      <div className="form-group">
        <label htmlFor="lbs_presentation" className="form-label">
          Libras por caja<span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="lbs_presentation"
            type="number"
            placeholder="20"
            className={`form-input pl-10 ${
              errors.lbs_presentation ? "form-input-error" : "form-input-normal"
            }`}
            {...register("lbs_presentation", {
              valueAsNumber: true,
              required: "Las libras por presentación son obligatorias",
              min:{
                value:0.01,
                message: "Las libras por presentación debe ser mayor a 0"
              },
              validate: {
                positive: (value) => value > 0 || "Las libras por presentación deben ser mayor a 0",
                notZero: (value) => value !== 0 || "Las libras por presentación no pueden ser 0"
              }
            })}
          />
        </div>
        {errors.lbs_presentation && <ErrorMessage>{errors.lbs_presentation.message}</ErrorMessage>}
      </div>
    </div>
  );
}
