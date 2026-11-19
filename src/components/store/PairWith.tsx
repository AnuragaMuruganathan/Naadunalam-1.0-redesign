"use client";

import Link from "next/link";
import { useStore, productById } from "./StoreProvider";
import ProductCard from "./ProductCard";
import Reveal from "../Reveal";
import { Arrow } from "../Icons";

/* Kitchen staples, in the order we suggest them. Anything already in the cart is skipped. */
const PICKS = [
  "cold-pressed-sesame-oil",
  "palm-jaggery-karupatti",
  "sambar-podi",
  "nallamaattu-nei",
  "tulsi-infused-honey",
  "kezhvaragu",
  "organic-turmeric-powder",
  "moong-dal",
  "ponni-arisi",
  "black-kavuni-rice",
];

/** /cart — the last section: five staples to round out the basket. */
export default function PairWith() {
  const { cart } = useStore();
  const items = PICKS.filter((id) => !cart[id])
    .map(productById)
    .filter((p) => p !== undefined)
    .slice(0, 5);

  return (
    <section className="pair bg-sand" aria-labelledby="pair-title">
      <div className="inner">
        <Reveal className="sec-head">
          <div>
            <h2 id="pair-title" className="title-en">
              Kitchen staples to add
            </h2>
          </div>
          <Link href="/shop" className="btn btn-line">
            All products <Arrow />
          </Link>
        </Reveal>
        <ul className="prow">
          {items.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} sizes="(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 36vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
