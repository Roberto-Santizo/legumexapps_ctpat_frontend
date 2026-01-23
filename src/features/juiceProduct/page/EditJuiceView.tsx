import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { getJuiceByIdAPI } from "../api/JuiceApi";
import EditJuiceForm from "../component/EditJuiceForm";


export default function EditCustomerView() {
  const params = useParams()//remember that useParams always returns string | undefined
  const juiceId = Number(params.id)

  const {data, isLoading,isError} = useQuery({
    queryKey: ['editJuices',juiceId],
    queryFn: () => getJuiceByIdAPI(juiceId),
    retry: false,
  })

  if (isLoading) return "Cargando datos de jugos...";
  if(isError) return <Navigate to='/404'/>

  if(data) return <EditJuiceForm data = {data} juiceId = {juiceId} />
}
