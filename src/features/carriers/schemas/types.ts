import {z} from "zod";
//carriers
export const carrierSchema = z.object({
  name: z.string(),
});
export const createCarrierResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  response: z
    .object({
      id: z.number(),
      name: z.string(),
      createdAt: z.string(),
    })
    .optional(),
});
export const getCarrierSchema = z.object({
  response: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  page: z.number(),
  total: z.number(),
  lastPage: z.number(),
});

export const getCarrierByIdSchema = z.object({
  statusCode: z.number(),
  response: z.object({
    id: z.number(),
    name: z.string(),
  }),
});
export const updatecarrierSchema = z.object({
  name: z.string(),
});

export type GetCarrierByIdResponse = z.infer<typeof getCarrierByIdSchema>;
export type createCarrierFormSchema = z.infer<typeof carrierSchema>;
export type CreateCarrierResponse = z.infer<typeof createCarrierResponseSchema>;
export type CarrierFormData = z.infer<typeof getCarrierSchema>;
export type CarrierUpdateData = z.infer<typeof updatecarrierSchema>;