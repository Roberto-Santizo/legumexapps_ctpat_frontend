import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { getCarrierSelectAPI } from "@/features/carriers/api/CarriersAPI";
import type { DriverFormData } from "@/features/drivers/schemas/types";
import DriverCaptureModal from "@/features/upload-images/components/PhothoDriverCaptureModal";
import { toUpper } from "@/shared/helpers/textTransformUppercase";
import Select from "react-select";
import { searchableSelectStyles, getSelectClassNames } from "@/shared/components/SearchableSelect/searchableSelectStyles";

type DriverFormProps = {
  showCarrierField?: boolean;
  showPhotoFields?: boolean; 
};

export default function DriverForm({ showCarrierField = true, showPhotoFields = true}: DriverFormProps) {
  const { register, setValue, control, formState: { errors } } = useFormContext<DriverFormData>();

  const [dpiImage, setDpiImage] = useState<string | null>(null);
  const [licenseImage, setLicenseImage] = useState<string | null>(null);

  const [photoType, setPhotoType] = useState<"dpi" | "license" | null>(null);
  const [openCamera, setOpenCamera] = useState(false);

  const [carrierOptions, setCarrierOptions] = useState<{ value: string; label: string }[]>([]);
  const [loadingCarriers, setLoadingCarriers] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { response } = await getCarrierSelectAPI();
        const options = Array.isArray(response)
          ? response.map((carrier) => ({ value: String(carrier.id), label: carrier.name }))
          : [];
        setCarrierOptions(options);
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
        <label htmlFor="name" className="form-label">
          Nombre del Piloto <span className="required">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Marcos Lopez"
          className={`form-input ${errors?.name ? "form-input-error" : "form-input-normal"}`}
          {...register("name", {
            setValueAs: toUpper, 
            required: "El nombre es obligatorio" 
          })}
        />
        {errors?.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="form-group">
        <label htmlFor="identification" className="form-label">
          DPI <span className="required">*</span>
        </label>
        <input
          id="identification"
          type="text"
          placeholder="254885452414"
          className={`form-input ${errors?.identification ? "form-input-error" : "form-input-normal"}`}
          {...register("identification", { 
              required: "El número de DPI es obligatorio",
              pattern: {
                value: /^\d{13}$/,
                message: "El DPI no tiene un formato válido"
              }
          })}
        />
        {errors?.identification && <ErrorMessage>{errors.identification.message}</ErrorMessage>}
      </div>

      <div className="form-group">
        <label htmlFor="license" className="form-label">
          Licencia <span className="required">*</span>
        </label>
          <input
            id="license"
            type="text"
            placeholder="Licencia"
            className={`form-input ${errors?.license ? "form-input-error" : "form-input-normal"}`}
            {...register("license", { 
                required: "El número de licencia es obligatorio",
                pattern: {
                  value: /^(?:\d{6,14}|[A-Z]{1,2}-\d{6,8})$/,
                  message: "El número de licencia no tiene un formato válido"
                }
            })}
          />
        {errors?.license && <ErrorMessage>{errors.license.message}</ErrorMessage>}
      </div>

        {showPhotoFields && (
          <div className="form-group">
            <label className="form-label font-bold">Fotografía DPI</label>

            {dpiImage ? (
              <img src={dpiImage} className="h-40 w-40 rounded-lg border mb-2 shadow" />
            ) : (
              <div className="h-40 w-40 border rounded-lg flex items-center justify-center text-gray-400">
                Sin foto
              </div>
            )}

            <button
              type="button"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setPhotoType("dpi");
                setOpenCamera(true);
              }}
            >
              Tomar foto DPI
            </button>

            <input type="hidden" {...register("identification_image")} />
            {errors.identification_image && <ErrorMessage>{errors.identification_image.message}</ErrorMessage>}
          </div>
        )}

        {showPhotoFields && (
          <div className="form-group mt-6">
            <label className="form-label font-bold">Fotografía Licencia <span className="required">*</span></label>

            {licenseImage ? (
              <img src={licenseImage} className="h-40 w-40 rounded-lg border mb-2 shadow" />
            ) : (
              <div className="h-40 w-40 border rounded-lg flex items-center justify-center text-gray-400">
                Sin foto
              </div>
            )}

            <button
              type="button"
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setPhotoType("license");
                setOpenCamera(true);
              }}
            >
              Tomar foto Licencia
            </button>

            <input type="hidden" {...register("license_image",{
              required: "La fotografía de la licencia es obligatoria",
            })} />
            {errors.license_image && <ErrorMessage>{errors.license_image.message}</ErrorMessage>}
          </div>
        )}

      {openCamera && (
        <DriverCaptureModal
          onClose={() => setOpenCamera(false)}
          onSave={(imgBase64) => {
            if (photoType === "dpi") {
              setDpiImage(imgBase64);
              setValue("identification_image", imgBase64, { shouldValidate: true });
            }

            if (photoType === "license") {
              setLicenseImage(imgBase64);
              setValue("license_image", imgBase64, { shouldValidate: true });
            }

            setOpenCamera(false);
            setPhotoType(null);
          }}
        />
      )}

      {showCarrierField && (
        <div className="form-group mt-6">
          <label htmlFor="carrier_id" className="form-label">
            Transportista <span className="required">*</span>
          </label>

          <Controller
            name="carrier_id"
            control={control}
            rules={{ required: "El transportista es obligatorio" }}
            render={({ field }) => (
              <Select<{ value: string; label: string }>
                {...field}
                options={carrierOptions}
                placeholder="Escribe para buscar transportista..."
                isClearable
                isSearchable
                isLoading={loadingCarriers}
                noOptionsMessage={() => "No se encontraron transportistas"}
                value={carrierOptions.find((opt) => opt.value === String(field.value)) || null}
                onChange={(selected) => field.onChange(selected?.value ?? "")}
                classNames={getSelectClassNames(!!errors?.carrier_id)}
                styles={searchableSelectStyles}
              />
            )}
          />

          {errors.carrier_id && <ErrorMessage>{errors.carrier_id.message}</ErrorMessage>}
        </div>
      )}

    </div>
  );
}
