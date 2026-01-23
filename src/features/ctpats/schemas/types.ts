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
  type : z.number(),
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
  status: z.number(),
  type: z.number().optional()
});

export const ctpatListSchema = ctpat.pick({
  id: true,
  destination: true,
  user: true,
  departure_site: true,
  container: true,
  createdAt: true,
  status: true,
  type: true
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














