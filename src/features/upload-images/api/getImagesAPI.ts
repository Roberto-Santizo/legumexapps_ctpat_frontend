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
        console.error("Schema validation failed for images:", response.error.format());
        return []; // Retornar array vacío si la validación falla
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            // Si es 404, retornar array vacío (no hay imágenes)
            if (error.response.status === 404) {
                return [];
            }
            console.error("Error fetching images:", error.response.data.message);
        }
        return []; // Retornar array vacío en caso de error
    }
}