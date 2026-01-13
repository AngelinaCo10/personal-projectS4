import type { Metadata } from "next";
import { Geist, Geist_Mono, Rowdies, Anonymous_Pro } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const rowdies = Rowdies({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-rowdies",
});

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-anonymous-pro",
});

export const metadata: Metadata = {
  title: "GIFTY",
  description: "Digital gift card prototype",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${rowdies.variable} ${anonymousPro.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
