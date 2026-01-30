import { useQuery } from "@tanstack/react-query";
import { PDFViewer } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";
import { getJuicePackingListAPI } from "@/features/juicePacking-List/api/JuicePacking-ListAPI";
import { getJuicePackingListTotalsAPI } from "@/features/juicePacking-List/api/JuicePackingListTotals";
import { getJuiceItemsGroupedAPI } from "@/features/juice-Items/api/JuiceItemAPI";
import { PackingListTableDocument } from "./JuicePackingListDocument";

export default function JuicePackingListDocumentWrapper() {
  const { id } = useParams();
  const ctpatId = Number(id);

  // 1. Cargar el CTPAT para verificar el tipo
  const { data: ctpatData, isLoading: isLoadingCtpat, isError: isErrorCtpat } = useQuery({
    queryKey: ["ctpat", ctpatId],
    queryFn: () => getCtpatByIdAPI(ctpatId),
    enabled: !!ctpatId,
  });

  const ctpat = ctpatData?.response;
  const isJuice = ctpat?.type === 2;

  // 2. Cargar el packing list header (staleTime: 0 para siempre refetch)
  const { data: packingListData, isLoading: isLoadingPL } = useQuery({
    queryKey: ["packing-list-juice", ctpatId],
    queryFn: () => getJuicePackingListAPI(ctpatId),
    enabled: !!ctpatId && !!ctpat && isJuice,
    staleTime: 0,
  });

  // 3. Cargar los items agrupados
  const { data: itemsGrouped = [], isLoading: isLoadingItems } = useQuery({
    queryKey: ["juiceItems", ctpatId],
    queryFn: () => getJuiceItemsGroupedAPI(ctpatId),
    enabled: !!ctpatId && !!ctpat && isJuice,
    staleTime: 0,
  });

  // 4. Cargar los totales
  const { data: totals, isLoading: isLoadingTotals } = useQuery({
    queryKey: ["packing-list-juice-totals", ctpatId],
    queryFn: () => getJuicePackingListTotalsAPI(ctpatId),
    enabled: !!ctpatId && !!ctpat && isJuice,
    staleTime: 0,
  });

  const isLoading = isLoadingCtpat || isLoadingPL || isLoadingItems || isLoadingTotals;

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

  if (isErrorCtpat || !ctpatData) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-red-800 font-semibold mb-2">Error al cargar el documento</h3>
          <p className="text-red-600 text-sm">No se pudo cargar la información del packing list</p>
        </div>
      </div>
    );
  }

  // Verificar que sea un CTPAT de jugos (type === 2)
  if (!isJuice) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-yellow-800 font-semibold mb-2">Tipo de CTPAT incorrecto</h3>
          <p className="text-yellow-600 text-sm">Este documento es solo para CTpats de jugos</p>
        </div>
      </div>
    );
  }

  if (!packingListData) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-yellow-800 font-semibold mb-2">Sin datos de Packing List</h3>
          <p className="text-yellow-600 text-sm">No se encontró información del packing list para este CTPAT</p>
        </div>
      </div>
    );
  }

  // Combinar los datos para el documento
  const apiPackingList = {
    carrier: packingListData.carrier || "",
    container_condition: packingListData.container_condition || "",
    container_type: packingListData.container_type || "",
    no_container: packingListData.no_container || "",
    order: packingListData.order || "",
    no_marchamo: packingListData.no_marchamo || "",
    client: packingListData.client || "",
    no_thermograph: packingListData.no_thermograph || "",
    products: packingListData.products || "",
    box_type: packingListData.box_type || "",
    lbs_per_box: packingListData.lbs_per_box || "",
    total_boxes: packingListData.total_boxes || 0,
    beginning_date: packingListData.beginning_date || "",
    exit_date: packingListData.exit_date || null,
    exit_temp: packingListData.exit_temp?.toString() || "",
    items: itemsGrouped,
    totals: totals || { total_boxes: 0, net_weight: 0, gross_weight: 0, bottles: 0 },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full h-[90vh] bg-white rounded-xl shadow-md overflow-hidden">
        <PDFViewer width="100%" height="100%">
          <PackingListTableDocument apiPackingList={apiPackingList} />
        </PDFViewer>
      </div>
    </div>
  );
}
