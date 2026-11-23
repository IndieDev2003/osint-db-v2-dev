import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import VerifyEmailForm from '../_components/forms/VerifyEmailForm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {}

function VerifyPage({}: Props) {
  return (
      <Card className='max-w-md w-full'>
          <CardHeader>
              <CardTitle>Verify Your Email</CardTitle>
              <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quasi rerum neque!</CardDescription>
              <CardAction>
                  <Link href={'/login'}><Button variant={'outline'}>Login</Button></Link>
              </CardAction>
          </CardHeader>
          <CardContent>
              <VerifyEmailForm/>
          </CardContent>
    </Card>
  )
}

export default VerifyPage