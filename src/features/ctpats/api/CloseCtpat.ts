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
        if (data?.statusCode === 200) {
         return data; 
    }
    throw new Error(data?.message || "Error desconocido en la actualización del piloto");
        
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const backendMessage = error.response.data?.message || "Error desconocido desde el servidor";
      throw new Error(backendMessage);
    }
    throw error;
    }
    
}


