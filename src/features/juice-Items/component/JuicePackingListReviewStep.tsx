import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ImagePlus, CheckCircle } from "lucide-react";

import JuicePackingListDetailPage from "@/features/juice-Items/page/JuicePackingListDetailPage";
import PhotoCaptureModal, { type BuildImagePayload } from "@/features/upload-images/components/PhotoCaptureModal";
import { uploadImagesAPI } from "@/features/ctpats/api/CtpatsAPI";
import { getJuicePackingListAPI } from "@/features/juicePacking-List/api/JuicePacking-ListAPI";
import { Spinner } from "@/shared/components/Spinner";
import { toast } from "react-toastify";
import { Button } from "@/shared/components/button";

// Tipo para las imágenes de la sesión actual
interface SessionImage {
  id: string;
  image: string;
  type: string;
  description?: string;
}

type Props = {
  ctpatId: number;
  onContinue: () => void;
};

/**
 * Paso 2 para JUICE: Revisar y agregar items al packing list de jugos
 * Equivalente a PackingListReviewStep pero para jugos
 */
export default function JuicePackingListReviewStep({ ctpatId, onContinue }: Props) {
  const queryClient = useQueryClient();
  const [showImages, setShowImages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // Imágenes de la sesión actual (solo para mostrar en el modal)
  const [sessionImages, setSessionImages] = useState<SessionImage[]>([]);

  // Obtener el packing list de jugos por CTPAT ID
  const {
    data: juicePackingList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["juicePackingListByCtpat", ctpatId],
    queryFn: () => getJuicePackingListAPI(ctpatId),
    enabled: !!ctpatId,
  });

  // Guardar imagen inmediatamente al tomarla/elegirla
  const handleAddImage = async (newImage: BuildImagePayload<true>) => {
    setShowModal(false);
    setIsSaving(true);

    // Agregar a las imágenes de la sesión para mostrar en el modal
    const tempId = `temp-${Date.now()}`;
    const sessionImg: SessionImage = {
      id: tempId,
      image: newImage.image,
      type: newImage.type,
      description: newImage.description,
    };
    setSessionImages((prev) => [...prev, sessionImg]);

    try {
      const payload = {
        images: [{
          image: newImage.image,
          type: newImage.type,
          description: newImage.description,
        }],
      };

      await uploadImagesAPI(ctpatId, payload);
      // Invalidar query de imágenes para actualizar el documento CTPAT
      queryClient.invalidateQueries({ queryKey: ["ctpat-images", ctpatId] });
      toast.success("Imagen guardada correctamente");
    } catch {
      toast.error("Error al guardar la imagen");
      // Quitar la imagen de la sesión si falló
      setSessionImages((prev) => prev.filter((img) => img.id !== tempId));
    } finally {
      setIsSaving(false);
    }
  };

  // Cerrar modal y limpiar imágenes de la sesión
  const handleFinishImages = () => {
    setShowImages(false);
    setSessionImages([]);
  };

  const handleContinueWithConfirmation = async () => {
    const result = await Swal.fire({
      title: "¿Deseas continuar con el checklist?",
      html: `
        <p class="text-sm text-gray-600">
          Al avanzar al siguiente paso, el checklist quedará <b>bloqueado</b> y ya
          no podrás regresar para realizar cambios.
        </p>
        <p class="mt-2 text-sm text-gray-600">
          Verifica que toda la información del packing list de jugos esté completa y correcta antes de continuar.
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (isError || !juicePackingList) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <h3 className="text-red-800 font-semibold mb-4 flex items-center justify-center gap-2">
              Error: No se encontró el packing list de jugos
            </h3>
            <p className="text-gray-600 text-sm">
              Asegúrate de haber creado el packing list en el paso anterior.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            Packing List de Jugos
          </h1>
          <p className="text-gray-600">
            Agrega, edita o elimina items del packing list antes de continuar al checklist
          </p>
        </div>

        {/* Botón para subir imágenes */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowImages(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-300 hover:bg-amber-50 text-amber-700 font-medium transition-colors"
          >
            <ImagePlus size={18} />
            Subir imágenes
          </button>
        </div>

        {/* Detalle del packing list con botón de continuar */}
        {/* Pasar los datos directamente para evitar query duplicada */}
        <JuicePackingListDetailPage
          packingListData={juicePackingList}
          onContinue={handleContinueWithConfirmation}
          ctpatId={ctpatId}
        />

        {/* Modal para subir imágenes */}
        {showImages && (
          <div
            className="fixed inset-0 bg-black/40 flex justify-end z-50"
            onClick={() => !isSaving && handleFinishImages()}
          >
            <div
              className="bg-white w-full max-w-lg p-6 shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Subir Imágenes
                </h2>
                <button
                  onClick={handleFinishImages}
                  disabled={isSaving}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {sessionImages.length > 0
                      ? `${sessionImages.length} imagen(es) agregadas`
                      : "Toma fotos para agregar"}
                  </p>
                  <Button type="button" onClick={() => setShowModal(true)} disabled={isSaving}>
                    {isSaving ? "Guardando..." : "Tomar Foto"}
                  </Button>
                </div>

                {sessionImages.length === 0 && (
                  <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                    <ImagePlus size={40} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No hay fotos en esta sesión</p>
                    <p className="text-xs">Las fotos se guardan automáticamente</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {sessionImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative border rounded-lg overflow-hidden shadow-sm"
                    >
                      <img
                        src={img.image}
                        alt={img.description || img.type}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 text-xs bg-gray-50">
                        <p>
                          <strong>Tipo:</strong> {img.type}
                        </p>
                        {img.description && (
                          <p>
                            <strong>Descripción:</strong> {img.description}
                          </p>
                        )}
                      </div>
                      <div className="absolute top-1 right-1 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        <CheckCircle size={14} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botón Listo */}
                {sessionImages.length > 0 && (
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleFinishImages}
                    disabled={isSaving}
                  >
                    Listo
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
