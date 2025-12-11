import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import type { UserFormDataSchema} from "@/features/users/schemas/types";
import {getUserSchema } from "@/features/users/schemas/types";


export async function createUserAPI(formData: UserFormDataSchema) {
  try {
    const { data } = await api.post("/auth/register", formData);
      return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const backendData = error.response.data || {};
      const message =
        backendData.message ||
        backendData.messagge ||
        backendData.error ||
        "Error desconocido";
      throw new Error(message);
    }
    throw new Error("Error al conectar con el servidor");
  }
}

export async function getUsersAPI(page: number = 1) {
  try {
    const limit = 10;
    const offset = page;
    const { data } = await api.get("/users", { params: { limit, offset } });
    const response = getUserSchema.safeParse(data);
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
