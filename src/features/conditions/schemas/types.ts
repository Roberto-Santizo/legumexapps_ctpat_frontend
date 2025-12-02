import {z} from "zod";
import { paginationSchema } from "@/shared/schemas/paginateSchemas";

// conditions
export const conditionsSchema = z.object({
  id:z.number(),
  name: z.string(),
  type: z.string(),
  status: z.boolean()
})

export const getConditionSchema = paginationSchema(conditionsSchema)
export type GetConditionFormData = z.infer<typeof getConditionSchema>
export type Condition = z.infer<typeof conditionsSchema>
export type ConditionFormData = Pick<Condition, "name"| "type">