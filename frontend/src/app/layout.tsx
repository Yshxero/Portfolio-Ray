import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { Analytics } from "@vercel/analytics/react";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ray Simon Bantaculo | Computer Engineer & Full-Stack Developer",
    template: "%s | Ray Simon Bantaculo",
  },
  description:
    "Official portfolio of Ray Simon Bantaculo — Computer Engineer specializing in Full-Stack Development, IoT Systems, Rust Desktop Apps, and Multimodal AI/RAG Architectures.",
  keywords: [
    "Ray Simon Bantaculo",
    "Ray Simon",
    "Bantaculo",
    "Computer Engineer",
    "Full-Stack Developer",
    "IoT Systems Engineer",
    "Rust Developer",
    "Tauri",
    "FastAPI",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Ray Simon Bantaculo" }],
  creator: "Ray Simon Bantaculo",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ray Simon Bantaculo | Computer Engineer & Full-Stack Developer",
    description:
      "Full-Stack, IoT Systems, Rust Desktop & AI/RAG Engineer. Explore interactive portfolio, projects, and tech stack.",
    siteName: "Ray Simon Bantaculo Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ray Simon Bantaculo | Computer Engineer & Developer",
    description: "Computer Engineer specializing in Full-Stack, IoT Systems, and AI Architectures.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
