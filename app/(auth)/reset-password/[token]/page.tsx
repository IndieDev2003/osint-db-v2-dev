import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react'
import ResetPasswordForm from '../../_components/forms/ResetPasswordForm';

type Props = {
  params: Promise<{
    token: string;
  }>
}

async function ResetPasswordPageWithToken({ params }: Props) {

  const { token } = await params
  return (
    <Card className='max-w-md w-full'>
      <CardHeader>
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum quis quae nobis?</CardDescription>
        <CardAction>
          <Link href={'/login'}>
            <Button variant={'outline'}>Login</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm token={token} />
      </CardContent>
    </Card>
  )
}

export default ResetPasswordPageWithToken