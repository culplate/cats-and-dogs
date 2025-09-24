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
  title: "Cats & Dogs Breeds - Discover Your Perfect Pet",
  description:
    "Explore a comprehensive collection of cat and dog breeds. Learn about different breeds, their characteristics, temperament, and find your perfect companion.",
  keywords: [
    "cat breeds",
    "dog breeds",
    "pet breeds",
    "animal breeds",
    "cats",
    "dogs",
    "pets",
  ],
  authors: [{ name: "Cats & Dogs Breeds App" }],
  creator: "Cats & Dogs Breeds App",
  publisher: "Cats & Dogs Breeds App",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
