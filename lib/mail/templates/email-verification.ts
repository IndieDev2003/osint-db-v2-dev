import { emailLayout } from "./components/layout";
import { emailButton } from "./components/button";

interface EmailVerificationProps {
  name?: string;
  url: string;
}

export function emailVerificationEmail({
  name,
  url,
}: EmailVerificationProps) {
  const greeting = name ? `Hello ${name},` : "Hello,";

  return {
    subject: "Verify your OSINT ENGINE email address",

    text: `
${greeting}

Welcome to OSINT ENGINE!

Please verify your email address using this link:

${url}

If you did not create this account, you can ignore this email.
    `.trim(),

    html: emailLayout({
      title: "Verify your email",
      preview: "Complete your OSINT ENGINE account registration.",

      content: `
        <h2 style="
          margin: 0 0 16px;
          font-size: 24px;
          color: #18181b;
        ">
          Verify your email
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
          Welcome to OSINT ENGINE. Please verify your email address
          to complete your account registration.
        </p>

        <div style="margin: 28px 0;">
          ${emailButton(url, "Verify Email Address")}
        </div>

        <p style="
          font-size: 13px;
          line-height: 22px;
          color: #71717a;
        ">
          If you did not create this account, you can safely ignore
          this email.
        </p>
      `,
    }),
  };
}