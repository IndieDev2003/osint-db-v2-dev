"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteBlogAction } from "@/lib/actions/blog.actions";

export function DeleteBlogButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmed) return;

        setLoading(true);

        try {
            const result = await deleteBlogAction(id);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);
            router.refresh();
        } catch {
            toast.error("Unable to delete blog.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            variant="destructive"
            size="sm"
            disabled={loading}
            onClick={handleDelete}
        >
            {loading
                ? <Loader2 className="size-4 animate-spin" />
                : <Trash2 className="size-4" />
            }
        </Button>
    );
}