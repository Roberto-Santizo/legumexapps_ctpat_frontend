import api from "@/components/config/axios";
import { isAxiosError } from "axios";
import type { UserFormDataSchema} from "@/schemas/typesAdmin";
import {getUserSchema } from "@/schemas/typesAdmin";


export async function createUserAPI(formData: UserFormDataSchema) {
  try {
    const { data } = await api.post("/auth/register", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const backendData = error.response.data;
      const message =
        backendData.message || backendData.messagge || "Error desconocido";
      const statusCode =
        backendData.statusCode || error.response.status || 500;
      const err = Object.assign(new Error(message), { statusCode });
      throw err;
    }
    throw error;
  }
}

export async function getUsersAPI(page: number = 1) {
  try {
    const limit = 10;
    const offset = page;
    const { data } = await api.get("/users", { params: { limit, offset } });

    const response = getUserSchema.safeParse(data);
    console.log(response)
    if (response.success) {
      return response.data;
    }
    throw new Error("Respuesta del servidor no válida");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const backendData = error.response.data;
      const message = backendData.error || backendData.message || "Error desconocido";

      throw new Error(message);
    }
    throw new Error("Error al conectar con el servidor");
  }
}
