import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/shared/components/button";

/* ======================================================
   TYPES
====================================================== */
export type BuildImagePayload<T extends boolean> =
  T extends true
    ? { image: string; type: string; description: string }
    : { image: string; type: string };

type Props<T extends boolean> = {
  onClose: () => void;
  onSave: (img: BuildImagePayload<T>) => void;
  showDescription?: T;
  isSaving?: boolean;
};

/* ======================================================
   CONSTANTS
====================================================== */
const IMAGE_LABELS = {
  CONTAINER_PICTURES: "IMÁGENES DEL CONTENEDOR",
  CONTAINER_LOAD: "CARGA DEL CONTENEDOR",
  PRODUCTS: "PRODUCTOS",
  LOADING_TEMPERATURE: "TEMPERATURA DE CARGA",
  FINAL_CONTAINER: "CONTENEDOR FINAL",
} as const;

const IMAGE_TYPES = [
  "CONTAINER_PICTURES",
  "CONTAINER_LOAD",
  "PRODUCTS",
  "LOADING_TEMPERATURE",
  "FINAL_CONTAINER",
] as const;

const DESCRIPTION_OPTIONS = [
  { value: "INCOMING", label: "Entrada" },
  { value: "CEILING", label: "Techo" },
  { value: "CARRIER", label: "Transportista" },
  { value: "RIGHT SIDE", label: "Lado derecho" },
  { value: "INSIDE", label: "Interior" },
  { value: "FLOOR", label: "Piso" },
  { value: "LICENCE PLATE No.", label: "Placa" },
] as const;

/* ======================================================
   COMPONENT
====================================================== */
export default function PhotoCaptureModal<T extends boolean>({
  onClose,
  onSave,
  showDescription = true as T,
  isSaving = false,
}: Props<T>) {
  /* ======================================================
     REFS
  ====================================================== */
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ======================================================
     STATE
  ====================================================== */
  const [preview, setPreview] = useState<string | null>(null);
  const [type, setType] = useState<string>(IMAGE_TYPES[0]);
  const [description, setDescription] = useState("");
  const [cameraActive, setCameraActive] = useState(true);

  /* ======================================================
     CAMERA CAPTURE
  ====================================================== */
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPreview(imageSrc);
      setCameraActive(false);
    }
  }, []);

  /* ======================================================
     IMAGE UPLOAD (FILE INPUT)
     - Desktop: Opens file explorer
     - Mobile: Opens gallery / camera
  ====================================================== */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten imágenes");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setCameraActive(false);
    };

    reader.readAsDataURL(file);
  };

  /* ======================================================
     SAVE IMAGE
  ====================================================== */
  const handleSave = () => {
    if (!preview) {
      alert("Error: no se ha seleccionado ninguna imagen");
      return;
    }

    if (!type) {
      alert("Debes seleccionar el tipo de imagen");
      return;
    }

    const result = {
      image: preview,
      type: type.replace(/_/g, " "),
      ...(showDescription ? { description } : {}),
    } as BuildImagePayload<T>;

    onSave(result);
  };

  /* ======================================================
     RETAKE / RESET
  ====================================================== */
  const handleRetake = () => {
    setPreview(null);
    setCameraActive(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          Tomar o subir imagen
        </h2>

        {/* ======================================================
            CAMERA + UPLOAD SECTION
        ====================================================== */}
        {cameraActive && !preview && (
          <div className="flex flex-col items-center space-y-4">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              className="w-full rounded-lg"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={capture} disabled={isSaving}>📸 Tomar foto</Button>

              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSaving}
              >
                🖼️ Subir imagen
              </Button>

              <Button variant="outline" onClick={onClose} disabled={isSaving}>
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* ======================================================
            PREVIEW + METADATA SECTION
        ====================================================== */}
        {preview && (
          <div className="space-y-3">
            <img src={preview} className="w-full rounded-lg" />

            <div>
              <label className="font-medium mb-1 block">
                Tipo de imagen
              </label>
              <select
                className="w-full border p-2 rounded-md"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {IMAGE_TYPES.map((imageType) => (
                  <option key={imageType} value={imageType}>
                    {IMAGE_LABELS[imageType]}
                  </option>
                ))}
              </select>
            </div>

            {showDescription && (
              <div>
                <label className="font-medium mb-1 block">
                  Descripción
                </label>
                <select
                  className="w-full border p-2 rounded-md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                >
                  <option value="">-- Sin descripción --</option>
                  {DESCRIPTION_OPTIONS.map((descriptionOption) => (
                    <option key={descriptionOption.value} value={descriptionOption.value}>
                      {descriptionOption.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handleRetake} disabled={isSaving}>
                🔄 Retomar
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Guardando..." : "💾 Guardar"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
