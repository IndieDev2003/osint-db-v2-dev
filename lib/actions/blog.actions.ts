"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";



import {
    createBlogInDB,
    updateBlogInDB,
    deleteBlogFromDB,
} from "@/lib/server/blog.server";
import { createBlogSchema } from "../schema/blog.schemas";

async function getVerifiedUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Please sign in first.");
    }

    if (!session.user.emailVerified) {
        throw new Error("Please verify your email first.");
    }

    return session.user;
}

export async function createBlogAction(input: any) {
    try {
        const user = await getVerifiedUser();

        const parsed = createBlogSchema.safeParse(input);

        if (!parsed.success) {
            return {
                success: false,
                message: parsed.error.issues[0]?.message
                    || "Invalid article information.",
            };
        }



        const result = await createBlogInDB(
            parsed.data,
            user.id,
            user.name || "OSINT Contributor",
            input.html
        );

        revalidatePath("/blogs");
        revalidatePath("/sitemap.xml");
        revalidatePath("/dashboard/blogs");

        return {
            success: true,
            message: parsed.data.status === "published"
                ? "Article published successfully."
                : "Article saved as draft.",
            ...result,
        };
    } catch (error) {
        console.error("Create blog error:", error);

        return {
            success: false,
            message: error instanceof Error
                ? error.message
                : "Unable to create article.",
        };
    }
}

export async function updateBlogAction(
    id: string,
    input: any
) {
    try {
        const user = await getVerifiedUser();

        const parsed = createBlogSchema.safeParse(input);

        if (!parsed.success) {
            return {
                success: false,
                message: parsed.error.issues[0]?.message
                    || "Invalid article information.",
            };
        }


        const result = await updateBlogInDB(
            id,
            user.id,
            input as any,
            input.html 
        );

        if (!result) {
            return {
                success: false,
                message: "Article not found.",
            };
        }

        revalidatePath("/blogs");
        revalidatePath(`/blogs/${result.slug}`);
        revalidatePath("/dashboard/blogs");
        revalidatePath("/sitemap.xml");

        return {
            success: true,
            message: "Article updated successfully.",
            slug: result.slug,
        };
    } catch (error) {
        console.error("Update blog error:", error);

        return {
            success: false,
            message: error instanceof Error
                ? error.message
                : "Unable to update article.",
        };
    }
}

export async function deleteBlogAction(id: string) {
    try {
        const user = await getVerifiedUser();

        const deleted = await deleteBlogFromDB(
            id,
            user.id
        );

        if (!deleted) {
            return {
                success: false,
                message: "Article not found.",
            };
        }

        revalidatePath("/blogs");
        revalidatePath("/dashboard/blogs");
        revalidatePath("/sitemap.xml");

        return {
            success: true,
            message: "Article deleted successfully.",
        };
    } catch (error) {
        console.error("Delete blog error:", error);

        return {
            success: false,
            message: "Unable to delete article.",
        };
    }
}