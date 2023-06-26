import { z } from "zod";

export const unsplashImageSchema = z.object(
    {
        id: z.string(),
        created_at: z.string().datetime(),
        updated_at: z.string().datetime(),
        promoted_at: z.string().nullable(),
        width: z.number(),
        height: z.number(),
        color: z.string(),
        blur_hash: z.string(),
        description: z.string().nullable(),
        alt_description: z.string().nullable(),
        urls: z.object({
            raw: z.string(),
            full: z.string(),
            regular: z.string(),
            small: z.string(),
            thumb: z.string(),
            small_s3: z.string(),
        })
    });

export const unsplashSearchImagesSchema = z.object(
    {
        total: z.number(),
        total_pages: z.number(),
        results: z.array(unsplashImageSchema)
    }
)

export type UnsplashImage = z.infer<typeof unsplashImageSchema>;
export type UnsplashSearchImages = z.infer<typeof unsplashSearchImagesSchema>;
