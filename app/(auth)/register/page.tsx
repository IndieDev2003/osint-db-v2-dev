import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

import RegisterForm from '../_components/forms/RegisterForm'

type Props = {}

function RegisterPage({ }: Props) {
  return (
    <Card className='max-w-md w-full'>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptas impedit ex!</CardDescription>
        <CardAction>
          <Link href={'/login'}>
            <Button variant={'secondary'}>Login</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  )
}

export default RegisterPage