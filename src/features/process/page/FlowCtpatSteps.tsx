import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";
import { Spinner } from "@/shared/components/Spinner";
import React from "react";
import CreatePackingList from "@/features/packing-List/pages/CreatePackingList";
import CreateCtpatAssignment from "@/features/ctpats/pages/CreateCtpatAssignment";
import CreateUploadImages from "@/features/upload-images/pages/CreateUploadImages";
import CheckListPage  from "@/features/checkLists/pages/CheckListPage";
import CloseCtpat from "@/features/ctpats/pages/CloseCtpat"
import type{ CtpatStatus } from "@/features/ctpats/constants/statusCodes";


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

const stepsMap = (ctpatId: number): Record<CtpatStatus, React.ReactNode> => ({
  1: <CreateUploadImages nextStatus={2} />,
  2: <CreatePackingList />,
  3: <CheckListPage ctpatId={ctpatId} />,
  4: <CreateCtpatAssignment ctpatId={ctpatId} />,
  5: <CreateUploadImages nextStatus={6} />,
  6: <CloseCtpat ctpatId={ctpatId} />,
  7: <p className="text-center text-xl font-semibold mt-10">CTPAT Cerrado</p>,
});

  const status = ctpat.status as CtpatStatus;

  return stepsMap(ctpatId)[status] ?? <p>Estado desconocido</p>;
}
