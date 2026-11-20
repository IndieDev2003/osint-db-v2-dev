"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { useForm } from '@tanstack/react-form'
import { Eye, EyeClosed } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
type Props = {}

function LoginForm({ }: Props) {

    const [showPass, setShowPass] = useState<boolean>(false)
    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        onSubmit: async ({ value }) => {
            await authClient.signIn.email({
                ...value,
                fetchOptions: {
                    onSuccess() {
                        redirect('/dashboard')
                    },
                    onError(context) {
                        toast.error(context.error.message)
                    }
                }
            })
        }
    })
    return (
        <form onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
        }}>

            <FieldGroup>
                <form.Field name='email' children={field => {
                    return (
                        <Field>
                            <Label htmlFor={field.name}>Your Email</Label>
                            <Input
                                required
                                name={field.name}
                                id={field.name}
                                value={field.state.value}
                                placeholder='jane@doe.com'
                                onChange={e => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                type='email'
                            />
                        </Field>
                    )
                }} />
                <form.Field name='password' children={field => {
                    return (
                        <Field>
                            <Label htmlFor={field.name}>Your Password</Label>
                            <div className='flex gap-1'>
                                <Input
                                    required
                                    name={field.name}
                                    id={field.name}
                                    value={field.state.value}
                                    placeholder='***********'
                                    onChange={e => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    type={showPass ? 'text' : 'password'}
                                />
                                <Button variant={'secondary'} onClick={() => setShowPass(!showPass)}>{showPass ? <Eye /> : <EyeClosed />}</Button>
                            </div>
                        </Field>
                    )
                }} />
            </FieldGroup>

            <Button type='submit' className={'mt-2 w-full'}>Login</Button>
            <p className='mt-2 text-center '>Don't have an account, <Link className='  text-blue-700 dark:text-amber-500' href={'/register'}>Create new Account</Link></p>

        </form>
    )
}

export default LoginForm