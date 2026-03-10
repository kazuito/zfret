import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Kosugi, Lexend } from "next/font/google";
import Footer from "../components/footer";
import Header from "../components/header";
import { Toaster } from "../components/ui/sonner";
import { env } from "../lib/env";
import { cn } from "../lib/utils";
import "./globals.css";
import { Sidebar } from "../components/sidebar";
import Providers from "./_components/providers";

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
  description: "Play chords comfortably.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", lexend.className, kosugi.variable)}>
        <Providers>
          <div className="flex">
            <Sidebar />
            <div className="flex min-h-dvh min-w-0 grow flex-col">
              <Header />
              <div className="min-w-0 grow pt-15 lg:pt-0">{children}</div>
              <Footer />
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
