
"use client";

import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import { Button } from "../ui/button";
import { Eye, Trash2Icon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { deleteCaseById } from "@/lib/server/cases.server";
import DeleteCaseAlert from "../alrts/DeleteCaseAlert";

export interface CaseItem {
    _id: string;
    title: string;
    status: "open" | "in_progress" | "closed";
    priority: "low" | "medium" | "high" | "critical";
    tags: string[];
    purpose: string;
    description: string;
    creatorId: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

type Props = {
    cases: CaseItem[];
};

const priorityStyles = {
    low: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    medium: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    high: "bg-orange-100 text-orange-700 hover:bg-orange-100",
    critical: "bg-red-100 text-red-700 hover:bg-red-100",
};

const statusStyles = {
    open: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    in_progress: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    closed: "bg-green-100 text-green-700 hover:bg-green-100",
};

function CaseTable({ cases }: Props) {

    if (!cases) {
        return (
            <Card>
                <CardContent>
                    <p>Cases Empty</p>
                </CardContent>
            </Card>
        )
    }

    

    return (
        <Card>
            <CardContent>
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-20">Serial No.</TableHead>
                            <TableHead>Case Number</TableHead>
                            <TableHead>Case Type</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Purpose</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {cases.length > 0 ? (
                            cases.map((caseItem, index) => (
                                <TableRow key={caseItem._id}>
                                    <TableCell className="font-medium">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell className="font-medium">
                                        {caseItem._id}
                                    </TableCell>

                                    <TableCell>
                                        {caseItem.tags?.[0] ?? "General"}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            className={
                                                priorityStyles[caseItem.priority]
                                            }
                                        >
                                            {caseItem.priority.toUpperCase()}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            className={
                                                statusStyles[caseItem.status]
                                            }
                                        >
                                            {caseItem.status.replace("_", " ").toUpperCase()}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="max-w-[200px] truncate">
                                        {caseItem.purpose}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={'flex items-center gap-1'}

                                            >
                                                <Link href={`/dashboard/cases/${caseItem._id}`} className="flex gap-1 items-center">
                                                    <Eye className="h-4 w-4" />
                                                    View
                                                </Link>
                                            </Button>

                                            <DeleteCaseAlert caseId={caseItem._id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    No cases found. Create your first investigation case.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default CaseTable;
