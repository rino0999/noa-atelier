"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

const shopLinks = [
  { label: "All Necklaces", href: "/collections/all" },
];

const navLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Our Story", href: "/about" },
  { label: "Care Guide", href: "/care-guide" },
];

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <nav
        className="sticky top-0 z-50 bg-softCream border-b border-charcoal/10 font-dm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-cormorant italic text-2xl text-charcoal tracking-wide hover:text-warmGold transition-colors"
            aria-label="Noa Atelier home"
          >
            Noa Atelier
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 text-sm text-charcoal/80">
            <Link
              href="/collections/new-arrivals"
              className="hover:text-warmGold transition-colors"
            >
              New Arrivals
            </Link>

            {/* Shop Dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setShopOpen((v) => !v)}
                className="flex items-center gap-1 hover:text-warmGold transition-colors"
                aria-expanded={shopOpen}
                aria-haspopup="true"
              >
                Shop <ChevronDown size={14} className={`transition-transform ${shopOpen ? "rotate-180" : ""}`} />
              </button>
              {shopOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-softCream border border-charcoal/10 rounded-xl shadow-xl py-2 min-w-[200px] animate-fadeIn">
                  {shopLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setShopOpen(false)}
                      className="block px-5 py-2.5 text-sm hover:bg-ivory hover:text-warmGold transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="hover:text-warmGold transition-colors">
              Our Story
            </Link>
            <Link href="/care-guide" className="hover:text-warmGold transition-colors">
              Care Guide
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button aria-label="Search" className="hidden sm:block hover:text-warmGold transition-colors">
              <Search size={18} />
            </button>
            <button aria-label="Wishlist" className="hidden sm:block hover:text-warmGold transition-colors">
              <Heart size={18} />
            </button>
            <button
              aria-label={`Open cart, ${itemCount} items`}
              onClick={openCart}
              className="relative hover:text-warmGold transition-colors"
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-warmGold text-charcoal text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden hover:text-warmGold transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-softCream flex flex-col pt-24 px-8 font-dm animate-fadeIn lg:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-6 hover:text-warmGold transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col gap-6 text-2xl font-cormorant text-charcoal">
            <Link href="/collections/new-arrivals" onClick={() => setMobileOpen(false)} className="hover:text-warmGold transition-colors">
              New Arrivals
            </Link>
            <div>
              <p className="text-warmGold text-sm font-dm uppercase tracking-widest mb-3">Shop</p>
              {shopLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-1.5 hover:text-warmGold transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="hover:text-warmGold transition-colors">
              Our Story
            </Link>
            <Link href="/care-guide" onClick={() => setMobileOpen(false)} className="hover:text-warmGold transition-colors">
              Care Guide
            </Link>
          </nav>

          <div className="mt-auto pb-12 flex gap-6 text-sm text-charcoal/60">
            <button className="flex items-center gap-2 hover:text-warmGold transition-colors">
              <Search size={16} /> Search
            </button>
            <button className="flex items-center gap-2 hover:text-warmGold transition-colors">
              <Heart size={16} /> Wishlist
            </button>
          </div>
        </div>
      )}
    </>
  );
}
