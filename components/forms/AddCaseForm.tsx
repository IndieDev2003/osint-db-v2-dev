
"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { addCaseAction } from "@/lib/actions/cases.actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const priorities = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Critical", value: "critical" },
] as const;

const statuses = [
    { label: "Open", value: "open" },
    { label: "In Progress", value: "in_progress" },
    { label: "Closed", value: "closed" },
] as const;

function AddCaseForm() {
    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            priority: "medium" as
                | "low"
                | "medium"
                | "high"
                | "critical",
            tags: "",
            status: "open" as
                | "open"
                | "in_progress"
                | "closed",
            purpose:''
        },

        onSubmit: async ({ value }) => {
            try {
                const result = await addCaseAction({
                    ...value,
                    tags: value.tags
                        .split(",")
                        .map(tag => tag.trim())
                        .filter(Boolean),
                });

                if (!result.success) {
                    toast.error(result.message);
                    return;
                }

                toast.success("Case created successfully!");
                form.reset();

            } catch (error) {
                toast.error("Something went wrong!");
                console.error(error);
            }
        },
    });

    return (
        <form
            className="space-y-5"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            {/* Case Title */}
            <form.Field
                name="title"
                validators={{
                    onChange: ({ value }) =>
                        !value.trim()
                            ? "Case title is required"
                            : undefined,
                }}
            >
                {(field) => (
                    <Field>
                        <FieldLabel htmlFor={field.name}>
                            Case Title
                        </FieldLabel>

                        <Input
                            id={field.name}
                            name={field.name}
                            placeholder="Enter investigation title"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                                field.handleChange(e.target.value)
                            }
                        />

                        {!field.state.meta.isValid && (
                            <FieldError>
                                {field.state.meta.errors.join(", ")}
                            </FieldError>
                        )}
                    </Field>
                )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
                {(field) => (
                    <Field>
                        <FieldLabel htmlFor={field.name}>
                            Description
                        </FieldLabel>

                        <Textarea
                            id={field.name}
                            name={field.name}
                            placeholder="Describe the investigation..."
                            rows={14}
                            className="min-h-44"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e :any) =>
                                field.handleChange(e.target.value)
                            }
                        />
                    </Field>
                )}
            </form.Field>
            <form.Field name="purpose">
                {(field) => (
                    <Field>
                        <FieldLabel htmlFor={field.name}>
                            Purpose
                        </FieldLabel>

                        <Input
                            id={field.name}
                            name={field.name}
                            placeholder="Describe the Purpose of investigation..."
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e :any) =>
                                field.handleChange(e.target.value)
                            }
                        />
                    </Field>
                )}
            </form.Field>

            {/* Priority */}
            <form.Field name="priority">
                {(field) => (
                    <Field>
                        <FieldLabel>Priority</FieldLabel>

                        <Select
                            value={field.state.value}
                            onValueChange={(value:any) =>
                                field.handleChange(
                                    value as typeof field.state.value
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" className={'capitalize'}/>
                            </SelectTrigger>

                            <SelectContent>
                                {priorities.map((priority) => (
                                    <SelectItem
                                        key={priority.value}
                                        value={priority.value}
                                    >
                                        {priority.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                )}
            </form.Field>

            {/* Status */}
            <form.Field name="status">
                {(field) => (
                    <Field>
                        <FieldLabel>Status</FieldLabel>

                        <Select
                            value={field.state.value}
                            onValueChange={(value:any) =>
                                field.handleChange(
                                    value as typeof field.state.value
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" className={'capitalize'}/>
                            </SelectTrigger>

                            <SelectContent>
                                {statuses.map((status) => (
                                    <SelectItem
                                        key={status.value}
                                        value={status.value}
                                    >
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                )}
            </form.Field>

            {/* Tags */}
            <form.Field name="tags">
                {(field) => (
                    <Field>
                        <FieldLabel htmlFor={field.name}>
                            Tags
                        </FieldLabel>

                        <Input
                            id={field.name}
                            name={field.name}
                            placeholder="OSINT, Phishing, Malware"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                                field.handleChange(e.target.value)
                            }
                        />

                        <p className="text-xs text-muted-foreground">
                            Separate multiple tags with commas.
                        </p>
                    </Field>
                )}
            </form.Field>

            {/* Submit */}
            <form.Subscribe
                selector={(state) => [
                    state.isSubmitting,
                    state.canSubmit,
                ]}
            >
                {([isSubmitting, canSubmit]) => (
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!canSubmit || isSubmitting}
                    >
                        {isSubmitting
                            ? "Creating Case..."
                            : "Create Case"}
                    </Button>
                )}
            </form.Subscribe>
        </form>
    );
}

export default AddCaseForm;
