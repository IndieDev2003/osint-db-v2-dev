import { ReactNode } from "react";
import { resend } from "../config/mail";

interface Props {
    from:string
    to: string;
    html: string,
    subject: string;
    text: string;
}

export async function sendMail({ from,to,subject,html,text}:Props) {
    await resend.emails.send({
        from,
        to,
        subject,
        html,
        text,

    })
}