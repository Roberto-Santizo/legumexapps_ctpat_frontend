import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import { juicePackingListTotalSchema } from "@/features/juicePacking-List/schema/JuicePackingListTotals";

export async function getJuicePackingListTotalsAPI(ctpatId: number) {
    try {
        const { data } = await api.get(`/packing-list-juice/getPackingListJuiceTotals/${ctpatId}`);
        // La respuesta viene envuelta en {statusCode, responses}
        const responseData = data.responses ?? data.response ?? data;
        const response = juicePackingListTotalSchema.safeParse(responseData);
        if (response.success) {
            return response.data;
        }
        // Retornar valores por defecto si la validación falla
        return {
            total_boxes: 0,
            net_weight: 0,
            gross_weight: 0,
            bottles: 0,
        };
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        // Retornar valores por defecto en caso de error
        return {
            total_boxes: 0,
            net_weight: 0,
            gross_weight: 0,
            bottles: 0,
        };
    }
} 