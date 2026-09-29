import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Rao Muhammad Ali — Software Developer",
  description:
    "Portfolio of Rao Muhammad Ali, a software developer building fast, reliable full-stack products with clean architecture and tested code.",
  openGraph: {
    title: "Rao Muhammad Ali — Software Developer",
    description:
      "Full-stack software developer designing scalable APIs and pixel-precise interfaces.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-[family-name:var(--font-body)] antialiased">
        <LocaleProvider>
          <Navbar />
          {children}
          <Footer />
          <LanguageToggle />
        </LocaleProvider>
      </body>
    </html>
  );
}