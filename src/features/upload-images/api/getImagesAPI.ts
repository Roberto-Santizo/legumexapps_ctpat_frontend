import { isAxiosError } from "axios";
import api from "@/shared/api/axios";
import { imagesResponse } from "@/features/upload-images/schema/imagestype";

export async function getImagesAPI(ctpatId: number) {
    try {
        const { data } = await api.get(`/ctpat/getImages/${ctpatId}`);
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
export async function deleteImageAPI(imageId: number) {
    try {
        const { data } = await api.delete(`/ctpat/deleteImage/${imageId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}