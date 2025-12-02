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