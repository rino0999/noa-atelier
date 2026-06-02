import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CollectionFilters from "@/components/CollectionFilters";
import { getCollectionProducts } from "@/lib/shopify";
import type { Metadata } from "next";

const collectionMeta: Record<string, { title: string; description: string }> = {
  all: {
    title: "All Necklaces",
    description:
      "Every piece in the Noa Atelier collection — handcrafted beaded necklaces made with intention in Sydney.",
  },
  "new-arrivals": {
    title: "New Arrivals",
    description:
      "Fresh from the studio. The latest handcrafted beaded necklaces, just landed.",
  },
  "gift-sets": {
    title: "Gift Sets",
    description:
      "Thoughtfully curated gift sets for the people you love most. Beautifully wrapped, ready to give.",
  },
  occasions: {
    title: "Shop by Occasion",
    description:
      "Find the perfect necklace for every meaningful moment — birthdays, anniversaries, bridesmaid gifts, and more.",
  },
};

interface Props {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ sort?: string; length?: string; colour?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const meta = collectionMeta[handle];
  if (!meta) return {};
  return { title: meta.title, description: meta.description };
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const { sort, length: lengthFilter, colour: colourFilter } = await searchParams;

  const meta = collectionMeta[handle];
  if (!meta) notFound();

  let products = await getCollectionProducts(handle);

  if (lengthFilter) {
    products = products.filter((p) => p.variants.some((v) => v.length === lengthFilter));
  }
  if (colourFilter) {
    products = products.filter((p) => p.variants.some((v) => v.colour === colourFilter));
  }
  if (sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fadeIn">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-charcoal/40 font-dm mb-8 flex gap-2">
        <Link href="/" className="hover:text-warmGold transition-colors">Home</Link>
        <span>/</span>
        <span>{meta.title}</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <h1 className="font-cormorant font-light text-4xl sm:text-5xl text-charcoal mb-3">
          {meta.title}
        </h1>
        <p className="font-dm text-charcoal/50 max-w-xl leading-relaxed">{meta.description}</p>
      </div>

      {/* Client-side filter bar */}
      <CollectionFilters
        handle={handle}
        sort={sort}
        lengthFilter={lengthFilter}
        colourFilter={colourFilter}
      />

      {/* Grid */}
      {products.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-cormorant text-2xl text-charcoal/40">No pieces found.</p>
          <Link
            href="/collections/all"
            className="mt-4 inline-block text-sm text-warmGold hover:underline"
          >
            View all necklaces →
          </Link>
        </div>
      ) : (
        <>
          <p className="text-xs text-charcoal/40 font-dm mb-6">{products.length} pieces</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
