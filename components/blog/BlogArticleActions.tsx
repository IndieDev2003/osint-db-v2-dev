"use client";

import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function BlogArticleActions() {
    async function handleShare() {
        const shareData = {
            title: document.title,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                toast.success("Article link copied!");
            }
        } catch (error) {
            if (error instanceof Error && error.name !== "AbortError") {
                toast.error("Unable to share article.");
            }
        }
    }

    return (
        <div className="flex items-center justify-between gap-4">
            <Button variant="outline" size="sm">
                <Link href="/blogs">
                    <div className="flex items-center">
                        <ArrowLeft className="size-4 mr-2" />
                        <p> Back to blogs</p>
                    </div>
                </Link>
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
            >
                <div className="flex items-center">
                    <p> Share this post</p>
                    <Share2 className="size-4 ml-2" />
                </div>
            </Button>
        </div>
    );
}