import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import BlogForm from "@/components/forms/AddBlogForm";

export default async function CreateBlogPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) redirect("/login");

    if (!session.user.emailVerified) {
        redirect("/dashboard");
    }

    return (
        <main className="max-w-6xl mx-auto px-5 py-10">
            <div className="mb-10">
                <p className="text-sm text-muted-foreground">
                    OSINT ENGINE / PUBLICATIONS
                </p>

                <h1 className="text-3xl font-bold mt-2">
                    Create Research Article
                </h1>

                <p className="text-muted-foreground mt-2">
                    Share your research with the cybersecurity community.
                </p>
            </div>

            <BlogForm />
        </main>
    );
}