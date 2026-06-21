"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import NecklaceSVG from "@/components/NecklaceSVG";
import ProductCard from "@/components/ProductCard";
import { colourSwatches } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/mockData";

const staticReviews = [
  {
    name: "Amelia R.",
    stars: 5,
    text: "I ordered the Lumière and cried when I opened the box. The quality is extraordinary for the price. Already wearing it every day.",
  },
  {
    name: "Sophie T.",
    stars: 5,
    text: "Bought as a birthday gift and my friend hasn't taken it off since. The packaging alone made it feel so special.",
  },
  {
    name: "Cleo M.",
    stars: 5,
    text: "Noa Atelier is the brand I've been waiting for. Handcrafted, thoughtful, and genuinely beautiful. Worth every cent.",
  },
];

const accordionItems = [
  {
    title: "Details & Materials",
    content:
      "Handcrafted using high-quality glass and stone beads, ethically sourced from our trusted suppliers.",
  },
  {
    title: "Care Instructions",
    content:
      "Store flat or hanging when not wearing. Avoid contact with perfume, lotions, and water. Polish beads gently with a dry cloth. With proper care, your necklace will last a lifetime.",
  },
  {
    title: "Shipping & Returns",
    content:
      "Orders ship within 2–3 business days from Sydney. Free standard shipping on orders over AUD $100. Express available at checkout. Returns accepted within 30 days of delivery.",
  },
  {
    title: "Gift Wrapping",
    content:
      "Every Noa Atelier order arrives in our signature keepsake box with a ribbon and handwritten gift note. Complimentary for all orders.",
  },
];

function Accordion({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-charcoal/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-4 text-left font-dm text-sm text-charcoal hover:text-warmGold transition-colors"
        aria-expanded={open}
      >
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <p className="font-dm text-sm text-charcoal/60 pb-4 leading-relaxed">{content}</p>
      )}
    </div>
  );
}

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductPageClient({ product, relatedProducts }: Props) {
  const { addItem } = useCart();
  const [selectedLength, setSelectedLength] = useState(product.variants[0]?.length ?? "");
  const [selectedColour, setSelectedColour] = useState(product.variants[0]?.colour ?? "");
  const [qty, setQty] = useState(1);
  const [activeMedia, setActiveMedia] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const lengths = [...new Set(product.variants.map((v) => v.length))].filter(Boolean);
  const colours = [...new Set(product.variants.map((v) => v.colour))].filter(Boolean);

  const selectedVariant = product.variants.find(
    (v) => v.length === selectedLength && v.colour === selectedColour
  );

  const afterpayAmount = (product.price / 4).toFixed(2);

  async function handleAddToCart() {
    if (!selectedVariant) return;
    await addItem(selectedVariant.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="animate-fadeIn">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <nav aria-label="Breadcrumb" className="text-xs text-charcoal/40 font-dm flex gap-2">
          <Link href="/" className="hover:text-warmGold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections/all" className="hover:text-warmGold transition-colors">Necklaces</Link>
          <span>/</span>
          <span>{product.title}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left — Media */}
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden bg-ivory flex items-center justify-center p-8">
            {product.media[activeMedia]?.type === "video" ? (
              <video
                controls
                playsInline
                muted
                autoPlay
                loop
                poster={product.media[activeMedia].url}
                className="max-w-[320px] max-h-[352px] w-full rounded-xl"
              >
                {product.media[activeMedia].sources?.map((s, i) => (
                  <source key={i} src={s.url} type={s.mimeType} />
                ))}
              </video>
            ) : (
              <NecklaceSVG
                size="lg"
                colours={{
                  url: product.media[activeMedia]?.url,
                  bg: product.media[activeMedia]?.bg ?? "",
                  bead1: product.media[activeMedia]?.bead1 ?? "",
                  bead2: product.media[activeMedia]?.bead2 ?? "",
                  bead3: product.media[activeMedia]?.bead3 ?? "",
                }}
              />
            )}
          </div>
          <div className="flex gap-3">
            {product.media.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveMedia(i)}
                aria-label={`View ${item.type === "video" ? "video" : "image"} ${i + 1}`}
                className={`rounded-xl overflow-hidden border-2 transition-colors ${
                  activeMedia === i ? "border-warmGold" : "border-transparent"
                }`}
              >
                {item.type === "video" ? (
                  <div className="relative w-[120px] h-[132px]">
                    {item.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-ivory" />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/50 text-white text-base rounded-full w-8 h-8 flex items-center justify-center">
                        ▶
                      </span>
                    </span>
                  </div>
                ) : (
                  <NecklaceSVG
                    size="sm"
                    colours={{
                      url: item.url,
                      bg: item.bg ?? "",
                      bead1: item.bead1 ?? "",
                      bead2: item.bead2 ?? "",
                      bead3: item.bead3 ?? "",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right — Details */}
        <div className="space-y-6 font-dm">
          <h1 className="font-cormorant font-light text-4xl text-charcoal">{product.title}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-medium text-charcoal">AUD ${product.price}</span>
            <span className="text-sm text-charcoal/40 line-through">
              AUD ${product.compareAtPrice.toFixed(2)}
            </span>
          </div>

          {/* Afterpay */}
          <p className="text-sm text-charcoal/60">
            Or 4 x <strong>AUD ${afterpayAmount}</strong> with{" "}
            <span className="font-medium text-charcoal">Afterpay</span>
          </p>

          {/* Stars */}
          <div className="flex items-center gap-2">
            <span className="text-warmGold">★★★★★</span>
            <span className="text-xs text-charcoal/50">24 reviews</span>
          </div>

          {/* Description */}
          <p className="text-charcoal/70 leading-relaxed">{product.longDescription}</p>

          {/* Length selector */}
          {lengths.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-2">Length</p>
              <div className="flex gap-2 flex-wrap">
                {lengths.map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLength(l)}
                    aria-pressed={selectedLength === l}
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                      selectedLength === l
                        ? "bg-warmGold border-warmGold text-charcoal"
                        : "border-charcoal/20 text-charcoal/70 hover:border-warmGold"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colour selector */}
          {colours.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-2">
                Colour — <span className="text-charcoal/70 normal-case tracking-normal">{selectedColour}</span>
              </p>
              <div className="flex gap-3">
                {colours.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColour(c)}
                    aria-label={c}
                    aria-pressed={selectedColour === c}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColour === c
                        ? "border-warmGold scale-110 ring-2 ring-warmGold/30"
                        : "border-charcoal/10 hover:border-warmGold"
                    }`}
                    style={{ backgroundColor: colourSwatches[c] ?? "#ccc" }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to Cart */}
          <div className="flex gap-3 items-center">
            <div className="flex items-center border border-charcoal/20 rounded-full overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 py-2.5 hover:bg-ivory transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-3 py-2.5 min-w-[2.5rem] text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-4 py-2.5 hover:bg-ivory transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.available}
              className="flex-1 bg-warmGold text-charcoal rounded-full py-3 font-medium hover:bg-[#b8943e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Add ${product.title} to cart`}
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
          </div>

          {/* Wishlist */}
          <button
            onClick={() => setWishlisted((v) => !v)}
            className="flex items-center gap-2 border border-charcoal/20 text-charcoal/70 rounded-full px-6 py-2.5 text-sm hover:border-warmGold hover:text-warmGold transition-colors"
          >
            <Heart
              size={15}
              className={wishlisted ? "fill-dustyRose text-dustyRose" : ""}
            />
            {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
          </button>

          {/* Shipping note */}
          <p className="text-xs text-charcoal/50 border-t border-charcoal/10 pt-4">
            ✦ Free shipping on orders over AUD $100 · Usually ships in 2–3 business days from Sydney
          </p>

          {/* Accordion */}
          <div className="border-t border-charcoal/10 pt-2">
            {accordionItems.map((item) => (
              <Accordion key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="bg-ivory py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-cormorant font-light text-3xl text-charcoal mb-8">
            What people are saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staticReviews.map((r) => (
              <div key={r.name} className="bg-softCream rounded-2xl p-6 space-y-3">
                <span className="text-warmGold">{"★".repeat(r.stars)}</span>
                <p className="font-dm text-sm text-charcoal/70 leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <p className="font-dm text-xs text-charcoal/40">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You may also like */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-cormorant font-light text-3xl text-charcoal mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
