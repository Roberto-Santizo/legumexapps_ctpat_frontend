import z from 'zod';
import { paginationSchema } from "@/shared/schemas/paginateSchemas";


export const baseCustomerSchema = z.object({
  name: z.string(),
  code: z.string(),
});

export const CreateCustomerSchema = baseCustomerSchema

export const customerResponseSchema  = z.object({
  id : z.number(),
  name: z.string(),
  code: z.string()
})

export const customerSelectSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const customerByIdSchema = z.object({
  statusCode: z.number(),
  response: customerResponseSchema,
});

export type CreateCustomer = z.infer<typeof CreateCustomerSchema>;
export const CustomerResponse = paginationSchema(customerResponseSchema);
export type CustomerById = z.infer<typeof customerResponseSchema>;
