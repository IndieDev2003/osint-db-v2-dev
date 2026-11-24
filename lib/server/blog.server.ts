import "server-only";

import { ObjectId } from "mongodb";

import { db } from "@/lib/config/db";
import { BlogDocument } from "../types/blog.types";
import { CreateBlogInput } from "../schema/blog.schemas";


const blogs = db.collection<BlogDocument>("blogs");

function slugify(title: string) {
    return title
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 150) || "article";
}

async function createUniqueSlug(
    title: string,
    existingSlug?: string
) {
    const base = slugify(existingSlug || title);

    for (let attempt = 0; attempt < 20; attempt++) {
        const slug = attempt === 0
            ? base
            : `${base}-${attempt + 1}`;

        const existing = await blogs.findOne(
            { slug },
            { projection: { _id: 1 } }
        );

        if (!existing) return slug;
    }

    throw new Error("Unable to generate a unique article URL.");
}

export async function createBlogInDB(
    input: CreateBlogInput,
    authorId: string,
    authorName: string,
    contentHtml: string
) {
    const slug = await createUniqueSlug(
        input.title,
        input.slug
    );

    const now = new Date();

    const document: BlogDocument = {
        title: input.title,
        slug,

        seoTitle: input.seoTitle || input.title,

        seoDescription:
            input.seoDescription || input.blogDescription,

        blogDescription: input.blogDescription,

      
        contentHtml,

        tags: [...new Set(input.tags.map(tag => tag.trim()))],

        coverImage: input.coverImage || "",

        authorId,
        authorName,

        status: input.status,

        publishedAt:
            input.status === "published" ? now : undefined,

        createdAt: now,
        updatedAt: now,
    };

    const result = await blogs.insertOne(document);

    return {
        id: result.insertedId.toString(),
        slug,
    };
}

export async function getBlogBySlug(
    slug: string,
    viewerId?: string
) {
    const filter = viewerId
        ? {
            slug,
            $or: [
                { status: "published" },
                { status: "draft", authorId: viewerId },
            ],
        }
        : {
            slug,
            status: "published",
        };

    const blog = await blogs.findOne(filter as any);

    if (!blog) return null;

    const { _id, ...rest } = blog;

    return {
        ...rest,
        id: _id!.toString(),
    };
}

export async function getBlogById(
    id: string,
    authorId: string
) {
    if (!ObjectId.isValid(id)) return null;

    const blog = await blogs.findOne({
        _id: new ObjectId(id),
        authorId,
    });

    if (!blog) return null;

    const { _id, ...rest } = blog;

    return {
        ...rest,
        id: _id!.toString(),
    };
}

export async function updateBlogInDB(
    id: string,
    authorId: string,
    input: CreateBlogInput,
    contentHtml: string
) {
    if (!ObjectId.isValid(id)) return null;

    const existing = await blogs.findOne({
        _id: new ObjectId(id),
        authorId,
    });

    if (!existing) return null;

    // Keep published article URLs permanent.
    const slug = existing.status === "published"
        ? existing.slug
        : await createUniqueSlug(input.title, input.slug);

    const now = new Date();

    const publishedAt =
        existing.publishedAt ||
        (input.status === "published" ? now : undefined);

    const result = await blogs.updateOne(
        {
            _id: existing._id,
            authorId,
        },
        {
            $set: {
                title: input.title,
                slug,

                seoTitle: input.seoTitle || input.title,

                seoDescription:
                    input.seoDescription || input.blogDescription,

                blogDescription: input.blogDescription,

               
                contentHtml,

                tags: [...new Set(input.tags)],

                coverImage: input.coverImage || "",

                status: input.status,

                publishedAt,
                updatedAt: now,
            },
        }
    );

    if (!result.matchedCount) return null;

    return { slug };
}

export async function deleteBlogFromDB(
    id: string,
    authorId: string
) {
    if (!ObjectId.isValid(id)) return false;

    const result = await blogs.deleteOne({
        _id: new ObjectId(id),
        authorId,
    });

    return result.deletedCount === 1;
}

export async function getPublishedBlogs() {
    const results = await blogs
        .find(
            { status: "published" },
            {
                projection: {
                    title: 1,
                    slug: 1,
                    blogDescription: 1,
                    tags: 1,
                    coverImage: 1,
                    authorName: 1,
                    publishedAt: 1,
                    createdAt: 1,
                },
            }
        )
        .sort({ publishedAt: -1 })
        .limit(30)
        .toArray();

    return results.map(blog => ({
        id: blog._id!.toString(),
        title: blog.title,
        slug: blog.slug,
        description: blog.blogDescription,
        tags: blog.tags,
        coverImage: blog.coverImage,
        authorName: blog.authorName,
        publishedAt: blog.publishedAt?.toISOString() || null,
        createdAt: blog.createdAt.toISOString(),
    }));
}

export async function getAuthorBlogs(authorId: string) {
    const results = await blogs
        .find({ authorId })
        .sort({ updatedAt: -1 })
        .toArray();

    return results.map(blog => ({
        id: blog._id!.toString(),
        title: blog.title,
        slug: blog.slug,
        status: blog.status,
        updatedAt: blog.updatedAt.toISOString(),
    }));
}