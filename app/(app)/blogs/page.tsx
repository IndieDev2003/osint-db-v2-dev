import type { Metadata } from "next";
import Link from "next/link";

import { getPublishedBlogs } from "@/lib/server/blog.server";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "OSINT Research & Cybersecurity Blogs",

  description:
    "Explore OSINT investigations, threat intelligence, digital forensics and cybersecurity research.",

  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
};

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <section className="bg-[#F3F2EE] px-5 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4">
            OSINT ENGINE RESEARCH
          </p>

          <h1 className="text-5xl font-semibold tracking-tight">
            Research & Insights
          </h1>

          <p className="text-neutral-600 mt-5 max-w-xl">
            Investigations, methodologies, tools and
            perspectives from the cybersecurity community.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <article key={blog.id}>
              <Link href={`/blogs/${blog.slug}`}>
                {blog.coverImage && (
                  <div className="
                                        aspect-video overflow-hidden
                                        rounded-lg mb-5
                                    ">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="
                                                w-full h-full
                                                object-cover
                                                hover:scale-105
                                                transition-transform
                                            "
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <p className="
                                        text-xs uppercase
                                        tracking-widest
                                        text-neutral-500
                                    ">
                    {blog.tags[0] || "Research"}
                  </p>

                  <h2 className="
                                        text-2xl font-semibold
                                        tracking-tight
                                    ">
                    {blog.title}
                  </h2>

                  <p className="
                                        text-sm text-neutral-600
                                        leading-relaxed line-clamp-3
                                    ">
                    {blog.description}
                  </p>

                  <p className="text-xs text-neutral-500">
                    By {blog.authorName}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}