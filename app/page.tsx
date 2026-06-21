import Link from "next/link";
import Image from "next/image";
import NecklaceSVG from "@/components/NecklaceSVG";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/shopify";

const trustItems = [
  { icon: "✦", label: "Handcrafted in Sydney" },
  { icon: "◇", label: "Ethically Sourced" },
  { icon: "⊡", label: "Free Gift Wrapping" },
  { icon: "◈", label: "Afterpay Available" },
  { icon: "⟲", label: "Easy Returns" },
];

const socialColours = [
  { bg: "#F5ECEC", bead1: "#D4A5A5", bead2: "#E8C8C8", bead3: "#C9A96E" },
  { bg: "#F5EDD5", bead1: "#C9A96E", bead2: "#DFC28E", bead3: "#D4A5A5" },
  { bg: "#F5F0E8", bead1: "#E8C8C8", bead2: "#C9A96E", bead3: "#D4A5A5" },
  { bg: "#FAF7F2", bead1: "#D4A5A5", bead2: "#DFC28E", bead3: "#E8C8C8" },
  { bg: "#F0EBE5", bead1: "#C9A96E", bead2: "#D4A5A5", bead3: "#DFC28E" },
  { bg: "#F5ECEC", bead1: "#DFC28E", bead2: "#E8C8C8", bead3: "#C9A96E" },
];


export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div className="animate-fadeIn">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-ivory min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="font-cormorant font-light text-5xl sm:text-6xl xl:text-7xl text-charcoal leading-tight">
              Every bead<br />tells a story.
            </h1>
            <p className="font-dm text-charcoal/60 text-lg max-w-md leading-relaxed">
              Handcrafted beaded necklaces made with intention in Sydney, Australia.
              Each piece is strung by hand — a quiet ritual, a wearable memory.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/collections/all"
                className="bg-warmGold text-charcoal rounded-full px-8 py-3 font-dm font-medium hover:bg-[#b8943e] transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="border border-warmGold text-warmGold rounded-full px-8 py-3 font-dm hover:bg-warmGold/10 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg aspect-square rounded-2xl overflow-hidden drop-shadow-2xl">
              <Image
                src="/hero.jpg"
                alt="Handcrafted beaded necklace by Noa Atelier"
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Categories ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-cormorant font-light text-3xl text-charcoal mb-10">
          Explore the Collection
        </h2>
        <Link
          href="/collections/new-arrivals"
          className="group flex flex-col lg:flex-row w-full rounded-2xl overflow-hidden bg-ivory min-h-[480px]"
        >
          {/* Left — images */}
          <div className="flex-1 flex items-center justify-center gap-4 p-10 py-14 bg-softCream">
            <Image
              src="/about-1.png"
              alt="Handcrafted necklace from the new arrivals collection"
              width={192}
              height={280}
              className="rounded-2xl object-cover w-44 h-64 sm:w-48 sm:h-72"
            />
            <Image
              src="/about-2.png"
              alt="Close-up of beaded necklace from the new arrivals collection"
              width={192}
              height={280}
              className="rounded-2xl object-cover w-44 h-64 sm:w-48 sm:h-72 mt-12"
            />
          </div>
          {/* Right — text */}
          <div className="flex-1 flex flex-col justify-center px-10 py-14 lg:px-16">
            <h3 className="font-cormorant font-light text-4xl sm:text-5xl text-charcoal mb-3">
              New Arrivals
            </h3>
            <p className="font-dm text-charcoal/60 text-base mb-6">
              Fresh from the studio
            </p>
            <span className="inline-block font-dm text-sm text-warmGold group-hover:translate-x-1 transition-transform">
              Shop now →
            </span>
          </div>
        </Link>
      </section>

      {/* ── Featured Products ────────────────────────── */}
      <section className="bg-ivory py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-cormorant font-light text-3xl text-charcoal">New Arrivals</h2>
            <Link
              href="/collections/new-arrivals"
              className="font-dm text-sm text-warmGold hover:underline underline-offset-4"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Story Strip ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex gap-4 justify-center">
          {[
            { bg: "#FAF7F2", bead1: "#D4A5A5", bead2: "#C9A96E", bead3: "#E8C8C8" },
            { bg: "#F5EDD5", bead1: "#C9A96E", bead2: "#DFC28E", bead3: "#D4A5A5" },
          ].map((c, i) => (
            <NecklaceSVG
              key={i}
              size="md"
              colours={c}
              className={i === 1 ? "mt-10" : ""}
            />
          ))}
        </div>
        <div className="space-y-6">
          <h2 className="font-cormorant font-light text-4xl text-charcoal leading-snug">
            Made in Sydney,<br />worn everywhere.
          </h2>
          <p className="font-dm text-charcoal/60 leading-relaxed">
            Noa Atelier began as a quiet act of creation — a woman at a table, beads spread
            before her, threading something she hoped others would treasure.
          </p>
          <p className="font-dm text-charcoal/60 leading-relaxed">
            Every necklace is strung by hand in our Sydney studio using ethically sourced
            beads and gold-filled clasps. We believe jewellery should feel like a second skin —
            present, personal, and quietly beautiful.
          </p>
          <p className="font-dm text-charcoal/60 leading-relaxed">
            Each piece arrives in a keepsake box with complimentary gift wrapping, because
            the unwrapping is part of the gift.
          </p>
          <Link
            href="/about"
            className="inline-block border border-warmGold text-warmGold rounded-full px-8 py-3 text-sm hover:bg-warmGold/10 transition-colors"
          >
            Our Story
          </Link>
        </div>
      </section>

      {/* ── Social Proof Grid ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-cormorant font-light text-3xl text-charcoal mb-3">
          As seen on @noaatelier
        </h2>
        <p className="font-dm text-sm text-charcoal/50 mb-10">
          Tag us for a chance to be featured.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {socialColours.map((c, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
              <NecklaceSVG size="md" colours={c} className="w-full h-full" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust Bar ────────────────────────────────── */}
      <section className="bg-ivory border-t border-charcoal/8 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {trustItems.map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-2">
                <span className="text-warmGold text-2xl">{t.icon}</span>
                <span className="font-dm text-xs text-charcoal/60 leading-snug">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
