import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import type { UserFormDataSchema,UpdateUserPasswordSchema} from "@/features/users/schemas/types";
import {getUserSchema } from "@/features/users/schemas/types";


export async function createUserAPI(formData: UserFormDataSchema) {
  try {
    const { data } = await api.post("/auth/register", formData);
      return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export async function getUsersAPI(page: number = 1) {
  try {
    const limit = 10;
    const offset = page;
    const { data } = await api.get("/users", { params: { limit, offset } });
    const response = getUserSchema.safeParse(data);

    if (!response.success) {
      console.error("Error de validación:", response.error.issues);
      throw new Error("Error al validar los datos de usuarios");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

type UpdateUserPasswordAPI = {
  userId: number;
  newPassword: UpdateUserPasswordSchema;
}
export async function updateUserPasswordAPI({userId,newPassword}:UpdateUserPasswordAPI) {
  try {
    const {data} = await api.post(`/auth/change-password/${userId}`, {newPassword});
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response){
      throw new Error (error.response.data.message);
    }
  }
} 