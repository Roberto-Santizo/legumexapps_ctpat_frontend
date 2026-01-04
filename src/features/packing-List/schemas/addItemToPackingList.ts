import { z } from "zod";
export const addItemToPackingListSchema = z.object({
  product_id: z.number(),
  no_pallet: z.number(), 
  lote: z.string(),
  boxes: z.number(),
  temp: z.number(),
  net_weight: z.number(),
  gross_weight: z.number(),
  production_date: z.string(),
  expiration_date: z.string(),
  po: z.string().optional(),
  grn: z.string()
})

export type AddItemToPackingListFormData = z.infer<typeof addItemToPackingListSchema>;

  