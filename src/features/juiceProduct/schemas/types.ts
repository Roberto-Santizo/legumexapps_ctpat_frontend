import z from "zod"
import { paginationSchema } from "@/shared/schemas/paginateSchemas";


export const juiceCreateSchema = z.object ({
    name: z.string(),
    slug: z.string(),
    code: z.string(),
    presentation: z.string(),
    lbs_presentation: z.number()
})

export const juiceResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string().nullish(),
    code: z.string(),
    presentation: z.string(),
    lbs_presentation: z.number()
})

export const juiceSelectSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string().nullish(),
  code: z.string()
});

export const juiceResponseById = z.object({
    
})
export type JuiceSchemaFormData = z.infer<typeof juiceCreateSchema>
export type JuiceResponseData = z.infer<typeof juiceResponseSchema>
export const CustomerResponse = paginationSchema(juiceResponseSchema);




