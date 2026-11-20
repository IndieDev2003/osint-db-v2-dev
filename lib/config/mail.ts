import nodemailer from 'nodemailer'
import { emailHost, emailPassword, emailPort, emailUser } from './env.config';

const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: true,
    auth: {
        user: emailUser,
        pass: emailPassword
    }
});

export default transporter