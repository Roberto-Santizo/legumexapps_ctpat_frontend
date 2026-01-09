import { useState } from "react";
import Swal from "sweetalert2";

import PackingListDetailPage from "@/features/packing-List/components/PackingListDetailPage";
import CreateUploadImages from "@/features/upload-images/pages/CreateUploadImages";
import { ImagePlus } from "lucide-react";

type Props = {
  ctpatId: number;
  onContinue: () => void;
};

export default function PackingListReviewStep({
  ctpatId,
  onContinue,
}: Props) {
  const [showImages, setShowImages] = useState(false);

  // Esta función maneja la alerta Y luego llama a onContinue
  const handleContinueWithConfirmation = async () => {
    const result = await Swal.fire({
      title: "¿Deseas continuar con el checklist?",
      html: `
        <p class="text-sm text-gray-600">
          Al avanzar al siguiente paso, el checklist quedará <b>bloqueado</b> y ya
          no podrás regresar para realizar cambios.
        </p>
        <p class="mt-2 text-sm text-gray-600">
          Verifica que toda la información esté completa y correcta antes de continuar.
        </p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      confirmButtonColor: "#16a34a", 
      cancelButtonColor: "#ef4444", 
      background: "#f9fafb", 
      iconColor: "#f59e0b",
      customClass: {
        popup: "rounded-xl",
        title: "text-lg font-semibold",
      },
    });

    if (result.isConfirmed) {
      onContinue();
    }
  };

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

      {/* Paso 3 - IMPORTANTE: pasar handleContinueWithConfirmation */}
      <PackingListDetailPage
        ctpatId={ctpatId}
        onContinue={handleContinueWithConfirmation} 
      />

      {/* Modal / Drawer */}
      {showImages && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-end z-50"
          onClick={() => setShowImages(false)}
        >
          <div
            className="bg-white w-full max-w-md p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Imágenes del contenedor</h2>
              <button onClick={() => setShowImages(false)}>✕</button>
            </div>

            <CreateUploadImages ctpatId={ctpatId} />
          </div>
        </div>
      )}
    </div>
  );
}