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
  grn: z.string(),
  code: z.string().optional() 
})
export type CreateJuiceItemFormData = z.infer<typeof createJuiceItemSchema>

export const juiceItemResponse = z.object({
    id: z.number(),
    boxes: z.number(),
    bottles: z.number(),
    net_weight:  z.number(),
    gross_weight:z.number(),
    temp: z.number(),
    date: z.string(),
    client_id: z.number(),
    juice_id:  z.number(),
    grn: z.string()
})

export type  JuiceResponseItemFormData = z.infer<typeof juiceItemResponse>

// Schema para un item individual de juice en la respuesta
export const juiceItemTableSchema = z.object({
  id: z.number(),
  date: z.string(),
  product: z.string(),
  code: z.string(),
  ticket_number: z.number(),
  total_boxes: z.number(),
  net_weight: z.number(),
  gross_weight: z.number(),
  bottles: z.number(),
  wrapper: z.string(),
  temp: z.number(),
  grn: z.string(),
});

// Schema para la respuesta del endpoint getPackingListJuiceItems
export const juiceItemsResponseSchema = z.object({
  statusCode: z.number(),
  response: z.array(z.record(z.string(), z.union([
    z.array(juiceItemTableSchema),
    z.object({
      total_boxes: z.number(),
      net_weight: z.number(),
      gross_weight: z.number(),
      bottles: z.number(),
    })
  ]))),
});


export const editJuicePackingListItemSchema = z.object({
  juice_id: z.number(),
  boxes: z.number().min(1),
  temp: z.number(),
  net_weight: z.number().positive(),
  gross_weight: z.number().positive(),
  client_id: z.number(),
  bottles: z.number(),
  date: z.string(),
  grn: z.string(),
  code: z.string().optional()
});

export type EditJuicePackingListItemFormData = z.infer<typeof editJuicePackingListItemSchema>;

// Tipo para los items de la tabla de juice (respuesta del API con datos adicionales)
export type JuiceItemTableType = {
  id: number;
  total_boxes: number;
  temp: number;
  gross_weight: number;
  net_weight: number;
  bottles: number;
  date: string;
  juice_id: number;
  client_id: number;
  product?: string;
  client_name?: string;
  grn: string;
  code?: string;
  wrapper?: string;
  ticket_number?: number;
};
