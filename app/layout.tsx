import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export const metadata: Metadata = {
  title: "Hubble",
  description: "Hubble by Cavli Wireless",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a1428] text-white">
        <Navbar />

        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}