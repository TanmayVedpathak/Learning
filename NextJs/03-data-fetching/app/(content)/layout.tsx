import type { Metadata } from "next";

import { MainHeader } from "@/components";

import "../globals.css";

export const metadata: Metadata = {
  title: "Next.js Page Routing & Rendering",
  description: "Learn how to route to different pages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="page">
          <MainHeader />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
