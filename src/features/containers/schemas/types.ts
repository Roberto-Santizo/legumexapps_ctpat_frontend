import {z} from "zod";
import { paginationSchema } from "@/shared/schemas/paginateSchemas";
// container
export const containerSchema = z.object({
  id: z.number(),
  container:z.string(),
  seal: z.string(),
  sensor: z.string(),
  type: z.string()
})

export const getContainerSchema = paginationSchema(containerSchema)
export type GetContainerFormData = z.infer<typeof getContainerSchema>;
export type Container = z.infer<typeof containerSchema>
export type ContainerFormData = Pick<Container,'container' |'seal' |'sensor' |'type'> 