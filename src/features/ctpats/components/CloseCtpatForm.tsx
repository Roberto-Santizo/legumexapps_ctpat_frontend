import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CloseCtpatFormData } from "@/features/ctpats/schemas/typeSignatureSchema";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { getObservationsAPI } from "@/features/observations/api/ObservationsAPI";
import { useEffect, useState } from "react";
import type { ObservationList } from "@/features/observations/schemas/types";
import { toast } from "react-toastify";
import SignatureField from "@/shared/components/SignatureField";
import type { Control } from "react-hook-form";
import { toUpper } from "@/shared/helpers/textTransformUppercase";


type CloseCtpatFormProps = {
  control: Control<CloseCtpatFormData>;
  errors: FieldErrors<CloseCtpatFormData>;
  register: UseFormRegister<CloseCtpatFormData>;
};

export default function CloseCtpatForm({ control, errors, register }: CloseCtpatFormProps) {
  const [observations, setObservations] = useState<ObservationList[]>([]);
  const [loadingObservations, setLoadingObservations] = useState<boolean>(true);

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const { response } = await getObservationsAPI();
        setObservations(response);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error al cargar observaciones");
      } finally {
        setLoadingObservations(false);
      }
    };

    fetchObservations();
  }, []);

  return (
    <div className="form-container space-y-6">
      <div className="form-group">
          <label htmlFor="name" className="form-label">
            Temperatura de salida<span className="required">*</span>
          </label>
          <div className="input-icon-wrapper relative">
            <input
              id="exit_temp"
              type="number"
              placeholder="20"
              className={`form-input pl-10 ${
                errors.exit_temp ? "form-input-error" : "form-input-normal"
              }`}
              {...register("exit_temp", {
                required: "La temperatura de salida es obligatoria",
              })}
            />
              </div>
              {errors.exit_temp && (
                <ErrorMessage>{errors.exit_temp.message}</ErrorMessage>
              )}
        </div>
      <SignatureField<CloseCtpatFormData>
        name="signature_c"
        control={control}
        label="Firma control de calidad"
        errors={errors}
        rules={{ required: "La firma de control de calidad es obligatoria" }}
      />
      <SignatureField<CloseCtpatFormData>
        name="signature_e"
        control={control}
        label="Firma del encargado de embarques"
        errors={errors}
        rules={{ required: "La firma del encargado de embarques es obligatoria" }}
      />
        <div className="form-group">
          <label className="form-label text-lg font-semibold mb-2 block">
            Observaciones
          </label>

          {loadingObservations && <p>Cargando observaciones...</p>}

          {!loadingObservations && observations.length === 0 && (
            <p>No hay observaciones registradas.</p>
          )}

          <div className="space-y-4">
            {!loadingObservations &&
              observations.map((obs, index) => (
                <div
                  key={obs.id}
                  className="
                    flex flex-col sm:flex-row sm:items-start 
                    gap-4 p-4 
                    border rounded-xl shadow-sm 
                    bg-white hover:shadow-md transition
                  "
                >
                  <div className="sm:w-1/3">
                    <span className="font-medium text-gray-800">
                      {obs.name}
                    </span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Ingrese detalle (opcional)"
                      {...register(`observations.${index}.data`, {
                         setValueAs: toUpper,
                      } )}
                      className="
                        w-full form-input 
                        rounded-lg border-gray-300 
                        focus:ring-blue-500 focus:border-blue-500
                      "
                    />
                  </div>
                  <input
                    type="hidden"
                    value={obs.id}
                    {...register(`observations.${index}.observation_id`,
                    {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              ))}
          </div>
          {errors.observations && (
            <ErrorMessage>
              Debe proporcionar observaciones válidas
            </ErrorMessage>
          )}
        </div>
    </div>
  );
}
