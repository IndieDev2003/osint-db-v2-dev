"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

function ReqPasswordReset() {
    const [success, setSuccess] = useState(false);

    const form = useForm({
        defaultValues: {
            email: "",
        },

        onSubmit: async ({ value }) => {
            try {
                const { error } = await authClient.requestPasswordReset({
                    email: value.email.trim(),
                    redirectTo: `${window.location.origin}/reset-password/`,
                });

                if (error) {
                    toast.error(error.message || "Unable to process your request.");
                    return;
                }

                setSuccess(true);

                toast.success(
                    "If an account exists with that email, you will receive a password reset link."
                );
            } catch {
                toast.error("Something went wrong. Please try again.");
            }
        },
    });

    if (success) {
        return (
            <div className="w-full space-y-4 text-center">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Check your email
                </h2>

                <p className="text-sm text-muted-foreground">
                    If an account exists with that email address, you will receive
                    a password reset link.
                </p>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSuccess(false)}
                >
                    Try another email
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full space-y-5">
            

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <FieldGroup>
                    <form.Field
                        name="email"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value.trim()) return "Email is required.";

                                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                                    return "Please enter a valid email address.";
                                }

                                return undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <Field>
                                <Label htmlFor={field.name}>Email address</Label>

                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="email"
                                    placeholder="janedoe@mail.com"
                                    autoComplete="email"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    aria-invalid={
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid
                                    }
                                />

                                {field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0 && (
                                        <p className="text-sm text-destructive">
                                            {field.state.meta.errors.join(", ")}
                                        </p>
                                    )}
                            </Field>
                        )}
                    </form.Field>
                </FieldGroup>

                <form.Subscribe
                    selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                    ]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <Button
                            type="submit"
                            className="mt-5 w-full"
                            disabled={!canSubmit || isSubmitting}
                        >
                            {isSubmitting
                                ? "Sending reset link..."
                                : "Send reset link"}
                        </Button>
                    )}
                </form.Subscribe>
            </form>
        </div>
    );
}

export default ReqPasswordReset;