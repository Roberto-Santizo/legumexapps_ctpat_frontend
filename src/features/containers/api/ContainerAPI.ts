import { isAxiosError } from "axios";
import api from "@/shared/api/axios.ts";
import type {ContainerFormData,GetContainerFormData,Container} from "@/features/containers/schemas/types"

export async function createContainerAPI(formData: ContainerFormData) {
  try {
    const { data } = await api.post("/containers", formData);
      return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
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
     throw new Error(error.response.data.message)
    } 
  }
}

type ContainerAPIType ={
  formData: ContainerFormData;
  containerId: Container['id'];
}
export async function updateContainerAPI({formData,containerId}:ContainerAPIType ) {
  try {
    const { data } = await api.patch(`/containers/${containerId}`, formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response){
      throw new Error (error.response.data.message)
    }
  }
  
}