import z from "zod";

export const packingListTotalSchema = z.object({
      product: z.string(),
      total_boxes: z.number(),
      gross_weight: z.number(),
      net_weight:  z.number(),
});

// Schema para array de totales (respuesta del API)
export const packingListTotalsArraySchema = z.array(packingListTotalSchema);

export type PackingListTotal = z.infer<typeof packingListTotalSchema>;