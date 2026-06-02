import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

// TODO: When deploying to an environment with internet access, restore next/font/google:
// import { Cormorant_Garamond, DM_Sans } from "next/font/google";
// const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300","400"], style: ["normal","italic"] });
// const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["300","400","500"] });
// Then add className={`${cormorant.variable} ${dmSans.variable}`} to <html>

export const metadata: Metadata = {
  title: {
    default: "Noa Atelier — Handcrafted Beaded Necklaces",
    template: "%s | Noa Atelier",
  },
  description:
    "Handcrafted beaded necklaces made with intention in Sydney, Australia. Thoughtfully designed, ethically sourced, worn with meaning.",
  keywords: ["handcrafted necklaces", "beaded necklaces", "Sydney jewellery", "Noa Atelier"],
  openGraph: {
    siteName: "Noa Atelier",
    locale: "en_AU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NEXT_PUBLIC_COMING_SOON === "true") {
    return (
      <html lang="en">
        <body className="bg-softCream">
          <ComingSoon />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-softCream text-charcoal font-dm min-h-screen flex flex-col">
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <CartSidebar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
