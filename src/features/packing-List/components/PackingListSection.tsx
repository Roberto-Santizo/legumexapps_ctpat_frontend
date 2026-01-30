import { useState } from "react";
import PackingListDetailPage from "@/features/packing-List/components/PackingListDetailPage";
import CreateUploadImages from "@/features/upload-images/pages/CreateUploadImages";
import { ImagePlus } from "lucide-react";

type Props = {
  ctpatId: number;
  onContinue: () => void;
};

export default function PackingListSection({ ctpatId, onContinue }: Props) {
  const [showImages, setShowImages] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header actions */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowImages(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          <ImagePlus size={18} />
          Subir imágenes
        </button>
      </div>

      {/* Paso 3 existente */}
      <PackingListDetailPage
        ctpatId={ctpatId}
        onContinue={onContinue}
      />

      {/* Modal / Drawer */}
      {showImages && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="bg-white w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Imágenes del contenedor</h2>
              <button onClick={() => setShowImages(false)}>✕</button>
            </div>

            <CreateUploadImages
              ctpatId={ctpatId}
              onSuccess={() => setShowImages(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
