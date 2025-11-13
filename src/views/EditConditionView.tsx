import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EditConditionForm from "@/components/forms/EditConditionForm";
import { getConditionByIdAPI } from "@/api/ConditionsAPI";

export default function EditCondition() {
  const { conditionId } = useParams();

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
