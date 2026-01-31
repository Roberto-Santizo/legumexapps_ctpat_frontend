import { useEffect, useState } from "react";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { getContainerAPI } from "@/features/containers/api/ContainerAPI";
import { Button } from "@/shared/components/button";
import PhotoCaptureModal, {type BuildImagePayload} from "@/features/upload-images/components/PhotoCaptureModal";
import type {UseFormRegister,FieldErrors,UseFormSetValue,UseFormWatch,} from "react-hook-form";
import type { CreateCtpatFormData } from "@/features/ctpats/schemas/types";
import { toast } from "react-toastify";
import { toUpper } from "@/shared/helpers/textTransformUppercase";

type CtpatFormProps = {
  register: UseFormRegister<CreateCtpatFormData>;
  setValue: UseFormSetValue<CreateCtpatFormData>;
  watch: UseFormWatch<CreateCtpatFormData>;
  errors?: FieldErrors<CreateCtpatFormData>;
};

export default function CtpatForm({
  register,
  errors,
  setValue,
  watch,
}: CtpatFormProps) {
  const [containers, setContainers] = useState<
    { id: number; container: string }[]
  >([]);
  const [loadingContainers, setLoadingContainers] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);

  const images = watch("images") || [];

  // Cargar contenedores
  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const { response } = await getContainerAPI();
        setContainers(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingContainers(false);
      }
    };
    fetchContainers();
  }, []);

  // Validar campo images
  useEffect(() => {
    register("images", {
      validate: (value) => {
        if (!value || value.length === 0) {
          toast.error("Debes agregar al menos una foto del contenedor");
          return false;
        }
        return true;
      },
    });
  }, [register]);

  const handleAddImage = (newImage: BuildImagePayload<true>) => {

    setValue("images", [...images, newImage], { shouldValidate: true });

    setShowModal(false);
    toast.success("Foto agregada correctamente");
  };

  const handleRemoveImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);

    setValue("images", updated, { shouldValidate: true });
  };

  return (
    <div className="form-container space-y-6">
      {/* Type of product */}
      <div className="form-group">
        <label htmlFor="type" className="form-label">
          Seleccione el tipo de producto <span className="required">*</span>
        </label>

        <select
          id="type"
          className={`form-input ${
            errors?.type ? "form-input-error" : "form-input-normal"
          }`}
          {...register("type", {
            valueAsNumber: true, 
            required: "El tipo de producto es obligatorio",
          })}
          defaultValue=""
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value={1}>Congelado</option>
          <option value={2}>Jugo/Fresco</option>
        </select>

        {errors?.type && (
          <ErrorMessage>{errors.type.message}</ErrorMessage>
        )}
      </div>


      {/* DESTINATION */}
      <div className="form-group">
        <label htmlFor="destination" className="form-label">
          Destino <span className="required">*</span>
        </label>
        <input
          id="destination"
          type="text"
          placeholder="DESTINO"
          className={`form-input ${
            errors?.destination ? "form-input-error" : "form-input-normal"
          }`}
          {...register("destination", {
            setValueAs: toUpper,
            required: "El destino es obligatorio" 
          })}
        />
        {errors?.destination && (
          <ErrorMessage>{errors.destination.message}</ErrorMessage>
        )}
      </div>

      {/* CONTAINER */}
      <div className="form-group">
        <label htmlFor="container_id" className="form-label">
          Contenedor (Número) <span className="required">*</span>
        </label>
        <select
          id="container_id"
          className={`form-input ${
            errors?.container_id ? "form-input-error" : "form-input-normal"
          }`}
          {...register("container_id", {
            required: "El contenedor es obligatorio",
          })}
          disabled={loadingContainers}
        >
          <option value="0">Selecciona un contenedor</option>

          {containers.map((container) => (
            <option key={container.id} value={container.id}>
              {container.container}
            </option>
          ))}
        </select>

        {errors?.container_id && (
          <ErrorMessage>{errors.container_id.message}</ErrorMessage>
        )}
      </div>

      {/* DEPARTURE SITE */}
      <div className="form-group">
        <label htmlFor="departure_site" className="form-label">
          Sitio de salida <span className="required">*</span>
        </label>

        <select
          id="departure_site"
          className={`form-input ${
            errors?.departure_site ? "form-input-error" : "form-input-normal"
          }`}
          {...register("departure_site", {
            required: "El sitio de salida es obligatorio",
          })}
        >
          <option value="">Seleccione una opción</option>
          <option value="AGROINDUSTRIAS LEGUMEX.S.A. EL TEJAR,CHIMALTENANGO">AGROINDUSTRIAS LEGUMEX.S.A. EL TEJAR,CHIMALTENANGO</option>
          <option value="AGROINDUSTRIAS LEGUMEX.S.A. PARRAMOS,CHIMALTENANGO">AGROINDUSTRIAS LEGUMEX.S.A. PARRAMOS,CHIMALTENANGO</option>
        </select>

        {errors?.departure_site && (
          <ErrorMessage>{errors.departure_site.message}</ErrorMessage>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="planta" className="form-label">
          Planta <span className="required">*</span>
        </label>

        <select
          id="planta"
          className={`form-input ${
            errors?.planta ? "form-input-error" : "form-input-normal"
          }`}
          {...register("planta", {
            required: "La planta es obligatoria",
          })}
        >
          <option value="">Seleccione una planta</option>
          <option value="1">Tejar</option>
          <option value="2">Párramos</option>
        </select>

        {errors?.planta && (
          <ErrorMessage>{errors.planta.message}</ErrorMessage>
        )}
      </div>

      {/* IMÁGENES */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Fotos del Contenedor</h3>

          <Button type="button" onClick={() => setShowModal(true)}>
            Tomar Foto
          </Button>
        </div>

        {images.length === 0 && (
          <p className="text-sm text-gray-500">No se han agregado fotos aún.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative border rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={img.image}
                alt={img.description}
                className="w-full h-32 object-cover"
              />
              <div className="p-2 text-xs bg-gray-50">
                <p>
                  <strong>Tipo:</strong> {img.type}
                </p>
                <p>
                  <strong>Desc:</strong> {img.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs hover:bg-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <PhotoCaptureModal<true>
          onClose={() => setShowModal(false)}
          onSave={handleAddImage}
          showDescription={true} 
        />
      )}
    </div>
  );
}
