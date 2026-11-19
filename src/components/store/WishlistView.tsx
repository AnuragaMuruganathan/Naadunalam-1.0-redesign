"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore, productById } from "./StoreProvider";
import ProductCard from "./ProductCard";
import { EMPTY_ART, EmptyState } from "./Parts";
import { Basket, Check, Heart } from "../Icons";

export default function WishlistView() {
  const { wish, cart, add, ready } = useStore();
  const [addedAll, setAddedAll] = useState(false);
  const items = wish.map(productById).filter((p) => p !== undefined);
  const notInCart = items.filter((p) => !cart[p.id]);

  return (
    <section className="wishlist bg-sand flow" aria-labelledby="wish-title">
      <div className="inner">
        <div className="sec-head">
          <div>
            <h1 id="wish-title" className="title-en">
              Your wishlist
            </h1>
          </div>
          {ready && items.length > 0 && (
            <div className="btn-row head-actions">
              <span className="count">
                {items.length} saved {items.length === 1 ? "item" : "items"}
              </span>
              {notInCart.length > 0 ? (
                <button
                  type="button"
                  className="btn btn-forest"
                  onClick={() => {
                    notInCart.forEach((p) => add(p.id));
                    setAddedAll(true);
                  }}
                >
                  <Basket /> Add all to cart
                </button>
              ) : (
                <Link href="/cart" className="btn btn-forest">
                  {addedAll ? <Check /> : <Basket />} {addedAll ? "Added · view cart" : "View cart"}
                </Link>
              )}
            </div>
          )}
        </div>

        {!ready ? (
          <div className="store-wait" aria-hidden="true" />
        ) : items.length ? (
          <ul className="pgrid pgrid-5">
            {items.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            art={EMPTY_ART.wishlist}
            icon={<Heart />}
            title="Nothing saved yet"
            text="Tap the heart on any product to keep it here for later."
          />
        )}
      </div>
    </section>
  );
}
