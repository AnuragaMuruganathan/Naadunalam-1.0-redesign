"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "@/lib/products";

type Cart = Record<string, number>;
type State = { cart: Cart; wish: string[] };

type Store = State & {
  /** false until the saved basket has been read on the client */
  ready: boolean;
  cartCount: number;
  lines: { product: Product; qty: number }[];
  subtotal: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clearCart: () => void;
  toggleWish: (id: string) => void;
  inWish: (id: string) => boolean;
};

const KEY = "nn-store-v1";
const MAX_QTY = 20;
const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));
const EMPTY: State = { cart: {}, wish: [] };

const Ctx = createContext<Store | null>(null);

function read(): State {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const s = JSON.parse(raw) as Partial<State>;
    // Drop anything that is no longer in the catalogue.
    const cart: Cart = {};
    for (const [id, q] of Object.entries(s.cart ?? {})) {
      if (BY_ID.has(id) && Number.isFinite(q) && q > 0) cart[id] = Math.min(MAX_QTY, Math.floor(q));
    }
    const wish = (s.wish ?? []).filter((id) => BY_ID.has(id));
    return { cart, wish };
  } catch {
    return EMPTY;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);
    // Keep several open tabs in step.
    const onStorage = (e: StorageEvent) => e.key === KEY && setState(read());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* private mode or storage full: the basket still works for this visit */
    }
  }, [state, ready]);

  const setQty = useCallback((id: string, qty: number) => {
    setState((s) => {
      const cart = { ...s.cart };
      if (qty <= 0) delete cart[id];
      else cart[id] = Math.min(MAX_QTY, Math.floor(qty));
      return { ...s, cart };
    });
  }, []);

  const add = useCallback((id: string, qty = 1) => {
    setState((s) => ({ ...s, cart: { ...s.cart, [id]: Math.min(MAX_QTY, (s.cart[id] ?? 0) + qty) } }));
  }, []);

  const remove = useCallback((id: string) => setQty(id, 0), [setQty]);
  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: {} })), []);

  const toggleWish = useCallback((id: string) => {
    setState((s) => ({ ...s, wish: s.wish.includes(id) ? s.wish.filter((w) => w !== id) : [id, ...s.wish] }));
  }, []);

  const value = useMemo<Store>(() => {
    const lines = Object.entries(state.cart)
      .map(([id, qty]) => ({ product: BY_ID.get(id)!, qty }))
      .filter((l) => l.product);
    return {
      ...state,
      ready,
      lines,
      cartCount: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      add,
      setQty,
      remove,
      clearCart,
      toggleWish,
      inWish: (id) => state.wish.includes(id),
    };
  }, [state, ready, add, setQty, remove, clearCart, toggleWish]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside <StoreProvider>");
  return s;
}

export const productById = (id: string) => BY_ID.get(id);
export { MAX_QTY };
