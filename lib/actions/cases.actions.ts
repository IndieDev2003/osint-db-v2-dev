"use server";

import { auth } from "../auth";
import { addCase, AddCaseProps } from "../server/cases.server";



export async function addCaseAction(props: AddCaseProps) {
    try {
        const session = await auth.api.getSession({
            headers: await (await import("next/headers")).headers(),
        });

        if (!session) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        const result = await addCase(props);

        return {
            success: true,
            data: result,
        };

    } catch (error) {
        console.error("Add case error:", error);

        return {
            success: false,
            message: "Unable to create case",
        };
    }
}
