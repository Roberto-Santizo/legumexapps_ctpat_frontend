import z from "zod";

export const imageSchema = z.object({
    id: z.number(),
    image: z.string(),
    type: z.string(),
    description: z.string().optional().nullable(),
});

export const imagesResponse = z.array(imageSchema);

export type ImageType = z.infer<typeof imageSchema>;