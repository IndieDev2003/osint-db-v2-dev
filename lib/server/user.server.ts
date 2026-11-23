"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export async function getSession() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        return session

    } catch (error) {
        redirect('/')

    }

}