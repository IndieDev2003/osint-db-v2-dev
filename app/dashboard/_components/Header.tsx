import LogoutButton from '@/components/common/LogoutButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

type Props = {}

function DashboardHeader({ }: Props) {
    return (
        <Card className='py-2'>
            <CardContent className='flex-row justify-between items-center py-1'>
                <h1>OSINT Dashboard</h1>
                <ul className='flex gap-2 items-center'>
                    <li><Link href={'/dashboard/cases'}><Button variant={'ghost'}>Cases</Button></Link></li>
                    <li><Link href={'/dashboard/blogs'}><Button variant={'ghost'}>Blogs</Button></Link></li>
                    <li>
                        <LogoutButton/>
                    </li>
                </ul>
            </CardContent>
        </Card>
    )
}

export default DashboardHeader