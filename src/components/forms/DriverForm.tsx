import { ErrorMessage } from "../utilities-components/ErrorMessage";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { useEffect, useState } from "react";
import { getCarriersAPI } from "@/api/CarriersAPI";
import type {DriverFormData} from "@/schemas/types";

type DriverFormProps = {
  register:UseFormRegister<DriverFormData>
  errors:FieldErrors<DriverFormData>
  showCarrierField?: boolean;
};

export default function DriverForm({errors, register, showCarrierField = true}:DriverFormProps) {
  const [carriers, setCarriers] = useState<{ id: number; name: string }[]>([]);
  const [loadingCarriers, setLoadingCarriers] = useState<boolean>(true);

  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const { response } = await getCarriersAPI();
        setCarriers(response);
      } catch (error) {
        console.error("Error cargando transportistas:", error);
      } finally {
        setLoadingCarriers(false);
      }
    };
    fetchCarriers();
  }, []);

  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre del Piloto <span className="required">*</span>
        </label>
        <div className="input-icon-wrapper">
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          ></svg>
          <input
            id="name"
            type="text"
            placeholder="Pedro"
            className={`form-input pl-10 ${
              errors.name ? "form-input-error" : "form-input-normal"
            }`}
            {...register("name", { required: "El nombre es obligatorio" })}
          />
        </div>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="form-group">
        <label htmlFor="identification" className="form-label">
          No. DPI <span className="required">*</span>
        </label>

        <div className="input-icon-wrapper">
          <input
            id="identification"
            type="number"
            placeholder="2956452541245"
            className={`form-input pl-10 ${
              errors.identification ? "form-input-error" : "form-input-normal"
            }`}
            {...register("identification", {
              required: "El número de DPI es obligatorio",
              pattern: {
                value: /^(?!.*--)(?!.*\+)\d{13}$/,
                message:
                  "El DPI debe tener exactamente 13 dígitos y no puede contener '--' ni '+'",
              },
            })}
          />
        </div>
        {errors.identification && (
          <ErrorMessage>{errors.identification.message}</ErrorMessage>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="license" className="form-label">
          Licencia <span className="required">*</span>
        </label>

        <div className="input-icon-wrapper">
          <input
            id="license"
            type="text"
            placeholder="P123ABC"
            className={`form-input pl-10 ${
              errors.license ? "form-input-error" : "form-input-normal"
            }`}
            {...register("license", {
              required: "El número de licencia es obligatorio",
            })}
          />
        </div>
        {errors.license && (
          <ErrorMessage>{errors.license.message}</ErrorMessage>
        )}
      </div>

      {showCarrierField && (
        <div className="form-group">
          <label htmlFor="carrier_id" className="form-label">
            Transportista <span className="required">*</span>
          </label>

          <select
            id="carrier_id"
            className={`form-input ${
              errors.carrier_id ? "form-input-error" : "form-input-normal"
            }`}
            {...register("carrier_id", {
              required: "El transportista es obligatorio",
            })}
            disabled={loadingCarriers}
          >
            <option value="">Selecciona un transportista</option>
            {carriers.map((carrier) => (
              <option key={carrier.id} value={carrier.id}>
                {carrier.name}
              </option>
            ))}
          </select>
          {errors.carrier_id && (
            <ErrorMessage>{errors.carrier_id.message}</ErrorMessage>
          )}
        </div>
      )}
    </div>
  );
}
