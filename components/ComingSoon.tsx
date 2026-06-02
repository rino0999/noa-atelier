"use client";

import { useState } from "react";
import NecklaceSVG from "./NecklaceSVG";

const BEAD_COLOURS = {
  bg: "#FAF7F2",
  bead1: "#E8C8C8",
  bead2: "#C9A96E",
  bead3: "#D4A5A5",
};

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // Wire up to Klaviyo / Mailchimp / any email provider here
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-softCream flex flex-col items-center justify-center px-6 py-20 text-center animate-fadeIn">
      {/* Wordmark */}
      <p className="font-dm text-[0.65rem] tracking-[0.3em] uppercase text-charcoal/35 mb-10">
        Noa Atelier
      </p>

      {/* Illustration */}
      <NecklaceSVG size="lg" colours={BEAD_COLOURS} className="mb-10" />

      {/* Heading */}
      <h1 className="font-cormorant font-light text-5xl sm:text-6xl text-charcoal leading-[1.1] mb-5">
        Something beautiful
        <br />
        is coming.
      </h1>

      {/* Subtext */}
      <p className="font-dm text-charcoal/55 text-sm sm:text-base max-w-xs leading-relaxed mb-10">
        We&rsquo;re crafting our collection with care. Be the first to know
        when we open our doors.
      </p>

      {/* Email signup */}
      {submitted ? (
        <p className="font-dm text-sm text-warmGold flex items-center gap-2">
          <span aria-hidden>✦</span>
          You&rsquo;re on the list — we&rsquo;ll be in touch soon.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col sm:flex-row gap-3"
          aria-label="Email signup"
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3 rounded-full border border-charcoal/20 bg-white/60 text-charcoal placeholder:text-charcoal/30 font-dm text-sm focus:outline-none focus:border-warmGold transition-colors"
          />
          <button
            type="submit"
            className="px-7 py-3 bg-warmGold text-charcoal rounded-full font-dm text-sm font-medium hover:bg-[#b8943e] transition-colors whitespace-nowrap"
          >
            Notify Me
          </button>
        </form>
      )}

      {/* Footer note */}
      <p className="mt-20 font-dm text-[0.6rem] tracking-[0.25em] uppercase text-charcoal/25">
        Handcrafted beaded necklaces &nbsp;·&nbsp; Made in Sydney
      </p>
    </div>
  );
}
