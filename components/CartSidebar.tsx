"use client";

import { useCart } from "@/context/CartContext";
import NecklaceSVG from "./NecklaceSVG";
import { X, Minus, Plus, Trash2 } from "lucide-react";

export default function CartSidebar() {
  const { cart, cartOpen, closeCart, updateItem, removeItem } = useCart();

  if (!cartOpen) return null;

  const lines = cart?.lines ?? [];
  const total = cart?.totalPrice ?? 0;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-softCream shadow-2xl flex flex-col animate-slideInRight font-dm"
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/10">
          <h2 className="font-cormorant text-xl text-charcoal">Your Cart</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="hover:text-warmGold transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <NecklaceSVG
                size="sm"
                colours={{ bg: "#F5F0E8", bead1: "#D4A5A5", bead2: "#C9A96E", bead3: "#E8C8C8" }}
              />
              <p className="text-charcoal/60 text-sm">Your cart is empty.</p>
              <button
                onClick={closeCart}
                className="text-warmGold text-sm underline underline-offset-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            lines.map((line) => (
              <div key={line.id} className="flex gap-4 items-start">
                {/* SVG thumbnail */}
                <div className="flex-shrink-0 rounded-lg overflow-hidden">
                  <NecklaceSVG size="sm" colours={line.image} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-cormorant text-base text-charcoal leading-tight">
                    {line.title}
                  </p>
                  <p className="text-xs text-charcoal/50 mt-0.5">
                    {line.length} · {line.colour}
                  </p>
                  <p className="text-sm font-medium text-charcoal mt-1">
                    AUD ${(line.price * line.quantity).toFixed(2)}
                  </p>

                  {/* Qty stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() =>
                        line.quantity > 1
                          ? updateItem(line.id, line.quantity - 1)
                          : removeItem(line.id)
                      }
                      className="w-7 h-7 rounded-full border border-charcoal/20 flex items-center justify-center hover:border-warmGold hover:text-warmGold transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm w-4 text-center">{line.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => updateItem(line.id, line.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-charcoal/20 flex items-center justify-center hover:border-warmGold hover:text-warmGold transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      aria-label="Remove item"
                      onClick={() => removeItem(line.id)}
                      className="ml-2 text-charcoal/30 hover:text-dustyRose transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="px-6 py-5 border-t border-charcoal/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-dm text-sm text-charcoal/70">Subtotal</span>
              <span className="font-cormorant text-lg text-charcoal">
                AUD ${total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-charcoal/50">
              Shipping and taxes calculated at checkout.
            </p>
            <a
              href={cart?.checkoutUrl ?? "#"}
              className="block w-full text-center bg-warmGold text-charcoal font-medium rounded-full py-3 hover:bg-[#b8943e] transition-colors"
              aria-label="Proceed to checkout"
            >
              Checkout
            </a>
            <button
              onClick={closeCart}
              className="block w-full text-center border border-warmGold text-warmGold rounded-full py-3 hover:bg-warmGold/10 transition-colors text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
