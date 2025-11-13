import type { DriverFormData,EditDriverFormData,CreateDriver } from "@/schemas/types.ts";
import { getDriversSchema } from "@/schemas/types.ts";
import api from "../components/config/axios.ts";
import { isAxiosError } from "axios";

export async function createDriverAPI(formData: DriverFormData) {
  try {
    const { data } = await api.post("/drivers", formData);
    const message = data.message || "Operación realizada correctamente";
    if ([200, 201].includes(data.statusCode)) {
      return { success: true, message, response: data.response };
    }
    throw new Error(message);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const backendData = error.response.data || {};
      const message =
        backendData.message ||
        backendData.error ||
        "Error desconocido al crear el piloto";
      throw new Error(message);
    }
    throw new Error("Error al conectar con el servidor");
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
      console.error("Error en getDriverAPI", error.response.data);
    } else {
      console.error("Error desconocido en getRoleAPI:", error);
    }
    throw error;
  }
}

export async function getDriverByIdAPI(id: CreateDriver["id"]) {
  try {
    const { data } = await api.get(`/drivers/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getDriverByIdAPI", error.response.data);
    } else {
      console.error("Error desconocido en getDriverByIdAPI:", error);
    }
    throw error;
  }
}

type DriverAPIType = {
  formData: EditDriverFormData
  driverId: CreateDriver["id"]
}
export async function updateDriver({ formData, driverId }: DriverAPIType) {
  try {
    const { data } = await api.patch(`/drivers/${driverId}`, formData);
    if (data?.statusCode === 201) {
      return data; 
    }
    throw new Error(data?.message || "Error desconocido en la actualización del piloto");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const backendMessage = error.response.data?.message || "Error desconocido desde el servidor";
      throw new Error(backendMessage);
    }
    throw error;
  }
}

