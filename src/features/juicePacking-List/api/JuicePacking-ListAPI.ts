
import api from "@/shared/api/axios"
import { isAxiosError} from "axios"
import type {CreateJuicePackingListFormData} from "@/features/juicePacking-List/schema/juicePackingListType"
import {juicePackingListWithItemsSchema} from "@/features/juicePacking-List/schema/juicePackingListType"

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

/**
 * Obtiene el packing list de jugos por ID del packing list
 * NOTA: Este endpoint usa el ID del packing list, no del CTPAT
 */
export async function getJuicePackingListAPI(packingListId: number) {
    try {
        const {data} = await api.get(`packing-list-juice/${packingListId}`)

        // El backend puede retornar diferentes estructuras según el endpoint
        let packingListData = data

        // Si viene en data.response, extraerlo
        if (data.response) {
            packingListData = data.response
        }

        // Mapear campos si es necesario
        const mappedData = {
            id: packingListData.id,
            box_type: packingListData.box_type,
            order: packingListData.order,
            customer: packingListData.client || packingListData.customer,
            thermograph_no: packingListData.no_thermograph || packingListData.thermograph_no,
            items: packingListData.items || []
        }

        const response = juicePackingListWithItemsSchema.safeParse(mappedData)

        if(response.success){
            return response.data
        }

        // Si la validación falla, retornar los datos mapeados
        return mappedData
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.message)
        }
    }

}

/**
 * Obtiene el packing list de jugos asociado a un CTPAT ID
 * Usado en JuicePackingListReviewStep para el flujo dinámico
 *
 * Endpoint real del backend: GET /api/packing-list-juice/:ctpatId
 * La respuesta viene en data.responses, no directamente en data
 */
export async function getJuicePackingListByCtpatIdAPI(ctpatId: number) {
    try {
        const {data} = await api.get(`/packing-list-juice/${ctpatId}`)

        // El backend retorna { statusCode, response: {...} } - SINGULAR
        if (!data.response) {
            throw new Error("No se encontró el packing list de jugos para este CTPAT")
        }

        // Mapear los campos del backend a los nombres que espera el frontend
        const mappedData = {
            id: data.response.id,
            box_type: data.response.box_type,
            order: data.response.order,
            customer: data.response.client, // Backend usa "client"
            thermograph_no: data.response.no_thermograph, // Backend usa "no_thermograph"
            items: data.response.items || []
        }

        // Validar con el schema
        const response = juicePackingListWithItemsSchema.safeParse(mappedData)

        if(response.success){
            return response.data
        }

        // Si la validación falla, retornar los datos mapeados sin validar
        return mappedData
    } catch (error) {
        if(isAxiosError(error)&& error.response){
            throw new Error(error.response.data.message || "Error al obtener packing list de jugos")
        }
        throw error
    }
}
