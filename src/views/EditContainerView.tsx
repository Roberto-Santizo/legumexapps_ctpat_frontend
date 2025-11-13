import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EditContainerForm from "@/components/forms/EditContainerForm";
import {getContainerByIdAPI} from "@/api/ContainerAPI"
export default function EditContainer() {
  const params = useParams();
  const containerId = params.containerId!
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editContainer", containerId],
    queryFn: () => getContainerByIdAPI(Number(containerId)),
    retry: false,
  });

  if (isLoading) return <p>Cargando datos...</p>;
  if (isError) return <Navigate to="/404" />;
  if(data) return <EditContainerForm data={data.response} containerId = {+containerId} />
}
