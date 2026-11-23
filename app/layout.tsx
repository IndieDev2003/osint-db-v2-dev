import type { Metadata } from "next";
import { Geist, Geist_Mono, Oxanium } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const oxanium = Oxanium({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | OSINT & Cybersecurity Research`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "Explore OSINT investigations, cybersecurity research, threat intelligence, digital forensics and security tools.",

  applicationName: SITE_NAME,

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | OSINT & Cybersecurity Research`,
    description:
      "Research, investigate and share cybersecurity knowledge.",
    url: SITE_URL,
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased ", geistSans.variable, geistMono.variable, "font-sans", oxanium.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}
