export interface ProductVariant {
  id: string;
  length: string;
  colour: string;
  available: boolean;
}

export interface ProductImage {
  url?: string;
  bg: string;
  bead1: string;
  bead2: string;
  bead3: string;
}

export type CollectionHandle = "all" | "new-arrivals" | "gift-sets" | "occasions";

export interface Product {
  id: string;
  handle: string;
  title: string;
  price: number;
  compareAtPrice: number;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  collection: CollectionHandle;
  variants: ProductVariant[];
  images: ProductImage[];
}

export interface CartLine {
  id: string;
  variantId: string;
  title: string;
  price: number;
  quantity: number;
  colour: string;
  length: string;
  image: ProductImage;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: CartLine[];
  totalPrice: number;
}

const palette = {
  softCream: "#FAF7F2",
  ivory: "#F5F0E8",
  warmGold: "#C9A96E",
  dustyRose: "#D4A5A5",
  charcoal: "#2C2C2C",
  deepEspresso: "#1A1008",
  roseQuartz: "#E8C8C8",
  goldMist: "#DFC28E",
  blush: "#EDD5D5",
  antiqueBrass: "#8B6914",
};

export const products: Product[] = [
  {
    id: "1",
    handle: "lumiere-necklace",
    title: "Lumière Necklace",
    price: 95,
    compareAtPrice: 104.5,
    shortDescription:
      "Soft rose quartz beads that catch the light like a morning whisper.",
    longDescription:
      "The Lumière Necklace was born from quiet mornings and golden hours. Each bead is hand-selected for its gentle blush tone, threaded with intention on a durable silk cord. Wear it close to your collarbone and let it become your daily reminder of softness and grace.",
    tags: ["necklace", "handcrafted", "beaded"],
    collection: "new-arrivals",
    variants: [
      { id: "1-40-rq", length: "40cm", colour: "Rose Quartz", available: true },
      { id: "1-45-rq", length: "45cm", colour: "Rose Quartz", available: true },
      { id: "1-50-rq", length: "50cm", colour: "Rose Quartz", available: true },
      { id: "1-40-ip", length: "40cm", colour: "Ivory Pearl", available: true },
      { id: "1-45-ip", length: "45cm", colour: "Ivory Pearl", available: true },
      { id: "1-50-ip", length: "50cm", colour: "Ivory Pearl", available: true },
    ],
    images: [
      { bg: palette.softCream, bead1: palette.roseQuartz, bead2: palette.blush, bead3: palette.dustyRose },
      { bg: palette.ivory, bead1: palette.ivory, bead2: "#F0EBE0", bead3: "#E8E0D0" },
      { bg: "#F0EBE5", bead1: palette.roseQuartz, bead2: palette.ivory, bead3: palette.blush },
    ],
  },
  {
    id: "2",
    handle: "dusk-necklace",
    title: "Dusk Necklace",
    price: 88,
    compareAtPrice: 96.8,
    shortDescription:
      "A fading sky captured in dusty rose and gold, worn close to the heart.",
    longDescription:
      "Inspired by the hour when day surrenders to dusk, this necklace layers warm dusty rose beads with a glimmer of gold mist. It is the piece you reach for when you want to feel effortlessly beautiful. Each bead is strung by hand in our Sydney studio, making every necklace subtly one-of-a-kind.",
    tags: ["necklace", "handcrafted", "beaded"],
    collection: "new-arrivals",
    variants: [
      { id: "2-40-dr", length: "40cm", colour: "Dusty Rose", available: true },
      { id: "2-45-dr", length: "45cm", colour: "Dusty Rose", available: true },
      { id: "2-40-gm", length: "40cm", colour: "Gold Mist", available: true },
      { id: "2-45-gm", length: "45cm", colour: "Gold Mist", available: true },
    ],
    images: [
      { bg: palette.softCream, bead1: palette.dustyRose, bead2: "#C49898", bead3: palette.blush },
      { bg: "#F5EDD5", bead1: palette.goldMist, bead2: palette.warmGold, bead3: "#E8D5A0" },
      { bg: palette.ivory, bead1: palette.dustyRose, bead2: palette.goldMist, bead3: palette.blush },
    ],
  },
  {
    id: "3",
    handle: "soleil-necklace",
    title: "Soleil Necklace",
    price: 110,
    compareAtPrice: 121,
    shortDescription:
      "Gilded with warmth — a necklace that carries the sun wherever you go.",
    longDescription:
      "Soleil draws from the radiant energy of full sun and open skies. Rich warm gold beads sit alongside ivory pearl accents, creating a luminous contrast that elevates any look from effortless to extraordinary. Crafted to be worn every day and treasured for a lifetime.",
    tags: ["necklace", "handcrafted", "beaded"],
    collection: "new-arrivals",
    variants: [
      { id: "3-45-wg", length: "45cm", colour: "Warm Gold", available: true },
      { id: "3-50-wg", length: "50cm", colour: "Warm Gold", available: true },
      { id: "3-45-ip", length: "45cm", colour: "Ivory Pearl", available: true },
      { id: "3-50-ip", length: "50cm", colour: "Ivory Pearl", available: true },
    ],
    images: [
      { bg: "#F5EDD5", bead1: palette.warmGold, bead2: palette.goldMist, bead3: palette.antiqueBrass },
      { bg: palette.softCream, bead1: palette.ivory, bead2: "#F0EBE0", bead3: palette.warmGold },
      { bg: palette.ivory, bead1: palette.warmGold, bead2: palette.ivory, bead3: palette.goldMist },
    ],
  },
  {
    id: "4",
    handle: "aurora-necklace",
    title: "Aurora Necklace",
    price: 79,
    compareAtPrice: 86.9,
    shortDescription:
      "Like the first light at dawn — soft, fleeting, and impossibly lovely.",
    longDescription:
      "The Aurora Necklace is our most beloved everyday piece. With a gentle sweep of rose quartz and dusty rose beads, it layers beautifully or stands alone with quiet confidence. Every strand is finished with a delicate gold-filled clasp, a small but meaningful detail.",
    tags: ["necklace", "handcrafted", "beaded"],
    collection: "new-arrivals",
    variants: [
      { id: "4-40-rq", length: "40cm", colour: "Rose Quartz", available: true },
      { id: "4-45-rq", length: "45cm", colour: "Rose Quartz", available: true },
      { id: "4-50-rq", length: "50cm", colour: "Rose Quartz", available: true },
      { id: "4-40-dr", length: "40cm", colour: "Dusty Rose", available: true },
      { id: "4-45-dr", length: "45cm", colour: "Dusty Rose", available: true },
      { id: "4-50-dr", length: "50cm", colour: "Dusty Rose", available: true },
    ],
    images: [
      { bg: palette.softCream, bead1: palette.roseQuartz, bead2: palette.dustyRose, bead3: palette.blush },
      { bg: "#F5ECEC", bead1: palette.dustyRose, bead2: palette.blush, bead3: "#C9A0A0" },
      { bg: palette.ivory, bead1: palette.roseQuartz, bead2: palette.blush, bead3: palette.dustyRose },
    ],
  },
  {
    id: "5",
    handle: "celeste-necklace",
    title: "Celeste Necklace",
    price: 92,
    compareAtPrice: 101.2,
    shortDescription:
      "A celestial pairing of ivory and gold — timeless as the stars.",
    longDescription:
      "Celeste is the necklace for milestones. Ivory pearl beads float alongside gold mist accents, creating a sophisticated yet understated piece suited to every chapter of life. Gift it to someone you love, or treat yourself to the quiet luxury you deserve.",
    tags: ["necklace", "handcrafted", "beaded"],
    collection: "gift-sets",
    variants: [
      { id: "5-40-ip", length: "40cm", colour: "Ivory Pearl", available: true },
      { id: "5-45-ip", length: "45cm", colour: "Ivory Pearl", available: true },
      { id: "5-40-gm", length: "40cm", colour: "Gold Mist", available: true },
      { id: "5-45-gm", length: "45cm", colour: "Gold Mist", available: true },
    ],
    images: [
      { bg: palette.ivory, bead1: "#F0EBE0", bead2: palette.warmGold, bead3: palette.goldMist },
      { bg: "#F5EDD5", bead1: palette.goldMist, bead2: palette.ivory, bead3: palette.warmGold },
      { bg: palette.softCream, bead1: palette.ivory, bead2: palette.goldMist, bead3: "#F0EBE0" },
    ],
  },
  {
    id: "6",
    handle: "bloom-necklace",
    title: "Bloom Necklace",
    price: 85,
    compareAtPrice: 93.5,
    shortDescription:
      "For those who bloom in their own time — rose quartz kissed by warm gold.",
    longDescription:
      "Bloom celebrates the quiet courage of becoming. Rose quartz beads — known for their loving energy — are interspersed with warm gold accents that reflect your inner radiance. This piece is a reminder that you are always in season.",
    tags: ["necklace", "handcrafted", "beaded"],
    collection: "occasions",
    variants: [
      { id: "6-45-rq", length: "45cm", colour: "Rose Quartz", available: true },
      { id: "6-50-rq", length: "50cm", colour: "Rose Quartz", available: true },
      { id: "6-45-wg", length: "45cm", colour: "Warm Gold", available: true },
      { id: "6-50-wg", length: "50cm", colour: "Warm Gold", available: true },
    ],
    images: [
      { bg: palette.softCream, bead1: palette.roseQuartz, bead2: palette.warmGold, bead3: palette.blush },
      { bg: "#F5EDD5", bead1: palette.warmGold, bead2: palette.roseQuartz, bead3: palette.goldMist },
      { bg: palette.ivory, bead1: palette.blush, bead2: palette.warmGold, bead3: palette.roseQuartz },
    ],
  },
  {
    id: "7",
    handle: "reverie-necklace",
    title: "Reverie Necklace",
    price: 98,
    compareAtPrice: 107.8,
    shortDescription:
      "Dreamy layers of dusty rose and ivory pearl — for the romantics.",
    longDescription:
      "Reverie is for the daydreamers. Dusty rose and ivory pearl beads drift together in a quietly romantic arrangement, as though strung from a dream half-remembered. It is the piece that makes people stop and ask where you found it.",
    tags: ["necklace", "handcrafted", "beaded"],
    collection: "gift-sets",
    variants: [
      { id: "7-40-dr", length: "40cm", colour: "Dusty Rose", available: true },
      { id: "7-45-dr", length: "45cm", colour: "Dusty Rose", available: true },
      { id: "7-50-dr", length: "50cm", colour: "Dusty Rose", available: true },
      { id: "7-40-ip", length: "40cm", colour: "Ivory Pearl", available: true },
      { id: "7-45-ip", length: "45cm", colour: "Ivory Pearl", available: true },
      { id: "7-50-ip", length: "50cm", colour: "Ivory Pearl", available: true },
    ],
    images: [
      { bg: "#F5ECEC", bead1: palette.dustyRose, bead2: palette.blush, bead3: "#C49898" },
      { bg: palette.ivory, bead1: "#F0EBE0", bead2: palette.dustyRose, bead3: palette.blush },
      { bg: palette.softCream, bead1: palette.dustyRose, bead2: palette.ivory, bead3: palette.blush },
    ],
  },
  {
    id: "8",
    handle: "ember-necklace",
    title: "Ember Necklace",
    price: 75,
    compareAtPrice: 82.5,
    shortDescription:
      "Warm gold and rose quartz — the last glow before everything goes still.",
    longDescription:
      "The Ember Necklace holds the warmth of a fire just before it fades. Warm gold beads and rose quartz accents create a piece that feels intimate and alive, like something whispered rather than said aloud. Perfect for layering or wearing alone as a quiet statement.",
    tags: ["necklace", "handcrafted", "beaded"],
    collection: "occasions",
    variants: [
      { id: "8-40-wg", length: "40cm", colour: "Warm Gold", available: true },
      { id: "8-45-wg", length: "45cm", colour: "Warm Gold", available: true },
      { id: "8-40-rq", length: "40cm", colour: "Rose Quartz", available: true },
      { id: "8-45-rq", length: "45cm", colour: "Rose Quartz", available: true },
    ],
    images: [
      { bg: "#F5EDD5", bead1: palette.warmGold, bead2: palette.antiqueBrass, bead3: palette.goldMist },
      { bg: palette.softCream, bead1: palette.roseQuartz, bead2: palette.warmGold, bead3: palette.blush },
      { bg: palette.ivory, bead1: palette.warmGold, bead2: palette.roseQuartz, bead3: palette.goldMist },
    ],
  },
];

export const colourSwatches: Record<string, string> = {
  "Rose Quartz": "#E8C8C8",
  "Ivory Pearl": "#F5F0E8",
  "Dusty Rose": "#D4A5A5",
  "Gold Mist": "#DFC28E",
  "Warm Gold": "#C9A96E",
};
