import React from 'react'
import DashboardHeader from './_components/Header'
import { getSession } from '@/lib/server/user.server'

type Props = {
    children: React.ReactNode
}

async function DashboardLayout({ children }: Props) {

    await getSession();
    return (
        <div className='p-2 space-y-2'>
            <DashboardHeader />
            {children}
        </div>
    )
}

export default DashboardLayout