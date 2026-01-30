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

// Schema para obtener las observaciones de un CTPAT específico
export const ctpatObservationItemSchema = z.object({
  id: z.number(),
  observation: z.string(),
  data: z.string(),
})

export const getCtpatObservationsSchema = z.object({
  statusCode: z.number(),
  response: z.array(ctpatObservationItemSchema),
})

export type CtpatObservationItem = z.infer<typeof ctpatObservationItemSchema>;

export type ObservationCreateData = z.infer<typeof observationSchema>;
export type ObservationList = z.infer<typeof observationListSchema>;
export type ObservationListResponse = z.infer<typeof getObservationSchema>;
export type GetAllObservationsResponse = z.infer<typeof getAllObservationsSchema>;
export type ObservationUpdateData = z.infer<typeof observationUpdateSchema>;
