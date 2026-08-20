import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AktivSure Connect",
  description: "AktivSure product registration and lead capture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
