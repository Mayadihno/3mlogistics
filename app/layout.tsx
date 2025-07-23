import type { Metadata } from "next";
import { Prociono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Provider";

const prociono = Prociono({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "3mFood",
  description: "3mfood Danish store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={prociono.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
