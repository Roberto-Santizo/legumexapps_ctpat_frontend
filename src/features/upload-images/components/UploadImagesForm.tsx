// /components/forms/UploadImagesForm.tsx
import { useState } from "react";
import { Button } from "@/shared/components/button";
import PhotoCaptureModal from "@/features/upload-images/components/PhotoCaptureModal";
import type { uploadImagesFormData } from "@/features/ctpats/schemas/types";
import { toast } from "react-toastify";

type Props = {
  onSubmit: (data: uploadImagesFormData) => void;
};

export default function UploadImagesForm({ onSubmit }: Props) {
  const [images, setImages] = useState<{ image: string; type: string }[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddImage = (img: { image: string; type: string }) => {
    setImages((prev) => [...prev, img]);
    setShowModal(false);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      toast.error("Debes agregar al menos una imagen");
      return;
    }

    const formatted: uploadImagesFormData = {
      images: images.map((img) => ({
        image: img.image,

        type: img.type,
      })),
    };
    onSubmit(formatted);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Subir Fotografías</h3>
        <Button onClick={() => setShowModal(true)}>📸 Tomar Foto</Button>
      </div>

      {images.length === 0 && (
        <p className="text-sm text-gray-500">No hay imágenes aún.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative border rounded-lg overflow-hidden">
            <img src={img.image} className="w-full h-32 object-cover" />
            <div className="p-2 text-xs bg-gray-50">
              <p><strong>Tipo:</strong> {img.type}</p>
            </div>
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit} className="w-full">Enviar</Button>

      {showModal && (
        <PhotoCaptureModal
          onClose={() => setShowModal(false)}
          onSave={handleAddImage} 
          showDescription={false}
        />
      )}
    </div>
  );
}
