import { useParams, Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import EditTruckForm from "@/features/trucks/components/EditTruckForm";
import { getTruckByIdAPI } from "@/features/trucks/api/TruckAPI";

export default function EditTruckView() {
  const params = useParams()
  const truckId = Number(params.truckId)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editTruck", truckId],
    queryFn: () => getTruckByIdAPI(truckId!),
    retry: 1,
  });

  if (isLoading) return <p>Cargando datos...</p>;
  if (isError) return <Navigate to="/404" />;

  return <EditTruckForm data={data.response} truckId={truckId!} />;
}
