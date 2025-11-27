import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EditTruckForm from "@/components/forms/EditTruckForm";
import { getTruckByIdAPI } from "@/api/TruckAPI";

export default function EditTruckView() {
  const { truckId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editTruck", truckId],
    queryFn: () => getTruckByIdAPI(+truckId!),
    retry: 1,
  });

  if (isLoading) return <p>Cargando datos...</p>;
  if (isError) return <Navigate to="/404" />;

  return <EditTruckForm data={data.response} truckId={+truckId!} />;
}
