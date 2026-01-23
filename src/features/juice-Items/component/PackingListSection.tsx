import { useState } from "react";
import JuicePackingListDetailPage from "@/features/juice-Items/page/JuicePackingListDetailPage";
import CreateUploadImages from "@/features/upload-images/pages/CreateUploadImages";
import { ImagePlus } from "lucide-react";

type Props = {
  ctpatId: number;
  juicePackingListId: number;
  onContinue: () => void;
};

export default function JuicePackingListSection({
  ctpatId,
  juicePackingListId,
  onContinue
}: Props) {
  const [showImages, setShowImages] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header actions */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowImages(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-300 hover:bg-amber-50 text-amber-700 font-medium transition-colors"
        >
          <ImagePlus size={18} />
          Subir imágenes
        </button>
      </div>

      {/* Detalle del packing list de jugos */}
      <JuicePackingListDetailPage
        juicePackingListId={juicePackingListId}
        onContinue={onContinue}
      />

      {/* Modal / Drawer para imágenes */}
      {showImages && (
        <div 
          className="fixed inset-0 bg-black/40 flex justify-end z-50"
          onClick={() => setShowImages(false)}
        >
          <div 
            className="bg-white w-full max-w-md p-6 shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                🧃 Imágenes del Packing List de Jugos
              </h2>
              <button 
                onClick={() => setShowImages(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            <CreateUploadImages
              type="juice"
              ctpatId={ctpatId}
            />
          </div>
        </div>
      )}
    </div>
  );
}