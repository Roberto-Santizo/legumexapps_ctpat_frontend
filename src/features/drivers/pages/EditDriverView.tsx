import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDriverByIdAPI } from "@/features/drivers/api/DriversAPI";
import EditDriverForm from "@/features/drivers/components/EditDriverForm";

export default function EditDriver() {
  const params = useParams();
  const driverId = params.driverId! //(!)This helps to confirm that driverId will olways be present

  const { data, isLoading, isError} = useQuery({
    queryKey: ["editDriver", driverId],
    queryFn: () => getDriverByIdAPI(+driverId),
    retry: 1,
  });

  if (isLoading) return <p>Cargando datos...</p>;
  if (isError) return <Navigate to='/404'/>;
  if (data?.response)
  return <EditDriverForm data={data.response} driverId={+driverId} />;

}
