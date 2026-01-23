import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {getProductByIdAPI} from "@/features/products/api/ProductsAPI"
import EditProductForm from "@/features/products/components/EditProductForm"

export default function EditProduct() {
  const params = useParams();
  const productId = Number(params.productId)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProduct", productId],
    queryFn: () => getProductByIdAPI(productId),
    retry: false,
  });

  if (isLoading) return <p>Cargando datos...</p>;
  if (isError) return <Navigate to="/404" />;
  if(data) return <EditProductForm data={data.response} productId = {productId} />
}
