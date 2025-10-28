import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EditCarrierForm from "@/components/forms/EditCarrierForm";
import { getCarrierByIdAPI } from "@/api/CarriersAPI";
export default function EditContainerView() {
    const {containerId} = useParams();

    const {data, isLoading, isError} = useQuery({
        queryKey:["editCarrier", containerId],
        queryFn: () => getCarrierByIdAPI(Number(containerId)),
        retry: 1,
    })
      if (isLoading) return <p>Cargando datos...</p>;
      if (isError) return <Navigate to="/404" />;
      console.log(data);
    
      return data ? <EditCarrierForm data={data} /> : null;
}