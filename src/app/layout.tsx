import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AgriTrack",
  description: "Farm Management System for Efficient Agriculture",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" sizes="32x32" type="image/x-icon" />
        <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.svg" />
      </head>
      <body className={`${montserrat.variable} ${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
