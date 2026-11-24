import DeleteCaseAlert from '@/components/alrts/DeleteCaseAlert';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCaseById } from '@/lib/server/cases.server';
import { NotebookDot } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
    params: Promise<{
        id: string
    }>
}

async function CaseByIdPage({ params }: Props) {
    const { id } = await params;
    if (!id) return notFound();

    const caseById = await getCaseById(id)
    if (!caseById) return <><p>Case Not Found</p></>
    if (!caseById?.success) {
        return (
            <>
                <p>Fetching Case Failed</p>
                <p>{caseById.message}</p>
            </>
        )
    }

    const caseData = caseById.data

    return (
        <Card>
            <CardHeader>
                <CardTitle>{caseData?.title}</CardTitle>
                <CardDescription>{caseData?.description}</CardDescription>
                <CardAction>
                    <NotebookDot />
                </CardAction>
            </CardHeader>
        </Card>
    )
}

export default CaseByIdPage