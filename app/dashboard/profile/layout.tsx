"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}
const queryClient = new QueryClient()

function ProfileLayout({ children }: Props) {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </div>
    )
}

export default ProfileLayout