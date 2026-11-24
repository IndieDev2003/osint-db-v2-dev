import type { ObjectId } from "mongodb";

export type BlogStatus = "draft" | "published";


export type BlogDocument = {
    _id?: ObjectId;

    title: string;
    slug: string;

    seoTitle: string;
    seoDescription: string;

    blogDescription: string;

    contentHtml: string;

    tags: string[];

    coverImage: string;

    authorId: string;
    authorName: string;

    status: BlogStatus;

    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
};