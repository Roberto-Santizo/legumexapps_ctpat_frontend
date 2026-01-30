import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import type {CreateJuiceItemFormData, EditJuicePackingListItemFormData, JuiceItemTableType} from "@/features/juice-Items/schema/juiceItemType"

export async function createJuiceItemAPI(ctpatId: number, formData:CreateJuiceItemFormData) {
    try {
        const {data} = await api.post(`/packing-list-juice/addItem/${ctpatId}`,formData )
        return data
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.message)
        }
    }
}

// Obtener los items de juice por ctpatId y parsear la respuesta
export async function getJuiceItemsAPI(ctpatId: number): Promise<JuiceItemTableType[]> {
    try {
        const {data} = await api.get(`/packing-list-juice/getPackingListJuiceItems/${ctpatId}`)

        // La respuesta tiene estructura: { statusCode, response: [{ "ClientName": [...items], "totals": {...} }] }
        if (data?.statusCode === 200 && Array.isArray(data.response)) {
            const items: JuiceItemTableType[] = [];

            data.response.forEach((group: Record<string, unknown>) => {
                Object.entries(group).forEach(([key, value]) => {
                    // Ignorar "totals", solo procesar los items de clientes
                    if (key !== 'totals' && Array.isArray(value)) {
                        value.forEach((item: JuiceItemTableType) => {
                            items.push({
                                ...item,
                                client_name: key
                            });
                        });
                    }
                });
            });

            return items;
        }

        return [];
    } catch (error) {
        if(isAxiosError(error) && error.response){
           throw new Error(error.response.data.message)
        }
        return [];
    }
}


type JuiceItemAPIType = {
    ctpatId: number
    juiceItemId: number
    formData: EditJuicePackingListItemFormData
}

export async function updateJuiceItemAPI({ctpatId, juiceItemId , formData}: JuiceItemAPIType) {
    try {
        const {data} = await api.patch(`/packing-list-juice/editItem/${ctpatId}/${juiceItemId}`,formData)
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

// Obtener los items agrupados con totales por grupo para el documento PDF
export async function getJuiceItemsGroupedAPI(ctpatId: number) {
    try {
        const {data} = await api.get(`/packing-list-juice/getPackingListJuiceItems/${ctpatId}`)
        // Retornar la respuesta raw con estructura agrupada para el documento
        if (data?.statusCode === 200 && Array.isArray(data.response)) {
            return data.response;
        }
        return [];
    } catch (error) {
        if(isAxiosError(error) && error.response){
           throw new Error(error.response.data.message)
        }
        return [];
    }
}