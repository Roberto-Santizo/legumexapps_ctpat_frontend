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

export default function CtpatImages({ images }: { images: CtpatImage[] }) {
  const BASE_URL = import.meta.env.VITE_IMAGES_BACKEND_URL;

  return (
    <div className="text-xs mt-10">
      {IMAGE_TYPES.map((type) => {
        const filtered = images.filter((img) => img.type === type);
        if (filtered.length === 0) return null;

        return (
          <div key={type} className="mb-10 break-inside-avoid">
            
            <h2 className="text-center font-bold bg-gray-200 py-1 mb-4">
              {IMAGE_LABELS[type]}
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {filtered.map((img) => {
                const url = `${BASE_URL}/${img.image}`;

                return (
                  <div key={img.id} className="flex flex-col items-center">
                    <img
                      src={url}
                      className="w-full h-40 object-cover border"
                    />

                    {img.description && img.description.trim() !== "" && (
                      <p className="text-center mt-1 text-[10px] italic">
                        {img.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
