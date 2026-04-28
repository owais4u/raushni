import type { Metadata } from "next";
import AppShell from "./AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raushni | NGO Management",
  description:
    "Raushni Educational & Social Welfare Trust management platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
