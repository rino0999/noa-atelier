"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import NecklaceSVG from "./NecklaceSVG";
import type { Product } from "@/lib/mockData";
import { colourSwatches } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();

  const colours = [...new Set(product.variants.map((v) => v.colour))];
  const defaultVariant = product.variants[0];

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(defaultVariant.id);
  }

  return (
    <article
      className={`relative bg-softCream rounded-2xl overflow-hidden group transition-all duration-300 ${
        hovered ? "-translate-y-1 shadow-xl" : "shadow-sm"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Wishlist */}
      <button
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={(e) => {
          e.preventDefault();
          setWishlisted((v) => !v);
        }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
      >
        <Heart
          size={15}
          className={wishlisted ? "fill-dustyRose text-dustyRose" : "text-charcoal/40"}
        />
      </button>

      <Link href={`/product/${product.handle}`} className="block">
        {/* SVG illustration */}
        <div className="flex justify-center items-center py-8 px-4 bg-ivory/60">
          <NecklaceSVG size="md" colours={product.images[0]} />
        </div>

        {/* Info */}
        <div className="px-5 pb-5">
          <h3 className="font-cormorant text-xl text-charcoal mt-2 leading-tight">
            {product.title}
          </h3>
          <p className="text-xs text-charcoal/50 mt-1 line-clamp-1">
            {product.shortDescription}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="font-dm text-sm font-medium text-charcoal">
              AUD ${product.price}
            </span>
            <span className="font-dm text-xs text-charcoal/40 line-through">
              AUD ${product.compareAtPrice.toFixed(2)}
            </span>
          </div>

          {/* Colour swatches */}
          <div className="flex gap-1.5 mt-3">
            {colours.map((c) => (
              <span
                key={c}
                title={c}
                className="w-4 h-4 rounded-full border border-charcoal/10 ring-offset-softCream ring-offset-1"
                style={{ backgroundColor: colourSwatches[c] ?? "#ccc" }}
              />
            ))}
          </div>
        </div>
      </Link>

      {/* Add to Cart — appears on hover */}
      <div
        className={`px-5 pb-5 transition-all duration-300 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <button
          onClick={handleAddToCart}
          className="w-full bg-warmGold text-charcoal rounded-full py-2.5 text-sm font-medium hover:bg-[#b8943e] transition-colors"
          aria-label={`Add ${product.title} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
