import {z} from "zod"


export const signatureCreateSchema = z.object({
  exit_temp: z.number(),
  signature_c: z.string(),
  signature_e: z.string(),
  observations: z.array(
    z.object({
      observation_id: z.number(),
      data: z.string().optional(), // ← texto adicional opcional
    })
  )
});

export type CloseCtpatFormData = z.infer<typeof signatureCreateSchema>;
