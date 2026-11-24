
"use client";

import { useEffect } from "react";
import {
    Editor,
    EditorContent,
    EditorStateSnapshot,
    useEditor,
    useEditorState,
} from "@tiptap/react";
import type { JSONContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";

import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    RemoveFormatting,
    Pilcrow,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    List,
    ListOrdered,
    ListChecks,
    Quote,
    CodeSquare,
    Minus,
    Undo2,
    Redo2,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
} from "lucide-react";

import { Toggle } from "../ui/toggle";
import { Skeleton } from "../ui/skeleton";


type Props = {
    editable: boolean;
    content: string;

    onChange?: (content: string) => void;
    getHtml: (content: string) => void;
    getText: (content: string) => void;
    getJson?: (content: JSONContent) => void;
};


// ----------------------------------
// Editor toolbar state
// ----------------------------------

function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
    const editor = ctx.editor;

    return {
        // Marks
        isBold: editor.isActive("bold"),
        canBold: editor.can().chain().toggleBold().run(),

        isItalic: editor.isActive("italic"),
        canItalic: editor.can().chain().toggleItalic().run(),

        isStrike: editor.isActive("strike"),
        canStrike: editor.can().chain().toggleStrike().run(),

        isCode: editor.isActive("code"),
        canCode: editor.can().chain().toggleCode().run(),

        // Paragraphs and headings
        isParagraph: editor.isActive("paragraph"),

        isHeading1: editor.isActive("heading", { level: 1 }),
        isHeading2: editor.isActive("heading", { level: 2 }),
        isHeading3: editor.isActive("heading", { level: 3 }),
        isHeading4: editor.isActive("heading", { level: 4 }),
        isHeading5: editor.isActive("heading", { level: 5 }),
        isHeading6: editor.isActive("heading", { level: 6 }),

        // Lists
        isBulletList: editor.isActive("bulletList"),
        isOrderedList: editor.isActive("orderedList"),
        isTaskList: editor.isActive("taskList"),

        // Blocks
        isCodeBlock: editor.isActive("codeBlock"),
        isBlockquote: editor.isActive("blockquote"),

        // Alignment
        isAlignLeft: editor.isActive({ textAlign: "left" }),
        isAlignCenter: editor.isActive({ textAlign: "center" }),
        isAlignRight: editor.isActive({ textAlign: "right" }),
        isAlignJustify: editor.isActive({ textAlign: "justify" }),

        // Clear formatting
        canClearMarks: editor.can().chain().unsetAllMarks().run(),

        // History
        canUndo: editor.can().chain().undo().run(),
        canRedo: editor.can().chain().redo().run(),
    };
}

export type MenuBarState = ReturnType<typeof menuBarStateSelector>;


// ----------------------------------
// Reusable toolbar button
// ----------------------------------

type ToolbarButtonProps = {
    active?: boolean;
    disabled?: boolean;
    label: string;
    onClick: () => void;
    children: React.ReactNode;
};

function ToolbarButton({
    active = false,
    disabled = false,
    label,
    onClick,
    children,
}: ToolbarButtonProps) {
    return (
        <Toggle
            type="button"
            size="sm"
            variant="outline"
            pressed={active}
            disabled={disabled}
            onPressedChange={onClick}
            aria-label={label}
            title={label}
            className="h-8 w-8 p-0"
        >
            {children}
        </Toggle>
    );
}


// ----------------------------------
// Toolbar
// ----------------------------------

function MenuBar({ editor }: { editor: Editor }) {
    const state = useEditorState({
        editor,
        selector: menuBarStateSelector,
    });

    if (!state) return null;

    const buttonClass = "h-4 w-4";

    return (
        <div className="flex flex-wrap items-center gap-1 border rounded-md p-2 mb-3 bg-background">

            {/* Text formatting */}
            <ToolbarButton
                label="Bold"
                active={state.isBold}
                disabled={!state.canBold}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Italic"
                active={state.isItalic}
                disabled={!state.canItalic}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Strikethrough"
                active={state.isStrike}
                disabled={!state.canStrike}
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Inline code"
                active={state.isCode}
                disabled={!state.canCode}
                onClick={() => editor.chain().focus().toggleCode().run()}
            >
                <Code className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Clear formatting"
                disabled={!state.canClearMarks}
                onClick={() =>
                    editor.chain().focus().unsetAllMarks().clearNodes().run()
                }
            >
                <RemoveFormatting className={buttonClass} />
            </ToolbarButton>


            <div className="w-px h-6 bg-border mx-1" />


            {/* Paragraph and headings */}
            <ToolbarButton
                label="Paragraph"
                active={state.isParagraph}
                onClick={() => editor.chain().focus().setParagraph().run()}
            >
                <Pilcrow className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Heading 1"
                active={state.isHeading1}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
            >
                <Heading1 className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Heading 2"
                active={state.isHeading2}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
            >
                <Heading2 className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Heading 3"
                active={state.isHeading3}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
            >
                <Heading3 className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Heading 4"
                active={state.isHeading4}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
            >
                <Heading4 className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Heading 5"
                active={state.isHeading5}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
            >
                <Heading5 className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Heading 6"
                active={state.isHeading6}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
            >
                <Heading6 className={buttonClass} />
            </ToolbarButton>


            <div className="w-px h-6 bg-border mx-1" />


            {/* Lists */}
            <ToolbarButton
                label="Bullet list"
                active={state.isBulletList}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Numbered list"
                active={state.isOrderedList}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Task list"
                active={state.isTaskList}
                onClick={() => editor.chain().focus().toggleTaskList().run()}
            >
                <ListChecks className={buttonClass} />
            </ToolbarButton>


            <div className="w-px h-6 bg-border mx-1" />


            {/* Blocks */}
            <ToolbarButton
                label="Blockquote"
                active={state.isBlockquote}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <Quote className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Code block"
                active={state.isCodeBlock}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
                <CodeSquare className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Horizontal rule"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <Minus className={buttonClass} />
            </ToolbarButton>


            <div className="w-px h-6 bg-border mx-1" />


            {/* Text alignment */}
            <ToolbarButton
                label="Align left"
                active={state.isAlignLeft}
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
            >
                <AlignLeft className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Align center"
                active={state.isAlignCenter}
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
            >
                <AlignCenter className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Align right"
                active={state.isAlignRight}
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
            >
                <AlignRight className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Justify"
                active={state.isAlignJustify}
                onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                }
            >
                <AlignJustify className={buttonClass} />
            </ToolbarButton>


            <div className="w-px h-6 bg-border mx-1" />


            {/* Undo / Redo */}
            <ToolbarButton
                label="Undo"
                disabled={!state.canUndo}
                onClick={() => editor.chain().focus().undo().run()}
            >
                <Undo2 className={buttonClass} />
            </ToolbarButton>

            <ToolbarButton
                label="Redo"
                disabled={!state.canRedo}
                onClick={() => editor.chain().focus().redo().run()}
            >
                <Redo2 className={buttonClass} />
            </ToolbarButton>

        </div>
    );
}


// ----------------------------------
// Main editor
// ----------------------------------

function BlogEditor({
    editable,
    content,
    getText,
    getHtml,
    getJson,
}: Props) {

    const editor = useEditor({
        extensions: [
            StarterKit,

            TaskList,

            TaskItem.configure({
                nested: true,
                
            }),

            TextAlign.configure({
                types: ["heading", "paragraph"],
                alignments: ["left", "center", "right", "justify"],
            }),
        ],

        content,

        editable,

        immediatelyRender: false,

        editorProps: {
            attributes: {
                class: [
                    "min-h-28",
                    "w-full",
                    "rounded-md",
                    "border",
                    "p-4",
                    "outline-none",
                    "prose",
                    "max-w-none",
                    "dark:prose-invert",
                    "focus-visible:ring-2",
                    "focus-visible:ring-ring",
                    "blog-editor-content"
                ].join(" "),
            },
        },

        onUpdate({ editor }) {
            const html = editor.getHTML();
            getHtml(html);
            getText(editor.getText());
            getJson?.(editor.getJSON());
        },
    });


    // Update editor editability when prop changes.
    useEffect(() => {
        if (!editor) return;

        editor.setEditable(editable);
    }, [editor, editable]);


    // Sync external content changes without triggering onUpdate.
    useEffect(() => {
        if (!editor) return;

        if (editor.getHTML() !== content) {
            editor.commands.setContent(content, {
                emitUpdate: false,
            });
        }
    }, [editor, content]);


    if (!editor) {
        return <Skeleton className="h-40 w-full" />;
    }


    return (
        <div className="w-full space-y-2">

            {editable && <MenuBar editor={editor} />}

            <EditorContent
                
                editor={editor}
                className="w-full"
            />

        </div>
    );
}

export default BlogEditor;
