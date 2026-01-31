import { useState } from "react";
import Swal from "sweetalert2";

import PackingListDetailPage from "@/features/packing-List/components/PackingListDetailPage";
import PhotoCaptureModal, { type BuildImagePayload } from "@/features/upload-images/components/PhotoCaptureModal";
import { uploadImagesAPI } from "@/features/ctpats/api/CtpatsAPI";
import { ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/shared/components/button";

type Props = {
  ctpatId: number;
  onContinue: () => void;
};

export default function PackingListReviewStep({
  ctpatId,
  onContinue,
}: Props) {
  const [showImages, setShowImages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState<BuildImagePayload<true>[]>([]);
  const [isSaving, setIsSaving] = useState(false);

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
      setIsSaving(true);
      const payload = {
        images: images.map((img) => ({
          image: img.image,
          type: img.type,
        })),
      };

      await uploadImagesAPI(ctpatId, payload);
      toast.success("Imágenes guardadas correctamente");
      setImages([]);
      setShowImages(false);
    } catch {
      toast.error("Error al guardar las imágenes");
    } finally {
      setIsSaving(false);
    }
  };

  // Esta función maneja la alerta Y luego llama a onContinue
  const handleContinueWithConfirmation = async () => {
    const result = await Swal.fire({
      title: "¿Deseas continuar con el checklist?",
      html: `
        <p class="text-sm text-gray-600">
          Al avanzar al siguiente paso, el checklist quedará <b>bloqueado</b> y ya
          no podrás regresar para realizar cambios.
        </p>
        <p class="mt-2 text-sm text-gray-600">
          Verifica que toda la información esté completa y correcta antes de continuar.
        </p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#ef4444",
      background: "#f9fafb",
      iconColor: "#f59e0b",
      customClass: {
        popup: "rounded-xl",
        title: "text-lg font-semibold",
      },
    });

    if (result.isConfirmed) {
      onContinue();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            Packing List de Congelados
          </h1>
          <p className="text-gray-600">
            Agrega, edita o elimina items del packing list antes de continuar al checklist
          </p>
        </div>

        {/* Botón para subir imágenes */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowImages(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-sky-300 hover:bg-sky-50 text-sky-700 font-medium transition-colors"
          >
            <ImagePlus size={18} />
            Subir imágenes
          </button>
        </div>

        {/* Paso 3 - IMPORTANTE: pasar handleContinueWithConfirmation */}
        <PackingListDetailPage
          ctpatId={ctpatId}
          onContinue={handleContinueWithConfirmation}
        />

        {/* Modal / Drawer */}
        {showImages && (
          <div
            className="fixed inset-0 bg-black/40 flex justify-end z-50"
            onClick={() => !isSaving && setShowImages(false)}
          >
            <div
              className="bg-white w-full max-w-lg p-6 shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Imágenes del Packing List
                </h2>
                <button
                  onClick={() => setShowImages(false)}
                  disabled={isSaving}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setShowModal(true)} disabled={isSaving}>
                    Tomar Foto
                  </Button>
                </div>

                {images.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No se han agregado fotos aún.
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4">
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
                        disabled={isSaving}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {images.length > 0 && (
                  <Button
                    className="w-full"
                    onClick={handleSaveImages}
                    disabled={isSaving}
                  >
                    {isSaving ? "Guardando..." : "Guardar Imágenes"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <PhotoCaptureModal<true>
            onClose={() => setShowModal(false)}
            onSave={handleAddImage}
            showDescription={true}
          />
        )}
      </div>
    </div>
  );
}
