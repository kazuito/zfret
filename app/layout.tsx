import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import Providers from "./_components/providers";

const lexend = localFont({
  variable: "--font-lexend",
  fallback: ["var(--font-kosugi)"],
  src: [
    {
      path: "../node_modules/@fontsource-variable/lexend/files/lexend-latin-wght-normal.woff2",
      style: "normal",
    },
  ],
});

const kosugi = localFont({
  variable: "--font-kosugi",
  src: [
    {
      path: "../node_modules/@fontsource/kosugi/files/kosugi-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
  ],
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
