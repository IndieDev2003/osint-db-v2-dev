"use server"

import db from "../config/db";
import { getSession } from "./user.server";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

export interface AddCaseProps {
    title: string;
    status: "open" | "in_progress" | "closed";
    priority: "low" | "medium" | "high" | "critical";
    tags: string[];
    purpose:string,
    description: string;
}

export async function addCase(props: AddCaseProps) {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const casesDb = db.collection("cases");
        const now = new Date();

        const newCase = {
            ...props,
            creatorId: session.user.id,
            tags: props.tags,
            createdAt: now,
            updatedAt: now,
        };

        const result = await casesDb.insertOne(newCase);

        return {
            success: true,
            data: {
                ...newCase,
                _id: result.insertedId.toString(),
            },
        };
    } catch (error) {
        console.error("Add case error:", error);

        return {
            success: false,
            message: "Failed to create case.",
        };
    }
}

export async function getUserCases() {
    try {
        const session = await getSession();

        if (!session) {
            redirect("/login");
        }

        const casesDb = db.collection("cases");

        const cases = await casesDb
            .find({
                creatorId: session.user.id,
            })
            .sort({
                createdAt: -1,
            })
            .toArray();

        return {
            success: true,
            data: cases.map((item) => ({
                ...item,
                _id: item._id.toString(),
            })),
        };
    } catch (error) {
        console.error("Get user cases error:", error);

        return {
            success: false,
            message: "Failed to fetch cases.",
            data: [],
        };
    }
}
export async function deleteCaseById(id: string) {
    try {
        const session = await getSession();
        if (!session) {
            redirect('/login')
        }
        const casesDb = db.collection('cases');

        const result = await casesDb.deleteOne({
            _id: new ObjectId(id),
            creatorId: session.user.id,
        });
        if (result.deletedCount === 0) {
            return {
                success: false,
                message: "Case not found or you don't have permission to delete it.",
            };
        }

        return {
            success: true,
            message: "Case deleted successfully.",
        };
    } catch (error) {
        console.error("Delete case error:", error);

        return {
            success: false,
            message: "Failed to delete case.",
        };
    }
}

export async function getCaseById(id:string) {
    try {
        const session = await getSession();
        if (!session) {
            redirect('/login')
        }

        const casesDb = db.collection('cases');

        const result = await casesDb.findOne({
            _id: new ObjectId(id),
            creatorId: session.user.id,
        });
        if (result) {
            return {
                success: true,
                message: "Case not found or you don't have permission to delete it.",
                data:result
            };
        }

        return {
            success: false,
            message: "Case fetched successfully.",
        };
    } catch (error) {
        
    }
}