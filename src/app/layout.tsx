import Header from "@/components/header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Kosugi, Lexend } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  fallback: ["var(--font-kosugi)"],
});

const kosugi = Kosugi({
  variable: "--font-kosugi",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Z-FRET",
  description: "Access chord faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={cn("antialiased dark", lexend.className, kosugi.variable)}
      >
        <NuqsAdapter>
          <div className="mx-auto">
            <Header />
            {children}
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
