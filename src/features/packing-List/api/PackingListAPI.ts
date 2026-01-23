import api from "@/shared/api/axios";
import type {PackignListFormData} from "@/features/packing-List/schemas/types";
import { isAxiosError } from "axios";
import  {getPackingListSchema} from "@/features/packing-List/schemas/types";
import type {PackingListFormData} from "@/features/packing-List/schemas/types";


export async function createPackingListAPI(ctpatId: number, formData: PackignListFormData) 
{
  try {
    const { data } = await api.post(`/packing-list/${ctpatId}`, formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
       
         throw new Error(error.response.data.message);
    }
    throw error;
  }
}
export async function getPackingListById(ctpatId: number): Promise<PackingListFormData> {
  try {
    const { data } = await api.get(`packing-list/${ctpatId}`);
    const response = getPackingListSchema.safeParse(data.response);

    if (!response.success) {
      throw new Error("Respuesta inválida del servidor");
    }
    return response.data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

