import api from "@/shared/api/axios"
import { isAxiosError } from "axios";
import type {ProductCreateData, ProductUpdateData,} from "@/features/products/schemas/types"
import { getProductSchema} from "@/features/products/schemas/types";
import { productSelectResponseSchema } from "@/features/products/schemas/types";

export async function createProdutAPI(formData: ProductCreateData) {
    try {
        const {data } = await api.post('/products', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getProductAPI(page: number = 1) {
  try {
    const limit = 10;
    const offset = page;

    const {data} = await api.get("/products", {params: { limit, offset }});
    const response = getProductSchema.safeParse(data);
      if (response.success) {
        return response.data;
      }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    } 
  }
}

export async function getProductsForSelectAPI() {
  try {
    const { data } = await api.get("/products");

    const parsed = productSelectResponseSchema.safeParse(data);
    return parsed.data?.response

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}


export async function getProductByIdAPI(id: number) {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getProductByIdAPI", error.response.data);
    } 
    throw error;
  }
}

type ProductAPIType ={
  formData: ProductUpdateData;
  productId: number;
}
export async function updateProductAPI({ formData, productId }: ProductAPIType) {
  try {
    const { data } = await api.patch( `/products/${productId}`, formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
