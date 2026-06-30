import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "Noa Atelier",
  url: "https://noaatelier.com.au",
  logo: "https://noaatelier.com.au/logo-512.png",
  description:
    "Handmade beaded necklaces and jewellery, hand-strung in Sydney, Australia.",
  sameAs: [
    "https://www.instagram.com/noaat.elier",
    "https://www.facebook.com/share/18pux7kXfy/",
    "https://www.etsy.com/au/shop/NoaatelierAU",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sydney",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
};

// TODO: When deploying to an environment with internet access, restore next/font/google:
// import { Cormorant_Garamond, DM_Sans } from "next/font/google";
// const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300","400"], style: ["normal","italic"] });
// const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["300","400","500"] });
// Then add className={`${cormorant.variable} ${dmSans.variable}`} to <html>

export const metadata: Metadata = {
  metadataBase: new URL("https://noaatelier.com.au"),
  title: {
    default: "Noa Atelier | Handmade Beaded Necklaces & Jewellery Sydney",
    template: "%s | Noa Atelier",
  },
  description:
    "Handmade beaded necklaces and jewellery, designed and hand-strung in Sydney. Shop unique, one-of-a-kind pieces from independent Australian label Noa Atelier.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Noa Atelier",
    url: "https://noaatelier.com.au",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
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
        <JsonLd data={organizationSchema} />
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
