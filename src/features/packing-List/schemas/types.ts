import { z } from "zod";
// packing-list
export const packingList = z.object({
  box_type: z.string(),
  order: z.string(),
  customer: z.string(),
  thermograph_no: z.string(),
  exit_temp: z.number()
})

export const packingListTotalSchema = z.object({
  product: z.string(),
  total_boxes: z.number(),
  weight: z.number(),
  net_weight: z.number(),
});
export const packingListItemSchema = z.object({
          id: z.number(),
          product: z.string(),
          no_tarima: z.number(),
          lote: z.number(),
          code: z.string(),
          boxes: z.number(),
          weight: z.number(),
          net_weight: z.number(),
          presentation: z.string(),
          temp: z.number(),
          expiration_date: z.string(),
          grn:  z.string(),
          po:  z.string(),
})

export const getPackingListSchema = z.object({
        id: z.number(),
        carrier: z.string(),
        products: z.string(),
        order: z.string(),
        container_condition: z.string(),
        box_type: z.string(),
        no_container:  z.string(),
        container_type: z.string(),
        lbs_per_box: z.string(),
        seal: z.string(),
        client: z.string(),
        boxes: z.number(),
        beginning_date:z.string(),
        no_thermograph: z.string(),
        exit_temp: z.string(),
        exit_date: z.string(),

        items: z.array(packingListItemSchema),
        totals: z.array(packingListTotalSchema),
})

export type PackingListFormData = z.infer<typeof getPackingListSchema>

export type PackingList = z.infer<typeof packingList>
export type PackignListFormData = Pick<PackingList, "box_type"|"order"|"customer"|"thermograph_no"|"exit_temp">