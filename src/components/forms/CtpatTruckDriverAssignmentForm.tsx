import { useQuery } from "@tanstack/react-query";
import { ErrorMessage } from "../utilities-components/ErrorMessage";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { getTrucksAPI } from "../../api/TruckAPI";
import { getDriverAPI } from "../../api/DriversAPI";

export type CreateCtpatAssignmentForm = {
  truck_id: number;
  driver_id: number;
};

type Props = {
  register: UseFormRegister<CreateCtpatAssignmentForm>;
  errors: FieldErrors<CreateCtpatAssignmentForm>;
};

export default function CtpatTruckDriverAssignmentForm({ register, errors }: Props) {
  // --- OBTENER CAMIONES ---
  const { data: trucksData, isLoading: loadingTrucks } = useQuery({
    queryKey: ["trucks-cptat"],
    queryFn: () => getTrucksAPI(1),
  });

  // --- OBTENER PILOTOS ---
  const { data: driversData, isLoading: loadingDrivers } = useQuery({
    queryKey: ["drivers-cptat"],
    queryFn: () => getDriverAPI(1),
  });

  const trucks = trucksData?.response || [];
  const drivers = driversData?.response || [];

  return (
    <div className="form-container">
      {/* SELECT DE CAMION */}
      <div className="form-group">
        <label htmlFor="truck_id" className="form-label">
          Seleccionar Camión
          <span className="required">*</span>
        </label>

        <div className="input-icon-wrapper">
          <select
            id="truck_id"
            className={`form-input ${
              errors?.truck_id ? "form-input-error" : "form-input-normal"
            }`}
            {...register("truck_id", {
              required: "Debes seleccionar un camión",
            })}
          >
            <option value="">-- Selecciona un camión --</option>
            {loadingTrucks ? (
              <option>Cargando...</option>
            ) : (
              trucks.map((truck) => (
                <option key={truck.id} value={truck.id}>
                  {truck.plate} - {truck.carrier}
                </option>
              ))
            )}
          </select>
        </div>

        {errors?.truck_id && (
          <div className="error-message-container">
            <ErrorMessage>{errors.truck_id.message}</ErrorMessage>
          </div>
        )}
        <p className="help-text">
          Selecciona el camión que deseas asociar al CTPAT.
        </p>
      </div>

      {/* SELECT DE PILOTO */}
      <div className="form-group">
        <label htmlFor="driver_id" className="form-label">
          Seleccionar Piloto
          <span className="required">*</span>
        </label>

        <div className="input-icon-wrapper">
          <select
            id="driver_id"
            className={`form-input ${
              errors?.driver_id ? "form-input-error" : "form-input-normal"
            }`}
            {...register("driver_id", {
              required: "Debes seleccionar un piloto",
            })}
          >
            <option value="">-- Selecciona un piloto --</option>
            {loadingDrivers ? (
              <option>Cargando...</option>
            ) : (
              drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))
            )}
          </select>
        </div>

        {errors?.driver_id && (
          <div className="error-message-container">
            <ErrorMessage>{errors.driver_id.message}</ErrorMessage>
          </div>
        )}
        <p className="help-text">
          Selecciona el piloto que manejará este camión.
        </p>
      </div>
    </div>
  );
}
