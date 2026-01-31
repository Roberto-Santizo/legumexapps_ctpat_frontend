import api from "@/shared/api/axios";
import type {CreatePackignListFormData} from "@/features/packing-List/schemas/types";
import { isAxiosError } from "axios";
import  {responsePackingListSchema} from "@/features/packing-List/schemas/types";


export async function createFrozenPackingListAPI(ctpatId: number, formData: CreatePackignListFormData) 
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
export async function getFrozenPackingList(ctpatId: number){
  try {
    const { data } = await api.get(`packing-list/${ctpatId}`);
    const response = responsePackingListSchema.safeParse(data.response);

    if (response.success) {
      return response.data;
    }
    return null;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

