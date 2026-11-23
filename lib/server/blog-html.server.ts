import "server-only";

import { generateHTML } from "@tiptap/html";
import sanitizeHtml from "sanitize-html";
import { TiptapDocument } from "../types/blog.types";
import  {blogServerExtensions}  from "../server/blog-extension.server";


const sanitizeOptions: sanitizeHtml.IOptions = {
    allowedTags: [
        "p",
        "h1", "h2", "h3", "h4",
        "strong", "b", "em", "i", "u", "s",
        "a",
        "ul", "ol", "li",
        "blockquote",
        "pre", "code",
        "hr", "br",
        "img",
        "figure", "figcaption",
        "table", "thead", "tbody", "tr", "th", "td",
        "span",
        "div",
    ],

    allowedAttributes: {
        "*": ["class"],

        a: ["href", "target", "rel"],

        img: ["src", "alt", "title"],

        code: ["class"],
        pre: ["class"],

        span: ["class", "style"],

        p: ["style"],
        h1: ["style"],
        h2: ["style"],
        h3: ["style"],
        h4: ["style"],

        th: ["colspan", "rowspan"],
        td: ["colspan", "rowspan"],
    },

    allowedStyles: {
        "*": {
            "text-align": [
                /^left$/,
                /^right$/,
                /^center$/,
                /^justify$/,
            ],
        },
    },

    allowedSchemes: ["http", "https", "mailto"],

    allowedSchemesByTag: {
        img: ["https"],
    },

    allowProtocolRelative: false,

    transformTags: {
        a: sanitizeHtml.simpleTransform("a", {
            target: "_blank",
            rel: "noopener noreferrer nofollow",
        }),
    },

    disallowedTagsMode: "discard",
};

export function generateSafeBlogHTML(
    content: TiptapDocument
): string {
    if (
        !content ||
        content.type !== "doc" ||
        !Array.isArray(content.content)
    ) {
        throw new Error("Invalid Tiptap document.");
    }

    const html = generateHTML(
        content as Parameters<typeof generateHTML>[0],
        blogServerExtensions
    );

    const sanitized = sanitizeHtml(
        html,
        sanitizeOptions
    );

    if (!sanitized.trim()) {
        throw new Error("Article content cannot be empty.");
    }

    if (sanitized.length > 2_000_000) {
        throw new Error("Generated article HTML is too large.");
    }

    return sanitized;
} 