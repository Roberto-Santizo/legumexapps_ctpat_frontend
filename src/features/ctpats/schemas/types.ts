import {z} from "zod";
import { paginationSchema } from "@/shared/schemas/paginateSchemas";

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
export type CreateCtpatAPIResponse = {
  success: boolean;
  message: string;
};

export const CtpatSchema = z.object({
  destination: z.string(),
  container_id: z.number(),
  departure_site: z.string(),
  planta: z.number(),
  type : z.number(),
  images: z.array(ImageSchema),
});

export type CreateCtpatFormData = z.infer<typeof CtpatSchema>;
export type CtpatResponseData = z.infer<typeof ctpatResponseSchema>;

export const ctpat = z.object({
  id: z.number(),
  destination: z.string(),
  departure_site: z.string(),
  user: z.string(),
  container: z.string().optional(),
  status: z.number(),
  type: z.number().optional(),
  createdAt: z.string().optional(),
});

export const ctpatListSchema = z.object({
  id: z.number(),
  destination: z.string(),
  departure_site: z.string(),
  user: z.string(),
  container: z.string().nullish(),
  status: z.number(),
  type: z.number().nullish(),
  departure_date: z.string().nullish(),
});

export type uploadImages = z.infer<typeof ImageSchema>;

//  Nuevo esquema correcto para UploadImages
export const UploadImageSimpleSchema = z.object({
  image: z.string(),
  type: z.string(),
  description: z.string().optional(),

});

export const UploadImagesFormSchema = z.object({
  images: z.array(UploadImageSimpleSchema),
});

export type uploadImagesFormData = z.infer<typeof UploadImagesFormSchema>;
export const getCtpatsSchema = paginationSchema(ctpatListSchema);
export type GetCtpatResponse = z.infer<typeof getCtpatsSchema>;














