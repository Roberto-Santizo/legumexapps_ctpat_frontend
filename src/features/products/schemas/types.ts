import {z} from "zod";
import { paginationSchema } from "@/shared/schemas/paginateSchemas";

//products
export const productCreateSchema = z.object({
   name: z.string(),
   code: z.string(),
   presentation: z.string(),
   lbs_presentation: z.number(),
})

export const productListSchema = z.object({
   id: z.number(),
   name: z.string(),
   code: z.string(),
})

export const productUpdateSchema = z.object({
    name: z.string(),
    code: z.string(),
})

export const getProductSchema = paginationSchema(productListSchema)
export type ProductList = z.infer<typeof productListSchema>;
export type ProductListResponse = z.infer<typeof getProductSchema>;
export type ProductCreateData = z.infer<typeof productCreateSchema>;
export type ProductUpdateData = z.infer<typeof productUpdateSchema>;