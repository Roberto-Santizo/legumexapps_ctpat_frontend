import { z } from "zod";

export const CtpatImageSchema = z.object({
  id: z.number(),
  image: z.string(),
  type: z.string(),
  description: z.string(),
});
export type CtpatImage = z.infer<typeof CtpatImageSchema>; // 👈 NECESARIO


export const CtpatTruckSchema = z.object({
  id: z.number(),
  plate: z.string(),
  plate_image: z.string(),
});
export type CtpatTruck = z.infer<typeof CtpatTruckSchema>;


export const CtpatDriverSchema = z.object({
  id: z.number(),
  name: z.string(),
  identification: z.string(),
  license: z.string(),
  identification_image: z.string(),
  license_image: z.string(),
});
export type CtpatDriver = z.infer<typeof CtpatDriverSchema>;


export const CtpatObservationSchema = z.object({
  id: z.number(),
  observation: z.string(),
  data: z.string(),
});
export type CtpatObservation = z.infer<typeof CtpatObservationSchema>;


export const CtpatSchema = z.object({
  id: z.number(),
  destination: z.string(),
  departure_site: z.string(),
  user: z.string(),
  container: z.string(),
  status: z.number(),
  signature_c: z.string(),
  signature_e: z.string(),
  createdAt: z.string(),

  images: z.array(CtpatImageSchema),
  truck: CtpatTruckSchema,
  driver: CtpatDriverSchema,
  observations: z.array(CtpatObservationSchema),
});

export type Ctpat = z.infer<typeof CtpatSchema>;
