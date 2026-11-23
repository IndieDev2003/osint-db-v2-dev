interface EmailLayoutProps {
    title: string;
    preview: string;
    content: string;
    footer?: string;
}

export function emailLayout({
    title,
    preview,
    content,
    footer = "This is an automated email. Please do not reply.",
}: EmailLayoutProps) {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>

      <body style="
        margin: 0;
        padding: 40px 16px;
        background-color: #f4f4f5;
        font-family: Arial, Helvetica, sans-serif;
        color: #18181b;
      ">

        <div style="
          display: none;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
        ">
          ${preview}
        </div>

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="max-width: 560px; margin: 0 auto;"
        >
          <tr>
            <td style="
              padding: 24px;
              text-align: center;
              background-color: #18181b;
              border-radius: 12px 12px 0 0;
            ">
              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 22px;
                letter-spacing: 1px;
              ">
                OSINT DB
              </h1>
              <p style="
                margin: 6px 0 0;
                color: #a1a1aa;
                font-size: 12px;
              ">
                Investigation Management Platform
              </p>
            </td>
          </tr>

          <tr>
            <td style="
              padding: 36px 28px;
              background-color: #ffffff;
            ">
              ${content}
            </td>
          </tr>

          <tr>
            <td style="
              padding: 24px;
              text-align: center;
              background-color: #fafafa;
              border-radius: 0 0 12px 12px;
            ">
              <p style="
                margin: 0;
                color: #71717a;
                font-size: 12px;
                line-height: 20px;
              ">
                ${footer}
              </p>

              <p style="
                margin: 12px 0 0;
                color: #a1a1aa;
                font-size: 11px;
              ">
                © ${new Date().getFullYear()} OSINT DB. All rights reserved.
              </p>
            </td>
          </tr>
        </table>

      </body>
    </html>
  `;
}