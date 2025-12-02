import { z } from "zod";

//rol
export const createRolSchema = z.object({
  name: z.string().min(1, "El nombre del rol es obligatorio"),
});
export const rolResponseApiSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});

export const rolSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const getRoleSchema = z.object({
  statusCode: z.number(),
  response: z.array(rolSchema),
  page: z.number(),
  total: z.number(),
  lastPage: z.number(),
});

export type RoleApiResponse = z.infer<typeof rolResponseApiSchema>;
export type GetRolesResponse = z.infer<typeof getRoleSchema>;
export type Rol = z.infer<typeof rolSchema>;
export type CreateRolFormData = z.infer<typeof createRolSchema>;