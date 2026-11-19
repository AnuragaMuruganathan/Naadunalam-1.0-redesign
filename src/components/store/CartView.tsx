"use client";

import Image from "next/image";
import Link from "next/link";
import { DELIVERY_FEE, PHONE, PHONE_TEL } from "@/lib/data";
import { inr } from "@/lib/format";
import { useStore } from "./StoreProvider";
import QtyStepper from "./QtyStepper";
import { EMPTY_ART, EmptyState, OrderSummary } from "./Parts";
import { Arrow, Basket, Chat, Close, Heart, Phone, Truck } from "../Icons";

export default function CartView() {
  const { lines, subtotal, remove, toggleWish, inWish, ready } = useStore();

  return (
    <section className="cart bg-paper flow" aria-labelledby="cart-title">
      <div className="inner">
        <div className="sec-head">
          <div>
            <h1 id="cart-title" className="title-en">
              Your cart
            </h1>
          </div>
          <Link href="/shop" className="btn btn-line">
            <Arrow dir="left" /> Continue shopping
          </Link>
        </div>

        {!ready ? (
          <div className="store-wait" aria-hidden="true" />
        ) : lines.length ? (
          <div className="cart-body">
            <div className="cart-lines">
              <div className="lines-head" aria-hidden="true">
                <span>Product</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              <ul>
                {lines.map(({ product: p, qty }) => {
                  const saved = inWish(p.id);
                  return (
                    <li key={p.id} className="cline">
                      <span className="th">
                        <Image src={p.img} alt="" fill sizes="96px" />
                      </span>
                      <div className="cl-name">
                        <strong>{p.en}</strong>
                        <span className="ta" lang="ta">
                          {p.ta}
                        </span>
                        <small>
                          {p.pack} · {inr(p.price)} each
                        </small>
                        {saved ? (
                          <span className="link-btn is-saved">
                            <Heart filled /> In your wishlist
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="link-btn"
                            onClick={() => {
                              toggleWish(p.id);
                              remove(p.id);
                            }}
                          >
                            <Heart /> Move to wishlist
                          </button>
                        )}
                      </div>
                      <QtyStepper id={p.id} name={p.en} />
                      <b className="cl-total">{inr(p.price * qty)}</b>
                      <button
                        type="button"
                        className="cl-remove"
                        aria-label={`Remove ${p.en} from cart`}
                        onClick={() => remove(p.id)}
                      >
                        <Close />
                      </button>
                    </li>
                  );
                })}
              </ul>
              <ul className="cart-notes">
                <li>
                  <Truck /> Flat ₹{DELIVERY_FEE} delivery anywhere in Tamil Nadu
                </li>
                <li>
                  <Chat /> Your order is sent on WhatsApp. Nothing is charged online
                </li>
                <li>
                  <Phone /> Questions?{" "}
                  <a href={PHONE_TEL} className="cart-tel">
                    {PHONE}
                  </a>
                </li>
              </ul>
            </div>

            <OrderSummary lines={lines} subtotal={subtotal} delivery={DELIVERY_FEE}>
              <p className="sum-note">Flat ₹{DELIVERY_FEE} delivery anywhere in Tamil Nadu.</p>
              <Link href="/checkout" className="btn btn-sun sum-cta">
                Checkout <Arrow />
              </Link>
            </OrderSummary>
          </div>
        ) : (
          <EmptyState
            art={EMPTY_ART.cart}
            icon={<Basket />}
            title="Your cart is empty"
            text="Native rice, millets, oils and karupatti are waiting in the shop."
          />
        )}
      </div>
    </section>
  );
}
