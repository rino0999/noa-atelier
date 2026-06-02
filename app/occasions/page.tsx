import Link from "next/link";
import NecklaceSVG from "@/components/NecklaceSVG";
import ProductCard from "@/components/ProductCard";
import { getCollectionProducts } from "@/lib/shopify";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop by Occasion",
  description:
    "Find the perfect handcrafted necklace for every meaningful moment — birthdays, anniversaries, bridesmaid gifts, and more.",
};

const occasions = [
  {
    label: "Birthday",
    subtitle: "Make their day unforgettable",
    colours: { bg: "#F5ECEC", bead1: "#D4A5A5", bead2: "#E8C8C8", bead3: "#C9A96E" },
  },
  {
    label: "Anniversary",
    subtitle: "A token of enduring love",
    colours: { bg: "#F5EDD5", bead1: "#C9A96E", bead2: "#DFC28E", bead3: "#D4A5A5" },
  },
  {
    label: "Bridesmaid",
    subtitle: "For the ones who stand beside you",
    colours: { bg: "#FAF7F2", bead1: "#E8C8C8", bead2: "#D4A5A5", bead3: "#DFC28E" },
  },
  {
    label: "Self-Gift",
    subtitle: "Because you deserve it too",
    colours: { bg: "#F5F0E8", bead1: "#DFC28E", bead2: "#C9A96E", bead3: "#E8C8C8" },
  },
  {
    label: "Just Because",
    subtitle: "No reason needed",
    colours: { bg: "#F5ECEC", bead1: "#D4A5A5", bead2: "#C9A96E", bead3: "#E8C8C8" },
  },
  {
    label: "New Chapter",
    subtitle: "A necklace for every beginning",
    colours: { bg: "#F5EDD5", bead1: "#C9A96E", bead2: "#E8C8C8", bead3: "#D4A5A5" },
  },
];

export default async function OccasionsPage() {
  const gifted = await getCollectionProducts("occasions");

  return (
    <div className="animate-fadeIn">
      {/* Hero */}
      <section className="bg-ivory py-20 text-center px-6">
        <h1 className="font-cormorant font-light text-5xl sm:text-6xl text-charcoal mb-4">
          The perfect gift,<br />for every moment.
        </h1>
        <p className="font-dm text-charcoal/50 max-w-lg mx-auto leading-relaxed">
          Handcrafted necklaces that carry meaning. Whether it's a celebration, a milestone,
          or a quiet act of love — there's a piece made for it.
        </p>
      </section>

      {/* Occasion tiles */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {occasions.map((o) => (
            <Link
              key={o.label}
              href="/collections/occasions"
              className="group bg-softCream rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center py-8">
                <NecklaceSVG size="md" colours={o.colours} />
              </div>
              <div className="px-6 pb-6">
                <h3 className="font-cormorant text-2xl text-charcoal">{o.label}</h3>
                <p className="font-dm text-sm text-charcoal/50 mt-1">{o.subtitle}</p>
                <span className="inline-block mt-3 text-warmGold text-sm group-hover:translate-x-1 transition-transform">
                  Shop →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Most gifted */}
      <section className="bg-ivory py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-cormorant font-light text-3xl text-charcoal mb-8">
            Most Gifted
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gifted.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
