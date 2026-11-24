
import { BlogDocument } from "@/lib/types/blog.types";
import BlogArticleActions from "./BlogArticleActions";

type Props = {
    blog: BlogDocument;
};

export default function BlogArticle({ blog }: Props) {
    const date = blog.publishedAt || blog.createdAt;

    const readingTime = Math.max(
        1,
        Math.ceil(
            blog.contentHtml
                .replace(/<[^>]*>/g, " ")
                .split(/\s+/)
                .filter(Boolean).length / 200
        )
    );

    return (
        <main className="min-h-screen overflow-hidden bg-[#FAFAF8] text-[#191919]">

            {/* Hero */}
            <header className="
                border-b border-black/5
                bg-[#F3F2EE]
                px-4 sm:px-6
                py-14 sm:py-20 lg:py-24
            ">
                <div className="mx-auto w-full max-w-5xl text-center">

                    {/* Category */}
                    <div className="mb-5 sm:mb-7">
                        <span className="
                            inline-block
                            bg-[#E6E4DE]
                            px-3 py-1.5
                            text-[10px] sm:text-xs
                            uppercase
                            tracking-[0.15em]
                            text-neutral-700
                        ">
                            {blog.tags[0] || "Research"}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="
                        mx-auto
                        max-w-4xl
                        text-3xl
                        font-semibold
                        leading-[1.15]
                        tracking-[-0.045em]
                        break-words
                        sm:text-4xl
                        md:text-5xl
                        lg:text-6xl
                        lg:leading-[1.1]
                        lg:tracking-[-0.055em]
                    ">
                        {blog.title}
                    </h1>

                    {/* Metadata */}
                    <div className="
                        mx-auto
                        mt-6 sm:mt-8
                        flex max-w-2xl
                        flex-wrap
                        items-center
                        justify-center
                        gap-x-3 gap-y-2
                        text-[11px] sm:text-xs
                        text-neutral-500
                    ">
                        <time dateTime={date.toISOString()}>
                            {date.toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </time>

                        <span aria-hidden="true">•</span>

                        <span>{blog.authorName}</span>

                        <span aria-hidden="true">•</span>

                        <span>{readingTime} min read</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 sm:mt-8">
                        <BlogArticleActions />
                    </div>

                </div>
            </header>


            {/* Article */}
            <article className="
                mx-auto
                w-full
                max-w-[800px]
                px-4
                py-10
                sm:px-6
                sm:py-14
                md:py-16
                lg:px-8
            ">

                {/* Description */}
                {blog.blogDescription && (
                    <p className="
                        mb-8 sm:mb-10
                        text-base
                        leading-[1.8]
                        text-neutral-700
                        sm:text-lg
                        md:text-xl
                    ">
                        {blog.blogDescription}
                    </p>
                )}


                {/* Cover Image */}
                {blog.coverImage && (
                    <figure className="mb-10 sm:mb-14">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            loading="eager"
                            fetchPriority="high"
                            className="
                                aspect-[16/10]
                                sm:aspect-[16/9]
                                w-full
                                max-h-[520px]
                                rounded-md sm:rounded-lg
                                object-cover
                            "
                        />
                    </figure>
                )}


                {/* Article Content */}
                <div
                    className="
                        blog-content
                        w-full
                        min-w-0
                        break-words
                        text-[15px]
                        leading-[1.85]
                        text-neutral-800
                        sm:text-base
                        sm:leading-[1.9]
                    "
                    dangerouslySetInnerHTML={{
                        __html: blog.contentHtml,
                    }}
                />


                {/* Article Tags */}
                {blog.tags.length > 0 && (
                    <footer className="
                        mt-12 sm:mt-16
                        border-t border-neutral-200
                        pt-7 sm:pt-8
                    ">
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="
                                        rounded-sm
                                        bg-[#EEEDE9]
                                        px-3 py-1.5
                                        text-xs
                                        text-neutral-700
                                        transition-colors
                                        hover:bg-[#E2E0DA]
                                    "
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </footer>
                )}

            </article>

        </main>
    );
}
