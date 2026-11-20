import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import LoginForm from '../_components/forms/LoginForm'

type Props = {}

function LoginPage({ }: Props) {
  return (
    <Card className='max-w-md w-full'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aliquam mollitia culpa?</CardDescription>
        <CardAction>
          <Link href={'/register'}>
            <Button variant={'secondary'}>Register</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}

export default LoginPage