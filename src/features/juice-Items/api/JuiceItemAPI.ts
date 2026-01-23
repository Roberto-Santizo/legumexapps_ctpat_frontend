import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import type {CreateJuiceItemFormData, EditJuicePackingListItemFormData} from "@/features/juice-Items/schema/juiceItemType"
import {itemResponseById} from "@/features/juice-Items/schema/juiceItemType"

export async function createJuiceItemAPI(packingListId: number, formData:CreateJuiceItemFormData) {
    try {
        const {data} = await api.post(`/packing-list-juice/addItem/${packingListId}`,formData )
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.message)
        }
    }
}

export async function getJuiceItemAPI(packingListId:number) {
    try {
        const {data} = await api.get(`/packing-list-juice/getItem/${packingListId}`)
        const response = itemResponseById.safeParse(data)
        if(response.success){
            return response.data
        }
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
           throw new Error(error.response.data.message)
        }
    }
}

export async function getJuiceItemByIdAPI(juiceItemId: number) {
    try {
        const {data} = await api(`/api/packing-list-juice/getItem/${juiceItemId}`)
        const response = itemResponseById.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.message)
        }
    }
}


type JuiceItemAPIType = {
    formData: EditJuicePackingListItemFormData
    juiceItemId: number
    juicePackingListId: number
}

export async function updateJuiceItemAPI({formData, juiceItemId}: JuiceItemAPIType) {
    try {
        const {data} = await api.patch(`/packing-list-juice/editItem/${juiceItemId}`,formData)
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.message)
        }
    }
    
}

export async function deletJuiceItemAPI(juiceItemId: number) {
    try {
        const url = `/packing-list-juice/deleteItem/${juiceItemId}`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.error)
        }
    }
}