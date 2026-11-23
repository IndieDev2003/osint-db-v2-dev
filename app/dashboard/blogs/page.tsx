import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getAuthorBlogs } from "@/lib/server/blog.server";
import { Button } from "@/components/ui/button";
import { DeleteBlogButton } from "@/components/blog/DeleteBlogButton";

export const dynamic = "force-dynamic";

export default async function DashboardBlogsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.user.emailVerified) {
    redirect("/dashboard");
  }

  const blogs = await getAuthorBlogs(session.user.id);

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            My Blogs
          </h1>

          <p className="text-muted-foreground mt-2">
            Manage your research and articles.
          </p>
        </div>

        <Button >
          <Link href="/dashboard/blogs/create">
            Create Blog
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {blogs.length === 0 ? (
          <div className="border rounded-xl p-10 text-center">
            <h2 className="text-xl font-semibold">
              You haven't created any blogs.
            </h2>

            <Button className="mt-4">
              <Link href="/dashboard/blogs/create">
                Write your first blog
              </Link>
            </Button>
          </div>
        ) : (
          blogs.map(blog => (
            <div
              key={blog.id}
              className="border rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="space-y-2">
                <h2 className="font-semibold text-lg">
                  {blog.title}
                </h2>

                <p className="text-xs text-muted-foreground">
                  /blogs/{blog.slug}
                </p>

                <span className={
                  blog.status === "published"
                    ? "text-green-600 text-xs"
                    : "text-yellow-600 text-xs"
                }>
                  {blog.status.toUpperCase()}
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  
                >
                  <Link href={
                    `/dashboard/blogs/edit/${blog.id}`
                  }>
                    Edit
                  </Link>
                </Button>

                {blog.status === "published" && (
                  <Button
                    variant="outline"
                    size="sm"
                    
                  >
                    <Link href={`/blogs/${blog.slug}`}>
                      View
                    </Link>
                  </Button>
                )}

                <DeleteBlogButton id={blog.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}