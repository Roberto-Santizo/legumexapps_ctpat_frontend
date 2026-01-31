import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import { packingListTotalsArraySchema } from "@/features/packing-List/schemas/PackingListTotals";
import type { PackingListTotal } from "@/features/packing-List/schemas/PackingListTotals";

export async function getPackingListTotalsAPI(ctpatId: number): Promise<PackingListTotal[]> {
    try {
        const { data } = await api.get(`/packing-list/getPackingListTotals/${ctpatId}`);
        // La respuesta tiene estructura {statusCode: 200, response: [...]}
        const responseData = data.response ?? data;
        const response = packingListTotalsArraySchema.safeParse(responseData);
        if (response.success) {
            return response.data;
        }
        return [];
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        return [];
    }
}
