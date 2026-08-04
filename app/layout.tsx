import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veriis | Enterprise AI Document Intelligence",
  description:
    "Organize tasks and projects in one connected, accessible platform. Automations, live collaboration, 17 integrations and insights for modern teams.",
  applicationName: "Veriis",
  openGraph: {
    title: "Veriis | Enterprise AI Document Intelligence",
    description: "Organize tasks and projects in one connected, accessible platform.",
    siteName: "Veriis",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veriis | Enterprise AI Document Intelligence",
    description: "Organize tasks and projects in one connected, accessible platform.",
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Veriis" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap"
        />
        {/* We will let Next.js generate the icon via app/icon.tsx */}
      </head>
      <body>{children}</body>
    </html>
  );
}
