import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Noa Atelier was born from a quiet act of creation. Learn about our story, our values, and the hands that make every necklace.",
};

const values = [
  { icon: "✦", title: "Handcrafted", description: "Every necklace is strung by hand in our Sydney studio, one bead at a time." },
  { icon: "◇", title: "Ethically Sourced", description: "Our beads are sourced from suppliers who share our commitment to responsible production." },
  { icon: "♀", title: "Women-Founded", description: "Noa Atelier was founded by a woman, for everyone who finds beauty in the small details." },
  { icon: "⊡", title: "Sydney Made", description: "Proudly created in Sydney, Australia — where every piece begins as a quiet idea." },
];

export default function AboutPage() {
  return (
    <div className="animate-fadeIn">
      {/* Hero quote */}
      <section className="bg-ivory py-24 px-6 text-center">
        <blockquote className="font-cormorant font-light text-4xl sm:text-5xl text-charcoal max-w-3xl mx-auto leading-tight">
          "We make jewellery for the moments you want to remember — and the ones you didn't
          know would matter."
        </blockquote>
        <p className="font-dm text-sm text-charcoal/40 mt-6">— Noa, Founder</p>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 font-dm text-charcoal/70 leading-relaxed">
          <p>
            Noa Atelier began at a kitchen table in Sydney in 2022. There were beads everywhere —
            scattered across the wood, rolling toward the floor, catching the afternoon light in
            ways that made everything feel a little more luminous. It started as something just
            for herself, until friends started asking where she got her necklace.
          </p>
          <p>
            Every piece is made by hand, slowly and deliberately. There are no machines, no
            shortcuts. Each bead is chosen for its colour, its weight, its energy — because we
            believe the things you wear close to your body deserve that kind of attention.
          </p>
          <p>
            Today, Noa Atelier ships from Sydney to people all over the world. The kitchen table
            is still there. The beads still roll. And every necklace still begins the same way —
            quietly, intentionally, with care.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-1.png"
            alt="Handcrafted necklaces laid out on a wooden studio table"
            className="rounded-2xl object-cover w-48 h-56"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-2.png"
            alt="Close-up of beads being strung by hand in the Noa Atelier studio"
            className="rounded-2xl object-cover w-48 h-56 mt-10"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-cormorant font-light text-3xl text-charcoal mb-10 text-center">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-softCream rounded-2xl p-8 text-center space-y-3">
                <span className="text-3xl text-warmGold block">{v.icon}</span>
                <h3 className="font-cormorant text-xl text-charcoal">{v.title}</h3>
                <p className="font-dm text-sm text-charcoal/60 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center px-6">
        <p className="font-dm text-charcoal/60 mb-6">
          Ready to find your piece?
        </p>
        <Link
          href="/collections/all"
          className="bg-warmGold text-charcoal rounded-full px-8 py-3 font-dm font-medium hover:bg-[#b8943e] transition-colors"
        >
          Shop the Collection
        </Link>
      </section>
    </div>
  );
}
