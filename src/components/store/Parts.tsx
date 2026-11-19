import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "@/lib/products";
import { inr } from "@/lib/format";
import { Arrow } from "../Icons";

export type EmptyArt = { cat: string; label: string; img: string }[];

/** Photos for the empty states: the store's own product shots, each linking to its category. */
export const EMPTY_ART: Record<"cart" | "wishlist" | "checkout", EmptyArt> = {
  cart: [
    { cat: "ghee-oil", label: "Ghee & oil", img: "/images/products/Kadalai-Ennai.webp" },
    { cat: "masala", label: "Masala & powders", img: "/images/products/Milagai-Podi.webp" },
    { cat: "pulses", label: "Lentils & pulses", img: "/images/products/Nilakadalai.webp" },
    { cat: "rice", label: "Traditional rice", img: "/images/products/Moongil-Arisi.webp" },
  ],
  wishlist: [
    { cat: "millets", label: "Millets", img: "/images/products/Kambu.webp" },
    { cat: "pulses", label: "Lentils & pulses", img: "/images/products/Pachai-Payaru.webp" },
    { cat: "ghee-oil", label: "Ghee & oil", img: "/images/products/Thengai-Ennai.webp" },
    { cat: "health-mixes", label: "Health mixes", img: "/images/products/Udal-Edai-Kuraikkum-Kanji-Maavu.webp" },
  ],
  checkout: [
    { cat: "rice", label: "Traditional rice", img: "/images/products/Moongil-Arisi.webp" },
    { cat: "ghee-oil", label: "Ghee & oil", img: "/images/products/Kadalai-Ennai.webp" },
    { cat: "millets", label: "Millets", img: "/images/products/Kambu.webp" },
    { cat: "masala", label: "Masala & powders", img: "/images/products/Milagai-Podi.webp" },
  ],
};

/** Empty state used by wishlist, cart and checkout: message on one side, a product photo mosaic on the other. */
export function EmptyState({
  icon,
  title,
  text,
  art,
  cta = "Browse the shop",
  href = "/shop",
}: {
  icon: ReactNode;
  title: string;
  text: string;
  art: EmptyArt;
  cta?: string;
  href?: string;
}) {
  return (
    <div className="empty-state split">
      <div className="es-copy">
        <span className="ic">{icon}</span>
        <h2>{title}</h2>
        <p>{text}</p>
        <Link href={href} className="btn btn-forest">
          {cta} <Arrow />
        </Link>
      </div>
      <ul className="es-art" aria-label="Start with a category">
        {art.map((a) => (
          <li key={a.img}>
            <Link href={`/shop?cat=${a.cat}`} aria-label={`Shop ${a.label}`}>
              <Image src={a.img} alt="" fill sizes="(max-width: 760px) 50vw, 26vw" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Totals card in forest green (same family as the home page "New in aval" card). */
export function OrderSummary({
  lines,
  subtotal,
  delivery,
  title = "Order summary",
  showItems = false,
  children,
}: {
  lines: { product: Product; qty: number }[];
  subtotal: number;
  /** null = charge confirmed later (outside Tamil Nadu) */
  delivery: number | null;
  title?: string;
  showItems?: boolean;
  children?: ReactNode;
}) {
  const count = lines.reduce((n, l) => n + l.qty, 0);
  return (
    <aside className="summary" aria-labelledby="summary-title">
      <h2 id="summary-title">{title}</h2>
      {showItems && (
        <ul className="sum-items">
          {lines.map(({ product: p, qty }) => (
            <li key={p.id}>
              <span className="th">
                <Image src={p.img} alt="" fill sizes="56px" />
                <span className="badge" aria-hidden="true">
                  {qty}
                </span>
              </span>
              <span className="nm">
                {p.en}
                <small>
                  {p.pack} × {qty}
                </small>
              </span>
              <b>{inr(p.price * qty)}</b>
            </li>
          ))}
        </ul>
      )}
      <dl>
        <div>
          <dt>
            Subtotal ({count} {count === 1 ? "item" : "items"})
          </dt>
          <dd>{inr(subtotal)}</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd>{delivery === null ? "Confirmed on WhatsApp" : inr(delivery)}</dd>
        </div>
        <div className="total">
          <dt>Total</dt>
          <dd>{inr(subtotal + (delivery ?? 0))}</dd>
        </div>
      </dl>
      {children}
    </aside>
  );
}
