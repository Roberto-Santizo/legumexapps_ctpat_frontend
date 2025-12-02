import {z} from "zod";
import { paginationSchema } from "@/shared/schemas/paginateSchemas";

//observations
export const observationSchema = z.object({
  name: z.string(),
})

export const observationListSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const observationUpdateSchema = z.object({
  name: z.string(),
})

export const getObservationSchema = paginationSchema(observationListSchema)

export type ObservationCreateData = z.infer<typeof observationSchema>;
export type ObservationList = z.infer<typeof observationListSchema>;
export type ObservationListResponse = z.infer<typeof getObservationSchema>;
export type ObservationUpdateData = z.infer<typeof observationUpdateSchema>;
