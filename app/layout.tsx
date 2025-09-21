import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SindhiSanchaya - Sindhi Books Catalog",
  description: "Discover and explore the rich collection of Sindhi literature. Search through thousands of books in English, Devanagari, and Perso-Arabic scripts.",
  keywords: ["Sindhi", "books", "literature", "catalog", "search", "Devanagari", "Perso-Arabic"],
  authors: [{ name: "SindhiSanchaya Team" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SindhiSanchaya",
  },
  openGraph: {
    title: "SindhiSanchaya - Sindhi Books Catalog",
    description: "Discover and explore the rich collection of Sindhi literature",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SindhiSanchaya - Sindhi Books Catalog",
    description: "Discover and explore the rich collection of Sindhi literature",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#8B4513", // Updated to match brown theme
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
