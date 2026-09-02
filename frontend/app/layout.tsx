import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_Devanagari, Poppins } from "next/font/google";
import AppShell from "./AppShell";
import Providers from "./providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raushni | NGO Management",
  description: "Raushni Educational & Social Welfare Trust management platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${notoDevanagari.variable}`}>
      <body className={`${poppins.className} ${notoDevanagari.className} bg-surface`}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
