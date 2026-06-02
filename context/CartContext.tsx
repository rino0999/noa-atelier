"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Cart } from "@/lib/mockData";
import {
  addToCart,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine,
} from "@/lib/shopify";

const CART_ID_KEY = "noa_cart_id";

interface CartContextValue {
  cart: Cart | null;
  cartOpen: boolean;
  itemCount: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) return;
    getCart(cartId)
      .then(setCart)
      .catch(() => localStorage.removeItem(CART_ID_KEY));
  }, []);

  function persistCart(c: Cart) {
    localStorage.setItem(CART_ID_KEY, c.id);
    setCart(c);
  }

  const itemCount = cart?.lines.reduce((sum, l) => sum + l.quantity, 0) ?? 0;

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      const updated = cart
        ? await addToCart(cart.id, variantId, quantity)
        : await createCart(variantId, quantity);
      persistCart(updated);
      setCartOpen(true);
    },
    [cart]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      const updated = await updateCartLine(cart.id, lineId, quantity);
      persistCart(updated);
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      const updated = await removeCartLine(cart.id, lineId);
      persistCart(updated);
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, cartOpen, itemCount, openCart, closeCart, addItem, updateItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
