"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "../ui/button"
import { redirect } from "next/navigation"

type Props = {}

function LogoutButton({ }: Props) {
    return (
        <Button variant={'destructive'} onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess() {
                    redirect('/login')
                }
            }
        })}>Log Out</Button>
    )
}

export default LogoutButton