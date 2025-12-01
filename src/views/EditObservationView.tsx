import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getObservationByIdAPI } from "@/api/Observations"
import { Navigate } from "react-router-dom"
import EditObservationForm from "@/components/forms/EditObservationForm"

export default function EditObservationView() {
  const params = useParams()
  const observationId = params.observationId!

  const { data, isLoading, isError } = useQuery({
      queryKey: ["editObservation", observationId],
      queryFn: () => getObservationByIdAPI(+observationId),
      retry: false,
  });
  if (isLoading) return <div>Loading...</div>
  if (isError) return <Navigate to='/404'/>

  if (data) return <EditObservationForm data={data.response} observationId={+observationId}/>

}
