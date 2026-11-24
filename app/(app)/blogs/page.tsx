import type { Metadata } from "next";
import Link from "next/link";

import { getPublishedBlogs } from "@/lib/server/blog.server";
import { SITE_URL } from "@/lib/seo";
import BlogCard from "@/components/blog/BlogCard";

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
              <BlogCard {...blog} />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}