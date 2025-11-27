import api from "@/components/config/axios"
import { isAxiosError } from "axios";
import type { TruckCreateData } from "@/schemas/types";
import { getTruckSchema } from "@/schemas/types";
import type { TruckUpdateData } from "@/schemas/types";

export async function createTruckAPI(formData: TruckCreateData) {
  try {
    const { data } = await api.post("/truck", formData);
    return {
      message: data.message,
      statusCode: data.statusCode
    };
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
    const { data } = await api.patch(`/drivers/${truckId}`, formData);
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

