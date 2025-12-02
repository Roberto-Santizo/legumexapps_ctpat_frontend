import { z } from "zod";
// packing-list
export const packingList = z.object({
  box_type: z.string(),
  order: z.string(),
  customer: z.string(),
  thermograph_no: z.string(),
  exit_temp: z.number()
})

export type PackingList = z.infer<typeof packingList>
export type PackignListFormData = Pick<PackingList, "box_type"|"order"|"customer"|"thermograph_no"|"exit_temp">