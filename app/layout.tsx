import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
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
    <html lang="en" className={`${jakarta.variable} ${inter.variable} overflow-x-clip w-full`}>
      <body className="antialiased font-[var(--font-inter)] overflow-x-clip w-full">
        {/* Preloader is temporarily disabled as requested */}
        {/* <Preloader /> */}
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}