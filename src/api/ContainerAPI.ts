import { isAxiosError } from "axios";
import api from "../components/config/axios";
import type {GetContainersResponse} from "../schemas/types"
import type {CreateContainerFormData} from "@/schemas/types"
import {ContainerSchema} from "@/schemas/types"

export async function createContainerAPI(formData:CreateContainerFormData ) {
  try {
    const { data } = await api.post("/containers", formData);
      const parsedData = ContainerSchema.parse(data);
    return parsedData;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error al crear el contenedor");
    }
    throw error;
  }
}

export async function getContainerAPI(page: number = 1): Promise<GetContainersResponse> {
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

export async function getContainerByIdAPI(id: number) {
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
