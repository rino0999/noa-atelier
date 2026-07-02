"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "How long does it take to receive my order?",
    a: "Orders are dispatched within 2–3 business days from our Sydney studio. Standard Australian shipping takes 3–7 business days; express takes 1–3. International orders arrive within 7–14 business days.",
  },
  {
    q: "Can I return or exchange my necklace?",
    a: "Yes — we accept returns within 30 days of delivery for unused items in original packaging. Personalised items cannot be returned unless faulty. Email us and we'll guide you through the process.",
  },
  {
    q: "Are your necklaces suitable for sensitive skin?",
    a: "Our beads are glass and stone, and our clasps are 14kt gold-filled — a great option for sensitive skin. If you have a specific allergy, please reach out before ordering.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "Every single Noa Atelier order arrives in a signature keepsake box with a ribbon and the option to include a handwritten gift note — at no extra cost.",
  },
  {
    q: "Can I order a custom length?",
    a: "We currently offer three standard lengths: 40cm, 45cm, and 50cm. If you need something different, email us at noaatelier79@gmail.com and we'll do our best to help.",
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-charcoal/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-start justify-between w-full py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-cormorant text-lg text-charcoal">{q}</span>
        <span className="flex-shrink-0 text-charcoal/40 mt-1">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && (
        <p className="font-dm text-sm text-charcoal/60 pb-5 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  function update(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fadeIn">
      <h1 className="font-cormorant font-light text-5xl text-charcoal mb-3">Contact & FAQs</h1>
      <p className="font-dm text-charcoal/60 mb-12 max-w-lg leading-relaxed">
        We'd love to hear from you. Whether you have a question about your order, need help
        choosing a piece, or just want to say hello — we're here.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact form */}
        <div>
          <h2 className="font-cormorant text-2xl text-charcoal mb-6">Send a message</h2>
          {sent ? (
            <div className="bg-ivory rounded-2xl p-8 text-center space-y-3">
              <span className="text-3xl text-warmGold block">✦</span>
              <p className="font-cormorant text-xl text-charcoal">
                Thank you, {form.name || "friend"}.
              </p>
              <p className="font-dm text-sm text-charcoal/60">
                We'll get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-dm">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-widest text-charcoal/40 mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  required
                  placeholder="Amelia"
                  className="w-full border border-charcoal/20 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-warmGold bg-transparent transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-widest text-charcoal/40 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  required
                  placeholder="you@example.com"
                  className="w-full border border-charcoal/20 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-warmGold bg-transparent transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-widest text-charcoal/40 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  required
                  placeholder="How can we help?"
                  className="w-full border border-charcoal/20 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-warmGold bg-transparent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-warmGold text-charcoal rounded-full py-3 font-medium hover:bg-[#b8943e] transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-cormorant text-2xl text-charcoal mb-2">Frequently asked</h2>
          <div className="mt-4">
            {faqs.map((faq) => (
              <FAQ key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
