import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDriverByIdAPI } from "@/api/DriversAPI";
import EditDriverForm from "@/components/forms/EditDriverForm";

export default function EditDriver() {
  const params = useParams();
  const driverId = params.driverId!
  console.log("EditDriver - driverId:", driverId);

  const { data, isLoading, isError} = useQuery({
    queryKey: ["editDriver", driverId],
    queryFn: () => getDriverByIdAPI(Number(driverId)),
    retry: 1,
  });

  if (isLoading) return <p>Cargando datos...</p>;
  if (isError) return <Navigate to='/404'/>;
  if(data) return<EditDriverForm data={data} driverId={driverId}  />
}
