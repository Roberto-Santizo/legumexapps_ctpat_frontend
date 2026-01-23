import z from "zod"

export const createJuicePackingLisSchema = z.object({
  box_type: z.string(),
  order: z.string(),
  customer: z.string(),
  thermograph_no: z.string()
})

export type CreateJuicePackingListFormData = z.infer<typeof createJuicePackingLisSchema>

// Schema para un item individual de la tabla
export const juiceItemTableSchema = z.object({
  id: z.number(),
  juice_id: z.number(),
  total_boxes: z.number(),
  boxes: z.number(),
  temp: z.number(),
  gross_weight: z.number(),
  net_weight: z.number(),
  client_id: z.number(),
  client_name: z.string(),
  bottles: z.number(),
  date: z.string(),
  product: z.string(),
  code: z.string(),
  wrapper: z.string(),
})

export type JuiceItemTableType = z.infer<typeof juiceItemTableSchema>

export const juicePackingListResponse = z.object({
  id: z.number(),
  box_type: z.string(),
  order: z.string(),
  customer: z.string(),
  thermograph_no: z.string()
})

// Schema completo con items (para cuando se obtiene el detalle)
export const juicePackingListWithItemsSchema = z.object({
  id: z.number(),
  box_type: z.string(),
  order: z.string(),
  customer: z.string(),
  thermograph_no: z.string(),
  items: z.array(z.record(z.string(), z.array(juiceItemTableSchema))).optional()
})

export type JuicePackingListWithItems = z.infer<typeof juicePackingListWithItemsSchema>
