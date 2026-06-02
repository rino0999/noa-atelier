"use client";

import Link from "next/link";
import { colourSwatches } from "@/lib/mockData";

interface CollectionFiltersProps {
  handle: string;
  sort?: string;
  lengthFilter?: string;
  colourFilter?: string;
}

const lengths = ["40cm", "45cm", "50cm"];
const colours = ["Rose Quartz", "Ivory Pearl", "Dusty Rose", "Gold Mist", "Warm Gold"];

function buildQuery(params: Record<string, string | undefined>) {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v) p.set(k, v);
  });
  return p.toString() ? `?${p}` : "";
}

export default function CollectionFilters({
  sort,
  lengthFilter,
  colourFilter,
}: CollectionFiltersProps) {
  function handleSort(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams();
    if (e.target.value) params.set("sort", e.target.value);
    if (lengthFilter) params.set("length", lengthFilter);
    if (colourFilter) params.set("colour", colourFilter);
    window.location.href = params.toString() ? `?${params}` : "?";
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-charcoal/10">
      {/* Length pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-dm text-charcoal/40 uppercase tracking-wider">Length</span>
        {lengths.map((l) => {
          const isActive = l === lengthFilter;
          const q = buildQuery({
            sort,
            colour: colourFilter,
            length: isActive ? undefined : l,
          });
          return (
            <Link
              key={l}
              href={q || "?"}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                isActive
                  ? "bg-warmGold text-charcoal border-warmGold"
                  : "border-charcoal/20 text-charcoal/60 hover:border-warmGold hover:text-warmGold"
              }`}
            >
              {l}
            </Link>
          );
        })}
      </div>

      {/* Colour swatches */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-dm text-charcoal/40 uppercase tracking-wider">Colour</span>
        {colours.map((c) => {
          const isActive = c === colourFilter;
          const q = buildQuery({
            sort,
            length: lengthFilter,
            colour: isActive ? undefined : c,
          });
          return (
            <Link
              key={c}
              href={q || "?"}
              title={c}
              className={`w-5 h-5 rounded-full border-2 transition-all ${
                isActive ? "border-warmGold scale-110" : "border-transparent hover:border-charcoal/30"
              }`}
              style={{ backgroundColor: colourSwatches[c] ?? "#ccc" }}
            />
          );
        })}
      </div>

      {/* Sort */}
      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs font-dm text-charcoal/40 uppercase tracking-wider">Sort</span>
        <select
          defaultValue={sort ?? ""}
          onChange={handleSort}
          className="text-xs border border-charcoal/20 rounded-full px-3 py-1.5 bg-transparent text-charcoal/70 focus:outline-none focus:border-warmGold cursor-pointer"
        >
          <option value="">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
