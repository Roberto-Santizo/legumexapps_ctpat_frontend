import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import type {CheckListCreateData,CheckListUpdateData} from "@/features/checkLists/schemas/types"



export async function createCheckListAPI(ctpatId: number, formData:CheckListCreateData[]) {
    try {
        const payload = { data: formData };
        const { data } = await api.post(`/checklist/${ctpatId}`, payload);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
}

type CheckListAPIType = {
    formData: CheckListUpdateData;
    ctpatConditionId: number;
}

export async function updateCheckListAPI({ formData, ctpatConditionId }: CheckListAPIType) {
    try {
        const {data} = await api.patch(`/checklist/${ctpatConditionId}`, { data: formData });
        if (data) {
            return data;
        }
        throw new Error(data?.message);
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const backendMessage = error.response.data?.message;
            throw new Error(backendMessage);
        }
        throw error;
    }
}
