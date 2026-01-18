import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { ImagePlus } from "lucide-react";

import LetterPage from "./LetterPage";
import CtpatGeneralInformationTable from "@/features/ctpats/ctpatsDocument/CtpatGeneralInformationTable";
import CtpatImages from "@/features/ctpats/ctpatsDocument/CtpatImages";
import PackingListTable from "@/features/ctpats/ctpatsDocument/PackingListTable";
import DriverTable from "@/features/ctpats/ctpatsDocument/DriverTable";
import FinalCtpatSignatures from "@/features/ctpats/ctpatsDocument/FinalCtpatSignatures";
import ChecklistTables from "@/features/ctpats/ctpatsDocument/ChecklistTables";
import { CTPAT_PERMISSIONS } from "@/core/permissions/ctpats.permissions";
import { canAccess } from "@/core/permissions/canAccess";

export default function CtpatDocument() {
  const { id } = useParams();
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ctpat", id],
    queryFn: () => getCtpatByIdAPI(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <p>Cargando documento...</p>;
  if (isError) return <p>Error al cargar el documento.</p>;

  const ctpat = data.response;

  const pages = [
    <CtpatGeneralInformationTable data={ctpat} />,
    <CtpatImages images={ctpat.images} />,
    <PackingListTable data={ctpat.packingList} />,
    <DriverTable driver={ctpat.driver} ctpat={ctpat} />,
    <ChecklistTables items={ctpat.checklist.items} />,
    <FinalCtpatSignatures
      signatureC={ctpat.signature_c}
      signatureE={ctpat.signature_e}
    />,
  ];

  return (
    <div className="space-y-10">
      {/* ✅ Ahora funciona correctamente */}
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