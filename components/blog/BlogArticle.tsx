import { BlogDocument } from "@/lib/types/blog.types";

type Props = {
    blog: BlogDocument;
};

export default function BlogArticle({ blog }: Props) {
    const date = blog.publishedAt || blog.createdAt;

    const readingTime = Math.max(
        1,
        Math.ceil(
            blog.contentHtml.replace(/<[^>]*>/g, " ")
                .split(/\s+/)
                .filter(Boolean).length / 200
        )
    );

    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#191919]">

            {/* Hero */}
            <header className="
                bg-[#F3F2EE]
                border-b border-black/[0.05]
                px-5 py-16 md:py-24
            ">
                <div className="max-w-5xl mx-auto text-center">

                    <div className="mb-6">
                        <span className="
                            inline-block
                            bg-[#E6E4DE]
                            px-3 py-1
                            text-[10px]
                            uppercase
                            tracking-[0.15em]
                        ">
                            {blog.tags[0] || "Research"}
                        </span>
                    </div>

                    <h1 className="
                        text-4xl md:text-6xl
                        max-w-4xl mx-auto
                        font-semibold
                        tracking-[-0.055em]
                        leading-[1.1]
                    ">
                        {blog.title}
                    </h1>

                    <div className="
                        mt-7 flex flex-wrap
                        justify-center gap-3
                        text-xs text-neutral-500
                    ">
                        <time dateTime={date.toISOString()}>
                            {date.toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </time>

                        <span>•</span>

                        <span>{blog.authorName}</span>

                        <span>•</span>

                        <span>{readingTime} min read</span>
                    </div>
                </div>
            </header>

            {/* Article */}
            <article className="
                max-w-[760px]
                mx-auto
                px-5
                py-12 md:py-16
            ">
                <p className="
                    text-lg
                    leading-[1.8]
                    text-neutral-700
                    mb-10
                ">
                    {blog.blogDescription}
                </p>

                {blog.coverImage && (
                    <figure className="mb-12">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="
                                w-full
                                max-h-[480px]
                                object-cover
                                rounded-lg
                            "
                        />
                    </figure>
                )}

                {/* Sanitized HTML generated on the server */}
                <div
                    className="blog-article-content"
                    dangerouslySetInnerHTML={{
                        __html: blog.contentHtml,
                    }}
                />

                {/* Article tags */}
                <footer className="
                    mt-16 pt-8
                    border-t border-neutral-200
                ">
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map(tag => (
                            <span
                                key={tag}
                                className="
                                    bg-[#EEEDE9]
                                    px-3 py-1.5
                                    rounded-sm
                                    text-xs
                                "
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </footer>
            </article>
        </main>
    );
}