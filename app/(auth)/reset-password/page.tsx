import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import ReqPasswordReset from '../_components/forms/ReqPasswordReset'

type Props = {}

function ResetPasswordPageWithoutToken({}: Props) {
  return (
      <Card className='max-w-md w-full'>
          <CardHeader>
              <CardTitle>Reset Your Password</CardTitle>
              <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptas amet adipisci.</CardDescription>
              <CardAction>
                  <Link href={'/login'}><Button variant={'outline'}>Login</Button></Link>
              </CardAction>
          </CardHeader>
          <CardContent>
              <ReqPasswordReset/>
          </CardContent>
    </Card>
  )
}

export default ResetPasswordPageWithoutToken