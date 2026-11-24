import AddCaseDrawer from '@/components/drawers/AddCaseDrawer'
import CaseTable from '@/components/tables/CaseTable'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserCases } from '@/lib/server/cases.server'
import { User } from 'lucide-react'
import Link from 'next/link'


type Props = {}

async function CasesPage({ }: Props) {
    const formattedDate = new Date(Date.now()).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    })

    const casesbyUser = await getUserCases();
    // console.log(casesbyUser)

    return (
        <Card className='w-full min-h-screen'>
            <CardHeader>
                <CardTitle>{formattedDate}</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nemo ad numquam!</CardDescription>
                <CardAction>
                    <Link href={'/dashboard/profile'}><Button> <User />Profile</Button></Link>
                    <AddCaseDrawer/>
                </CardAction>
            </CardHeader>
            <CardContent>
                <CaseTable cases={casesbyUser.data as any} />
            </CardContent>
        </Card>
    )
}

export default CasesPage