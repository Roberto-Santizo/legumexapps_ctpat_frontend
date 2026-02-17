import { z } from "zod";
import { paginationSchema } from "@/shared/schemas/paginateSchemas";

// CREATE
export const productCreateSchema = z.object({
  name: z.string(),
  slug: z.string(),
  code: z.string(),
  presentation: z.string(),
  lbs_presentation: z.number(),
});

// LIST
export const productListSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string().optional(),
  code: z.string(),

});

// UPDATE
export const productUpdateSchema = z.object({
  name: z.string(),
  slug: z.string(),
  code: z.string(),
  presentation: z.string(),
  lbs_presentation: z.number()

});

// SELECT
export const productSelectSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
});

export const productSelectResponseSchema = z.object({
  statusCode: z.number(),
  response: z.array(productSelectSchema),
});

// PAGINATION
export const getProductSchema = paginationSchema(productListSchema);

// TYPES
export type ProductList = z.infer<typeof productListSchema>;
export type ProductListResponse = z.infer<typeof getProductSchema>;
export type ProductCreateData = z.infer<typeof productCreateSchema>;
export type ProductUpdateData = z.infer<typeof productUpdateSchema>;
export type ProductSelect = z.infer<typeof productSelectSchema>;
