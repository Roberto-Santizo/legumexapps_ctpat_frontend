// /components/modalWindows/PhotoCaptureModal.tsx
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

export type BuildImagePayload<T extends boolean> =
  T extends true
    ? { image: string; type: string; description: string }
    : { image: string; type: string };

type Props<T extends boolean> = {
  onClose: () => void;
  onSave: (img: BuildImagePayload<T>) => void;
  showDescription?: T;
};

export default function PhotoCaptureModal<T extends boolean>({
  onClose,
  onSave,
  showDescription = true as T,
}: Props<T>) {
  const webcamRef = useRef<Webcam>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [type, setType] = useState("");
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
    if (!preview || !type) {
      alert("Debes completar el tipo antes de guardar");
      return;
    }

    if (showDescription && !description) {
      alert("Debes llenar la descripción");
      return;
    }

    // 🔥 Gracias al tipo discriminado NO usamos any
    const result = {
      image: preview,
      type,
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

            <input
              type="text"
              placeholder="Tipo de imagen"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border p-2 rounded-md"
            />

            {showDescription && (
              <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded-md"
              />
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
