import { emailLayout } from "./components/layout";
import { emailButton } from "./components/button";

interface PasswordResetEmailProps {
  name?: string;
  token: string;
}

export function passwordResetEmail({
  name,
  token,
}: PasswordResetEmailProps) {
  const greeting = name
    ? `Hello ${name},`
    : "Hello,";

  return {
    subject: "Reset your OSINT ENGINE password",

    text: `
${greeting}

We received a request to reset your OSINT ENGINE account password.

Use the following link to create a new password:

${process.env.BETTER_AUTH_URL! as string + '/reset-password/' + token}

This link expires in one hour and can only be used once.

If you did not request this password reset, you can safely ignore this email.

OSINT ENGINE
Investigation Management Platform
    `.trim(),

    html: emailLayout({
      title: "Reset your password",
      preview: "Reset your OSINT ENGINE account password.",

      content: `
        <h2 style="
          margin: 0 0 16px;
          font-size: 24px;
          color: #18181b;
        ">
          Reset your password
        </h2>

        <p style="
          font-size: 14px;
          line-height: 24px;
          color: #52525b;
        ">
          ${greeting}
        </p>

        <p style="
          font-size: 14px;
          line-height: 24px;
          color: #52525b;
        ">
          We received a request to reset the password associated with
          your OSINT ENGINE account.
        </p>

        <div style="margin: 28px 0;">
          ${emailButton(process.env.BETTER_AUTH_URL! as string + '/reset-password/' + token, "Reset Password")}
        </div>

        <p style="
          font-size: 13px;
          line-height: 22px;
          color: #71717a;
        ">
          This link expires in <strong>one hour</strong> and can only
          be used once.
        </p>

        <p style="
          font-size: 13px;
          line-height: 22px;
          color: #71717a;
        ">
          If you did not request this password reset, you can safely
          ignore this email. Your password will remain unchanged.
        </p>
      `,
    }),
  };
}