// schemas/editPackingListItem.ts
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
  client_id: z.number(),
  po: z.string().optional(),
  grn: z.string().optional(),
});

export type AddItemToPackingListFormData = z.infer<
  typeof addItemToPackingListSchema
>;

export const editPackingListItemSchema = z.object({
  product_id: z.number(),
  no_pallet: z.number().min(1),
  lote: z.string().min(1),
  boxes: z.number().min(1),
  temp: z.number(),
  net_weight: z.number().positive(),
  gross_weight: z.number().positive(),
  grn: z.string().min(1),
  po: z.string().optional(),
  client_id: z.number(),
  production_date: z.string(),
  expiration_date: z.string().min(1),
});

export type EditPackingListItemFormData =
  z.infer<typeof editPackingListItemSchema>;
