"use client"
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { useForm } from '@tanstack/react-form'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Props = {}

function VerifyEmailForm({ }: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const form = useForm({
        defaultValues: {
            email: ''
        },
        onSubmit: async ({ value }) => {
            await authClient.sendVerificationEmail({
                ...value,
                fetchOptions: {
                    onRequest(context) {
                        setLoading(true)
                    },
                    onSuccess: () => {
                        toast.success('Email Verification is sent.',
                            {
                                description: 'Click on link in email to verify your account.'
                            }
                        )
                        setLoading(false)
                    },
                    onError(context) {
                        toast.error(context.error.message,{ description:context.error.name})
                        setLoading(false)
                    },
                }
            })
        }
    })
    return (
        <form
            onSubmit={e => {
                e.stopPropagation();
                e.preventDefault();
                form.handleSubmit();
            }}>
            <form.Field name='email' children={field => {
                return (
                    <>
                        <Field>
                            <Label>Your Email</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                placeholder='janedoe@mail.com'
                                type='email'
                                required
                                value={field.state.value}
                                onChange={e => field.handleChange(e.target.value)}
                            />
                        </Field>
                    </>
                )
            }} />
            <Button
                disabled={loading}
                className={'mt-1'}
                type='submit'
            >
                {
                    loading ? <Loader2 className='size-4 animate-spin' /> : 'Send Verification Email'
                }
            </Button>

        </form>
    )
}

export default VerifyEmailForm