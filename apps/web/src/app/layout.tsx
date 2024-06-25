import type { Metadata } from "next";
import SessionLayout from "../layout/SessionLayout";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-loading-skeleton/dist/skeleton.css";


// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CellShope home page",
  description: "CellShope is a tech shope",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionLayout>
      <html lang="en">
        <body>
          <NextTopLoader />

          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </SessionLayout>
  );
}
