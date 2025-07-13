import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";

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
      <body className="antialiased dark">
        <div className="mx-auto">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
