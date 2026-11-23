export function emailButton(url: string, label: string) {
    const safeUrl = url.replace(/&/g, "&amp;").replace(/"/g, "&quot;")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;");

    return `
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="
          background-color: #2563eb;
          border-radius: 8px;
          text-align: center;
        ">
          <a
            href="${safeUrl}"
            target="_blank"
            style="
              display: inline-block;
              padding: 14px 28px;
              color: #ffffff;
              text-decoration: none;
              font-size: 14px;
              font-weight: bold;
            "
          >
            ${label}
          </a>
        </td>
      </tr>
    </table>
  `;
}