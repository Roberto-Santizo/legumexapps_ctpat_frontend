import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

type Props = {
  onClose: () => void;
  onSave: (img: { image: string; type: string; description: string }) => void;
};

export default function PhotoCaptureModal({ onClose, onSave }: Props) {
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
  }, [webcamRef]);

  const handleSave = () => {
    if (!preview || !type || !description) {
      alert("Completa todos los campos antes de guardar");
      return;
    }
    onSave({ image: preview, type, description });
  };

  const handleRetake = () => {
    setPreview(null);
    setCameraActive(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
        <h2 className="text-lg font-semibold mb-4">Tomar o Subir Foto</h2>

        {cameraActive && !preview && (
          <div className="flex flex-col items-center space-y-4">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg w-full"
              videoConstraints={{
                facingMode: "environment", // Usa cámara trasera en móviles
              }}
            />
            <div className="flex gap-3">
              <Button onClick={capture}>📸 Tomar Foto</Button>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {preview && (
          <div className="space-y-3">
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-md object-cover"
            />
            <input
              type="text"
              placeholder="Tipo de imagen"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded-md"
            />

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
