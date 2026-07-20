import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Zeyad Azab | Backend Engineer & Software Architect",
  description:
    "Portfolio of Zeyad Azab, a Software Engineer specializing in ASP.NET Core, database architectures, APIs, and scalable backend workflows.",
  keywords: [
    "Zeyad Azab",
    "Backend Developer",
    "Software Engineer",
    "ASP.NET Core",
    "C# Developer",
    "Database Normalization",
    "Clean Architecture",
    "API Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark selection:bg-cyber-blue/20 selection:text-cyber-blue">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-mono antialiased bg-[#050505] text-[#f3f4f6] min-h-screen relative`}
      >
        <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
        <LenisProvider>
          <CustomCursor />
          <div className="relative z-10">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
