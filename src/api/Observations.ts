import api from "@/components/config/axios";
import { isAxiosError  } from "axios";
import type { ObservationCreateData } from "@/schemas/types"
import { observationSchema,getObservationSchema } from "@/schemas/types"
import type { ObservationUpdateData } from "@/schemas/types";


export async function createObservationAPI(data: ObservationCreateData) {
    try {
        const parseData = observationSchema.parse(data);
        const response = await api.post("/observations", parseData);
        return response.data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            const message = error.response?.data?.message ?? "Error al crear la observación";
            throw new Error (message);
        }
        throw error;
    }
}

export async function getObservationsAPI(page: number = 1) {
    try {
        const limit = 10;
        const offset = page;

        const response = await api.get("/observations", {params: { limit, offset }});
        const parsed = getObservationSchema.parse(response.data);
        
        return parsed;

    } catch (error) {
        if(isAxiosError(error) && error.response){
            const message = error.response?.data?.message ?? "Error al obtener las observaciones";
            throw new Error (message);
        }
        throw error;
    }
}

export async function getObservationByIdAPI(id: number){
    try {
        const {data} = await api.get(`/observations/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response){
            const message = error.response?.data?.message ?? "Error al obtener la observación";
            throw new Error (message);
        }
        throw error;
    }
}


type ObservationAPIType = {
    formData: ObservationUpdateData;
    observationId: number;
}
export async function updateObservationAPI({formData,observationId}: ObservationAPIType) {
    try {
        const {data} = await api.patch<{message: string}>(`/observations/${observationId}`, formData);
        return data.message;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
    }
    }
}