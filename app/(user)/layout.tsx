import Footer from "@/components/footer";
import Header from "@/components/header";
import HeaderScroll from "@/components/header-scroll";
import Layout from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Furniture.COM",
  description: "Online Store with Furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          <Header />
          <HeaderScroll />
          <Toaster />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Layout>
      </body>
    </html>
  );
}
