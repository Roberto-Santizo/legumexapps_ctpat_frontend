import { z } from "zod";
import { paginationSchema } from "./paginateSchemas";

//login
export const loginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  statusCode: z.number(),
  response: z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    role: z.string(),
  }),
  token: z.string(),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;

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

// crete user
export const baseUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
});

export const createUserSchema = baseUserSchema.extend({
  password: z.string(),
  role_id: z.number(),
});

export const userSchema = baseUserSchema.extend({
  password: z.string().optional(),
  role_id: z.number().optional(),
  role: rolSchema,
});

export const userListSchema = userSchema.transform((user) => ({
  id: user.id,
  name: user.name,
  username: user.username,
  role: user.role.name,
}));


export type CreateUserSchema = z.infer<typeof userSchema>;
export type UserFormDataSchema = Pick<CreateUserSchema, "name" | "username" | "password" | "role_id">;
export const getUserSchema = paginationSchema(userListSchema);