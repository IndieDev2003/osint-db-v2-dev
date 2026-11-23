"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    token: string
}

type ResetPasswordValues = {
    password: string
    confirmPassword: string
}

function ResetPasswordForm({ token }: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const [showPass,setShowPass] = useState<boolean>(false)

    async function submitResetPassword({ password, confirmPassword }: ResetPasswordValues) {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters")
            return
        }

        setLoading(true)
        try {
            await authClient.resetPassword({
                newPassword: password,
                token,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('Password Reset Successfull')
                    },
                    onError() {
                        toast.error('Request new Password Reset Link')
                        form.reset();
                    },
                }
            })
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong"
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    const form = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        onSubmit: async ({ value }) => {
            await submitResetPassword(value)
        },
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            <FieldGroup>
                <form.Field
                    name="password"
                    validators={{
                        onBlur: ({ value }) =>
                            value.length < 8
                                ? "Password must be at least 8 characters"
                                : undefined,
                    }}
                >
                    {(field) => (
                        <Field>
                            <Label htmlFor={field.name}>New Password</Label>
                            <div className="flex gap-1">
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    placeholder="********"
                                    required
                                    disabled={loading}
                                    value={field.state.value}
                                    type={showPass ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                <Button onClick={() => setShowPass(!showPass)}>{!showPass?<EyeClosed/>:<Eye/> }</Button>
                            </div>
                            {field.state.meta.errors.length > 0 && (
                                <FieldError>{field.state.meta.errors[0]}</FieldError>
                            )}
                        </Field>
                    )}
                </form.Field>

                <form.Field
                    name="confirmPassword"
                    validators={{
                        onChangeListenTo: ["password"],
                        onBlur: ({ value, fieldApi }) =>
                            value !== fieldApi.form.getFieldValue("password")
                                ? "Passwords do not match"
                                : undefined,
                    }}
                >
                    {(field) => (
                        <Field>
                            <Label htmlFor={field.name}>Confirm Password</Label>
                            <div className="flex gap-1">
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    placeholder="********"
                                    required
                                    disabled={loading}
                                    value={field.state.value}
                                    type={showPass?'text':'password'}
                                    autoComplete="new-password"
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                <Button onClick={() => setShowPass(!showPass)}>{!showPass ? <EyeClosed /> : <Eye />}</Button>
                            </div>
                            {field.state.meta.errors.length > 0 && (
                                <FieldError>{field.state.meta.errors[0]}</FieldError>
                            )}
                        </Field>
                    )}
                </form.Field>
            </FieldGroup>

            <Button type="submit" disabled={loading} className="w-full mt-2">
                {loading ? "Resetting Password..." : "Reset Password"}
            </Button>
        </form>
    )
}

export default ResetPasswordForm