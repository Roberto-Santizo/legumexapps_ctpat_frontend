import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { toast } from "react-toastify";

import PhotoCaptureModal, { type BuildImagePayload } from "@/features/upload-images/components/PhotoCaptureModal";
import { getCtpatByIdAPI, uploadImagesAPI } from "@/features/ctpats/api/CtpatsAPI";
import { Button } from "@/shared/components/button";
import type {uploadImagesFormData} from "@/features/ctpats/schemas/types"

export default function UploadAdditionalImagesView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const ctpatId = Number(id);
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState<BuildImagePayload<true>[]>([]);

  // Cargar datos del CTPAT para mostrar información
  const {
    data: ctpatData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ctpat", ctpatId],
    queryFn: () => getCtpatByIdAPI(ctpatId),
    enabled: !!ctpatId,
  });

  // Mutación para subir imágenes
  const uploadMutation = useMutation({
    mutationFn: (payload: { images: Array<{ image: string; type: string; description?: string }> }) =>
      uploadImagesAPI(ctpatId, payload),
    onSuccess: async () => {
      toast.success("Imágenes adicionales agregadas correctamente");
      await queryClient.invalidateQueries({ queryKey: ["ctpat", ctpatId] });
      setImages([]);
      // Regresar al documento
      navigate(`/ctpats/document/${ctpatId}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al subir imágenes");
    },
  });

  const handleAddImage = (newImage: BuildImagePayload<true>) => {
    setImages((prev) => [...prev, newImage]);
    setShowModal(false);
    toast.success("Foto agregada. No olvides guardar los cambios.");
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    toast.info("Imagen eliminada de la lista");
  };

  const handleSaveImages = () => {
    if (images.length === 0) {
      toast.error("Debes agregar al menos una imagen");
      return;
    }

    const payload: uploadImagesFormData = {
      images: images.map((img) => ({
        image: img.image,
        type: img.type,

        description: img.description || "",
      })),
    };

    uploadMutation.mutate(payload);
  };

  const handleGoBack = () => {
    if (images.length > 0) {
      const confirmed = confirm(
        "Tienes imágenes sin guardar. ¿Estás seguro de que deseas salir?"
      );
      if (!confirmed) return;
    }
    navigate(`/ctpats/document/${ctpatId}`);
  };

  // Estados de carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del CTPAT...</p>
        </div>
      </div>
    );
  }

  if (isError || !ctpatData) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-800 font-semibold mb-4">
              Error al cargar el CTPAT
            </p>
            <Link
              to="/ctpats"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-300"
            >
              <ArrowLeft size={20} />
              Regresar a CTpats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const ctpat = ctpatData.response;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Agregar Imágenes Adicionales
            </h1>
            <p className="text-gray-600">
              CTPAT ID: {ctpatId} - {ctpat.destination}
            </p>
            <p className="text-sm text-gray-500">
              Contenedor: {ctpat.container}
            </p>
          </div>

          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-200 border border-[var(--color-border-light)]"
          >
            <ArrowLeft size={20} />
            Volver al Documento
          </button>
        </div>

        {/* Contenido */}
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 Nota:</strong> Las imágenes que agregues aquí se incluirán
              en el documento del CTPAT. Puedes agregar imágenes adicionales de
              cualquier tipo (contenedor, productos, temperatura, etc.).
            </p>
          </div>

          {/* Botón para agregar */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Imágenes a Agregar</h2>
              <Button
                type="button"
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2"
              >
                <ImagePlus size={18} />
                Tomar/Subir Foto
              </Button>
            </div>

            {/* Lista de imágenes */}
            {images.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8">
                No has agregado imágenes aún. Haz clic en "Tomar/Subir Foto" para comenzar.
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={img.image}
                    alt={img.description}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2 text-xs bg-gray-50">
                    <p className="font-semibold truncate">
                      <strong>Tipo:</strong> {img.type}
                    </p>
                    {img.description && (
                      <p className="text-gray-600 truncate">
                        <strong>Desc:</strong> {img.description}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs hover:bg-red-700 transition-colors shadow-md"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Botones de acción */}
            {images.length > 0 && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setImages([])}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Limpiar Todo
                </button>
                <button
                  onClick={handleSaveImages}
                  disabled={uploadMutation.isPending}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadMutation.isPending ? "Guardando..." : `Guardar ${images.length} Imagen${images.length > 1 ? 'es' : ''}`}
                </button>
              </div>
            )}
          </div>

          {/* Warning Card */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Importante:</strong> Una vez guardadas, las imágenes se
              agregarán permanentemente al CTPAT. Asegúrate de revisar todas las
              imágenes antes de guardar.
            </p>
          </div>
        </div>

        {/* Modal */}
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