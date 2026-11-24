import Link from 'next/link'
import { Button } from '../ui/button'
import { getSession } from '@/lib/server/user.server'
import LogoutButton from './LogoutButton'

type Props = {}

async function BlogHeader({ }: Props) {
    const session = await getSession();
    return (
        <header className='flex justify-between items-center border-b-2 py-2 px-4'>
            <Link href={'/'}>
                <h2>OSINT-ENGINE</h2>
            </Link>
            <ul className='flex gap-2'>
                <Link href={'/blogs'}>
                    <li><Button className={''} variant={'link'}>Blogs</Button></li>
                </Link>
                {
                    !session ?
                        <>
                            <Link href={'/login'}>
                                <li><Button className={''} variant={'outline'}>Login</Button></li>
                            </Link>
                        </> :
                        <>
                            <Link href={'/dashboard'}>
                            <Button>Dashboard</Button>
                            </Link>
                            <LogoutButton />
                        </>
                }

            </ul>
        </header>
    )
}

export default BlogHeader