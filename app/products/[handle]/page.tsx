import { notFound } from "next/navigation";
import { getProductByHandle, getAllProducts } from "@/lib/shopify";
import ProductPageClient from "./ProductPageClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return {};

  const rawDesc = product.longDescription.trim();
  const description =
    rawDesc.length > 0
      ? rawDesc.length > 155
        ? rawDesc.slice(0, 152) + "..."
        : rawDesc
      : `${product.title} — a handmade beaded necklace, hand-strung in Sydney by Noa Atelier. Afterpay available.`;

  const featuredImage = product.images[0]?.url;

  return {
    title: product.title,
    description,
    alternates: { canonical: `/products/${handle}` },
    openGraph: featuredImage
      ? { images: [{ url: featuredImage }] }
      : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const [product, allProducts] = await Promise.all([
    getProductByHandle(handle),
    getAllProducts(),
  ]);
  if (!product) notFound();
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 4);
  return <ProductPageClient product={product} relatedProducts={related} />;
}
