import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, PHONE, PHONE_TEL, WHATSAPP } from "@/lib/data";
import { Arrow, Basket, Chat, Leaf, Phone, Truck } from "../Icons";
import Reveal from "../Reveal";

/* Closing sections. Each one is the last section of its page, so it shares the screen with the footer. */

/** /shop — how the food reaches you. */
export function ShopPromise() {
  return (
    <section className="promise bg-forest on-dark" aria-labelledby="promise-title">
      <div className="inner">
        <Reveal className="promise-copy">
          <div>
            <p className="title-ta" lang="ta">
              வயலில் இருந்து வீட்டுக்கு
            </p>
            <h2 id="promise-title" className="title-en">
              From the field to your door
            </h2>
          </div>
          <ul className="promise-list">
            <li>
              <span className="ic">
                <Truck />
              </span>
              <span>
                <strong>Flat ₹50 delivery</strong>
                <span>Anywhere in Tamil Nadu, on any order size.</span>
              </span>
            </li>
            <li>
              <span className="ic">
                <Leaf />
              </span>
              <span>
                <strong>Chemical-free, from local growers</strong>
                <span>Native seeds, grown with the five elements.</span>
              </span>
            </li>
            <li>
              <span className="ic">
                <Chat />
              </span>
              <span>
                <strong>Order your way</strong>
                <span>Check out here, or send your list on WhatsApp.</span>
              </span>
            </li>
          </ul>
          <div className="btn-row">
            <Link href="/cart" className="btn btn-sun">
              <Basket /> View cart
            </Link>
            <a href={WHATSAPP} className="btn btn-line" target="_blank" rel="noopener noreferrer">
              <Chat /> WhatsApp
            </a>
          </div>
        </Reveal>
        <div className="promise-art" aria-hidden="true">
          <div className="arch">
            <Image
              src="/images/photos/palmyra-grove.webp"
              alt=""
              fill
              sizes="(max-width: 1023px) 110vw, 66vw"
              style={{ objectPosition: "72% 55%" }}
            />
          </div>
          <div className="arch">
            <Image
              src="/images/photos/lake-dusk.webp"
              alt=""
              fill
              sizes="(max-width: 1023px) 90vw, 72vw"
              style={{ objectPosition: "38% 50%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const EXPLORE = CATEGORIES.filter((c) =>
  ["rice", "millets", "health-mixes", "sweeteners", "ghee-oil", "masala"].includes(c.cat),
);

/** /wishlist — six favourite categories, one tap away. */
export function ExploreTiles() {
  return (
    <section className="explore bg-paper" aria-labelledby="explore-title">
      <div className="inner">
        <Reveal className="sec-head">
          <div>
            <h2 id="explore-title" className="title-en">
              Keep exploring
            </h2>
          </div>
          <Link href="/shop" className="btn btn-line">
            All products <Arrow />
          </Link>
        </Reveal>
        <ul className="tiles" aria-label="Categories">
          {EXPLORE.map((c) => (
            <li key={c.en} className="tile">
              <Link href={`/shop?cat=${c.cat}`}>
                <div className="ph">
                  <Image src={c.img} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 30vw" />
                </div>
                <div className="t">
                  <strong>{c.en}</strong>
                  <span className="ta" lang="ta">
                    {c.ta}
                  </span>
                  <small>{c.meta}</small>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** /checkout — a person to call. */
export function HelpBand() {
  return (
    <section className="help bg-sand" aria-labelledby="help-title">
      <div className="inner">
        <div className="arch help-art">
          <Image
            src="/images/photos/grandpa-grandson.webp"
            alt="A smiling grandfather with his grandson on his shoulder"
            fill
            sizes="(max-width: 1023px) 100vw, 64vw"
            style={{ objectPosition: "71% 32%" }}
          />
        </div>
        <Reveal className="help-copy">
          <div>
            <h2 id="help-title" className="title-en">
              Need a hand with your order?
            </h2>
          </div>
          <p className="lede">Call or message us about packs, delivery or the Thai Pongal combo.</p>
          <ul className="rows">
            <li>
              <small>Orders &amp; questions</small>
              <a href={PHONE_TEL}>{PHONE}</a>
            </li>
            <li>
              <small>Delivery</small>
              <b>Flat ₹50 across Tamil Nadu</b>
            </li>
          </ul>
          <div className="btn-row">
            <a href={PHONE_TEL} className="btn btn-forest">
              <Phone /> Call us
            </a>
            <a href={WHATSAPP} className="btn btn-line" target="_blank" rel="noopener noreferrer">
              <Chat /> WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
