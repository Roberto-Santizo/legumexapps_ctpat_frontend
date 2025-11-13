import api from "@/components/config/axios"
import { isAxiosError } from "axios";
import type {ProductFormData, GetProductFormData,Product, EditProductFormData}from "@/schemas/types"

export async function createProdutAPI(formData: ProductFormData) {
    try {
        const {data } = await api.post('/products', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getProductAPI(page: number = 1): Promise<GetProductFormData> {
  try {
    const limit = 10;
    const offset = page;

    const {data} = await api.get("/products", {
      params: { limit, offset },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getProductAPI:", error.response.data);
    } else {
      console.error("Error desconocido en getProductAPI:", error);
    }
    throw error;
  }
}

export async function getProductByIdAPI(id: Product['id']) {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getProductByIdAPI", error.response.data);
    } else {
      console.error("Error desconocido en getProductByIdAPI:", error);
    }
    throw error;
  }
}

type ProductAPIType ={
  formData: EditProductFormData;
  productId: Product['id'];
}
export async function updateProductAPI({ formData, productId }: ProductAPIType) {
  try {
    const { data } = await api.patch<{ message: string }>(
      `/products/${productId}`,
      formData
    );
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error desconocido al actualizar el producto');
  }
}
