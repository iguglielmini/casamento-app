import type { Metadata } from "next";
import Footer from "./components/footer/footer";
import { Geist, Geist_Mono, Mrs_Saint_Delafield } from "next/font/google";
import { ConfirmPresenceProvider } from "@/contexts/ConfirmPresenceContext";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mrs-saint-delafield",
});

export const metadata: Metadata = {
  title: "Casamento - Ítalo & Daniely",
  description: "Casamento Ítalo & Daniely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} ${mrsSaintDelafield.variable} antialiased`}>
          <ConfirmPresenceProvider>
            {children}
            <Footer />
          </ConfirmPresenceProvider>
      </body>
    </html>
  );
}
