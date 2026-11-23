import { Card, CardContent } from '@/components/ui/card'
import React, { ReactNode } from 'react'

type Props = {
    children:ReactNode
}

function BlogsDashboardLayout({children}: Props) {
  return (
      <div>
          <Card className='w-full min-h-screen'>
              <CardContent>
                  {children}
              </CardContent>
          </Card>
    </div>
  )
}

export default BlogsDashboardLayout