import {z} from "zod";
import { paginationSchema } from "@/shared/schemas/paginateSchemas";

//driver
export const driverSchema = z.object({
  id:z.number(),
  name: z.string(),
  identification: z.string(),
  license: z.string(),
  carrier_id: z.number(),
  identification_image: z.string().optional(),
  license_image: z.string().optional(),
})

export const driverListSchema = (
  driverSchema.pick({
    id: true,
    name: true,
  })
)
export const getDriverByIdSchema = z.object(
  driverSchema.pick({
    id: true,
    name: true,
    license: true,
    identification: true,
    carrier_id: true,
  })
)
export const editDriverSchema = driverSchema.pick({
  name: true,
  identification: true,
  license: true,
});

export const createDriverSchema =  z.object({
    name: z.string(),
    identification: z.string(),
    license: z.string(),
    carrier_id: z.number(),
    identification_image: z.string().optional(),
    license_image: z.string(),
  })

export type DriverFormData = z.infer<typeof createDriverSchema>;
export type CreateDriver = z.infer<typeof driverSchema>;
export const getDriversSchema = paginationSchema(driverListSchema)
export type EditDriverFormData = z.infer<typeof editDriverSchema>;