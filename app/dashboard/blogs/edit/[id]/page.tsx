import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { getBlogById } from "@/lib/server/blog.server";
import { CreateBlogInput } from "@/lib/schema/blog.schemas";
import BlogForm from "@/components/forms/AddBlogForm";



type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditBlogPage({ params }: Props) {
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) redirect("/login");

    if (!session.user.emailVerified) {
        redirect("/dashboard");
    }

    const blog = await getBlogById(id, session.user.id);

    if (!blog) notFound();

    const initialValues: CreateBlogInput = {
        title: blog.title,
        slug: blog.slug,
        seoTitle: blog.seoTitle,
        seoDescription: blog.seoDescription,
        blogDescription: blog.blogDescription,
        contentJson: blog.contentJson,
        tags: blog.tags,
        coverImage: blog.coverImage,
        status: blog.status,
    };

    return (
        <main className="max-w-6xl mx-auto px-5 py-10">
            <h1 className="text-3xl font-bold mb-8">
                Edit Research Article
            </h1>

            <BlogForm
                blogId={id}
                initialValues={initialValues}
            />
        </main>
    );
}