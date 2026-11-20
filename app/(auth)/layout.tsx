import { Metadata } from 'next'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const metadata: Metadata = {
    title:'Auth'
}

function AuthLayout({ children }: Props) {
    return (
        <div className='h-screen w-full flex items-center justify-center'>{children}</div>
    )
}

export default AuthLayout