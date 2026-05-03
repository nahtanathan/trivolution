import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";

import "./globals.css";

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: process.env.LEADERBOARD_TITLE ?? "Trivolution Leaderboard",
  description:
    "Premium Trivolution Slots leaderboard, milestone rewards, and live standings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
