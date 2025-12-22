import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EditCarrierForm from "@/features/carriers/components/EditCarrierForm";
import { getCarrierByIdAPI } from "@/features/carriers/api/CarriersAPI";

export default function EditCarrierView() {
  const params = useParams();
  const id = params.id!

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editCarrier", id],
    queryFn: () => getCarrierByIdAPI(Number(id)),
    retry: 1,
  });

  if (isLoading) return <p>Cargando datos...</p>;
  if (isError || !data) return <Navigate to="/404" />;
  if(data?.response)

  return (<EditCarrierForm data = {data.response} id = {Number(id)} />);
  
}
