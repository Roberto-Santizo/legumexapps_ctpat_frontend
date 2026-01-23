import type { ProductCreateData } from "@/features/products/schemas/types";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { toUpper } from "@/shared/helpers/textTransformUppercase";

type ProductFormProps = {
  register: UseFormRegister<ProductCreateData>;
  errors: FieldErrors<ProductCreateData>;
};

export default function CreateProductsForm({register,errors,}: ProductFormProps) {
  return (
    <div className="form-container space-y-6">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre del producto <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="name"
            type="text"
            placeholder="Fresa"
            className={`form-input pl-10 ${
              errors.name ? "form-input-error" : "form-input-normal"
            }`}
            {...register("name", {
              setValueAs: toUpper,
              required: "El nombre del producto es obligatorio",
            })}
          />
        </div>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="form-group">
        <label htmlFor="code" className="form-label">
          Código del producto <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="code"
            type="text"
            placeholder="F-1"
            className={`form-input pl-10 ${
              errors.code ? "form-input-error" : "form-input-normal"
            }`}
            {...register("code", {
              required: "El código es obligatorio",
            })}
          />
        </div>
        {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
      </div>
        <>
          <div className="form-group">
            <label htmlFor="presentation" className="form-label">
              Presentación del producto<span className="required">*</span>
            </label>
            <div className="input-icon-wrapper relative">
              <input
                id="presentation"
                type="text"
                placeholder="12X14 ONZ"
                className={`form-input pl-10 ${
                  errors.presentation ? "form-input-error" : "form-input-normal"
                }`}
                {...register("presentation", {
                  setValueAs: toUpper,
                  required: "La presentación es obligatoria",
                })}
              />
            </div>
            {errors.presentation && (
              <ErrorMessage>{errors.presentation.message}</ErrorMessage>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lbs_presentation" className="form-label">
              Libras por caja<span className="required">*</span>
            </label>
            <div className="input-icon-wrapper relative">
              <input
                id="lbs_presentation"
                type="number"
                placeholder="16"
                className={`form-input pl-10 ${
                  errors.lbs_presentation
                    ? "form-input-error"
                    : "form-input-normal"
                }`}
                {...register("lbs_presentation", {
                  required: "La presentación de caja es obligatoria",
                })}
              />
            </div>
            {errors.lbs_presentation && (
              <ErrorMessage>{errors.lbs_presentation.message}</ErrorMessage>
            )}
          </div>
        </>
    </div>
  );
}
