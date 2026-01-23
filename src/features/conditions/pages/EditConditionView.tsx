import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EditConditionForm from "@/features/conditions/components/EditConditionForm";
import { getConditionByIdAPI } from "@/features/conditions/api/ConditionsAPI";

export default function EditCondition() {
  const params = useParams()
  const  conditionId  = Number(params.conditionId);


  const { data, isError, isLoading } = useQuery({
    queryKey: ["editCondition", conditionId],
    queryFn: () => getConditionByIdAPI(Number(conditionId)),
    enabled: !!conditionId,
  });

  if (isLoading) return <p>Cargando información...</p>;
  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <EditConditionForm
        data={data.response}
        conditionId={Number(conditionId)}
      />
    );

  return null;
}
