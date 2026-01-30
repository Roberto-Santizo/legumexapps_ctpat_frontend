import z from 'zod';

export const CompanyLogoSchema = z.object({
  data: z.string(),  // Puede ser URL o base64
})