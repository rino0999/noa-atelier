import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description:
    "Noa Atelier returns and refunds policy — change of mind, faulty or incorrect items, and how to start a return.",
  alternates: {
    canonical: "https://noaatelier.com.au/policies/refund-policy",
  },
};

const sections = [
  {
    title: "Change of mind (14 days)",
    body: "If you change your mind, you may return unworn items in their original condition and packaging within 14 days of delivery. Return postage is the customer's responsibility, and we recommend a tracked service as we can't be responsible for items lost in return transit. Once received and inspected, we'll issue a refund to your original payment method.",
  },
  {
    title: "Faulty or incorrect items",
    body: "Under the Australian Consumer Law, you're entitled to a repair, replacement or refund if an item is faulty, not as described, or significantly different from what was shown. This applies regardless of the 14-day window. If your piece arrives damaged or faulty, contact us at noaatelier79@gmail.com within 7 days of delivery with a photo and we'll make it right, including covering return postage.",
  },
  {
    title: "How to start a return",
    body: "Email noaatelier79@gmail.com with your order number and reason for return. We'll reply with return instructions and the return address.",
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-fadeIn font-dm">
      <h1 className="font-cormorant font-light text-5xl text-charcoal mb-4">
        Returns & Refunds
      </h1>
      <p className="text-charcoal/60 mb-12 leading-relaxed">
        At Noa Atelier, each piece is handmade to order with care. We want you to
        love your jewellery, and we're here to help if something isn't right.
      </p>

      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="font-cormorant text-2xl text-charcoal">
              {section.title}
            </h2>
            <p className="text-charcoal/70 text-sm leading-relaxed">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-16 bg-ivory rounded-2xl p-8 text-center">
        <p className="font-cormorant text-xl text-charcoal mb-2">
          Need to start a return?
        </p>
        <p className="text-sm text-charcoal/50 mb-4">
          Email us your order number and we'll take it from there.
        </p>
        <a
          href="mailto:noaatelier79@gmail.com"
          className="inline-block border border-warmGold text-warmGold rounded-full px-8 py-3 text-sm hover:bg-warmGold/10 transition-colors"
        >
          noaatelier79@gmail.com
        </a>
      </div>
    </div>
  );
}
