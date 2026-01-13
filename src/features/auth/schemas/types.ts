import { z } from "zod";
import { ROLES } from "@/core/permissions/roles";

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
    // role: z.string(),
     role: z.enum([
      ROLES.admin,
      ROLES.CALIDAD_OPERADOR,
      ROLES.CALIDAD_ADMIN,
      ROLES.EXPORTACIONES_CONSULTA,
    ]),
  }),
  token: z.string(),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;