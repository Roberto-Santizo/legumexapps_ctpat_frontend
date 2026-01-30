import {z} from "zod";
// checkList

export const checkListSchema = z.object({
      condition_id: z.number(),
      status: z.boolean(),
})

export type CheckListCreateData = z.infer<typeof checkListSchema>;

export const checkListUpdateSchema = z.object({
  status: z.boolean(),
})

export type CheckListUpdateData = z.infer<typeof checkListUpdateSchema>;

// Schema para cada item del checklist
export const checkListItemSchema = z.object({
  id: z.number(),
  condition: z.string(),
  status: z.boolean(),
  type: z.string(),
});

export type CheckListItem = z.infer<typeof checkListItemSchema>;

// Schema para la respuesta completa del backend
export const checkListResponseSchema = z.object({
  statusCode: z.number(),
  response: z.object({
    id: z.number(),
    createdAt: z.string(),
    items: z.array(checkListItemSchema),
  }),
});
