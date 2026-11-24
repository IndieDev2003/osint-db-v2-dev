import { z } from "zod";

export const createBlogSchema = z.object({
    title: z.string()
        .trim()
        .min(5, "Title must contain at least 5 characters.")
        .max(180),

    slug: z.string()
        .trim()
        .max(180)
        .optional()
        .default(""),

    seoTitle: z.string()
        .max(70)
        .optional()
        .default(""),
    contentHtml:z.string(),

    seoDescription: z.string()
        .max(170)
        .optional()
        .default(""),

    blogDescription: z.string()
        .trim()
        .min(20, "Description is too short.")
        .max(500),


    tags: z.array(
        z.string().trim().min(1).max(40)
    ).min(1).max(10),

    coverImage: z.string()
        .max(2048)
        .optional()
        .default(""),

    status: z.enum(["draft", "published"]),
});

export type CreateBlogInput = z.infer<
    typeof createBlogSchema
>;