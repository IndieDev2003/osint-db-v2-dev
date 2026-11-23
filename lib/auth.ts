import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";

import { client, db } from "./db";
import { sendMail } from "./mail/sendMail";

import {
    resendResetPasswordEmail,
    resendVerifyEmail,
} from "./config/env.config";

import {
    passwordResetEmail,
    emailVerificationEmail,
} from "./mail/templates";

export const auth = betterAuth({
    appName: "osint-db",

    // Keep your existing database and trustedOrigins configuration.
    trustedOrigins: [
        "http://localhost:3000",
        "https://osintengine.space",
    ],

    baseURL: {
        allowedHosts: [
            "localhost:3000",
            "*.vercel.app",
            "osintengine.space",
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

        resetPasswordTokenExpiresIn: 60 * 60,
        revokeSessionsOnPasswordReset: true,

        sendResetPassword: async ({ user, url,token }) => {
            const template = passwordResetEmail({
                name: user.name,
                token,
            });

            void sendMail({
                from: resendResetPasswordEmail,
                to: user.email,
                ...template,
            });
        },
    },

    emailVerification: {
        sendOnSignUp: true,

        sendVerificationEmail: async ({ user, url }) => {
            const template = emailVerificationEmail({
                name: user.name,
                url,
            });

            void sendMail({
                from: resendVerifyEmail,
                to: user.email,
                ...template,
            });
        },
    },
});