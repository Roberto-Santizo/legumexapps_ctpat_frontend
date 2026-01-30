// schemas/packingListItem.ts
import { z } from "zod";

/* =======================
   BASE
======================= */

const packingListItemBaseSchema = z.object({
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
  grn: z.string(),
  po: z.string().optional(),
});

/* =======================
   CREATE
======================= */

export const addItemToPackingListSchema =
  packingListItemBaseSchema;

export type AddItemToPackingListFormData =
  z.infer<typeof addItemToPackingListSchema>;

/* =======================
   EDIT
======================= */

export const editPackingListItemSchema = packingListItemBaseSchema;
export type EditPackingListItemFormData = z.infer<typeof editPackingListItemSchema>;

/* =======================
   RESPONSE
======================= */

export const frozenItemResponseSchema = z.object({
  id: z.number(),
  product: z.string(),
  product_id: z.number(),
  no_tarima: z.number(),
  lote: z.union([z.string(), z.number()]),
  code: z.string(),
  boxes: z.number(),
  temp: z.number(),
  net_weight: z.number(),
  gross_weight: z.number(),
  presentation: z.string(),
  expiration_date: z.string(),
  production_date: z.string().optional(),
  client: z.string(),
  client_id: z.number(),
  grn: z.string(),
  po: z.string().optional(),
});

export type FrozenItemResponse = z.infer<typeof frozenItemResponseSchema>;

// Schema para array de items
export const frozenItemsArraySchema = z.array(frozenItemResponseSchema);
export type FrozenItemsArray = z.infer<typeof frozenItemsArraySchema>;
