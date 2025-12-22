import { z } from "zod";
export const addItemToPackingListSchema = z.object({
  product_id: z.number(),
  no_pallet: z.number(),
  lote: z.number(),
  boxes: z.number(),
  temp: z.number(),
  production_date: z.string().date(),
  expiration_date: z.string().date(),
  po: z.string().optional(),
  grn: z.string()
})

export type AddItemToPackingListFormData = z.infer<typeof addItemToPackingListSchema>;

