
import AddBlogDialog from '@/components/dialogs/AddBlogDialog'
import AddCaseDrawer from '@/components/drawers/AddCaseDrawer'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

type Props = {}

function DashboardPage({ }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>OSINT Dashboard</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nulla perspiciatis officia!</CardDescription>
                <AddCaseDrawer />
                <Link href={'/dashboard/blogs'}><Button>Blogs</Button></Link>
            </CardHeader>
        </Card>
    )
}

export default DashboardPage