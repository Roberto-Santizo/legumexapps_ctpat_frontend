import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDriverByIdAPI } from "@/api/DriversAPI";
import EditContainerForm from "@/components/forms/EditContainerForm";
export default function EditContainer() {
  const { containerId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editContainer", containerId],
    queryFn: () => getDriverByIdAPI(Number(containerId)),
    retry: 1,
  });

  if (isLoading) return <p>Cargando datos...</p>;
  if (isError) return <Navigate to="/404" />;

  return data ? <EditContainerForm data={data} /> : null;
}
