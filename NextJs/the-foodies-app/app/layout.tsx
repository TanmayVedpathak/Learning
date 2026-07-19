import type { Metadata } from "next";
import { Montserrat, Quicksand } from "next/font/google";

import { MainHeader, MainHeaderBackground } from "@/components";

import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-quicksand",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${montserrat.variable} h-full antialiased`}>
      <body>
        <MainHeaderBackground />
        <MainHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
