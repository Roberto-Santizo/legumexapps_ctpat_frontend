import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";

import LetterPage from "./LetterPage";
import CtpatGeneralInformationTable from "@/features/ctpats/ctpatsDocument/CtpatGeneralInformationTable";
import CtpatImages from "@/features/ctpats/ctpatsDocument/CtpatImages"
import PackingListTable from "@/features/ctpats/ctpatsDocument/PackingListTable"
import DriverTable from "@/features/ctpats/ctpatsDocument/DriverTable"
import FinalCtpatSignatures from "@/features/ctpats/ctpatsDocument/FinalCtpatSignatures"
import ChecklistTables from "@/features/ctpats/ctpatsDocument/ChecklistTables"


export default function CtpatDocument() {
  const { id } = useParams();

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
    <PackingListTable data={ctpat.packingList}/>,
    <DriverTable driver={ctpat.driver}  ctpat={ctpat} />,
    <ChecklistTables items={ctpat.checklist.items} />,
    <FinalCtpatSignatures 
      signatureC={ctpat.signature_c}
      signatureE={ctpat.signature_e}
     /> 
    
  ];

  return (
    <div className="space-y-10">
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
