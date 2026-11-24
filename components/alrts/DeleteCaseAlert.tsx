"use client"

import { Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { deleteCaseById } from "@/lib/server/cases.server"
import { toast } from "sonner"

type Props = {
    caseId: string
}

function DeleteCaseAlert({ caseId }: Props) {
    async function deleteCaseHandler(id: string) {
        const result = await deleteCaseById(id as string)
        if (!result.success) {
            toast.error(result.message)
            return;
        }
        toast.success(result.message, { description: 'Case Delete Successfully' })

    }
    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button variant={'destructive'} size={'sm'} />}><Trash2 />Delete Case</AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you Sure You Want To Delete This Case?</AlertDialogTitle>
                    <AlertDialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque totam aut dolorum!</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant={'outline'}>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant={'destructive'} onClick={() => deleteCaseHandler(caseId as string)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteCaseAlert