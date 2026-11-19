"use client";

import Image from "next/image";
import type { Product } from "@/lib/products";
import { inr } from "@/lib/format";
import { useStore } from "./StoreProvider";
import QtyStepper from "./QtyStepper";
import { Basket, Heart } from "../Icons";

export default function ProductCard({
  product,
  sizes = "(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 20vw",
}: {
  product: Product;
  sizes?: string;
}) {
  const { cart, add, toggleWish, inWish, ready } = useStore();
  const p = product;
  const wished = ready && inWish(p.id);
  const inCart = ready && (cart[p.id] ?? 0) > 0;

  return (
    <article className="pcard" aria-labelledby={`p-${p.id}`}>
      <div className="ph">
        <Image src={p.img} alt="" fill sizes={sizes} />
        <button
          type="button"
          className="wish-btn"
          aria-pressed={wished}
          aria-label={wished ? `Remove ${p.en} from wishlist` : `Save ${p.en} to wishlist`}
          onClick={() => toggleWish(p.id)}
        >
          <Heart filled={wished} />
        </button>
      </div>
      <div className="t">
        <h3 id={`p-${p.id}`}>{p.en}</h3>
        <span className="ta" lang="ta">
          {p.ta}
        </span>
        <p className="price">
          <b>{inr(p.price)}</b>
          <small>{p.pack}</small>
        </p>
        {inCart ? (
          <QtyStepper id={p.id} name={p.en} className="qty-full" />
        ) : (
          <button type="button" className="btn btn-line add-btn" onClick={() => add(p.id)}>
            <Basket /> Add to cart
          </button>
        )}
      </div>
    </article>
  );
}
