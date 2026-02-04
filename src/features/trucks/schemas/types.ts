import { z } from "zod";
import { paginationSchema } from "@/shared/schemas/paginateSchemas";
//Truck
export const truckCreateSchema = z.object({
  plate: z.string(),
  carrier_id: z.number(),
  plate_image: z.string(),
});

export const truckListSchema = z.object({
  id: z.number(),
  plate: z.string(),
  plate_image: z.string(), 
  carrier: z.string(),
});

export const truckUpdateSchema = z.object({
  plate: z.string(),
  carrier_id: z.number(),
});


export const getTruckSchema = paginationSchema(truckListSchema)

// Schema para select (sin paginación)
export const truckSelectSchema = z.object({
  id: z.number(),
  plate: z.string(),
  carrier: z.string(),
});

export type TruckCreateData = z.infer<typeof truckCreateSchema>;
export type TruckList = z.infer<typeof truckListSchema>;
export type TruckListResponse = z.infer<typeof getTruckSchema>;
export type TruckUpdateData = z.infer<typeof truckUpdateSchema>;
export type TruckSelectItem = z.infer<typeof truckSelectSchema>;