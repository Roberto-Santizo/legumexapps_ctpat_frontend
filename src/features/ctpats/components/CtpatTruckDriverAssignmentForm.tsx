import { useQuery } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import Select from "react-select";

import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { searchableSelectStyles, getSelectClassNames } from "@/shared/components/SearchableSelect/searchableSelectStyles";
import { getTrucksForSelectAPI } from "../../trucks/api/TruckAPI";
import { getDriversForSelectAPI } from "@/features/drivers/api/DriversAPI";

import DriverModalCreate from "../../drivers/components/DriverModalCreate";
import TruckModalCreate from "../../trucks/components/TruckModalCreate";
import { useState } from "react";
import { Plus } from "lucide-react";

export type CreateCtpatAssignmentForm = {
  truck_id: number;
  driver_id: number;
};

type Props = {
  control: Control<CreateCtpatAssignmentForm>;
  errors: FieldErrors<CreateCtpatAssignmentForm>;
};

export default function CtpatTruckDriverAssignmentForm({ control, errors }: Props) {
  const [truckModalOpen, setTruckModalOpen] = useState(false);
  const [driverModalOpen, setDriverModalOpen] = useState(false);

  // --- OBTENER CAMIONES PARA SELECT ---
  const { data: trucks, isLoading: loadingTrucks, refetch: refetchTrucks } = useQuery({
    queryKey: ["trucks-select"],
    queryFn: getTrucksForSelectAPI,
  });

  // --- OBTENER PILOTOS PARA SELECT ---
  const { data: drivers, isLoading: loadingDrivers, refetch: refetchDrivers } = useQuery({
    queryKey: ["drivers-select"],
    queryFn: getDriversForSelectAPI,
  });

  // Opciones para el select de camiones
  const truckOptions = trucks?.map((t) => ({
    value: t.id,
    label: `${t.plate} - ${t.carrier}`,
  })) ?? [];

  // Opciones para el select de pilotos
  const driverOptions = drivers?.map((d) => ({
    value: d.id,
    label: d.name,
  })) ?? [];

  if (loadingTrucks || loadingDrivers) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="form-container space-y-6">
      {/* SELECT DE CAMION */}
      <div className="form-group">
        <label className="form-label">
          Seleccionar Camión <span className="required">*</span>
        </label>

        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <Controller
              name="truck_id"
              control={control}
              rules={{ required: "Debes seleccionar un camión", validate: (value) => value !== 0 || "Debes seleccionar un camión" }}
              render={({ field }) => (
                <Select<{ value: number; label: string }>
                  {...field}
                  options={truckOptions}
                  placeholder="Escribe para buscar camión..."
                  isClearable
                  isSearchable
                  noOptionsMessage={() => "No se encontraron camiones"}
                  value={truckOptions.find((opt) => opt.value === field.value) || null}
                  onChange={(selected) => field.onChange(selected?.value ?? 0)}
                  classNames={getSelectClassNames(!!errors?.truck_id)}
                  styles={searchableSelectStyles}
                />
              )}
            />
          </div>

          <button
            type="button"
            onClick={() => setTruckModalOpen(true)}
            className="hover:bg-gray-300 rounded-lg p-2"
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
          <div className="flex-1">
            <Controller
              name="driver_id"
              control={control}
              rules={{ required: "Debes seleccionar un piloto", validate: (value) => value !== 0 || "Debes seleccionar un piloto" }}
              render={({ field }) => (
                <Select<{ value: number; label: string }>
                  {...field}
                  options={driverOptions}
                  placeholder="Escribe para buscar piloto..."
                  isClearable
                  isSearchable
                  noOptionsMessage={() => "No se encontraron pilotos"}
                  value={driverOptions.find((opt) => opt.value === field.value) || null}
                  onChange={(selected) => field.onChange(selected?.value ?? 0)}
                  classNames={getSelectClassNames(!!errors?.driver_id)}
                  styles={searchableSelectStyles}
                />
              )}
            />
          </div>

          <button
            type="button"
            onClick={() => setDriverModalOpen(true)}
            className="hover:bg-gray-300 rounded-lg p-2"
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
