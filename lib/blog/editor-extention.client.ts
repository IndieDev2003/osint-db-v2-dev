"use client";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

import {Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { all, createLowlight } from "lowlight";

const lowlight = createLowlight(all);

export const blogExtensions = [
    StarterKit.configure({
        codeBlock: false,
        link: {
            openOnClick: false,
            autolink: true,
            linkOnPaste: true,
        },
    }),

    Image.configure({
        inline: false,
        allowBase64: false,
    }),

    TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
    }),

    Table.configure({
        resizable: false,
    }),

    TableRow,
    TableHeader,
    TableCell,

    CodeBlockLowlight.configure({
        lowlight,
    }),
];