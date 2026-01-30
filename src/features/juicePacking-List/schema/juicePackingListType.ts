import z from "zod"

export const createJuicePackingLisSchema = z.object({
  box_type: z.string(),
  order: z.string(),
  customer: z.string(),
  thermograph_no: z.string()
})

export type CreateJuicePackingListFormData = z.infer<typeof createJuicePackingLisSchema>

// Schema para los items individuales de juice
const juiceItemSchema = z.object({
  id: z.number(),
  total_boxes: z.number(),
  temp: z.number(),
  gross_weight: z.number(),
  net_weight: z.number(),
  bottles: z.number(),
  date: z.string(),
  juice_id: z.number(),
  client_id: z.number(),
  product: z.string().optional(),
  client_name: z.string().optional(),
  grn: z.string(),
  code: z.string().optional(),
  wrapper: z.string().optional(),
  ticket_number: z.number().optional(),
})

export const juicePackingListResponseSchema = z.object({
   id: z.number(),
    carrier: z.string(),
    container_condition: z.string(),
    container_type: z.string(),
    no_marchamo:  z.string(),
    no_container: z.string(),
    order:  z.string(),
    client:  z.string(),
    no_thermograph: z.string(),
    products: z.string(),
    box_type: z.string(),
    lbs_per_box:  z.string(),
    total_boxes: z.number(),
    beginning_date: z.string(),
    exit_date: z.string().nullable(),
    exit_temp: z.union([z.number(), z.string()]).nullable(),
    // Items agrupados por cliente
    items: z.array(z.record(z.string(), z.array(juiceItemSchema))).optional(),
}) 
   

