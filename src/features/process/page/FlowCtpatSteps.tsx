import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {getCtpatByIdAPI} from "@/features/ctpats/api/CtpatsAPI";
import { Spinner } from "@/shared/components/Spinner";
import React from "react";
import CreatePackingList from "@/features/packing-List/pages/CreatePackingList";
import CreateCtpatAssignment from "@/features/ctpats/pages/CreateCtpatAssignment";
// import CreateUploadImages from "@/features/upload-images/pages/CreateUploadImages";
import CheckListPage from "@/features/checkLists/pages/CheckListPage";
import CloseCtpat from "@/features/ctpats/pages/CloseCtpat";
import type { CtpatStatus } from "@/features/ctpats/constants/statusCodes";
// import PackingListWithImagesStep from "@/features/packing-List/components/PackingListSection";
import PackingListReviewStep from "@/features/packing-List/pages/PackingListReviewStep"
import { useUpdateCtpatStatus } from "@/features/ctpats/hooks/useUpdateCtpatStatus";
import FinalContainerImages from "@/features/ctpats/components/FinalContainerImages";

 
export default function FlowCtpatSteps() {
  const params = useParams();
  const ctpatId = Number(params.id);

    const updateStatusMutation = useUpdateCtpatStatus();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ctpat", ctpatId],
    queryFn: () => getCtpatByIdAPI(ctpatId),
    enabled: !isNaN(ctpatId),
  });

  if (isLoading) return <Spinner />;
  if (isError || !data) return <p>Error al cargar CTPAT</p>;

  const ctpat = data.response;

  const stepsMap = (ctpatId: number): Record<CtpatStatus, React.ReactNode> => ({
    1: <CreatePackingList/>,
    2: (
          <PackingListReviewStep
            ctpatId={ctpat.id}
            onContinue={() =>
              updateStatusMutation.mutate({
                id: ctpat.id,
                status: 3,
              })
            }
          />
        ),
    3: <CheckListPage ctpatId={ctpatId} />,

    4: <CreateCtpatAssignment ctpatId={ctpatId} />,

    5: <FinalContainerImages ctpatId={ctpatId} />,

    6: <CloseCtpat ctpatId={ctpatId} />,

    7: <p className="text-center text-xl font-semibold mt-10">CTPAT Cerrado</p>,
  });

  const status = ctpat.status as CtpatStatus;

  return (
    stepsMap(ctpatId)[status] ?? <p>Estado desconocido o no implementado</p>
  );
}
