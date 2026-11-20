import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { client, db } from "./db";
import { sendMail } from "./mail/sendMail";

export const auth = betterAuth({
    appName: "osint-db",
    trustedOrigins: [
        "http://localhost:3000",
        "https://your-production-domain.com",
    ],
    baseURL: {
        allowedHosts: [
            "localhost:3000",
            "*.vercel.app",
            "your-production-domain.com",
        ],
        protocol: "auto",
        fallback: "http://localhost:3000", 
    },
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        maxPasswordLength: 24,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url }) => {
            const start = Date.now();
            try {
                void sendMail({
                    to: user.email,
                    subject: "Verify Your Email",
                    text: `Click the link to verify your email: ${url}`,
                });
                console.log(`Verification email sent in ${Date.now() - start}ms`);
            } catch (err) {
                console.error(`Verification email failed after ${Date.now() - start}ms:`, err);
                throw err;
            }
        },
    },
});