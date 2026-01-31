import { isAxiosError } from "axios";
import api from "@/shared/api/axios";
import { imagesResponse } from "@/features/upload-images/schema/imagestype";

export async function getImagesAPI(ctpatId: number) {
    try {
        const { data } = await api.get(`/ctpat/getImages/${ctpatId}`);
        // La respuesta viene envuelta en {statusCode, response}
        const responseData = data.response ?? data;
        const response = imagesResponse.safeParse(responseData);
        if (response.success) {
            return response.data;
        }
        return [];
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                return [];
            }
        }
        return [];
    }
}