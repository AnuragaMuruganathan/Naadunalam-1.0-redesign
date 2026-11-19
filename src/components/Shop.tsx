import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, NEW_AVAL, WHATSAPP } from "@/lib/data";
import { Arrow, Chat } from "./Icons";
import Reveal from "./Reveal";

export default function Shop() {
  return (
    <section id="shop" className="shop bg-sand" aria-labelledby="shop-title">
      <div className="inner">
        <Reveal className="sec-head">
          <div>
            <p className="title-ta" lang="ta">
              நம் சமையலறை
            </p>
            <h2 id="shop-title" className="title-en">
              Shop the Tamil kitchen
            </h2>
          </div>
          <div className="btn-row">
            <Link href="/shop" className="btn btn-forest">
              Shop all products <Arrow />
            </Link>
            <a href={WHATSAPP} className="btn btn-line" target="_blank" rel="noopener noreferrer">
              <Chat /> WhatsApp
            </a>
          </div>
        </Reveal>

        <div className="shop-body">
          <Link href="/shop?cat=aval" className="feature" aria-labelledby="aval-title">
            <div className="ph">
              <Image
                src="/images/site/Aval-Vagaigal.webp"
                alt="Native rice aval varieties in clay bowls"
                fill
                sizes="(max-width: 1023px) 100vw, 34vw"
              />
            </div>
            <div className="body">
              <h3 id="aval-title">New in aval</h3>
              <ul>
                {NEW_AVAL.map((a) => (
                  <li key={a.en}>
                    <span>{a.en}</span>
                    <b>{a.price}</b>
                  </li>
                ))}
              </ul>
            </div>
          </Link>

          <ul className="tiles" aria-label="Categories">
            {CATEGORIES.map((c) => (
              <li key={c.en} className="tile">
                <Link href={`/shop?cat=${c.cat}`}>
                  <div className="ph">
                    <Image src={c.img} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 15vw" />
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
      </div>
    </section>
  );
}
