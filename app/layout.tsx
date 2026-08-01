import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accretion — All your work pulled into one powerful place",
  description:
    "Organize tasks and projects in one connected, accessible platform. Automations, live collaboration, 17 integrations and insights for modern teams.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Accretion" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
}
