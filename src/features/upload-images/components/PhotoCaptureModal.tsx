import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/shared/components/button";

export type BuildImagePayload<T extends boolean> =
  T extends true
    ? { image: string; type: string; description: string }
    : { image: string; type: string };

type Props<T extends boolean> = {
  onClose: () => void;
  onSave: (img: BuildImagePayload<T>) => void;
  showDescription?: T;
};
const IMAGE_LABELS = {
  CONTAINER_PICTURES: "IMÁGENES DEL CONTENEDOR",
  CONTAINER_LOAD: "CARGA DEL CONTENEDOR",
  PRODUCTS: "PRODUCTOS",
  LOADING_TEMPERATURE: "TEMPERATURA DE CARGA",
  FINAL_CONTAINER: "CONTENEDOR FINAL",
  DRIVER_IDENTIFICATION: "IDENTIFICACIÓN DEL CONDUCTOR",
} as const;


const IMAGE_TYPES = [
  "CONTAINER_PICTURES",
  "CONTAINER_LOAD",
  "PRODUCTS",
  "LOADING_TEMPERATURE",
  "FINAL_CONTAINER",
  "DRIVER_IDENTIFICATION",
] as const;

const DESCRIPTION_OPTIONS = [
  { value: "INCOMING", label: "Entrada" },
  { value: "CEILING", label: "Techo" },
  { value: "CARRIER", label: "Transportista" },
  { value: "RIGHT SIDE", label: "Lado derecho" },
  { value: "INSIDE", label: "Interior" },
  { value: "FLOOR", label: "Piso" },
  { value: "LICENCE PLATE No.", label: "Placa" },
  { value: "DRIVER ID", label: "Identificación del conductor" },
] as const;

export default function PhotoCaptureModal<T extends boolean>({
  onClose,
  onSave,
  showDescription = true as T,
}: Props<T>) {
  const webcamRef = useRef<Webcam>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [type, setType] = useState<string>(IMAGE_TYPES[0]);
  const [description, setDescription] = useState("");
  const [cameraActive, setCameraActive] = useState(true);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPreview(imageSrc);
      setCameraActive(false);
    }
  }, []);

  const handleSave = () => {
    if (!preview) {
      alert("Error: No se ha tomado la foto");
      return;
    }

    if (!type) {
      alert("Debes seleccionar el tipo antes de guardar");
      return;
    }

    const result = {
      image: preview,
      type: type.replace(/_/g, " "), //this delete the _ on the imagen types we send to the backend 
      ...(showDescription ? { description } : {}),
    } as BuildImagePayload<T>;

    onSave(result);
  };

  const handleRetake = () => {
    setPreview(null);
    setCameraActive(true);
  };

return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Tomar Foto</h2>

        {cameraActive && !preview && (
          <div className="flex flex-col items-center space-y-4">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              className="w-full rounded-lg"
            />
            <div className="flex gap-3">
              <Button onClick={capture}>📸 Tomar Foto</Button>
              <Button variant="outline" onClick={onClose}>Cancelar</Button>
            </div>
          </div>
        )}

        {preview && (
          <div className="space-y-3">
            <img src={preview} className="w-full rounded-lg" />

            <div>
              <label className="font-medium mb-1 block">Tipo de imagen</label>
              <select
                className="w-full border p-2 rounded-md"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {IMAGE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {IMAGE_LABELS[t]}
                  </option>
                ))}
              </select>
            </div>

            {/* 🌟 NUEVO SELECT DE DESCRIPCIÓN */}
            {showDescription && (
              <div>
                <label className="font-medium mb-1 block">Descripción</label>
                <select
                  className="w-full border p-2 rounded-md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                >
                  {/* Opción para NO seleccionar descripción */}
                  <option value="">-- Sin descripción --</option>

                  {DESCRIPTION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handleRetake}>
                🔄 Retomar
              </Button>
              <Button onClick={handleSave}>💾 Guardar</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
