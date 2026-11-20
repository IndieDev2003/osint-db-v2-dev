import nodemailer from "nodemailer";
import transporter from "../config/mail";

export interface SendMailProps {
    from?: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

const DEFAULT_FROM =
    process.env.MAIL_FROM || "Gagan Suman <fbdgagansuman@gmail.com>";

export async function sendMail({
    from = DEFAULT_FROM,
    to,
    subject,
    text,
    html,
}: SendMailProps) {
    try {
        const info = await transporter.sendMail({
            from,
            to,
            subject,
            text: text ?? (html ? html.replace(/<[^>]*>/g, " ").trim() : undefined),
            html,
        });

        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
            console.log("Preview URL:", previewUrl);
        }

        return { ok: true, messageId: info.messageId };
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error; // Let callers (like Better Auth) handle or surface mail failures
    }
}