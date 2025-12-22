import api from "@/shared/api/axios";
import type {PackignListFormData} from "@/features/packing-List/schemas/types";
import { isAxiosError } from "axios";
import type {AddItemToPackingListFormData} from "@/features/packing-List/schemas/addItemToPackingList";


export async function createPackingListAPI(ctpatId: number, formData: PackignListFormData) 
{
  try {
    const { data } = await api.post(`/packing-list/${ctpatId}`, formData);
    console.log(data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
       
         throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function addItemToPackingListAPI(id:number, formData: AddItemToPackingListFormData) {
  try {
    const { data } = await api.post(`/packing-list/addItem/${id}`, formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
       
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
