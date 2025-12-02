import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getCarriersAPI } from "@/features/carriers/api/CarriersAPI";
import type { TruckCreateData } from "@/features/trucks/schemas/types";
import DriverCaptureModal from "@/features/upload-images/components/PhothoDriverCaptureModal";

type TruckFormProps = {
  showCarrierField?: boolean;
  showPhotoFields?: boolean; 
};

export default function CreateTruckForm({
  showCarrierField = true,
  showPhotoFields = true,
}: TruckFormProps) {
  const { register, setValue, formState: { errors } } = useFormContext<TruckCreateData>();

  const [plateImage, setPlateImage] = useState<string | null>(null);
  const [openCamera, setOpenCamera] = useState(false);

  const [carriers, setCarriers] = useState<{ id: number; name: string }[]>([]);
  const [loadingCarriers, setLoadingCarriers] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { response } = await getCarriersAPI();
        setCarriers(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error cargando transportistas", error);
      } finally {
        setLoadingCarriers(false);
      }
    })();
  }, []);

  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="plate" className="form-label">
          Placa <span className="required">*</span>
        </label>
        <input
          id="plate"
          type="text"
          placeholder="ABC123"
          className={`form-input ${errors?.plate ? "form-input-error" : "form-input-normal"}`}
          {...register("plate", { required: "La placa es obligatoria" })}
        />
        {errors?.plate && <ErrorMessage>{errors.plate.message}</ErrorMessage>}
      </div>

      {showCarrierField && (
        <div className="form-group mt-6">
          <label htmlFor="carrier_id" className="form-label">
            Transportista <span className="required">*</span>
          </label>
          <select
            id="carrier_id"
            className={`form-input ${errors.carrier_id ? "form-input-error" : "form-input-normal"}`}
            {...register("carrier_id", { required: "El transportista es obligatorio" })}
            disabled={loadingCarriers}
          >
            <option value="">Seleccione un transportista</option>
            {carriers.map((carrier) => (
              <option key={carrier.id} value={carrier.id}>{carrier.name}</option>
            ))}
          </select>

          {errors.carrier_id && <ErrorMessage>{errors.carrier_id.message}</ErrorMessage>}
        </div>
      )}

      {showPhotoFields && (
        <div className="form-group mt-6">
          <label className="form-label font-bold">Foto de la placa</label>

          {plateImage ? (
            <img src={plateImage} className="h-40 w-40 rounded-lg border mb-2 shadow" />
          ) : (
            <div className="h-40 w-40 border rounded-lg flex items-center justify-center text-gray-400">
              Sin foto
            </div>
          )}

          <button
            type="button"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setOpenCamera(true)}
          >
            Tomar foto de placa
          </button>

          <input type="hidden" {...register("plate_image")} />

          {errors.plate_image && <ErrorMessage>{errors.plate_image.message}</ErrorMessage>}
        </div>
      )}

      {openCamera && (
        <DriverCaptureModal
          onClose={() => setOpenCamera(false)}
          onSave={(imgBase64) => {
            setPlateImage(imgBase64);
            setValue("plate_image", imgBase64, { shouldValidate: true });
            setOpenCamera(false);
          }}
        />
      )}
    </div>
  );
}
