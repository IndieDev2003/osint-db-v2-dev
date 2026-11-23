"use client";

import { useRef, useState } from "react";

import {
    EditorContent,
    useEditor,
    type Editor,
} from "@tiptap/react";

import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    ImagePlus,
    Table as TableIcon,
    Minus,
    Undo2,
    Redo2,
    Link as LinkIcon,
    Plus,
    AlignLeft,
    AlignCenter,
    AlignRight,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { blogExtensions } from "@/lib/blog/editor-extention.client";

type Props = {
    initialContent?: Record<string, unknown>;
    onChange: (content: Record<string, unknown>) => void;
};

type ToolbarButtonProps = {
    editor: Editor;
    icon: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
    label: string;
};

function ToolbarButton({
    icon,
    active,
    disabled,
    onClick,
    label,
}: ToolbarButtonProps) {
    return (
        <Button
            type="button"
            size="icon"
            variant={active ? "secondary" : "ghost"}
            disabled={disabled}
            onClick={onClick}
            title={label}
            aria-label={label}
            className="shrink-0 size-9"
        >
            {icon}
        </Button>
    );
}

export default function BlogEditor({
    initialContent,
    onChange,
}: Props) {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const [uploading, setUploading] = useState(false);
    const [inserting, setInserting] = useState(false);

    const editor = useEditor({
        extensions: blogExtensions,

        immediatelyRender: false,

        content: initialContent || {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                },
            ],
        },

        onUpdate({ editor }) {
            onChange(editor.getJSON());
        },

        editorProps: {
            attributes: {
                class: "blog-editor-content",
                spellcheck: "true",
            },
        },
    });

    if (!editor) {
        return (
            <div className="border rounded-xl min-h-[600px] animate-pulse bg-muted/30" />
        );
    }

    async function uploadImage(file: File) {
        setUploading(true);

        try {
            const formData = new FormData();

            formData.append("file", file);

            const response = await fetch(
                "/api/blog-images",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.error || "Image upload failed."
                );
            }

            editor!.chain().focus().setImage({
                src: result.url,
                alt: file.name.replace(/\.[^.]+$/, ""),
            }).run();
        } catch (error) {
            console.error(error);
            window.alert(
                error instanceof Error
                    ? error.message
                    : "Image upload failed."
            );
        } finally {
            setUploading(false);

            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }
        }
    }

    function addLink() {
        const previousUrl =
            editor!.getAttributes("link").href || "";

        const url = window.prompt(
            "Enter URL",
            previousUrl
        );

        if (url === null) return;

        if (!url.trim()) {
            editor!.chain().focus().unsetLink().run();
            return;
        }

        try {
            const parsed = new URL(url);

            if (!["https:", "http:", "mailto:"].includes(parsed.protocol)) {
                throw new Error("Unsupported URL protocol.");
            }

            editor!.chain().focus().setLink({
                href: url,
                target: "_blank",
                rel: "noopener noreferrer",
            }).run();
        } catch {
            window.alert("Please enter a valid HTTP, HTTPS or mailto URL.");
        }
    }

    function addBlock(type: string) {
        setInserting(false);

        const chain = editor!.chain().focus();

        switch (type) {
            case "paragraph":
                chain.setParagraph().run();
                break;

            case "heading1":
                chain.setHeading({ level: 1 }).run();
                break;

            case "heading2":
                chain.setHeading({ level: 2 }).run();
                break;

            case "heading3":
                chain.setHeading({ level: 3 }).run();
                break;

            case "bullet":
                chain.toggleBulletList().run();
                break;

            case "ordered":
                chain.toggleOrderedList().run();
                break;

            case "quote":
                chain.toggleBlockquote().run();
                break;

            case "code":
                chain.setCodeBlock({ language: "plaintext" }).run();
                break;

            case "divider":
                chain.setHorizontalRule().run();
                break;

            case "table":
                chain.insertTable({
                    rows: 3,
                    cols: 3,
                    withHeaderRow: true,
                }).run();
                break;

            case "image":
                imageInputRef.current?.click();
                break;
        }
    }

    return (
        <div className="space-y-3">

            {/* Block Inserter */}
            <div className="flex items-center justify-between gap-3">
                <div className="relative">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setInserting(!inserting)}
                    >
                        <Plus className="size-4 mr-2" />
                        Add block
                    </Button>

                    {inserting && (
                        <div className="
                            absolute left-0 top-11 z-50
                            w-64 rounded-lg border
                            bg-background shadow-xl
                            p-2 grid grid-cols-2 gap-1
                        ">
                            {[
                                ["paragraph", "Paragraph"],
                                ["heading1", "Heading 1"],
                                ["heading2", "Heading 2"],
                                ["heading3", "Heading 3"],
                                ["bullet", "Bullet List"],
                                ["ordered", "Numbered List"],
                                ["quote", "Quote"],
                                ["code", "Code Block"],
                                ["image", "Image"],
                                ["table", "Table"],
                                ["divider", "Divider"],
                            ].map(([value, label]) => (
                                <Button
                                    key={value}
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start"
                                    onClick={() => addBlock(value)}
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="text-xs text-muted-foreground">
                    {uploading
                        ? "Uploading image..."
                        : "Rich text editor"}
                </div>
            </div>

            {/* Toolbar */}
            <div className="
                sticky top-0 z-20
                flex flex-wrap items-center gap-1
                rounded-lg border bg-background
                p-2 shadow-sm
            ">
                <ToolbarButton
                    editor={editor}
                    icon={<Bold size={17} />}
                    label="Bold"
                    active={editor.isActive("bold")}
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<Italic size={17} />}
                    label="Italic"
                    active={editor.isActive("italic")}
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<Underline size={17} />}
                    label="Underline"
                    active={editor.isActive("underline")}
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<Strikethrough size={17} />}
                    label="Strike"
                    active={editor.isActive("strike")}
                    onClick={() =>
                        editor.chain().focus().toggleStrike().run()
                    }
                />

                <div className="h-6 w-px bg-border mx-1" />

                <ToolbarButton
                    editor={editor}
                    icon={<Heading1 size={17} />}
                    label="Heading 1"
                    active={editor.isActive("heading", { level: 1 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({
                            level: 1,
                        }).run()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<Heading2 size={17} />}
                    label="Heading 2"
                    active={editor.isActive("heading", { level: 2 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({
                            level: 2,
                        }).run()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<Heading3 size={17} />}
                    label="Heading 3"
                    active={editor.isActive("heading", { level: 3 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({
                            level: 3,
                        }).run()
                    }
                />

                <div className="h-6 w-px bg-border mx-1" />

                <ToolbarButton
                    editor={editor}
                    icon={<List size={17} />}
                    label="Bullet list"
                    active={editor.isActive("bulletList")}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<ListOrdered size={17} />}
                    label="Numbered list"
                    active={editor.isActive("orderedList")}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<Quote size={17} />}
                    label="Blockquote"
                    active={editor.isActive("blockquote")}
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<Code size={17} />}
                    label="Code block"
                    active={editor.isActive("codeBlock")}
                    onClick={() =>
                        editor.chain().focus().setCodeBlock().run()
                    }
                />

                <div className="h-6 w-px bg-border mx-1" />

                <ToolbarButton
                    editor={editor}
                    icon={<AlignLeft size={17} />}
                    label="Align left"
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<AlignCenter size={17} />}
                    label="Align center"
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<AlignRight size={17} />}
                    label="Align right"
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                />

                <div className="h-6 w-px bg-border mx-1" />

                <ToolbarButton
                    editor={editor}
                    icon={<LinkIcon size={17} />}
                    label="Insert link"
                    active={editor.isActive("link")}
                    onClick={addLink}
                />

                <ToolbarButton
                    editor={editor}
                    icon={<ImagePlus size={17} />}
                    label="Insert image"
                    disabled={uploading}
                    onClick={() =>
                        imageInputRef.current?.click()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<TableIcon size={17} />}
                    label="Insert table"
                    onClick={() => addBlock("table")}
                />

                <ToolbarButton
                    editor={editor}
                    icon={<Minus size={17} />}
                    label="Horizontal divider"
                    onClick={() => addBlock("divider")}
                />

                <div className="h-6 w-px bg-border mx-1" />

                <ToolbarButton
                    editor={editor}
                    icon={<Undo2 size={17} />}
                    label="Undo"
                    disabled={!editor.can().undo()}
                    onClick={() =>
                        editor.chain().focus().undo().run()
                    }
                />

                <ToolbarButton
                    editor={editor}
                    icon={<Redo2 size={17} />}
                    label="Redo"
                    disabled={!editor.can().redo()}
                    onClick={() =>
                        editor.chain().focus().redo().run()
                    }
                />
            </div>

            {/* Hidden image input */}
            <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={event => {
                    const file = event.target.files?.[0];

                    if (file) {
                        void uploadImage(file);
                    }
                }}
            />

            {/* Editor canvas */}
            <div className="
                overflow-hidden
                rounded-xl border
                bg-white dark:bg-zinc-950
                shadow-sm
            ">
                <EditorContent editor={editor} />
            </div>

            <div className="
                flex justify-between
                text-xs text-muted-foreground
            ">
                <span>WordPress-style block editor</span>
                <span>
                    {editor.storage.characterCount?.characters?.() ?? ""}
                </span>
            </div>
        </div>
    );
}