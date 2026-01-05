import { useState } from "react";
import { Button } from "@/shared/components/button";
import PhotoCaptureModal, {type BuildImagePayload,} from "@/features/upload-images/components/PhotoCaptureModal";
import { uploadImagesAPI } from "@/features/ctpats/api/CtpatsAPI";
import { useUpdateCtpatStatus } from "@/features/ctpats/hooks/useUpdateCtpatStatus";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


type Props = {
  ctpatId: number;
};

export default function FinalContainerImages({ ctpatId }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState<BuildImagePayload<true>[]>([]);
  const updateStatus = useUpdateCtpatStatus();
  const navigate = useNavigate();


  const handleAddImage = (newImage: BuildImagePayload<true>) => {
    setImages((prev) => [...prev, newImage]);
    setShowModal(false);
    toast.success("Foto agregada correctamente");
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveImages = async () => {
    if (images.length === 0) {
      toast.error("Debes agregar al menos una imagen");
      return;
    }

    try {
      const payload = {
        images: images.map((img) => ({
          image: img.image,
          type: img.type,
        })),
      };

      await uploadImagesAPI(ctpatId, payload);
      await updateStatus.mutateAsync({id: ctpatId,status: 6,});
      toast.success("Imágenes guardadas correctamente");
      navigate("/ctpats");
    } catch  {
      toast.error("Error al guardar las imágenes");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-center">
        Imágenes finales del contenedor
      </h2>

      <div className="flex justify-end">
        <Button type="button" onClick={() => setShowModal(true)}>
          Tomar Foto
        </Button>
      </div>

      {images.length === 0 && (
        <p className="text-sm text-gray-500 text-center">
          No se han agregado fotos aún.
        </p>
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
                <strong>Descripción:</strong> {img.description || "N/A"}
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

      <Button
        className="w-full"
        onClick={handleSaveImages}
        disabled={images.length === 0}
      >
        Guardar
      </Button>

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
