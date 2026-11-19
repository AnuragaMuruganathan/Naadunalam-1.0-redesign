import Image from "next/image";
import { PHONE_TEL } from "@/lib/data";
import { Basket, Hands, Store, Tag, Arrow } from "./Icons";
import Reveal from "./Reveal";

const TRUST = [
  { icon: Hands, t: "Sourced close to home", d: "Local growers and small producers, not anonymous supply chains." },
  { icon: Store, t: "Every seller has a storefront", d: "See who you are buying from before you add to cart." },
  { icon: Tag, t: "Clear, upfront pricing", d: "Regular price beside today's price. No hidden costs." },
  { icon: Basket, t: "One cart, one checkout", d: "Mix items from different sellers and pay once." },
];

export default function Sellers() {
  return (
    <section id="sellers" className="sellers bg-paper" aria-labelledby="sellers-title">
      <div className="inner">
        <div className="seller-art" aria-hidden="true">
          <div className="backdrop">
            <span className="sun" />
          </div>
          <div className="cut">
            <Image
              src="/images/site/nn-hero-cutout-clean-800.webp"
              alt=""
              fill
              sizes="(max-width: 1023px) 90vw, 34vw"
            />
          </div>
        </div>

        <Reveal className="seller-copy">
          <div>
            <p className="title-ta" lang="ta">
              பல விற்பனையாளர்கள், ஒரே கூடை
            </p>
            <h2 id="sellers-title" className="title-en">
              Many sellers. One basket.
            </h2>
          </div>
          <p className="lede">
            Independent growers, home producers and small brands each run their own storefront on Naadu Nalam.
          </p>
          <ul className="trust">
            {TRUST.map(({ icon: Icon, t, d }) => (
              <li key={t}>
                <span className="ic">
                  <Icon />
                </span>
                <span>
                  <strong>{t}</strong>
                  <span>{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="btn-row">
            <a href={PHONE_TEL} className="btn btn-forest">
              Become a seller <Arrow />
            </a>
            <a href="/shop" className="btn btn-line">
              Shop the harvest
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
