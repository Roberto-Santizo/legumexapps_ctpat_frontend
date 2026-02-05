import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import type {CloseCtpatFormData} from "@/features/ctpats/schemas/typeSignatureSchema"


type closeCtpatAPIType = {
    formData: CloseCtpatFormData;
    ctpatId: number;

}

export async function closeCtpatAPI({formData, ctpatId}:closeCtpatAPIType) {
    try {
        const {data} = await api.put(`/ctpat/closeCtpat/${ctpatId}`,formData);
        return data

    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error.message);
    }
    }
}


