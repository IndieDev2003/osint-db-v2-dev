"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import BlogEditor from "@/components/blog/BlogEditor";

import {
    createBlogAction,
    updateBlogAction,
} from "@/lib/actions/blog.actions";
import { CreateBlogInput } from "@/lib/schema/blog.schemas";
import { getBlogById } from "@/lib/server/blog.server";
import { getSession } from "@/lib/server/user.server";


type Props = {
    blogId?: string;
    initialValues?: CreateBlogInput;
};

const emptyDocument = {
    type: "doc" as const,
    content: [{ type: "paragraph" }],
};

const defaults: CreateBlogInput = {
    title: "",
    slug: "",
    seoTitle: "",
    seoDescription: "",
    contentHtml:'',
    blogDescription: "",
    tags: ["OSINT"],
    coverImage: "",
    status: "draft",
};

function slugify(value: string) {
    return value
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 150);
}

export default function BlogForm({
    blogId,
    initialValues,
}: Props) {
    const router = useRouter();

    const [html, setHtml] = useState<string | unknown>('');
    const [text, setText] = useState<string | unknown>('');

  


    const form = useForm({
        defaultValues: initialValues || defaults,

        onSubmit: async ({ value }) => {
            const payload = {
                ...value,
                html,
                text,
                tags: value.tags
                    .map(tag => tag.trim())
                    .filter(Boolean),
            };

            const result = blogId
                ? await updateBlogAction(blogId, payload)
                : await createBlogAction(payload);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            router.push("/dashboard/blogs");
            router.refresh();
        },
    });



    return (
        <form
            className="space-y-8 min-w-4xl w-full"
            onSubmit={event => {
                event.preventDefault();
                event.stopPropagation();
                form.handleSubmit();
            }}
        >
            <div className="space-y-2">
                <Label>Article title *</Label>

                <form.Field name="title">
                    {field => (
                        <Input
                            value={field.state.value}
                            placeholder="Understanding OSINT Investigations"
                            onBlur={field.handleBlur}
                            onChange={event => {
                                const title = event.target.value;

                                field.handleChange(title);

                                if (!initialValues?.slug) {
                                    form.setFieldValue(
                                        "slug",
                                        slugify(title)
                                    );
                                }

                                if (!initialValues?.seoTitle) {
                                    form.setFieldValue(
                                        "seoTitle",
                                        title
                                    );
                                }
                            }}
                        />
                    )}
                </form.Field>
            </div>

            <div className="space-y-2">
                <Label>Article URL</Label>

                <form.Field name="slug">
                    {field => (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                /blogs/
                            </span>

                            <Input
                                value={field.state.value}
                                onChange={event =>
                                    field.handleChange(
                                        slugify(event.target.value)
                                    )
                                }
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="space-y-2">
                <Label>Short description *</Label>

                <form.Field name="blogDescription">
                    {field => (
                        <Textarea
                            rows={3}
                            maxLength={500}
                            placeholder="Briefly describe your research..."
                            value={field.state.value}
                            onChange={event =>
                                field.handleChange(event.target.value)
                            }
                        />
                    )}
                </form.Field>
            </div>

            <div className="space-y-2">
                <Label>Cover image URL</Label>

                <form.Field name="coverImage">
                    {field => (
                        <Input
                            type="url"
                            placeholder="https://images.yourdomain.com/cover.webp"
                            value={field.state.value}
                            onChange={event =>
                                field.handleChange(event.target.value)
                            }
                        />
                    )}
                </form.Field>
            </div>

            <div className="space-y-2">
                <Label>SEO title</Label>

                <form.Field name="seoTitle">
                    {field => (
                        <Input
                            maxLength={70}
                            value={field.state.value}
                            onChange={event =>
                                field.handleChange(event.target.value)
                            }
                        />
                    )}
                </form.Field>
            </div>

            <div className="space-y-2">
                <Label>SEO description</Label>

                <form.Field name="seoDescription">
                    {field => (
                        <Textarea
                            rows={3}
                            maxLength={170}
                            value={field.state.value}
                            onChange={event =>
                                field.handleChange(event.target.value)
                            }
                        />
                    )}
                </form.Field>
            </div>

            <div className="space-y-3">
                <Label>Research tags</Label>

                <form.Field name="tags" mode="array">
                    {field => (
                        <div className="space-y-2">
                            {field.state.value.map((_, index) => (
                                <div key={index} className="flex gap-2">
                                    <form.Field
                                        name={`tags[${index}]`}
                                    >
                                        {tagField => (
                                            <Input
                                                value={tagField.state.value}
                                                placeholder="OSINT"
                                                onChange={event =>
                                                    tagField.handleChange(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        )}
                                    </form.Field>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            field.removeValue(index)
                                        }
                                        disabled={
                                            field.state.value.length === 1
                                        }
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={field.state.value.length >= 10}
                                onClick={() => field.pushValue("")}
                            >
                                Add tag
                            </Button>
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="space-y-3">
                <div>
                    <h2 className="text-xl font-semibold">
                        Article content
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Build your research article using content blocks.
                    </p>
                </div>

                <BlogEditor
                    editable={true}
                    content={form.state.values.contentHtml}
                    getText={setText}

                    getHtml={setHtml}
                />
            </div>

            <div className="space-y-2">
                <Label>Publishing status</Label>

                <form.Field name="status">
                    {field => (
                        <select
                            className="w-full rounded-md border bg-background px-3 py-2"
                            value={field.state.value}
                            onChange={event =>
                                field.handleChange(
                                    event.target.value as "draft" | "published"
                                )
                            }
                        >
                            <option value="draft">
                                Save as draft
                            </option>

                            <option value="published">
                                Publish article
                            </option>
                        </select>
                    )}
                </form.Field>
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={
                    !form.state.canSubmit ||
                    form.state.isSubmitting
                }
            >
                {form.state.isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Saving article...
                    </>
                ) : blogId ? (
                    "Update article"
                ) : (
                    "Create article"
                )}
            </Button>
        </form>
    );
}