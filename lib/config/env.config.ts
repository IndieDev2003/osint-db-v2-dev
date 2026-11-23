export const mongoUrl = process.env.MONGO_URI! as string;

// Email Credentials
export const emailHost = process.env.EMAIL_HOST! as string;
export const emailPort = process.env.EMAIL_PORT! as string;
export const emailUser = process.env.EMAIL_USERNAME! as string
export const emailPassword = process.env.EMAIL_PASSWORD! as string

// Resend API
export const resendAPI = process.env.RESEND_API_KEY! as string;
export const resendVerifyEmail = process.env.RESEND_VERIFY_EMAIL_FROM! as string
export const resendResetPasswordEmail = process.env.RESEND_PASSWORD_RESET_EMAIL_FROM! as string

