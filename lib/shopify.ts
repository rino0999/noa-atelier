// Shopify Storefront API — 2024-10
// Requires: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

import type { Product, Cart, CartLine, ProductImage, ProductMedia, CollectionHandle } from "./mockData";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const endpoint = `https://${domain}/api/2024-10/graphql.json`;

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`);
  const json = (await res.json()) as { data: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data;
}

// ── Raw Shopify types ────────────────────────────────────────────

interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

interface ShopifyImage {
  url: string;
  altText: string | null;
}

interface ShopifySelectedOption {
  name: string;
  value: string;
}

interface ShopifyVariantNode {
  id: string;
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
}

interface ShopifyMediaSource {
  url: string;
  mimeType: string;
}

interface ShopifyMediaNode {
  mediaContentType: string;
  previewImage: { url: string } | null;
  image?: { url: string };
  sources?: ShopifyMediaSource[];
}

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  collections: { edges: { node: { handle: string } }[] };
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange: { minVariantPrice: ShopifyMoney };
  images: { edges: { node: ShopifyImage }[] };
  media: { edges: { node: ShopifyMediaNode }[] };
  variants: { edges: { node: ShopifyVariantNode }[] };
}

interface ShopifyCartLineNode {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    price: ShopifyMoney;
    selectedOptions: ShopifySelectedOption[];
    product: {
      title: string;
      images: { edges: { node: ShopifyImage }[] };
    };
  };
}

interface ShopifyCartNode {
  id: string;
  checkoutUrl: string;
  cost: { totalAmount: ShopifyMoney };
  lines: { edges: { node: ShopifyCartLineNode }[] };
}

// ── GraphQL fragments ────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id handle title description tags
    collections(first: 3) { edges { node { handle } } }
    priceRange { minVariantPrice { amount currencyCode } }
    compareAtPriceRange { minVariantPrice { amount currencyCode } }
    images(first: 5) { edges { node { url altText } } }
    media(first: 10) {
      edges {
        node {
          mediaContentType
          previewImage { url }
          ... on MediaImage { image { url } }
          ... on Video { sources { url mimeType } }
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id availableForSale
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id checkoutUrl
    cost { totalAmount { amount currencyCode } }
    lines(first: 100) {
      edges {
        node {
          id quantity
          merchandise {
            ... on ProductVariant {
              id
              price { amount currencyCode }
              selectedOptions { name value }
              product {
                title
                images(first: 1) { edges { node { url altText } } }
              }
            }
          }
        }
      }
    }
  }
`;

// ── Mapping helpers ──────────────────────────────────────────────

const FALLBACK_IMAGE: ProductImage = {
  bg: "#FAF7F2",
  bead1: "#E8C8C8",
  bead2: "#D4A5A5",
  bead3: "#C9A96E",
};

const COLLECTION_HANDLES = new Set<CollectionHandle>([
  "new-arrivals",
  "gift-sets",
  "occasions",
]);

function toCollectionHandle(handles: string[]): CollectionHandle {
  for (const h of handles) {
    if (COLLECTION_HANDLES.has(h as CollectionHandle)) return h as CollectionHandle;
  }
  return "all";
}

function mapImage(node: ShopifyImage): ProductImage {
  return { url: node.url, bg: "", bead1: "", bead2: "", bead3: "" };
}

function mapProduct(node: ShopifyProductNode): Product {
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareRaw = parseFloat(node.compareAtPriceRange.minVariantPrice.amount);
  const compareAtPrice = compareRaw > 0 ? compareRaw : price;

  const collectionHandles = node.collections.edges.map((e) => e.node.handle);
  const collection = toCollectionHandle(collectionHandles);

  const variants = node.variants.edges.map(({ node: v }) => {
    const get = (names: string[]) =>
      v.selectedOptions.find((o) => names.includes(o.name.toLowerCase()))?.value ?? "";
    return {
      id: v.id,
      length: get(["length", "size"]),
      colour: get(["colour", "color"]),
      available: v.availableForSale,
    };
  });

  const images: ProductImage[] =
    node.images.edges.length > 0
      ? node.images.edges.map(({ node: img }) => mapImage(img))
      : [FALLBACK_IMAGE];

  const rawMedia: ProductMedia[] = node.media.edges.map(({ node: m }) => {
    if (m.mediaContentType === "VIDEO") {
      return {
        type: "video" as const,
        url: m.previewImage?.url,
        sources: m.sources ?? [],
        bg: FALLBACK_IMAGE.bg,
        bead1: FALLBACK_IMAGE.bead1,
        bead2: FALLBACK_IMAGE.bead2,
        bead3: FALLBACK_IMAGE.bead3,
      };
    }
    return {
      type: "image" as const,
      url: m.image?.url ?? m.previewImage?.url,
      bg: "",
      bead1: "",
      bead2: "",
      bead3: "",
    };
  });

  const media: ProductMedia[] =
    rawMedia.length > 0
      ? rawMedia
      : images.map((img) => ({ type: "image" as const, ...img }));

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    price,
    compareAtPrice,
    shortDescription: node.description.slice(0, 140),
    longDescription: node.description,
    tags: node.tags,
    collection,
    variants,
    images,
    media,
  };
}

function mapCartLine(node: ShopifyCartLineNode): CartLine {
  const get = (names: string[]) =>
    node.merchandise.selectedOptions.find((o) => names.includes(o.name.toLowerCase()))
      ?.value ?? "";

  const imgEdges = node.merchandise.product.images.edges;
  const image = imgEdges.length > 0 ? mapImage(imgEdges[0].node) : FALLBACK_IMAGE;

  return {
    id: node.id,
    variantId: node.merchandise.id,
    title: node.merchandise.product.title,
    price: parseFloat(node.merchandise.price.amount),
    quantity: node.quantity,
    colour: get(["colour", "color"]),
    length: get(["length", "size"]),
    image,
  };
}

function mapCart(node: ShopifyCartNode): Cart {
  return {
    id: node.id,
    checkoutUrl: node.checkoutUrl,
    lines: node.lines.edges.map(({ node: l }) => mapCartLine(l)),
    totalPrice: parseFloat(node.cost.totalAmount.amount),
  };
}

// ── Product queries ──────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProductNode }[] };
  }>(
    `${PRODUCT_FRAGMENT}
     query { products(first: 50) { edges { node { ...ProductFields } } } }`
  );
  return data.products.edges.map(({ node }) => mapProduct(node));
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProductNode | null;
  }>(
    `${PRODUCT_FRAGMENT}
     query($handle: String!) { productByHandle(handle: $handle) { ...ProductFields } }`,
    { handle }
  );
  return data.productByHandle ? mapProduct(data.productByHandle) : null;
}

export async function getCollectionProducts(handle: string): Promise<Product[]> {
  if (handle === "all") return getAllProducts();

  const data = await shopifyFetch<{
    collection: { products: { edges: { node: ShopifyProductNode }[] } } | null;
  }>(
    `${PRODUCT_FRAGMENT}
     query($handle: String!) {
       collection(handle: $handle) {
         products(first: 50) { edges { node { ...ProductFields } } }
       }
     }`,
    { handle }
  );

  if (!data.collection) return [];
  return data.collection.products.edges.map(({ node }) => mapProduct(node));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getCollectionProducts("new-arrivals");
  return products.slice(0, 4);
}

// ── Cart mutations ───────────────────────────────────────────────

export async function createCart(variantId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCartNode;
      userErrors: { message: string }[];
    };
  }>(
    `${CART_FRAGMENT}
     mutation($lines: [CartLineInput!]!) {
       cartCreate(input: { lines: $lines }) {
         cart { ...CartFields }
         userErrors { field message }
       }
     }`,
    { lines: [{ merchandiseId: variantId, quantity }] }
  );

  if (data.cartCreate.userErrors.length > 0)
    throw new Error(data.cartCreate.userErrors[0].message);
  return mapCart(data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: ShopifyCartNode;
      userErrors: { message: string }[];
    };
  }>(
    `${CART_FRAGMENT}
     mutation($cartId: ID!, $lines: [CartLineInput!]!) {
       cartLinesAdd(cartId: $cartId, lines: $lines) {
         cart { ...CartFields }
         userErrors { field message }
       }
     }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] }
  );

  if (data.cartLinesAdd.userErrors.length > 0)
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  return mapCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: ShopifyCartNode;
      userErrors: { message: string }[];
    };
  }>(
    `${CART_FRAGMENT}
     mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
       cartLinesUpdate(cartId: $cartId, lines: $lines) {
         cart { ...CartFields }
         userErrors { field message }
       }
     }`,
    { cartId, lines: [{ id: lineId, quantity }] }
  );

  if (data.cartLinesUpdate.userErrors.length > 0)
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  return mapCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: ShopifyCartNode;
      userErrors: { message: string }[];
    };
  }>(
    `${CART_FRAGMENT}
     mutation($cartId: ID!, $lineIds: [ID!]!) {
       cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
         cart { ...CartFields }
         userErrors { field message }
       }
     }`,
    { cartId, lineIds: [lineId] }
  );

  if (data.cartLinesRemove.userErrors.length > 0)
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  return mapCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart> {
  const data = await shopifyFetch<{ cart: ShopifyCartNode | null }>(
    `${CART_FRAGMENT}
     query($cartId: ID!) { cart(id: $cartId) { ...CartFields } }`,
    { cartId }
  );
  if (!data.cart) throw new Error("Cart not found");
  return mapCart(data.cart);
}
