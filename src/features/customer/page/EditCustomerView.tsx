import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { getCustumerByIdAPI } from "@/features/customer/api/CustomerAPI";
import EditCustomerForm from "@/features/customer/component/EditCustomerForm";


export default function EditCustomerView() {
  const params = useParams()//remember that useParams always returns string | undefined
  const customerId = Number(params.customerId)

  const {data, isLoading,isError} = useQuery({
    queryKey: ['editCustomers',customerId],
    queryFn: () => getCustumerByIdAPI(customerId),
    retry: false,
  })

  if (isLoading) return "Cargando datos del cliente...";
  if(isError) return <Navigate to='/404'/>

  if(data) return <EditCustomerForm data = {data} customerId = {customerId} />
}
