import { z } from "zod";
// packing-list
export const createPackingList = z.object({
  box_type: z.string(),
  order: z.string(),
  customer: z.string(),
  thermograph_no: z.string(),
})

export const packingListTotalSchema = z.object({
  product: z.string(),
  total_boxes: z.number(),
  gross_weight: z.number(),
  net_weight: z.number(),
});

export const responsePackingListSchema = z.object({
    id: z.number(),
    carrier: z.string(),
    order: z.string(),
    container_condition: z.string(),
    box_type: z.string(),
    no_container: z.string(),
    container_type: z.string(),
    lbs_per_box: z.string(),
    seal: z.string(),
    client: z.string(),
    beginning_date: z.string(),
    no_thermograph: z.string(),
    exit_temp: z.string(),
    exit_date: z.string().nullable(),
    boxes: z.number().optional(),
    products: z.string().optional(),
})

export type ResponsePackingList = z.infer<typeof responsePackingListSchema>;

export type CreatePackignListFormData = z.infer<typeof createPackingList>