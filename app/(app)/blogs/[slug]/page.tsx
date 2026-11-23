import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { auth } from "@/lib/auth";
import { getBlogBySlug } from "@/lib/server/blog.server";


import {
    SITE_NAME,
    getCanonicalUrl,
} from "@/lib/seo";
import BlogArticle from "@/components/blog/BlogArticle";

type Props = {
    params: Promise<{ slug: string }>;
};

async function getBlog(slug: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return getBlogBySlug(slug, session?.user?.id);
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: "Article Not Found",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const canonical = getCanonicalUrl(`/blogs/${blog.slug}`);

    const published = blog.status === "published";

    const title = blog.seoTitle || blog.title;

    const description =
        blog.seoDescription || blog.blogDescription;

    return {
        title,
        description,

        alternates: {
            canonical,
        },

        robots: published
            ? { index: true, follow: true }
            : { index: false, follow: false },

        openGraph: {
            type: "article",
            title,
            description,
            url: canonical,
            siteName: SITE_NAME,
            publishedTime: blog.publishedAt?.toISOString(),
            modifiedTime: blog.updatedAt.toISOString(),

            tags: blog.tags,

            ...(blog.coverImage
                ? { images: [blog.coverImage] }
                : {}),
        },

        twitter: {
            card: blog.coverImage
                ? "summary_large_image"
                : "summary",
            title,
            description,
            ...(blog.coverImage
                ? { images: [blog.coverImage] }
                : {}),
        },
    };
}

export default async function BlogDetailsPage({
    params,
}: Props) {
    const { slug } = await params;

    const blog = await getBlog(slug);

    if (!blog) notFound();

    const isPublished = blog.status === "published";

    const canonical = getCanonicalUrl(`/blogs/${blog.slug}`);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",

        headline: blog.title,

        description:
            blog.seoDescription || blog.blogDescription,

        image: blog.coverImage
            ? [blog.coverImage]
            : undefined,

        datePublished: blog.publishedAt?.toISOString(),

        dateModified: blog.updatedAt.toISOString(),

        author: {
            "@type": "Person",
            name: blog.authorName,
        },

        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
        },

        mainEntityOfPage: canonical,

        keywords: blog.tags.join(", "),
    };

    return (
        <>
            {!isPublished && (
                <div className="
                    bg-amber-100 text-amber-800
                    text-center text-sm p-3
                ">
                    Private draft preview
                </div>
            )}

            {isPublished && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd).replace(
                            /</g,
                            "\\u003c"
                        ),
                    }}
                />
            )}

            <BlogArticle blog={blog} />
        </>
    );
}