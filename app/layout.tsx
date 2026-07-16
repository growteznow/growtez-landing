import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-outfit", // Keep variable name same so we don't have to change everywhere
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Growtez | Elite Digital Agency",
  description:
    "Growtez builds high-performance websites, mobile apps, and AI-powered solutions that help your business grow at the speed of now.",
  keywords: ["web development", "app development", "AI integration", "digital agency", "Growtez"],
  openGraph: {
    title: "Growtez | Elite Digital Agency",
    description: "High-performance web, mobile & AI solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="antialiased font-[var(--font-inter)]">
        {/* Preloader sits at the highest z-index and runs first */}
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}