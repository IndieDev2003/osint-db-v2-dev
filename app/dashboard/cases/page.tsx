import CaseTable from '@/components/tables/CaseTable'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
import Link from 'next/link'


type Props = {}

function CasesPage({ }: Props) {
    const formattedDate = new Date(Date.now()).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    })
    return (
        <Card>
            <CardHeader>
                <CardTitle>{formattedDate}</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nemo ad numquam!</CardDescription>
                <CardAction>
                    <Link href={'/dashboard/profile'}><Button> <User />Profile</Button></Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <CaseTable/>
            </CardContent>
        </Card>
    )
}

export default CasesPage