import api from "@/shared/api/axios";
import { isAxiosError } from "axios";

export async function checkStatusAPI() {
  try {
    const { data } = await api.get("/auth/check-status");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Token inválido");
    }
    throw error;
  }
}

