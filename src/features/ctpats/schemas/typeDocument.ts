import { z } from "zod";

/* =========================
   CTPAT IMAGES SCHEMA
========================= */
export const CtpatImageSchema = z.object({
  id: z.number(),
  image: z.string(),
  type: z.string(),
  description: z.string().optional().nullable(),
});

export type CtpatImage = z.infer<typeof CtpatImageSchema>;


/* =========================
   TRUCK SCHEMA
========================= */
export const CtpatTruckSchema = z.object({
  id: z.number(),
  plate: z.string(),
  plate_image: z.string(),
});

export type CtpatTruck = z.infer<typeof CtpatTruckSchema>;






/* =========================
   OBSERVATIONS SCHEMA
========================= */
export const CtpatObservationSchema = z.object({
  id: z.number(),
  observation: z.string(),
  data: z.string(),
});

export type CtpatObservation = z.infer<typeof CtpatObservationSchema>;


/* =========================
   CHECKLIST SCHEMA
========================= */
export const CtpatChecklistItemSchema = z.object({
  id: z.number(),
  condition: z.string(),
  status: z.boolean(),
});

export const CtpatChecklistSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  items: z.array(CtpatChecklistItemSchema),
});

export type CtpatChecklist = z.infer<typeof CtpatChecklistSchema>;



