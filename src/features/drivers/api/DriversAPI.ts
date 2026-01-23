import type { DriverFormData,EditDriverFormData } from "@/features/drivers/schemas/types";
import { getDriversSchema } from "@/features/drivers/schemas/types";
import api from "@/shared/api/axios";
import { isAxiosError } from "axios";

export async function createDriverAPI(formData: DriverFormData) {
  try {
    const { data } = await api.post("/drivers", formData);
      return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
       throw new Error(error.response.data.message)
    }
  }
}

export async function getDriverAPI(page: number = 1) {
  try {
    const limit = 10;
    const offset = page;
    const { data } = await api.get("/drivers", { params: { limit, offset } });
    const response = getDriversSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
       throw new Error(error.response.data.message)
    } 
  }
}

export async function getDriverByIdAPI(id: number) {
  try {
    const { data } = await api.get(`/drivers/${id}`);
    return data;
  } catch (error) {
      if (isAxiosError(error) && error.response) {
       throw new Error(error.response.data.message)
    }
  }
}

type DriverAPIType = {
  formData: EditDriverFormData
  driverId: number
}
export async function updateDriver({ formData, driverId }: DriverAPIType) {
  try {
    const { data } = await api.patch(`/drivers/${driverId}`, formData);
      return data; 
  } catch (error) {
    if (isAxiosError(error) && error.response) {
       throw new Error(error.response.data.message)
    }
  }
}

