import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import UserAvatar from './_components/UserAvatar'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DamIcon, File, HdIcon, Icon, NfcIcon, User, UserCircle2 } from 'lucide-react'



async function UserProfilePage({ }) {

    const session = await auth.api.getSession({
        headers: await headers()
    })



    return (
        <Card className='min-h-screen'>
            <CardHeader>
                <div className='flex gap-4'>
                    <UserAvatar avatarImage={session?.user.image!} emailVerified={session?.user.emailVerified} />
                    <div>
                        <p>{session?.user.name}</p>
                        <p className={session?.user.emailVerified ? 'text-green-500' : 'text-red-400'}>
                            {session?.user.email}
                        </p>

                    </div>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col md:flex-row'>
                <div className='w-full space-y-2'>
                    <Card className='max-w-sm w-full hover:scale-98 transition-all hover:shadow-2xs'>
                        <CardHeader>
                            <CardTitle>Cases</CardTitle>
                            <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardDescription>
                            <CardAction>
                                <Link href={'/dashbaord'}><Button><File />Explore</Button></Link>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <p>Total Cases:</p>
                        </CardContent>
                    </Card>
                    <Card className='max-w-sm w-full hover:scale-98 transition-all hover:shadow-2xs'>
                        <CardHeader>
                            <CardTitle>Evidences</CardTitle>
                            <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Total Evidences:</p>
                        </CardContent>
                    </Card>
                    <Card className='max-w-sm w-full hover:scale-98 transition-all hover:shadow-2xs'>
                        <CardHeader>
                            <CardTitle>Persons</CardTitle>
                            <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Total Persons:</p>
                        </CardContent>
                    </Card>
               </div>
            </CardContent>
        </Card>
    )
}

export default UserProfilePage