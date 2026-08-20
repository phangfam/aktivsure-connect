import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ChatWidget from "@/components/ChatWidget";

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
      <body className="antialiased">
        <div className="flex min-h-screen flex-col bg-neutral-50 md:flex-row">
          <Sidebar />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
