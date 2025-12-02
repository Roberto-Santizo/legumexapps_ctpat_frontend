import { useQuery } from "@tanstack/react-query";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { getTrucksAPI } from "../../trucks/api/TruckAPI";
import { getDriverAPI } from "@/features/drivers/api/DriversAPI";

import DriverModalCreate from "../../drivers/components/DriverModalCreate";
import TruckModalCreate from "../../trucks/components/TruckModalCreate";
import { useState } from "react";
import {Plus } from "lucide-react";

export type CreateCtpatAssignmentForm = {
  truck_id: number;
  driver_id: number;
};

type Props = {
  register: UseFormRegister<CreateCtpatAssignmentForm>;
  errors: FieldErrors<CreateCtpatAssignmentForm>;
};

export default function CtpatTruckDriverAssignmentForm({ register, errors }: Props) {

  const [truckModalOpen, setTruckModalOpen] = useState(false);
  const [driverModalOpen, setDriverModalOpen] = useState(false);

  // --- OBTENER CAMIONES ---
  const { data: trucksData, isLoading: loadingTrucks, refetch: refetchTrucks } = useQuery({
    queryKey: ["trucks-cptat"],
    queryFn: () => getTrucksAPI(1),
  });

  // --- OBTENER PILOTOS ---
  const { data: driversData, isLoading: loadingDrivers, refetch: refetchDrivers  } = useQuery({
    queryKey: ["drivers-cptat"],
    queryFn: () => getDriverAPI(1),
  });

  const trucks = trucksData?.response || [];
  const drivers = driversData?.response || [];

   return (
    <div className="form-container space-y-6">

      {/* SELECT DE CAMION */}
      <div className="form-group">
        <label className="form-label">
          Seleccionar Camión <span className="required">*</span>
        </label>

        <div className="flex gap-2 items-center">
          
          <select
            className={`form-input ${
              errors?.truck_id ? "form-input-error" : "form-input-normal"
            }`}
            {...register("truck_id", { required: "Debes seleccionar un camión" })}
          >
            <option value="">Seleccione...</option>
            {loadingTrucks ? (
              <option>Cargando...</option>
            ) : (
              trucks.map(t => (
                <option key={t.id} value={t.id}>
                  {t.plate} - {t.carrier}
                </option>
              ))
            )}
          </select>

          <button
            type="button"
            onClick={() => setTruckModalOpen(true)}
            className=" hover:bg-gray-300 rounded-lg p-2"
          >
            <Plus className="text-orange-500 w-8 h-8" strokeWidth={2.5} />
          </button>
        </div>

        {errors?.truck_id && (
          <ErrorMessage>{errors.truck_id.message}</ErrorMessage>
        )}
      </div>

      {/* SELECT DE PILOTO */}
      <div className="form-group">
        <label className="form-label">
          Seleccionar Piloto <span className="required">*</span>
        </label>

        <div className="flex gap-2 items-center">

          <select
            className={`form-input ${
              errors?.driver_id ? "form-input-error" : "form-input-normal"
            }`}
            {...register("driver_id", { required: "Debes seleccionar un piloto" })}
          >
            <option value="">Seleccione...</option>
            {loadingDrivers ? (
              <option>Cargando...</option>
            ) : (
              drivers.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))
            )}
          </select>

          <button
            type="button"
            onClick={() => setDriverModalOpen(true)}
            className=" hover:bg-gray-300 rounded-lg p-2"
          >
            <Plus className="text-orange-500 w-8 h-8" strokeWidth={2.5} />
          </button>
        </div>

        {errors?.driver_id && (
          <ErrorMessage>{errors.driver_id.message}</ErrorMessage>
        )}
      </div>

      {/* MODALES */}
      <TruckModalCreate
        isOpen={truckModalOpen}
        onClose={() => setTruckModalOpen(false)}
        onCreated={refetchTrucks}
      />

      <DriverModalCreate
        isOpen={driverModalOpen}
        onClose={() => setDriverModalOpen(false)}
        onCreated={refetchDrivers}
      />
    </div>
  );
}
