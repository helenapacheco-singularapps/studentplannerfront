//define infos da page
import type { Metadata } from "next";
//otimização das fontes do next
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
});

export const metadata: Metadata = {
  title: "Student Planner",
  description: "Academic planner for students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen`}
      >

        <div
          className={`${montserrat.className} bg-pinkly px-10 py-1 flex items-center`}
        >
          <Image
            src="/logo.h.png"
            alt="Student Planner"
            width={150}
            height={100}
            className="h-25 w-37.5"
          />
        </div>

        {children}

      </body>
    </html>
  );
}