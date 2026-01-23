import { useQuery } from "@tanstack/react-query";
import { PDFViewer } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";
import { PackingListTableDocument } from "./JuicePackingListDocument";

export default function JuicePackingListDocumentWrapper() {
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
          <p className="text-gray-600 font-medium">Cargando packing list de jugos...</p>
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

  // Verificar que sea un CTPAT de jugos (type === 2)
  if (ctpat.type !== 2) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-yellow-800 font-semibold mb-2">Tipo de CTPAT incorrecto</h3>
          <p className="text-yellow-600 text-sm">Este documento es solo para CTpats de jugos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full h-[90vh] bg-white rounded-xl shadow-md overflow-hidden">
        <PDFViewer width="100%" height="100%">
          <PackingListTableDocument apiPackingList={ctpat.packingList} />
        </PDFViewer>
      </div>
    </div>
  );
}
