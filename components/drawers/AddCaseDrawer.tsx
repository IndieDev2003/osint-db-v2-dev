import React from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Button } from '../ui/button'
import AddCaseForm from '../forms/AddCaseForm'
import { File, FileBadge2 } from 'lucide-react'

type Props = {}

function AddCaseDrawer({}: Props) {
  return (
      <Drawer swipeDirection='right'>
          <DrawerTrigger render={<Button  className={'w-fit'}/>}><FileBadge2/>Add New Case</DrawerTrigger>
          <DrawerContent>
              <DrawerHeader>
                  <DrawerTitle>Add New Case</DrawerTitle>
                  <DrawerDescription>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero sequi deleniti dolorum?</DrawerDescription>
              </DrawerHeader>
              <div className='p-4'>
                  <AddCaseForm/>
              </div>
          </DrawerContent>
    </Drawer>
  )
}

export default AddCaseDrawer