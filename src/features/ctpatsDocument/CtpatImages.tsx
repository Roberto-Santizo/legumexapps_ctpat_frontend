import { useState } from "react";
import type { CtpatImage } from "@/features/ctpats/schemas/typeDocument";

// Tipos de imagen en el orden obligatorio
const IMAGE_TYPES = [
  "CONTAINER PICTURES",
  "CONTAINER LOAD",
  "PRODUCTS",
  "LOADING TEMPERATURE",
  "FINAL CONTAINER",
  "DRIVER IDENTIFICATION",
] as const;

// Etiquetas para título de sección
const IMAGE_LABELS: Record<string, string> = {
  "CONTAINER PICTURES": "Container Pictures",
  "CONTAINER LOAD": "Container Load",
  "PRODUCTS": "Products",
  "LOADING TEMPERATURE": "Loading Temperature",
  "FINAL CONTAINER": "Final Container",
  "DRIVER IDENTIFICATION": "Driver Identification",
};

interface CtpatImagesProps {
  images: CtpatImage[];
  truck?: {
    plate: string;
    plate_image: string;
  };
  driver?: {
    license: string;
    license_image: string;
  };
  status?: number;
  onDeleteImage?: (imageId: number) => Promise<void>;
}

export default function CtpatImages({ images, truck, driver, status, onDeleteImage }: CtpatImagesProps) {
  const BASE_URL = import.meta.env.VITE_IMAGES_BACKEND_URL;
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Solo permitir eliminar si el CTPAT no está cerrado (status !== 7)
  const canDelete = status !== 7 && onDeleteImage;

  const handleDelete = async (imageId: number) => {
    if (!onDeleteImage) return;
    setDeletingId(imageId);
    try {
      await onDeleteImage(imageId);
    } finally {
      setDeletingId(null);
    }
  };

  // Verificar si hay imágenes
  const hasImages = images && images.length > 0;

  return (
    <div className="text-xs mt-10">
      {!hasImages && (
        <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300">
          <p className="font-medium">Imágenes pendientes</p>
          <p className="text-[10px]">Aún no se han cargado imágenes del contenedor</p>
        </div>
      )}

      {IMAGE_TYPES.map((type) => {
        const filtered = images.filter((img) => img.type === type);

        // Para FINAL CONTAINER, verificar si hay imágenes normales O imágenes de truck/driver
        const hasTruckOrDriverImages = type === "FINAL CONTAINER" && (truck?.plate_image || driver?.license_image);

        if (filtered.length === 0 && !hasTruckOrDriverImages) return null;

        return (
          <div key={type} className="mb-10 break-inside-avoid">

            <h2 className="text-center font-bold bg-gray-200 py-1 mb-4">
              {IMAGE_LABELS[type]}
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {filtered.map((img) => {
                const url = `${BASE_URL}/${img.image}`;

                return (
                  <div key={img.id} className="flex flex-col items-center relative">
                    <img
                      src={url}
                      className="w-full h-40 object-cover border"
                      alt={img.description ?? type}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const placeholder = target.nextElementSibling as HTMLElement | null;
                        if (placeholder) placeholder.style.display = "flex";
                      }}
                    />
                    <div
                      className="hidden w-full h-40 border bg-gray-100 items-center justify-center text-gray-400 text-xs"
                    >
                      No se pudo cargar
                    </div>

                    {/* Botón eliminar - solo si CTPAT no está cerrado */}
                    {canDelete && (
                      <button
                        type="button"
                        onClick={() => handleDelete(img.id)}
                        disabled={deletingId === img.id}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed print:hidden"
                      >
                        {deletingId === img.id ? "..." : "×"}
                      </button>
                    )}

                    {img.description && img.description.trim() !== "" && (
                      <p className="text-center mt-1 text-[10px] italic">
                        {img.description}
                      </p>
                    )}
                  </div>
                );
              })}

              {/* Mostrar imágenes de placa y licencia en FINAL CONTAINER */}
              {type === "FINAL CONTAINER" && truck?.plate_image && (
                <div className="flex flex-col items-center">
                  <img
                    src={`${BASE_URL}/${truck.plate_image}`}
                    className="w-full h-40 object-cover border"
                    alt="Licence Plate"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const p = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (p) p.style.display = "flex";
                    }}
                  />
                  <div className="hidden w-full h-40 border bg-gray-100 items-center justify-center text-gray-400 text-xs">
                    No se pudo cargar
                  </div>
                  <p className="text-center mt-1 text-[10px] italic">
                    LICENCE PLATE No. {truck.plate}
                  </p>
                </div>
              )}

              {type === "FINAL CONTAINER" && driver?.license_image && (
                <div className="flex flex-col items-center">
                  <img
                    src={`${BASE_URL}/${driver.license_image}`}
                    className="w-full h-40 object-cover border"
                    alt="Driver ID"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const p = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (p) p.style.display = "flex";
                    }}
                  />
                  <div className="hidden w-full h-40 border bg-gray-100 items-center justify-center text-gray-400 text-xs">
                    No se pudo cargar
                  </div>
                  <p className="text-center mt-1 text-[10px] italic">
                    DRIVER ID {driver.license}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
