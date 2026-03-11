//define infos da page
import type { Metadata } from "next";
//otimização das fontes do next
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f2f2f2] min-h-screen`}
      >

        <div
          className={`${montserrat.className} bg-[#FADADD] px-10 py-[6px] flex items-center`}
        >
          <img
            src="/logo.h.png"
            alt="Student Planner"
            className="h-[100px] w-[150px]"
          />
        </div>

        {children}

      </body>
    </html>
  );
}