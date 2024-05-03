import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainContextProvider } from "./core/contexts/main.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GMap Scraper",
  description: "A NextJs Node puppeteer GMap Scraper app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainContextProvider>{children}</MainContextProvider>
      </body>
    </html>
  );
}
