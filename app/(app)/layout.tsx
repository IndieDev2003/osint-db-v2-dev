import BlogHeader from '@/components/common/BlogHeader'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

function BlogLayout({ children }: Props) {
    return (
        <main className=''>
            <BlogHeader/>
            {children}
        </main>
    )
}

export default BlogLayout