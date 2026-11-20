import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Eye, Trash2Icon } from 'lucide-react'

type Props = {}

function CaseTable({ }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow className=''>
                    <TableHead>Serial No.</TableHead>
                    <TableHead className=''>Case Number</TableHead>
                    <TableHead>Case Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>99/25</TableCell>
                    <TableCell>Social Media</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Social Accounts</TableCell>
                    <TableCell className='flex justify-end gap-0.5'>
                        <Button><Eye/>View</Button>
                        <Button variant={'destructive'}><Trash2Icon/>Delete</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default CaseTable