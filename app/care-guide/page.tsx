import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care Guide",
  description:
    "How to care for your Noa Atelier necklace so it stays beautiful for years to come.",
};

const tips = [
  {
    icon: "◯",
    title: "Store with love",
    body: "Lay your necklace flat in its keepsake box or hang it on a small hook to prevent tangling. Avoid tossing it into a bag — the beads deserve a little ceremony.",
  },
  {
    icon: "◎",
    title: "Keep it dry",
    body: "Remove your necklace before swimming, showering, or exercising. Prolonged moisture can weaken the cord and dull the beads over time.",
  },
  {
    icon: "◈",
    title: "Avoid chemicals",
    body: "Apply perfume, hairspray, and lotions before putting on your necklace. Chemicals can affect bead colour and degrade the silk cord.",
  },
  {
    icon: "✦",
    title: "Polish gently",
    body: "Use a soft, dry cloth to wipe beads clean. For gold-filled clasps, a microfibre cloth will restore their warm gleam without scratching.",
  },
  {
    icon: "♡",
    title: "Wear it, love it",
    body: "The best care is regular wear. These necklaces are made to be part of your life — not kept in a drawer. The more you wear it, the more it becomes yours.",
  },
];

export default function CareGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-fadeIn">
      {/* Header */}
      <h1 className="font-cormorant font-light text-5xl text-charcoal mb-4">Care Guide</h1>
      <p className="font-dm text-charcoal/60 leading-relaxed mb-12">
        Your Noa Atelier necklace is made to last. A little care goes a long way in preserving
        its beauty and keeping the beads luminous for years to come.
      </p>

      {/* Tips */}
      <div className="space-y-8">
        {tips.map((tip, i) => (
          <div key={tip.title} className="flex gap-6 items-start group">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ivory flex items-center justify-center text-warmGold text-xl group-hover:bg-warmGold/10 transition-colors">
              {tip.icon}
            </div>
            <div>
              <h3 className="font-cormorant text-xl text-charcoal mb-1">{tip.title}</h3>
              <p className="font-dm text-sm text-charcoal/60 leading-relaxed">{tip.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-16 bg-ivory rounded-2xl p-8 text-center">
        <p className="font-cormorant text-2xl text-charcoal mb-3">
          Questions about your necklace?
        </p>
        <p className="font-dm text-sm text-charcoal/60 mb-5">
          We're always happy to help. Reach out and we'll get back to you within one business day.
        </p>
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
