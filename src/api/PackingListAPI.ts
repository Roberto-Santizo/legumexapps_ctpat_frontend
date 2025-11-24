import api from "@/components/config/axios";
import type {PackignListFormData} from "@/schemas/types"
import { isAxiosError } from "axios";


export async function createPackingListAPI(ctpatId: number, formData: PackignListFormData) 
{
  try {
    const { data } = await api.post(`/packing-list/${ctpatId}`, formData);
    return {
      message: data.message,
      statusCode: data.statusCode
    };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
       const backendMessage = error.response.data.message;
       
      throw new Error(backendMessage);
    }
    throw error;
  }
}

