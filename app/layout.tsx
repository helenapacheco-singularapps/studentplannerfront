import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
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
})

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background:"#f2f2f2", minHeight:"100vh" }}
      >

        {/* Topbar */}
        <div
          className={montserrat.className}
          style={{
            background:"#FADADD",
            padding:"8px 40px",
            display:"flex",
            alignItems:"center"
          }}
        >
          <img
            src="/logo.h.png"
            alt="Student Planner"
            style={{ height:"85px", width:"auto" }}
          />
        </div>

        {children}

      </body>
    </html>
  );
}