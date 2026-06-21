"use client";

import Link from "next/link";
// Social icons as inline SVGs (lucide-react doesn't include brand icons)
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubscribed(true);
  }

  return (
    <footer className="bg-deepEspresso text-ivory/80 font-dm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <span className="font-cormorant italic text-2xl text-ivory tracking-wide">
                Noa Atelier
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-ivory/60 max-w-xs">
              Handcrafted with intention. Worn with meaning.
              <br />
              Made with love in Sydney, Australia.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/noaat.elier" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-warmGold transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://pinterest.com" aria-label="Pinterest" className="hover:text-warmGold transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.16 1.22-5.16s-.31-.62-.31-1.55c0-1.46.84-2.55 1.89-2.55.89 0 1.33.67 1.33 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.09-2.38 3.09-5.2 0-2.15-1.44-3.76-4.05-3.76-2.95 0-4.78 2.2-4.78 4.65 0 .84.24 1.44.62 1.9.17.2.19.28.13.51-.04.17-.14.57-.18.73-.06.23-.24.32-.44.23-1.23-.5-1.81-1.85-1.81-3.37 0-2.51 2.12-5.53 6.32-5.53 3.39 0 5.62 2.45 5.62 5.09 0 3.49-1.94 6.1-4.79 6.1-.96 0-1.86-.52-2.17-1.1l-.62 2.37c-.22.85-.82 1.92-1.23 2.56.93.28 1.91.43 2.94.43 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </a>
              <a href="https://tiktok.com" aria-label="TikTok" className="hover:text-warmGold transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Shop */}
          <div className="space-y-3">
            <h3 className="font-cormorant text-ivory text-lg tracking-wide">Shop</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "All Necklaces", href: "/collections/all" },
                { label: "New Arrivals", href: "/collections/new-arrivals" },
                { label: "Gift Sets", href: "/collections/gift-sets" },
                { label: "Shop by Occasion", href: "/occasions" },
                { label: "Gift Cards", href: "/gift-cards" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-warmGold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Help */}
          <div className="space-y-3">
            <h3 className="font-cormorant text-ivory text-lg tracking-wide">Help</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Shipping & Returns", href: "/shipping" },
                { label: "FAQs", href: "/contact" },
                { label: "Contact Us", href: "/contact" },
                { label: "Care Guide", href: "/care-guide" },
                { label: "Our Story", href: "/about" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-warmGold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div className="space-y-3">
            <h3 className="font-cormorant text-ivory text-lg tracking-wide">
              Stay in the loop
            </h3>
            <p className="text-sm text-ivory/60">
              New arrivals, stories, and quiet musings — straight to your inbox.
            </p>
            {subscribed ? (
              <p className="text-warmGold text-sm">Thank you for subscribing ✦</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email address"
                  required
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-ivory placeholder-ivory/40 focus:outline-none focus:border-warmGold transition-colors"
                />
                <button
                  type="submit"
                  className="bg-warmGold text-charcoal rounded-full px-6 py-2 text-sm font-medium hover:bg-[#b8943e] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/40">
          <span>© 2025 Noa Atelier · Sydney, Australia</span>
          <div className="flex gap-2 flex-wrap justify-center">
            {["Visa", "Mastercard", "PayPal", "Afterpay", "Apple Pay"].map((p) => (
              <span
                key={p}
                className="border border-white/20 rounded px-2 py-0.5 text-ivory/60"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
