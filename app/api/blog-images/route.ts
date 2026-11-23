import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fileTypeFromBuffer } from "file-type";

import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
];

const s3 = new S3Client({
    region: "auto",

    endpoint:
        `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export async function POST(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json(
                { error: "Authentication required." },
                { status: 401 }
            );
        }

        if (!session.user.emailVerified) {
            return NextResponse.json(
                { error: "Verify your email first." },
                { status: 403 }
            );
        }

        const formData = await request.formData();

        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: "Image file required." },
                { status: 400 }
            );
        }

        if (file.size === 0 || file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: "Image must be smaller than 5 MB." },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(
            await file.arrayBuffer()
        );

        const detected = await fileTypeFromBuffer(buffer);

        if (!detected || !allowedTypes.includes(detected.mime)) {
            return NextResponse.json(
                { error: "Unsupported image format." },
                { status: 400 }
            );
        }

        const key =
            `blogs/${session.user.id}/${crypto.randomUUID()}.${detected.ext}`;

        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: key,
                Body: buffer,
                ContentType: detected.mime,
                ContentLength: buffer.length,
                CacheControl: "public, max-age=31536000, immutable",
            })
        );

        const publicUrl =
            `${process.env.R2_PUBLIC_URL!.replace(/\/$/, "")}/${key}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
        });
    } catch (error) {
        console.error("Blog image upload:", error);

        return NextResponse.json(
            { error: "Image upload failed." },
            { status: 500 }
        );
    }
}