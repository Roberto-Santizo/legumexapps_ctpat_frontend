import z from "zod"
// Juice item
export const createJuiceItemSchema = z.object({
  juice_id: z.number(),
  boxes: z.number(),
  temp: z.number(),
  net_weight: z.number(),
  gross_weight: z.number(),
  client_id: z.number(),
  bottles: z.number(),
  date: z.string(),
  grn: z.string()
})

export type CreateJuiceItemFormData = z.infer<typeof createJuiceItemSchema>

export const juiceItemResponse = z.object({
  id: z.number(),
  juice_id: z.number(),
  boxes: z.number(),
  temp: z.number(),
  net_weight: z.number(),
  gross_weight: z.number(),
  client_id: z.number(),
  bottles: z.number(),
})
export type  JuiceResponseItemFormData = z.infer<typeof juiceItemResponse>

export const itemResponseById = z.object({
   id: z.number(),
    boxes: z.number(),
    bottles: z.number(),
    net_weight: z.number(),
    gross_weight: z.number(),
    temp: z.number(),
    date: z.string(),
    client_id: z.number(),
    juice_id: z.number()
})
export type ItemResponseByIdFormData = z.infer<typeof itemResponseById>

// Schema para la tabla (con datos expandidos/poblados)
export const juiceItemTableSchema = z.object({
  id: z.number(),
  juice_name: z.string(),
  juice_id: z.number(),
  boxes: z.number(),
  temp: z.number(),
  net_weight: z.number(),
  gross_weight: z.number(),
  client_name: z.string(),
  client_id: z.number(),
  bottles: z.number(),
  date: z.string()
})

export type JuiceItemTable = z.infer<typeof juiceItemTableSchema>

export const editJuicePackingListItemSchema = z.object({
  juice_id: z.number(),
  boxes: z.number().min(1),
  temp: z.number(),
  net_weight: z.number().positive(),
  gross_weight: z.number().positive(),
  client_id: z.number(),
  bottles: z.number(),
  date: z.string(),
  grn:z.string()
});

export type EditJuicePackingListItemFormData = z.infer<typeof editJuicePackingListItemSchema>;
