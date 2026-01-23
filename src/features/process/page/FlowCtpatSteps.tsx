import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {getCtpatByIdAPI} from "@/features/ctpats/api/CtpatsAPI";
import { Spinner } from "@/shared/components/Spinner";
import React from "react";
import CreateCtpatAssignment from "@/features/ctpats/pages/CreateCtpatAssignment";
import CheckListPage from "@/features/checkLists/pages/CheckListPage";
import CloseCtpat from "@/features/ctpats/pages/CloseCtpat";
import type { CtpatStatus } from "@/features/ctpats/constants/statusCodes";
import DynamicPackingListReview from "@/features/process/components/DynamicPackingListReview";
import { useUpdateCtpatStatus } from "@/features/ctpats/hooks/useUpdateCtpatStatus";
import FinalContainerImages from "@/features/ctpats/components/FinalContainerImages";

import { getProductConfigById } from "../control flow/productConfig";
import type { ProductTypeId } from "../control flow/productTypes";

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

  // Obtener el tipo de producto del CTPAT (1 = FROZEN, 2 = JUICE)
  const productTypeId: ProductTypeId = ctpat.type || 1;
  const config = getProductConfigById(productTypeId);

  // Extraer el componente de creación de packing list
  const CreatePackingListComponent = config.createPackingListComponent;

  const stepsMap: Record<CtpatStatus, React.ReactNode> = {
    // STATUS 1: DINÁMICO - Crea packing list según tipo de producto
    // Si type=1 → CreatePackingList (frozen)
    // Si type=2 → CreatePackingListView (juice)
    1: <CreatePackingListComponent />,

    //STATUS 2: DINÁMICO - Revisa y agrega items según tipo de producto
    // Si type=1 → PackingListReviewStep (frozen)
    // Si type=2 → JuicePackingListReviewStep (juice)
    2: (
      <DynamicPackingListReview
        ctpatId={ctpat.id}
        onContinue={() =>
          updateStatusMutation.mutate({
            id: ctpat.id,
            status: 3,
          })
        }
      />
    ),

    3: <CheckListPage ctpatId={ctpat.id} />,

    4: <CreateCtpatAssignment ctpatId={ctpat.id} />,

    5: <FinalContainerImages ctpatId={ctpat.id} />,

    6: <CloseCtpat ctpatId={ctpat.id} />,

    7: <p className="text-center text-xl font-semibold mt-10">CTPAT Cerrado</p>,
  };


  const status = ctpat.status as CtpatStatus;

  return (
    stepsMap[status] ?? <p>Estado desconocido o no implementado</p>
  );
}
