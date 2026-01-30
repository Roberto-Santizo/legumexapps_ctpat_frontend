import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";
import { getImagesAPI } from "@/features/upload-images/api/getImagesAPI";
// APIs para Frozen
import { getFrozenPackingList } from "@/features/packing-List/api/PackingListAPI";
import { getPackingListTotalsAPI } from "@/features/packing-List/api/PackingListTotals";
// APIs para Juice
import { getJuicePackingListAPI } from "@/features/juicePacking-List/api/JuicePacking-ListAPI";
import { getJuicePackingListTotalsAPI } from "@/features/juicePacking-List/api/JuicePackingListTotals";

import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { ImagePlus } from "lucide-react";

import LetterPage from "./LetterPage";
import CtpatGeneralInformationTable from "@/features/ctpatsDocument/CtpatGeneralInformationTable";
import CtpatImages from "@/features/ctpatsDocument/CtpatImages";

import DynamicPackingListTable from "@/features/ctpatsDocument/DynamicPackingListTable";
import DriverTable from "@/features/ctpatsDocument/DriverTable";
import FinalCtpatSignatures from "@/features/ctpatsDocument/FinalCtpatSignatures";
import ChecklistTables from "@/features/ctpatsDocument/ChecklistTables";
import ObservationsTable from "@/features/ctpatsDocument/ObservationsTable";
import { CTPAT_PERMISSIONS } from "@/core/permissions/ctpats.permissions";
import { canAccess } from "@/core/permissions/canAccess";
import type { ProductTypeId } from "@/features/process/control flow/productTypes";

export default function CtpatDocument() {
  const { id } = useParams();
  const { user } = useAuth();
  const ctpatId = Number(id);

  // DEBUG: Este log debería aparecer SIEMPRE que entres al documento
  console.log("🔴 DOCUMENTO CARGADO - ctpatId:", ctpatId, "id:", id);

  // 1. Primero cargar el CTPAT para conocer el tipo de producto
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ctpat", ctpatId],
    queryFn: () => getCtpatByIdAPI(ctpatId),
    enabled: !!id,
  });

  // Obtener el tipo de producto (1 = FROZEN, 2 = JUICE)
  const productType: ProductTypeId = data?.response?.type || 1;
  const isFrozen = productType === 1;
  const isJuice = productType === 2;

  // 2. Cargar imágenes (igual para ambos tipos)
  const { data: images = [], isLoading: isLoadingImages } = useQuery({
    queryKey: ["ctpat-images", ctpatId],
    queryFn: () => getImagesAPI(ctpatId),
    enabled: !!id,
  });

  // 3. Queries condicionales para FROZEN
  const { data: frozenPackingList, isLoading: isLoadingFrozenPL } = useQuery({
    queryKey: ["packing-list-frozen", ctpatId],
    queryFn: () => getFrozenPackingList(ctpatId),
    enabled: !!id && !!data && isFrozen,
  });

  const { data: frozenTotals, isLoading: isLoadingFrozenTotals } = useQuery({
    queryKey: ["packing-list-frozen-totals", ctpatId],
    queryFn: () => getPackingListTotalsAPI(ctpatId),
    enabled: !!id && !!data && isFrozen,
  });

  // 4. Queries condicionales para JUICE (staleTime: 0 para siempre refetchear)
  const { data: juicePackingList, isLoading: isLoadingJuicePL } = useQuery({
    queryKey: ["packing-list-juice", ctpatId],
    queryFn: () => getJuicePackingListAPI(ctpatId),
    enabled: !!id && !!data && isJuice,
    staleTime: 0,
  });

  const { data: juiceTotals, isLoading: isLoadingJuiceTotals } = useQuery({
    queryKey: ["packing-list-juice-totals", ctpatId],
    queryFn: () => getJuicePackingListTotalsAPI(ctpatId),
    enabled: !!id && !!data && isJuice,
    staleTime: 0,
  });

  // Determinar si está cargando según el tipo
  const isLoadingPackingList = isFrozen
    ? (isLoadingFrozenPL || isLoadingFrozenTotals)
    : (isLoadingJuicePL || isLoadingJuiceTotals);

  // Obtener los datos correctos según el tipo
  const packingList = isFrozen ? frozenPackingList : juicePackingList;
  const packingListTotals = isFrozen ? frozenTotals : juiceTotals;

  // DEBUG: Ver qué datos llegan al documento (eliminar después de debuggear)
  console.log("=== DEBUG DOCUMENTO ===");
  console.log("ctpatId:", ctpatId);
  console.log("productType:", productType, "isJuice:", isJuice, "isFrozen:", isFrozen);
  console.log("juicePackingList:", juicePackingList);
  console.log("juiceTotals:", juiceTotals);
  console.log("packingList (usado):", packingList);
  console.log("packingListTotals (usado):", packingListTotals);
  console.log("========================");

  if (isLoading || isLoadingImages || isLoadingPackingList) return <p>Cargando documento...</p>;
  if (isError) return <p>Error al cargar el documento.</p>;

  const ctpat = data.response;

  const pages = [
    <CtpatGeneralInformationTable data={ctpat} packingList={packingList} />,
    <CtpatImages images={images} />,
    <DynamicPackingListTable
      productType={productType}
      packingListData={packingList}
      totals={packingListTotals}
    />,
    <DriverTable driver={ctpat.driver} ctpat={ctpat} packingList={packingList} />,
    <ChecklistTables items={ctpat.checklist?.items ?? []} />,
    <ObservationsTable observations={ctpat.observations ?? []} />,
    <FinalCtpatSignatures
      signatureC={ctpat.signature_c}
      signatureE={ctpat.signature_e}
    />,
  ];

  return (
    <div className="space-y-10">
      {canAccess(CTPAT_PERMISSIONS.UPLOAD_ADDITIONAL_IMAGES, user?.role) && (
        <div className="sticky top-4 z-10 flex justify-end mb-4 px-4">
          <Link
            to={`/ctpats/${id}/upload-additional-images`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-700 transition-all duration-200"
          >
            <ImagePlus size={20} />
            Agregar Más Imágenes
          </Link>
        </div>
      )}

      {pages.map((content, index) => (
        <LetterPage
          key={index}
          pageNumber={index + 1}
          totalPages={pages.length}
          docDate={ctpat.createdAt}
        >
          {content}
        </LetterPage>
      ))}
    </div>
  );
}