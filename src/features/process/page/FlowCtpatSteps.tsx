import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getCtpatByIdAPI
} from "@/features/ctpats/api/CtpatsAPI";
import { Spinner } from "@/shared/components/Spinner";
import React from "react";

import CreatePackingList from "@/features/packing-List/pages/CreatePackingList";
import CreateCtpatAssignment from "@/features/ctpats/pages/CreateCtpatAssignment";
import CreateUploadImages from "@/features/upload-images/pages/CreateUploadImages";
import CheckListPage from "@/features/checkLists/pages/CheckListPage";
import CloseCtpat from "@/features/ctpats/pages/CloseCtpat";
import type { CtpatStatus } from "@/features/ctpats/constants/statusCodes";
import PackingListDetailPage from "@/features/packing-List/components/PackingListDetailPage";

export default function FlowCtpatSteps() {
  const params = useParams();
  const id = params.id!;
  const ctpatId = Number(id);
  // const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ctpat", ctpatId],
    queryFn: () => getCtpatByIdAPI(ctpatId),
    enabled: !isNaN(ctpatId),
  });

  // const updateStatusMutation = useMutation({
  //   mutationFn: (status: CtpatStatus) => updateCtpatStatusAPI(ctpatId, status),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["ctpat", ctpatId] });
  //   },
  // });

  if (isLoading) return <Spinner />;
  if (isError || !data) return <p>Error al cargar CTPAT</p>;

  const ctpat = data.response;

  const stepsMap = (ctpatId: number): Record<CtpatStatus, React.ReactNode> => ({
    1: <CreateUploadImages nextStatus={2} />,

    2: <CreatePackingList />, // al crear, backend pasa a status 3

    3: <PackingListDetailPage
          ctpatId={ctpat.id}
          onContinue={() => updateStatusMutation.mutate(4)}
        />,
    4: <CheckListPage ctpatId={ctpatId} />,

    5: <CreateCtpatAssignment ctpatId={ctpatId} />,

    6: <CreateUploadImages nextStatus={7} />,

    7: <CloseCtpat ctpatId={ctpatId} />,

    8: <p className="text-center text-xl font-semibold mt-10">CTPAT Cerrado</p>,
  });

  const status = ctpat.status as CtpatStatus;

  return (
    stepsMap(ctpatId)[status] ?? <p>Estado desconocido o no implementado</p>
  );
}
