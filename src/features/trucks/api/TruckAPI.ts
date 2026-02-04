import api from "@/shared/api/axios"
import { isAxiosError } from "axios";
import type { TruckCreateData,TruckUpdateData } from "@/features/trucks/schemas/types";
import { getTruckSchema, truckSelectSchema } from "@/features/trucks/schemas/types";

export async function createTruckAPI(formData: TruckCreateData) {
  try {
    const { data } = await api.post("/truck", formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function getTrucksAPI(page: number = 1){
    try {
    const limit = 10;
    const offset = page;
    const { data } = await api.get("/truck", { params: { limit, offset } });
    const response = getTruckSchema.safeParse(data);

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

export async function getTruckByIdAPI(truckId: number){
  try {
    const {data} = await api.get(`/truck/${truckId}`);
    return data;
  } catch (error) {

    if (isAxiosError(error) && error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
    throw error;
  }
  
}

type TruckAPIType = {
  formData: TruckUpdateData
  truckId: number
}
export async function updateTruckAPI({ formData, truckId }: TruckAPIType) {
  try {
    const { data } = await api.patch(`/truck/${truckId}`, formData);
    if (data) {
      return data;
    }
    throw new Error(data?.message);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const backendMessage = error.response.data?.message;
      throw new Error(backendMessage);
    }
    throw error;
  }
}

// Endpoint para select sin paginación
export async function getTrucksForSelectAPI() {
  try {
    const { data } = await api.get("/truck");

    const parsed = truckSelectSchema.array().safeParse(data.response);

    if (!parsed.success) {
      throw new Error("Formato inválido de camiones para el select");
    }

    return parsed.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

