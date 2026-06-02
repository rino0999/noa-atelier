// Noa Atelier — Shopify Integration Layer
//
// All functions currently use mock data and localStorage.
// To connect Shopify Storefront API:
//   1. Fill in .env.local:
//      NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=qg4rg1-xs.myshopify.com
//      NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_token_here
//   2. Replace each function body with the corresponding Shopify Storefront API call.
//   3. Use the GraphQL endpoint:
//      https://${domain}/api/2024-01/graphql.json
//      Headers: { "X-Shopify-Storefront-Access-Token": token }

import { products, type Product, type Cart, type CartLine } from "./mockData";

// ─────────────────────────────────────────────────────────────
// PRODUCT QUERIES
// ─────────────────────────────────────────────────────────────

// TODO: Replace with Shopify Storefront API call → query { products(first: 50) { ... } }
export async function getAllProducts(): Promise<Product[]> {
  return products;
}

// TODO: Replace with Shopify Storefront API call → query { productByHandle(handle: $handle) { ... } }
export async function getProductByHandle(handle: string): Promise<Product | null> {
  return products.find((p) => p.handle === handle) ?? null;
}

// TODO: Replace with Shopify Storefront API call → query { collection(handle: $handle) { products { ... } } }
export async function getCollectionProducts(handle: string): Promise<Product[]> {
  if (handle === "all") return products;
  return products.filter((p) => p.collection === handle);
}

// TODO: Replace with Shopify Storefront API call → query featured products by tag or metafield
export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.collection === "new-arrivals").slice(0, 4);
}

// ─────────────────────────────────────────────────────────────
// CART — localStorage backed (swap with Shopify Cart API later)
// ─────────────────────────────────────────────────────────────

const CART_KEY = "noa_cart";

function readCart(): Cart {
  if (typeof window === "undefined") return emptyCart();
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) return JSON.parse(raw) as Cart;
  } catch {}
  return emptyCart();
}

function saveCart(cart: Cart): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function emptyCart(): Cart {
  return { id: `cart_${Date.now()}`, lines: [], totalPrice: 0 };
}

function recalcTotal(cart: Cart): Cart {
  cart.totalPrice = cart.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  return cart;
}

// TODO: Replace with Shopify Storefront API call → mutation cartCreate { ... }
export async function createCart(variantId: string, quantity: number): Promise<Cart> {
  const product = products.find((p) => p.variants.some((v) => v.id === variantId));
  const variant = product?.variants.find((v) => v.id === variantId);
  if (!product || !variant) throw new Error("Variant not found");

  const line: CartLine = {
    id: `line_${Date.now()}`,
    variantId,
    title: product.title,
    price: product.price,
    quantity,
    colour: variant.colour,
    length: variant.length,
    image: product.images[0],
  };

  const cart = recalcTotal({ id: `cart_${Date.now()}`, lines: [line], totalPrice: 0 });
  saveCart(cart);
  return cart;
}

// TODO: Replace with Shopify Storefront API call → mutation cartLinesAdd { ... }
export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<Cart> {
  const cart = readCart();
  const product = products.find((p) => p.variants.some((v) => v.id === variantId));
  const variant = product?.variants.find((v) => v.id === variantId);
  if (!product || !variant) throw new Error("Variant not found");

  const existing = cart.lines.find((l) => l.variantId === variantId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.lines.push({
      id: `line_${Date.now()}`,
      variantId,
      title: product.title,
      price: product.price,
      quantity,
      colour: variant.colour,
      length: variant.length,
      image: product.images[0],
    });
  }

  const updated = recalcTotal(cart);
  saveCart(updated);
  return updated;
}

// TODO: Replace with Shopify Storefront API call → mutation cartLinesUpdate { ... }
export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const cart = readCart();
  const line = cart.lines.find((l) => l.id === lineId);
  if (line) line.quantity = quantity;
  const updated = recalcTotal(cart);
  saveCart(updated);
  return updated;
}

// TODO: Replace with Shopify Storefront API call → mutation cartLinesRemove { ... }
export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const cart = readCart();
  cart.lines = cart.lines.filter((l) => l.id !== lineId);
  const updated = recalcTotal(cart);
  saveCart(updated);
  return updated;
}

// TODO: Replace with Shopify Storefront API call → query { cart(id: $id) { ... } }
export async function getCart(cartId: string): Promise<Cart> {
  return readCart();
}
