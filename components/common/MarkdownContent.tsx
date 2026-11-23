import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
    content: string;
};

export default function MarkdownContent({ content }: Props) {
    return (
        <div className="
            article-content
            prose prose-neutral
            max-w-none
            prose-headings:font-semibold
            prose-headings:tracking-tight
            prose-headings:text-[#191919]
            prose-h2:text-[28px]
            prose-h2:leading-tight
            prose-h2:mt-12
            prose-h2:mb-5
            prose-h3:text-xl
            prose-h3:mt-9
            prose-p:text-[15px]
            prose-p:leading-[1.8]
            prose-p:text-[#383838]
            prose-p:my-5
            prose-a:text-[#202020]
            prose-a:underline
            prose-a:underline-offset-4
            prose-strong:text-[#171717]
            prose-li:text-[15px]
            prose-li:leading-[1.8]
            prose-li:my-1
            prose-ol:my-6
            prose-ul:my-6
            prose-blockquote:border-l-2
            prose-blockquote:border-neutral-300
            prose-blockquote:text-neutral-600
            prose-pre:bg-[#202124]
            prose-pre:text-white
            prose-pre:rounded-lg
            prose-img:rounded-lg
            prose-img:w-full
            prose-img:my-9
            prose-table:text-sm
            prose-th:bg-neutral-100
            prose-th:p-3
            prose-td:p-3
            dark:prose-invert
            dark:prose-headings:text-white
            dark:prose-p:text-neutral-300
        ">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    ),

                    img: ({ src, alt }) => (
                        <figure className="my-9">
                            <img
                                src={src || ""}
                                alt={alt || "Article illustration"}
                                loading="lazy"
                                className="w-full rounded-lg object-cover"
                            />

                            {alt && (
                                <figcaption className="
                                    text-center text-xs
                                    text-neutral-500 mt-3
                                    not-italic
                                ">
                                    {alt}
                                </figcaption>
                            )}
                        </figure>
                    ),

                    hr: () => (
                        <hr className="my-12 border-neutral-200 dark:border-neutral-800" />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}