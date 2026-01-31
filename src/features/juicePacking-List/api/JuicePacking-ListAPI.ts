
import api from "@/shared/api/axios"
import { isAxiosError} from "axios"
import type {CreateJuicePackingListFormData} from "@/features/juicePacking-List/schema/juicePackingListType"
import { juicePackingListResponseSchema } from "@/features/juicePacking-List/schema/juicePackingListType"

export async function createJuicePackingListAPI(ctpatId:number, formData: CreateJuicePackingListFormData ) {
    try {
        const {data} = await api.post(`/packing-list-juice/${ctpatId}`,formData)
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.message)
        }
    }
}


export async function getJuicePackingListAPI(ctpatId: number) {
    try {
        const {data} = await api.get(`packing-list-juice/${ctpatId}`)
        const response = juicePackingListResponseSchema.safeParse(data.response)
        if(response.success){
            return response.data
        }
        return null;
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.message)
        }
    }
}
