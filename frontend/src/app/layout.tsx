import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ray Simon Bantaculo — Computer Engineer & Developer",
  description: "Portfolio of Ray Simon Bantaculo — Computer Engineering student specializing in full-stack development, IoT systems, and embedded engineering. Building the future one system at a time.",
  keywords: ["Computer Engineering", "Full Stack Developer", "IoT", "Embedded Systems", "Portfolio"],
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
      </body>
    </html>
  );
}
