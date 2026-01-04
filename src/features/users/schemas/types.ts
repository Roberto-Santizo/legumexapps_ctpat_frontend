import { z } from "zod";
import { paginationSchema } from "@/shared/schemas/paginateSchemas";

//rol 
export const rolSchema = z.object({
  id: z.number(),
  name: z.string(),
});

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

export const updateUserPasswordSchema = z.object({
  newPassword: z.string()
})

export type CreateUserSchema = z.infer<typeof userSchema>;
export type UserFormDataSchema = Pick<CreateUserSchema, "name" | "username" | "password" | "role_id">;
export const getUserSchema = paginationSchema(userListSchema);
export type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;