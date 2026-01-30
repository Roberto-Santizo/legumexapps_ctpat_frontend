import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";
import PackingListDocument from "./PackingListDocument";
import JuicePackingListDocumentWrapper from "@/features/juicePacking-List/juicePackingListDocument/JuicePackingListDocumentWrapper";

export default function DynamicPackingListDocumentWrapper() {
  const { id } = useParams();
  const ctpatId = Number(id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ctpat", ctpatId],
    queryFn: () => getCtpatByIdAPI(ctpatId),
    enabled: !!ctpatId,
  });

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando documento...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-red-800 font-semibold mb-2">Error al cargar el documento</h3>
          <p className="text-red-600 text-sm">No se pudo cargar la información del packing list</p>
        </div>
      </div>
    );
  }

  const ctpat = data.response;

  // Determinar qué documento mostrar según el tipo de CTPAT
  // type === 1 → FROZEN (congelado) → PackingListDocument
  // type === 2 → JUICE (jugos) → JuicePackingListDocumentWrapper
  if (ctpat.type === 2) {
    // Documento de jugos
    return <JuicePackingListDocumentWrapper />;
  } else if (ctpat.type === 1) {
    // Documento de congelados
    return <PackingListDocument />;
  } else {
    // Tipo desconocido
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-yellow-800 font-semibold mb-2">Tipo de CTPAT no reconocido</h3>
          <p className="text-yellow-600 text-sm">
            El tipo de CTPAT ({ctpat.type}) no tiene un documento asociado
          </p>
        </div>
      </div>
    );
  }
}
