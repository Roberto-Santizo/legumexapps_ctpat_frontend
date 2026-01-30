import z from 'zod';

// La API devuelve directamente el string base64/URL, no un objeto
export const CompanyLogoSchema = z.string();