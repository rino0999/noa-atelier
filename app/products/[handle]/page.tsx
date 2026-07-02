import { notFound } from "next/navigation";
import { getProductByHandle, getAllProducts } from "@/lib/shopify";
import ProductPageClient from "./ProductPageClient";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

const SITE_URL = "https://noaatelier.com.au";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ handle: p.handle }));
  } catch (err) {
    // Don't let a Shopify outage fail the whole build — fall back to no
    // prerendered params so products render on-demand at request time instead.
    console.error("generateStaticParams: Shopify fetch failed, skipping prerender", err);
    return [];
  }
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

  const productUrl = `${SITE_URL}/products/${handle}`;
  const imageUrls = product.images
    .map((img) => img.url)
    .filter((url): url is string => Boolean(url));
  const inStock = product.variants.some((v) => v.available);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    ...(imageUrls.length > 0 ? { image: imageUrls } : {}),
    description: product.longDescription,
    brand: { "@type": "Brand", name: "Noa Atelier" },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "AUD",
      price: product.price,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "8.00",
          currency: "AUD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "AU",
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        merchantReturnLink: `${SITE_URL}/policies/refund-policy`,
        applicableCountry: "AU",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnShippingFees",
        returnShippingFeesAmount: {
          "@type": "MonetaryAmount",
          value: "8.00",
          currency: "AUD",
        },
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${SITE_URL}/collections/all`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProductPageClient product={product} relatedProducts={related} />
    </>
  );
}
