"use client";

import { useState } from "react";
import NecklaceSVG from "@/components/NecklaceSVG";
import { useCart } from "@/context/CartContext";

const amounts = [50, 75, 100, 150];

export default function GiftCardsPage() {
  const [selected, setSelected] = useState<number>(100);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fadeIn">
      <h1 className="font-cormorant font-light text-5xl text-charcoal mb-3">Gift Cards</h1>
      <p className="font-dm text-charcoal/60 mb-12 max-w-lg leading-relaxed">
        Give someone the joy of choosing their own piece. Our digital gift cards are delivered
        instantly by email and never expire.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Preview */}
        <div className="bg-ivory rounded-2xl p-8 flex flex-col items-center gap-6">
          <NecklaceSVG
            size="md"
            colours={{ bg: "#F5EDD5", bead1: "#C9A96E", bead2: "#DFC28E", bead3: "#D4A5A5" }}
          />
          <div className="text-center">
            <p className="font-cormorant text-3xl text-charcoal">Noa Atelier</p>
            <p className="font-dm text-charcoal/50 text-sm mt-1">Gift Card</p>
            <p className="font-cormorant text-4xl text-warmGold mt-3">AUD ${selected}</p>
          </div>
          <p className="font-dm text-xs text-charcoal/40 text-center">
            Handcrafted with intention. Worn with meaning.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAdd} className="space-y-6">
          {/* Amount selector */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-charcoal/40 font-dm mb-3">
              Select Amount
            </label>
            <div className="flex gap-3 flex-wrap">
              {amounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setSelected(a)}
                  aria-pressed={selected === a}
                  className={`px-5 py-2.5 rounded-full border text-sm font-dm transition-colors ${
                    selected === a
                      ? "bg-warmGold border-warmGold text-charcoal"
                      : "border-charcoal/20 text-charcoal/70 hover:border-warmGold"
                  }`}
                >
                  ${a}
                </button>
              ))}
            </div>
          </div>

          {/* Recipient */}
          <div>
            <label htmlFor="recipient" className="block text-xs uppercase tracking-widest text-charcoal/40 font-dm mb-2">
              Recipient's Name
            </label>
            <input
              id="recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Amelia"
              className="w-full border border-charcoal/20 rounded-full px-5 py-3 text-sm font-dm focus:outline-none focus:border-warmGold bg-transparent transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-widest text-charcoal/40 font-dm mb-2">
              Personal Message (optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Write a personal note to go with the gift card..."
              className="w-full border border-charcoal/20 rounded-2xl px-5 py-3 text-sm font-dm focus:outline-none focus:border-warmGold bg-transparent transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-warmGold text-charcoal rounded-full py-3 font-dm font-medium hover:bg-[#b8943e] transition-colors"
          >
            {added ? "Added to Cart ✓" : `Add AUD $${selected} Gift Card to Cart`}
          </button>

          <p className="text-xs text-charcoal/40 font-dm text-center">
            Gift cards are delivered by email and never expire.
          </p>
        </form>
      </div>
    </div>
  );
}
