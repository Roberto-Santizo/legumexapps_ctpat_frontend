import api from "../components/config/axios";
import type { CarrierFormData } from "../schemas/types";
import { isAxiosError } from "axios";
import { getCarrierSchema } from "../schemas/types";
import type {createCarrierFormSchema} from "@/schemas/types"

export async function createCarriersAPI(formData: createCarrierFormSchema) {
  try {
    const { data } = await api.post("/carriers",formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al crear el contenedor"
      );
    }
    throw error;
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
    } else {
      console.error("Error desconocido en getCarriersAPI:", error);
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
      console.error("Error en getCarrierByIdAPI", error.response.data);
    }else{
      console.error("Error en getCarrierById", error);
    }
    throw error;
  }
}

