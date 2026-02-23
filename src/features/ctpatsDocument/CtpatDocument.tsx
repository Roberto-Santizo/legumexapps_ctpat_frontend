import { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";
import { getImagesAPI, deleteImageAPI } from "@/features/upload-images/api/getImagesAPI";
import { getCtpatObservationsAPI } from "@/features/observations/api/ObservationsAPI";
import { getCheckListByCtpatIdAPI } from "@/features/checkLists/api/CheckListAPI";
// Frozen APIs
import { getFrozenPackingList } from "@/features/packing-List/api/PackingListAPI";
import { getPackingListTotalsAPI } from "@/features/packing-List/api/PackingListTotals";
// Juice APIs
import { getJuicePackingListAPI } from "@/features/juicePacking-List/api/JuicePacking-ListAPI";
import { getJuicePackingListTotalsAPI } from "@/features/juicePacking-List/api/JuicePackingListTotals";
// PDF
import { BlobProvider } from "@react-pdf/renderer";
import { getCompanyLogoAPI } from "@/assets/CompanyLogoAPI";
import CtpatPdfDocument from "./CtpatPdfDocument";
import { preloadImagesAsBase64 } from "./utils/fetchImageAsBase64";

import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";
import { ImagePlus, Download, Loader2 } from "lucide-react";

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
  const queryClient = useQueryClient();
  const IMAGES_BASE_URL = import.meta.env.VITE_IMAGES_BACKEND_URL as string;

  // Estado para la generación lazy del PDF
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isPreloadingImages, setIsPreloadingImages] = useState(false);
  const [imageBase64Cache, setImageBase64Cache] = useState<Record<string, string>>({});

  // Logo de empresa (necesario para el PDF)
  const { data: companyLogo } = useQuery({
    queryKey: ["company-logo"],
    queryFn: () => getCompanyLogoAPI(),
    enabled: !!id,
  });


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

  // 3. Cargar observaciones del CTPAT
  const { data: observations = [], isLoading: isLoadingObservations } = useQuery({
    queryKey: ["ctpat-observations", ctpatId],
    queryFn: () => getCtpatObservationsAPI(ctpatId),
    enabled: !!id,
  });

  // 4. Cargar checklist del CTPAT
  const { data: checklistItems = [], isLoading: isLoadingChecklist } = useQuery({
    queryKey: ["ctpat-checklist", ctpatId],
    queryFn: () => getCheckListByCtpatIdAPI(ctpatId),
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

  // Función para eliminar imagen
  const handleDeleteImage = async (imageId: number) => {
    try {
      await deleteImageAPI(imageId);
      toast.success("Imagen eliminada correctamente");
      queryClient.invalidateQueries({ queryKey: ["ctpat-images", ctpatId] });
    } catch {
      toast.error("Error al eliminar la imagen");
      throw new Error("Error al eliminar");
    }
  };

  if (isLoading || isLoadingImages || isLoadingPackingList || isLoadingObservations || isLoadingChecklist) return <p>Cargando documento...</p>;
  if (isError) return <p>Error al cargar el documento.</p>;

  const ctpat = data.response;

  const handleGeneratePdf = async () => {
    setIsPreloadingImages(true);
    try {
      // Signatures may be stored as data URLs (from SignatureCanvas) — skip those from fetch
      const isDataUrl = (s: string | null | undefined) => !!s && s.startsWith("data:");

      const paths = [
        ...images.map((img) => img.image).filter((p) => !isDataUrl(p)),
        ctpat.truck?.plate_image,
        ctpat.driver?.license_image,
        ctpat.driver?.identification_image,
        ...(isDataUrl(ctpat.signature_c) ? [] : [ctpat.signature_c]),
        ...(isDataUrl(ctpat.signature_e) ? [] : [ctpat.signature_e]),
      ];
      const cache = await preloadImagesAsBase64(paths, IMAGES_BASE_URL);
      setImageBase64Cache(cache);
      setIsGeneratingPdf(true);
    } finally {
      setIsPreloadingImages(false);
    }
  };

  const REMAINING_IMAGE_TYPES = [
    "CONTAINER LOAD",
    "PRODUCTS",
    "LOADING TEMPERATURE",
    "FINAL CONTAINER",
    "DRIVER IDENTIFICATION",
  ];

  const pages = [
    <>
      <CtpatGeneralInformationTable data={ctpat} packingList={packingList} />
      <CtpatImages
        images={images}
        truck={ctpat.truck}
        driver={ctpat.driver}
        status={ctpat.status}
        onDeleteImage={handleDeleteImage}
        filterTypes={["CONTAINER PICTURES"]}
      />
    </>,
    <CtpatImages
      images={images}
      truck={ctpat.truck}
      driver={ctpat.driver}
      status={ctpat.status}
      onDeleteImage={handleDeleteImage}
      filterTypes={REMAINING_IMAGE_TYPES}
    />,
    <DynamicPackingListTable
      productType={productType}
      packingListData={packingList}
      totals={packingListTotals}
    />,
    <DriverTable driver={ctpat.driver} ctpat={ctpat} packingList={packingList} />,
    <ChecklistTables items={checklistItems} />,
    <ObservationsTable observations={observations} />,
    <FinalCtpatSignatures
      signatureC={ctpat.signature_c}
      signatureE={ctpat.signature_e}
    />,
  ];

  return (
    <div className="space-y-10">
      <div className="sticky top-4 z-10 flex justify-end mb-4 px-4 gap-3">
        {/* Botón de descarga PDF (lazy — solo genera al hacer click) */}
        {isPreloadingImages ? (
          <button
            disabled
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg opacity-75 cursor-not-allowed"
          >
            <Loader2 size={20} className="animate-spin" />
            Preparando imágenes...
          </button>
        ) : isGeneratingPdf ? (
          <BlobProvider
            document={
              <CtpatPdfDocument
                ctpat={ctpat}
                images={images}
                observations={observations}
                checklistItems={checklistItems}
                packingList={packingList}
                packingListTotals={packingListTotals}
                productType={productType}
                companyLogo={companyLogo}
                imagesBaseUrl={IMAGES_BASE_URL}
                imageBase64Cache={imageBase64Cache}
              />
            }
          >
            {({ blob, loading, error }) => {
              if (loading) {
                return (
                  <button
                    disabled
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg opacity-75 cursor-not-allowed"
                  >
                    <Loader2 size={20} className="animate-spin" />
                    Generando PDF...
                  </button>
                );
              }
              if (error) {
                return (
                  <button
                    onClick={() => setIsGeneratingPdf(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:bg-red-700 transition-all duration-200"
                  >
                    Error al generar — Reintentar
                  </button>
                );
              }
              const url = blob ? URL.createObjectURL(blob) : "";
              return (
                <a
                  href={url}
                  download={`CTPAT_${ctpat.container}.pdf`}
                  onClick={() => setTimeout(() => setIsGeneratingPdf(false), 300)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200"
                >
                  <Download size={20} />
                  Download PDF (We are still working on it)
                </a>
              );
            }}
          </BlobProvider>
        ) : (
          <button
            onClick={handleGeneratePdf}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200"
          >
            <Download size={20} />
            Descargar PDF
          </button>
        )}

        {canAccess(CTPAT_PERMISSIONS.UPLOAD_ADDITIONAL_IMAGES, user?.role) && (
          <Link
            to={`/ctpats/${id}/upload-additional-images`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-700 transition-all duration-200"
          >
            <ImagePlus size={20} />
            Agregar Más Imágenes
          </Link>
        )}
      </div>

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