import z from "zod";

export const juicePackingListTotalSchema = z.object({
  total_boxes: z.number(),
  net_weight: z.number(),
  gross_weight: z.number(),
  bottles: z.number(),
});

export type JuicePackingListTotal = z.infer<typeof juicePackingListTotalSchema>;