import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  description: "Play chords comfortably.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head />
      <body className={cn("antialiased", lexend.className, kosugi.variable)}>
        <NuqsAdapter>
          <ThemeProvider attribute="class" defaultTheme="system">
            <div className="min-h-[100dvh] flex flex-col">
              <Header />
              <div className="grow">{children}</div>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
      <GoogleAnalytics gaId="G-B53WYKM66T" />
    </html>
  );
}
