import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Noa Atelier shipping rates, delivery times, and returns policy.",
};

const shippingRates = [
  {
    method: "Standard (AUS)",
    time: "3–7 business days",
    cost: "AUD $8.95",
    note: "Free on orders over $100",
  },
  {
    method: "Express (AUS)",
    time: "1–3 business days",
    cost: "AUD $14.95",
    note: "",
  },
  {
    method: "International",
    time: "7–14 business days",
    cost: "AUD $24.95",
    note: "Tracked shipping",
  },
];

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-fadeIn font-dm">
      <h1 className="font-cormorant font-light text-5xl text-charcoal mb-4">
        Shipping & Returns
      </h1>
      <p className="text-charcoal/60 mb-12 leading-relaxed">
        We pack every order with care in our Sydney studio. Orders are dispatched within 2–3
        business days, and you'll receive a tracking notification the moment your parcel ships.
      </p>

      {/* Shipping table */}
      <section className="mb-14">
        <h2 className="font-cormorant text-2xl text-charcoal mb-5">Shipping Rates</h2>
        <div className="overflow-x-auto rounded-2xl border border-charcoal/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ivory text-charcoal/50 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3">Method</th>
                <th className="text-left px-5 py-3">Estimated Time</th>
                <th className="text-left px-5 py-3">Cost</th>
                <th className="text-left px-5 py-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {shippingRates.map((r, i) => (
                <tr
                  key={r.method}
                  className={`border-t border-charcoal/10 ${i % 2 === 0 ? "bg-softCream" : "bg-ivory/40"}`}
                >
                  <td className="px-5 py-4 font-medium text-charcoal">{r.method}</td>
                  <td className="px-5 py-4 text-charcoal/70">{r.time}</td>
                  <td className="px-5 py-4 text-charcoal/70">{r.cost}</td>
                  <td className="px-5 py-4 text-warmGold text-xs">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Returns */}
      <section className="space-y-4">
        <h2 className="font-cormorant text-2xl text-charcoal">Returns Policy</h2>
        <p className="text-charcoal/60 leading-relaxed">
          We want you to love your necklace. If something isn't right, we'll make it right.
        </p>
        <ul className="space-y-3 text-charcoal/70 text-sm leading-relaxed">
          {[
            "Returns accepted within 30 days of delivery for unused items in original packaging.",
            "To initiate a return, email us at hello@noaatelier.com.au with your order number.",
            "We cover return shipping on faulty or incorrect items.",
            "Personalised or custom items cannot be returned unless faulty.",
            "Refunds are processed within 5–7 business days of receiving the return.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-warmGold flex-shrink-0">✦</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 bg-ivory rounded-2xl p-8 text-center">
        <p className="font-cormorant text-xl text-charcoal mb-2">Still have questions?</p>
        <p className="text-sm text-charcoal/50 mb-4">We're happy to help.</p>
        <a
          href="/contact"
          className="inline-block border border-warmGold text-warmGold rounded-full px-8 py-3 text-sm hover:bg-warmGold/10 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
