import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'


type Props = {}

function Home({}: Props) {
  return (
    <div className='flex items-center min-h-screen justify-center'>
      <Card>
        <CardContent className='flex-row'>
          <Link href={'/register'}><Button variant={'outline'}>Register</Button></Link>
          <Link href={'/login'}><Button>Login</Button></Link>
          <Link href={'/dashboard'}><Button variant={'ghost'}>Dashboard</Button></Link>
        </CardContent>
     </Card>
    </div>
  )
}

export default Home