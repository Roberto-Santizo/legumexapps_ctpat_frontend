import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/shared/components/button";

type Props = {
  onClose: () => void;
  onSave: (imgBase64: string) => void;
};

export default function DriverCaptureModal({ onClose, onSave }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(true);

  const capture = useCallback(() => {
    const img = webcamRef.current?.getScreenshot();
    if (img) {
      setPreview(img);
      setCameraActive(false);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">

        <h2 className="mb-4 text-lg font-semibold">Tomar Foto</h2>

        {cameraActive && !preview && (
          <>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg"
              videoConstraints={{ facingMode: "user" }}
            />

            <div className="mt-4 flex justify-between">
              <Button onClick={capture}>📸 Tomar Foto</Button>
              <Button variant="outline" onClick={onClose}>Cancelar</Button>
            </div>
          </>
        )}

        {preview && (
          <>
            <img src={preview} alt="Vista previa" className="w-full rounded-lg" />

            <div className="mt-4 flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setPreview(null);
                  setCameraActive(true);
                }}
              >
                🔄 Retomar
              </Button>

              <Button
                onClick={() => {
                  onSave(preview);
                  onClose();
                }}
              >
                💾 Guardar
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
