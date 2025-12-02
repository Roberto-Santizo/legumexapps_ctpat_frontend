import { isAxiosError } from "axios";
import api from "@/shared/api/axios.ts";
import type {ContainerFormData,GetContainerFormData,Container} from "@/features/containers/schemas/types"

export async function createContainerAPI(formData: ContainerFormData) {
  try {
    const { data } = await api.post("/containers", formData);
    if ([201].includes(data.statusCode)) {
      return {
        success: true,
        message: data.message || "Operación realizada correctamente",
      };
    }
    throw new Error(data.message || "Error desconocido al crear el contenedor");

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const backendData = error.response.data || {};
      const message =
        backendData.message || backendData.error || "Error al conectar con el servidor";
      throw new Error(message);
    }

    throw new Error("Error desconocido al crear el contenedor");
  }
}

export async function getContainerAPI(page: number = 1): Promise<GetContainerFormData> {
  try {
    const limit = 10;
    const offset = page;

    const { data } = await api.get("/containers", {
      params: { limit, offset },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getContainerAPI:", error.response.data);
    } else {
      console.error("Error desconocido en getContainerAPI:", error);
    }
    throw error;
  }
}

export async function getContainerByIdAPI(id: Container['id']) {
  try {
    const { data } = await api.get(`/containers/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getContainerByIdAPI", error.response.data);
    } else {
      console.error("Error desconocido en getContainerByIdAPI:", error);
    }
    throw error;
  }
}

type ContainerAPIType ={
  formData: ContainerFormData;
  containerId: Container['id'];
}
export async function updateContainerAPI({formData,containerId}:ContainerAPIType ) {
  try {
    const { data } = await api.patch<string>(`/containers/${containerId}`, formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response){
      throw new Error (error.response.data.message)
    }
  }
  
}