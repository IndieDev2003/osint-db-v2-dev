import type { MetadataRoute } from "next";

import { db } from "@/lib/config/db";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogs = await db.collection("blogs")
        .find(
            { status: "published" },
            {
                projection: {
                    slug: 1,
                    updatedAt: 1,
                },
            }
        )
        .toArray();

    return [
        {
            url: `${SITE_URL}/blogs`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },

        ...blogs.map(blog => ({
            url: `${SITE_URL}/blogs/${blog.slug}`,
            lastModified: blog.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        })),
    ];
}