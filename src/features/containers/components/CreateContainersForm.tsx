import type { ContainerFormData } from "@/features/containers/schemas/types";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { toUpper } from "@/shared/helpers/textTransformUppercase";

type ContainerFormProps = {
  register: UseFormRegister<ContainerFormData>;
  errors: FieldErrors<ContainerFormData>;
};

export default function ContainersForm({register,errors,}: ContainerFormProps) {
  return (
    <div className="form-container space-y-6">
      <div className="form-group">
        <label htmlFor="container" className="form-label">
          Numero de contenedor <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="container"
            type="text"
            placeholder="CMCU-009"
            className={`form-input pl-10 ${
              errors.container ? "form-input-error" : "form-input-normal"
            }`}
            {...register("container", {
              setValueAs: toUpper,
              required: "El código del contenedor es obligatorio",
            })}
          />
        </div>
        {errors.container && (
          <ErrorMessage>{errors.container.message}</ErrorMessage>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="seal" className="form-label">
          Número de Sello <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="seal"
            type="text"
            placeholder="295621"
            className={`form-input pl-10 ${
              errors.seal ? "form-input-error" : "form-input-normal"
            }`}
            {...register("seal", {
              setValueAs: toUpper,
              required: "El número de sello es obligatorio",
            })}
          />
        </div>
        {errors.seal && <ErrorMessage>{errors.seal.message}</ErrorMessage>}
      </div>

      <div className="form-group">
        <label htmlFor="sensor" className="form-label">
          Número de Sensor <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <input
            id="sensor"
            type="text"
            placeholder="295645"
            className={`form-input pl-10 ${
              errors.sensor ? "form-input-error" : "form-input-normal"
            }`}
            {...register("sensor", {
              setValueAs: toUpper,
              required: "El número de sensor es obligatorio",
            })}
          />
        </div>
        {errors.sensor && <ErrorMessage>{errors.sensor.message}</ErrorMessage>}
      </div>

      <div className="form-group">
        <label htmlFor="type" className="form-label">
          Tipo de Contenedor <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper relative">
          <select
            id="type"
            className={`form-input pl-10 ${
              errors.type ? "form-input-error" : "form-input-normal"
            }`}
            {...register("type", {
              required: "El tipo de contenedor es obligatorio",
            })}
          >
            <option value="">Seleccione un tipo</option>
            <option value="HC 48">HC 48 (Contenedor de Exportación)</option>
            <option value="HC 53">HC 53 (Furgón)</option>
          </select>
        </div>
        {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
      </div>
    </div>
  );
}