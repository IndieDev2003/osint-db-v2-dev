
import "server-only";

import db from "../config/db";
import { ObjectId } from "mongodb";
import { auth } from "../auth";

export interface AddCaseProps {
    title: string;
    status: "open" | "in_progress" | "closed";
    priority: "low" | "medium" | "high" | "critical";
    tags: string[];
    description: string;
}

export async function addCase(props: AddCaseProps) {
    const casesDb = db.collection("cases");

    const now = new Date();

    const newCase = {
        ...props,
        tags: props.tags,
        createdAt: now,
        updatedAt: now,
    };

    const result = await casesDb.insertOne(newCase);

    return {
        ...newCase,
        _id: result.insertedId.toString(),
    };
}



