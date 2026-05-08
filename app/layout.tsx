import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Be Rich Now — Mike Brown",
  description: "How to want everything you have. Coming Fall 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}