import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "../globals.css";
import Navbar from "@/components/navbar/navbar";
import Layout from "@/providers/layout-provider";

const inter = Montserrat({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-primary/15`}>
        <Layout>
          <Navbar />
          <Toaster />
          <main className="mt-20 min-h-screen">{children}</main>
          <Footer />
        </Layout>
      </body>
    </html>
  );
}
