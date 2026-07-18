import type { Metadata, Viewport } from "next";
import { Lora, Inter } from "next/font/google";

import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mira — Your front desk never sleeps",
  description:
    "Mira answers every guest call in Hindi, English, or Hinglish — so Airbnb hosts and boutique properties never lose a booking to a missed call again.",
  openGraph: {
    title: "Mira — Your front desk never sleeps",
    description:
      "The AI voice receptionist for Airbnb hosts, boutique hotels, and vacation rental operators.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf6ef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
