import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";
import { Spinner } from "@/shared/components/Spinner";

// Componentes de detalle de packing list
import JuicePackingListDetailPage from "@/features/juice-Items/page/JuicePackingListDetailPage";
import FrozenPackingListContent from "./FrozenPackingListContent";

// APIs
import { getJuicePackingListByCtpatIdAPI } from "@/features/juicePacking-List/api/JuicePacking-ListAPI";

import type { ProductTypeId } from "@/features/process/control flow/productTypes";

/**
 * Vista dinámica para gestionar items del packing list después de cerrar el CTPAT.
 * Detecta automáticamente si es FROZEN o JUICE y muestra el componente correspondiente.
 */
export default function ManagePackingListItemsDynamic() {
  const navigate = useNavigate();
  const { id } = useParams();
  const ctpatId = Number(id);

  // Obtener datos del CTPAT para saber qué tipo de producto es
  const { data: ctpatData, isLoading: isLoadingCtpat, isError: isErrorCtpat } = useQuery({
    queryKey: ["ctpat", ctpatId],
    queryFn: () => getCtpatByIdAPI(ctpatId),
    enabled: !!ctpatId,
  });

  const productTypeId: ProductTypeId = ctpatData?.response?.type || 1;
  const isJuice = productTypeId === 2;

  // Query para packing list de jugos (solo si es juice)
  const {
    data: juicePackingList,
    isLoading: isLoadingJuice,
    isError: isErrorJuice
  } = useQuery({
    queryKey: ["juicePackingListByCtpat", ctpatId],
    queryFn: () => getJuicePackingListByCtpatIdAPI(ctpatId),
    enabled: !!ctpatId && isJuice && !isLoadingCtpat,
    retry: 1,
  });

  const handleGoBack = () => {
    navigate("/ctpats");
  };

  // Loading state
  if (isLoadingCtpat || (isJuice && isLoadingJuice)) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="text-gray-600 mt-4">Cargando packing list...</p>
        </div>
      </div>
    );
  }

  // Error state para CTPAT
  if (isErrorCtpat) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-800 font-semibold mb-4">
              Error al cargar el CTPAT
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

  // Error state para juice packing list
  if (isJuice && isErrorJuice) {
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

  const productLabel = isJuice ? "Jugos" : "Congelados";

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestionar Items del Packing List
            </h1>
            <p className="text-gray-600">
              CTPAT ID: {ctpatId} | Tipo: <span className={isJuice ? "text-amber-600 font-semibold" : "text-blue-600 font-semibold"}>{productLabel}</span>
            </p>
          </div>

          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-200 border border-[var(--color-border-light)]"
          >
            <ArrowLeft size={20} />
            Regresar a CTpats
          </button>
        </div>

        {/* Contenido dinámico según el tipo */}
        <div className="space-y-6">
          {isJuice ? (
            // Packing list de jugos
            <JuicePackingListDetailPage
              packingListData={juicePackingList}
            />
          ) : (
            // Packing list de congelados
            <FrozenPackingListContent ctpatId={ctpatId} />
          )}

          {/* Mensaje informativo */}
          <div className={`${isJuice ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4`}>
            <p className={`text-sm ${isJuice ? 'text-amber-800' : 'text-blue-800'}`}>
              <strong>Nota:</strong> Los cambios se guardan automaticamente.
              Puedes agregar, editar o eliminar items segun sea necesario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
