import LogoutButton from '@/components/common/LogoutButton'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {}

function DashboardPage({ }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>OSINT Dashboard</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nulla perspiciatis officia!</CardDescription>
                
            </CardHeader>
        </Card>
    )
}

export default DashboardPage