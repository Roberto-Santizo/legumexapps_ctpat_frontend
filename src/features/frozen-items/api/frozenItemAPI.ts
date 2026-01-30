import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import type {AddItemToPackingListFormData} from "@/features/frozen-items/schema/frozenItemType";
import type {EditPackingListItemFormData} from "@/features/frozen-items/schema/frozenItemType";
import {frozenItemsArraySchema} from "@/features/frozen-items/schema/frozenItemType"
export async function addItemToPackingListAPI(ctpatId:number, formData: AddItemToPackingListFormData) {
  try {
    const { data } = await api.post(`/packing-list/addItem/${ctpatId}`, formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export type UpdatePackingListItemAPIType = {
  ctpatId: number;
  itemId: number;
  formData: EditPackingListItemFormData;
};

export async function updatePackingListItemAPI({ctpatId, itemId,formData,}: UpdatePackingListItemAPIType) {
  try {
    const { data } = await api.patch(`/packing-list/editItem/${ctpatId}/${itemId}`,formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function deleteItemAPI(packingListItemId:number) {
  try {
    const {data} = await api.delete(`/packing-list/deleteItem/${packingListItemId}`);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
export async function getfrozenItemsAPI(ctpatId: number) {
  try {
    const {data} = await api(`/packing-list/getPackingListItems/${ctpatId}`)
    const response = frozenItemsArraySchema.safeParse(data.response)
    if(response.success){
      return response.data
    }
    console.error("Schema validation failed for frozen items:", response.error.format());
    console.log("Received data:", data);
    return [];
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.message)
    }
  }
}

export async function getItemByIdAPI(itemId: number): Promise<AddItemToPackingListFormData> {
  try {
    const { data } = await api.get(`/packing-list/getItem/${itemId}`);
    return data.response;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}
