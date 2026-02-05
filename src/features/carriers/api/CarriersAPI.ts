import api from "@/shared/api/axios.ts";
import type { CarrierFormData } from "@/features/carriers/schemas/types.ts";
import { isAxiosError } from "axios";
import { getCarrierSchema } from "@/features/carriers/schemas/types.ts";
import type {createCarrierFormSchema,CarrierUpdateData} from "@/features/carriers/schemas/types.tsx"

export async function createCarriersAPI(formData: createCarrierFormSchema) {
  try {
    const { data } = await api.post("/carriers",formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message
      );
    }
  }
}

export async function getCarriersAPI(
  page: number = 1
): Promise<CarrierFormData> {
  try {
    const limit = 10;
    const offset = page;

    const { data } = await api.get("/carriers", {
      params: { limit, offset },
    });
    const parsedData = getCarrierSchema.parse(data);
    return parsedData;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getCarriersAPI:", error.response.data);
    } 
    throw error;
  }
}

export async function getCarrierSelectAPI(): Promise<CarrierFormData> {
  try {
    const { data } = await api.get("/carriers");
    const parsedData = getCarrierSchema.parse(data);
    return parsedData;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getCarriersAPI:", error.response.data);
    } 
    throw error;
  }
}
export async function getCarrierByIdAPI(id: number){
  try {
    const {data} = await api.get(`/carriers/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export type CarrierAPIType = {
  formData: CarrierUpdateData;
  id : number;
}
export async function updateCarrierAPI({ formData, id }: CarrierAPIType) {
  try {
    const {data} = await api.patch(`/carriers/${id}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response){
      throw new Error (error.response.data.message);
    }
  }
}
