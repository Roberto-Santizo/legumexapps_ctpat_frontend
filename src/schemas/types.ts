import z from "zod";
import { paginationSchema } from "./paginateSchemas";
//driver
export const driverSchema = z.object({
  id:z.number(),
  name: z.string(),
  identification: z.string(),
  license: z.string(),
  carrier_id: z.number(),
})

export type CreateDriver = z.infer<typeof driverSchema>;
export type DriverFormData = Pick<CreateDriver, "name" | "identification" | "license" | "carrier_id">;
export const getDriversSchema = paginationSchema(driverSchema)


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

export type GetCarrierByIdResponse = z.infer<typeof getCarrierByIdSchema>;
export type createCarrierFormSchema = z.infer<typeof carrierSchema>;
export type CreateCarrierResponse = z.infer<typeof createCarrierResponseSchema>;
export type CarrierFormData = z.infer<typeof getCarrierSchema>;

//container
export const ContainerSchema = z.object({
  container: z.string(),
  seal: z.number(),
  sensor: z.number(),
  type: z.string(),
});
export const containerItemSchema = z.object({
  id: z.number(),
  container: z.string(),
  seal: z.number(),
  sensor: z.number(),
  type: z.string(),
});
export const getContainersResponseSchema = z.object({
  statusCode: z.number(),
  response: z.array(containerItemSchema),
  page: z.number(),
  total: z.number(),
  lastPage: z.number(),
});

export const getContainerByIdSchema = z.object({
  statusCode: z.number(),
  response: z.object({
    id: z.number(),
    container: z.string(),
    seal: z.number(),
    sensor: z.number(),
    type: z.string(),
  }),
});
export type GetContainerByIdResponse = z.infer<typeof getContainerByIdSchema>;
export type GetContainersResponse = z.infer<typeof getContainersResponseSchema>;
export type CreateContainerFormData = z.infer<typeof ContainerSchema>;

//ctpats
const ImageSchema = z.object({
  image: z.string(),
  type: z.string(),
  description: z.string(),
});
export const ctpatResponseSchema = z.object({
  statusCode: z.literal(200),
  message: z.literal("Ctpat Creado Correctamente"),
});

export const CtpatSchema = z.object({
  destination: z.string(),
  container_id: z.number(),
  departure_site: z.string(),
  images: z.array(ImageSchema),
});

export type CreateCtpatFormData = z.infer<typeof CtpatSchema>;
export type CtpatResponseData = z.infer<typeof ctpatResponseSchema>;

export const ctpat = z.object({
  id: z.number(),
  destination: z.string(),
  user: z.string(),
  departure_site: z.string(),
  container: z.string(),
  createdAt: z.string(),
})

export const ctpatListSchema = ctpat.pick({
  id: true,
  destination: true,
  user: true,
  departure_site: true,
  container: true,
  createdAt: true,
})

export const getCtpatsSchema = paginationSchema(ctpatListSchema)
export type GetCtpatResponse = z.infer<typeof getCtpatsSchema>;