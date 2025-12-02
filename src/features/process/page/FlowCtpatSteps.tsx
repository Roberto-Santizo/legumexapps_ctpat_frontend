import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";
import { Spinner } from "@/shared/components/Spinner";
import CreatePackingList from "@/features/packing-List/pages/CreatePackingList";
import CreateCtpatAssignment from "@/features/ctpats/pages/CreateCtpatAssignment";
import CreateUploadImages from "@/features/upload-images/pages/CreateUploadImages";
import CheckListPage  from "@/features/checkLists/pages/CheckListPage";

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
    return <CreateUploadImages nextStatus={2} />;

  case 2:
    return <CreatePackingList />;

  case 3:
    return <CheckListPage ctpatId={ctpatId} />;

  case 4:
    return <CreateCtpatAssignment ctpatId={ctpatId} />;

  case 5:
    return <CreateUploadImages nextStatus={6} />;

  default:
    return <p>Estado desconocido</p>;
}

}
