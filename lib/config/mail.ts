import nodemailer from 'nodemailer'
import { Resend } from 'resend'
import { emailHost, emailPassword, emailPort, emailUser, resendAPI } from './env.config';

const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: true,
    auth: {
        user: emailUser,
        pass: emailPassword
    }
});


export const resend = new Resend(resendAPI)
export default transporter