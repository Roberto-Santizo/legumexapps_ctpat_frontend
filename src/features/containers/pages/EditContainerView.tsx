import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EditContainerForm from "@/features/containers/components/EditContainerForm";
import {getContainerByIdAPI} from "@/features/containers/api/ContainerAPI"
export default function EditContainer() {
  const params = useParams();
  const containerId = Number(params.containerId)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editContainer", containerId],
    queryFn: () => getContainerByIdAPI(containerId),
    retry: false,
  });

  if (isLoading) return <p>Cargando datos...</p>;
  if (isError) return <Navigate to="/404" />;
  if(data) return <EditContainerForm data={data.response} containerId = {containerId} />
}
