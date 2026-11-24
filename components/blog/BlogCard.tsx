import Link from "next/link";
import Image from "next/image";

type Props = {
    
    title: string;
    slug: string;
    description: string;
    tags: string[];
    coverImage: string;
    authorName: string;
    publishedAt: string | null;
    createdAt: string;

};

export default function BlogCard( blog : Props) {
    return (
        <article className="group border rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
            <Link href={`/blogs/${blog.slug}`}>
                {blog.coverImage && (
                    <div className="relative aspect-video overflow-hidden">
                        <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                <div className="p-5 space-y-3">
                    <div className="flex justify-between gap-3">
                        <h2 className="text-xl font-semibold">
                            {blog.title}
                        </h2>

                        {blog.status === "draft" && (
                            <span className="text-xs text-yellow-600">
                                Draft
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {blog.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-xs bg-muted px-2 py-1 rounded-md"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{blog.authorName}</span>

                        <time dateTime={blog.publishedAt || blog.createdAt}>
                            {new Date(
                                blog.publishedAt || blog.createdAt
                            ).toLocaleDateString("en-IN")}
                        </time>
                    </div>
                </div>
            </Link>
        </article>
    );
}