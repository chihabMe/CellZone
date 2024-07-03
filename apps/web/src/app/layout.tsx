import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-loading-skeleton/dist/skeleton.css";
import CartSidebar from "@/components/layout/CartSideBart";
import ContextProviders from "@/components/layout/ContextProviders";
import Wrappers from "@/components/layout/Wrappers";

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
    <ContextProviders>
      <html lang="en">
        <body>
          <NextTopLoader />

          <Wrappers>
            <Header />
            {children}
            <Footer />
          </Wrappers>
        </body>
      </html>
    </ContextProviders>
  );
}
