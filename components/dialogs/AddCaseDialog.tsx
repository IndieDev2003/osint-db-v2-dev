import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import AddCaseForm from '../forms/AddCaseForm'

type Props = {}

function AddCaseDialog({}: Props) {
  return (
    <Dialog>
      <DialogTrigger><Button>Add New Case</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Case</DialogTitle>
          <DialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ratione vitae magni.</DialogDescription>
        </DialogHeader>
        <AddCaseForm/>
      </DialogContent>
    </Dialog>
  )
}

export default AddCaseDialog