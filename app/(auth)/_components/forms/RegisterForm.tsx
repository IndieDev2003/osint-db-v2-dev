"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { useForm } from '@tanstack/react-form'
import { Eye, EyeClosed } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
type Props = {}

function RegisterForm({ }: Props) {
    const [showPass, setShowPass] = useState<boolean>(false)

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: async ({ value }) => {
            await authClient.signUp.email({
                ...value,
                fetchOptions: {
                    onSuccess: () => { toast.success('Register Success', {}) },
                    onError: () => { toast.error('Something Broke') }
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
            <FieldGroup className='gap-3'>
                <form.Field name='name' children={field => {
                    return (
                        <Field>
                            <Label htmlFor={field.name}>Name</Label>
                            <Input
                                required
                                id={field.name}
                                name={field.name}
                                type='text'
                                placeholder='Jane Doe'
                                value={field.state.value}
                                onChange={e => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                        </Field>
                    )
                }} />
                <form.Field name='email' children={field => {
                    return (
                        <Field>
                            <Label htmlFor={field.name}>Email</Label>
                            <Input
                                required
                                id={field.name}
                                name={field.name}
                                type='email'
                                placeholder='jane@doe.com'
                                value={field.state.value}
                                onChange={e => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                        </Field>
                    )
                }} />
                <form.Field name='password' children={field => {
                    return (
                        <Field>
                            <Label htmlFor={field.name}>Password</Label>
                            <div className='flex gap-1'>
                                <Input
                                    required
                                    id={field.name}
                                    name={field.name}
                                    type={showPass ? 'text' : 'password'}
                                    placeholder='*********'
                                    minLength={8}
                                    maxLength={24}
                                    value={field.state.value}
                                    onChange={e => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                <Button onClick={() => setShowPass(!showPass)}>{showPass ? <Eye /> : <EyeClosed />}</Button>
                            </div>
                        </Field>
                    )
                }} />
            </FieldGroup>
            <Button type='submit' className={'w-full my-2'}>Register</Button>
            <p className='text-center'>Already have an Account, <Link className='text-blue-700  dark:text-amber-500' href={'/login'}>Login</Link></p>
        </form>
    )
}

export default RegisterForm