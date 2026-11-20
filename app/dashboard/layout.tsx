import React from 'react'
import DashboardHeader from './_components/Header'

type Props = {
    children: React.ReactNode
}

function DashboardLayout({ children }: Props) {
    return (
        <div className='p-2 space-y-2'>
            <DashboardHeader />
            {children}
        </div>
    )
}

export default DashboardLayout