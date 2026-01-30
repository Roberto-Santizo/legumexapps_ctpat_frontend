import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import JuicePackingListDetailPage from "@/features/juice-Items/page/JuicePackingListDetailPage";
import { getJuicePackingListAPI } from "@/features/juicePacking-List/api/JuicePacking-ListAPI";

export default function ManageJuicePackingListItemsView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const ctpatId = Number(id);

  const {
    data: juicePackingList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["juicePackingListByCtpat", ctpatId],
    queryFn: () => getJuicePackingListAPI(ctpatId),
    enabled: !!ctpatId,
    retry: 1,
  });

  const handleGoBack = () => {
    navigate("/ctpats");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando packing list de jugos...</p>
        </div>
      </div>
    );
  }

  if (isError || !juicePackingList) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-800 font-semibold mb-4">
              Error al cargar el packing list de jugos
            </p>
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-300"
            >
              <ArrowLeft size={20} />
              Regresar a CTpats
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestionar Items del Packing List de Jugos
            </h1>
            <p className="text-gray-600">CTPAT ID: {ctpatId}</p>
          </div>

          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-200 border border-[var(--color-border-light)]"
          >
            <ArrowLeft size={20} />
            Regresar a CTpats
          </button>
        </div>

        {/* Contenido - Reutilizando JuicePackingListDetailPage */}
        <div className="space-y-6">
          <JuicePackingListDetailPage
            ctpatId={ctpatId}
            packingListData={juicePackingList}
          />

          {/* Mensaje informativo */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              <strong>Nota:</strong> Los cambios se guardan automaticamente.
              Puedes agregar, editar o eliminar items segun sea necesario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
