import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCtpatByIdAPI } from "@/api/CtpatsAPI";
import { Spinner } from "@/components/utilities-components/Spinner";
import CreatePackingList from "@/views/CreatePackingList";
import CreateCtpatAssignment from "@/views/CreateCtpatAssignment";
import CreateUploadImages from "@/views/uploadImagesCtp/CreateUploadImages";

export default function FlowCtpatSteps() {
  const { id } = useParams();
  const ctpatId = Number(id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ctpat", ctpatId],
    queryFn: () => getCtpatByIdAPI(ctpatId),
    enabled: !isNaN(ctpatId),
  });

  if (isLoading) return <Spinner />;
  if (isError || !data) return <p>Error al cargar CTPAT</p>;

  const ctpat = data.response;

  // --- FLOW CONTROL ---
  switch (ctpat.status) {
    case 1:
      return <CreateUploadImages />;

    case 2:
      return <CreatePackingList/>;

    case 3:
      return <CreateCtpatAssignment ctpatId={ctpatId} />;

    default:
      return <p>Estado desconocido</p>;
  }
}
