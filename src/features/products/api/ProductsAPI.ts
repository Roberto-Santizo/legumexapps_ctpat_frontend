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
      console.error(error.response.data);
    } else {
      console.error(error);
    }
    throw error;
  }
}

export async function getProductsForSelectAPI() {
  try {
    const { data } = await api.get("/products");

    const parsed = productSelectResponseSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Formato inválido de productos para el select");
    }

    return parsed.data.response; 
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}


export async function getProductByIdAPI(id: number) {
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
  formData: ProductUpdateData;
  productId: number;
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
