import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Notebook } from 'lucide-react'
import AddBlogForm from '../forms/AddBlogForm'

type Props = {}

function AddBlogDialog({}: Props) {
  return (
      <Dialog>
          <DialogTrigger render={<Button variant={'secondary'} className={'w-fit'} />}><Notebook />Add New Blog</DialogTrigger>
          <DialogContent className={'min-w-3xl'}>
              <DialogHeader>
                  <DialogTitle className={''}><div className='flex items-center text-lg gap-2'><Notebook />Add New Blog</div></DialogTitle>
                  <DialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora nemo repellendus velit.</DialogDescription>
              </DialogHeader>
              <AddBlogForm/>
          </DialogContent>
    </Dialog>
  )
}

export default AddBlogDialog