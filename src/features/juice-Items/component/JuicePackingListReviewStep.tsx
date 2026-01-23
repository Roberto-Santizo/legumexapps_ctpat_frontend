import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ImagePlus } from "lucide-react";

import JuicePackingListDetailPage from "@/features/juice-Items/page/JuicePackingListDetailPage";
import CreateUploadImages from "@/features/upload-images/pages/CreateUploadImages";
import { getJuicePackingListByCtpatIdAPI } from "@/features/juicePacking-List/api/JuicePacking-ListAPI";
import { Spinner } from "@/shared/components/Spinner";

type Props = {
  ctpatId: number;
  onContinue: () => void;
};

/**
 * Paso 2 para JUICE: Revisar y agregar items al packing list de jugos
 * Equivalente a PackingListReviewStep pero para jugos
 */
export default function JuicePackingListReviewStep({ ctpatId, onContinue }: Props) {
  const [showImages, setShowImages] = useState(false);

  // Obtener el packing list de jugos por CTPAT ID
  const {
    data: juicePackingList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["juicePackingListByCtpat", ctpatId],
    queryFn: () => getJuicePackingListByCtpatIdAPI(ctpatId),
    enabled: !!ctpatId,
  });

  const handleContinueWithConfirmation = async () => {
    const result = await Swal.fire({
      title: "¿Deseas continuar con el checklist?",
      html: `
        <p class="text-sm text-gray-600">
          Al avanzar al siguiente paso, el checklist quedará <b>bloqueado</b> y ya
          no podrás regresar para realizar cambios.
        </p>
        <p class="mt-2 text-sm text-gray-600">
          Verifica que toda la información del packing list de jugos esté completa y correcta antes de continuar.
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (isError || !juicePackingList) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <h3 className="text-red-800 font-semibold mb-4 flex items-center justify-center gap-2">
              Error: No se encontró el packing list de jugos
            </h3>
            <p className="text-gray-600 text-sm">
              Asegúrate de haber creado el packing list en el paso anterior.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            Packing List de Jugos
          </h1>
          <p className="text-gray-600">
            Agrega, edita o elimina items del packing list antes de continuar al checklist
          </p>
        </div>

        {/* Botón para subir imágenes */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowImages(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-300 hover:bg-amber-50 text-amber-700 font-medium transition-colors"
          >
            <ImagePlus size={18} />
            Subir imágenes
          </button>
        </div>

        {/* Detalle del packing list con botón de continuar */}
        {/* Pasar los datos directamente para evitar query duplicada */}
        <JuicePackingListDetailPage
          packingListData={juicePackingList}
          onContinue={handleContinueWithConfirmation}
        />

        {/* Modal para subir imágenes */}
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
                   Imágenes del Packing List de Jugos
                </h2>
                <button
                  onClick={() => setShowImages(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              <CreateUploadImages type="juice" ctpatId={ctpatId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
