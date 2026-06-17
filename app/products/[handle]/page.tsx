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
  return { title: product.title, description: product.shortDescription };
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
