import { isAxiosError } from "axios";
import api from "@/shared/api/axios.ts";
import type {ConditionFormData, GetConditionFormData,Condition} from "@/features/conditions/schemas/types"

export async function createConditionsAPI(formData: ConditionFormData) {
  try {
    const { data } = await api.post("/conditions", formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
      }
  }
}


export async function getConditionAPI(): Promise<GetConditionFormData> {
  try {
    const { data } = await api.get("/conditions", {
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getConditionAPI:", error.response.data);
    } else {
      console.error("Error desconocido en getConditionAPI:", error);
    }
    throw error;
  }
}

export async function getPaginatedConditionAPI(page: number = 1): Promise<GetConditionFormData> {
  try {
    const limit = 10;
    const offset = page;
    const { data } = await api.get("/conditions", {
      params: { limit, offset },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getConditionAPI:", error.response.data);
    } else {
      console.error("Error desconocido en getConditionAPI:", error);
    }
    throw error;
  }
}

export async function getConditionByIdAPI(id: Condition['id']) {
  try {
    const { data } = await api.get(`/conditions/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error (error.response.data.message)
    } 
  }
}

type ConditionAPIType = {
  formData: ConditionFormData;
  conditionId: Condition["id"];
};

export async function updateConditionAPI({ formData, conditionId }: ConditionAPIType) {
  try {
    const { data } = await api.patch<{ statusCode: number; message: string }>(
      `/conditions/${conditionId}`,
      formData
    );
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}