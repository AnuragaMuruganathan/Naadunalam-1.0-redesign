import Image from "next/image";
import { ELEMENTS } from "@/lib/data";
import { Leaf, Truck, Hands, Arrow } from "./Icons";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="home" className="hero bg-paper" aria-labelledby="hero-title">
      <div className="inner">
        <Reveal className="hero-copy">
          <p className="ta hero-ta" lang="ta">
            தாயன்பு நாடு நலம்
          </p>
          <h1 id="hero-title" className="display">
            Pure food for <em>seven generations</em>
          </h1>
          <p className="lede">
            Native rice, cold-pressed oils, karupatti and millets from Tamil Nadu&apos;s own growers. Grown with the
            five elements, cooked the way paati did.
          </p>
          <div className="btn-row">
            <a href="/shop" className="btn btn-forest">
              Shop the harvest <Arrow />
            </a>
            <a href="#pongal" className="btn btn-line">
              Thai Pongal combo
            </a>
          </div>
          <ul className="facts">
            <li>
              <Truck /> Flat ₹50 delivery in Tamil Nadu
            </li>
            <li>
              <Leaf /> Chemical-free
            </li>
            <li>
              <Hands /> From local growers
            </li>
          </ul>
        </Reveal>

        <div className="collage">
          <div className="frames">
            <div className="frame frame-main">
              <Image
                src="/images/photos/gen1-parents.webp"
                alt="A Tamil family at a pooja: the father in a white veshti holding his son, the mother in a silk saree with the aarti plate"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 56vw"
                className="kenburns"
                style={{ objectPosition: "50% 12%" }}
              />
            </div>
            <div className="frame">
              <Image
                src="/images/products/Mappillai-Samba-Rice.webp"
                alt="Mappillai samba, a native red rice, in a clay pot"
                fill
                priority
                sizes="(max-width: 1023px) 50vw, 28vw"
                style={{ objectPosition: "50% 55%" }}
              />
            </div>
            <div className="frame">
              <Image
                src="/images/products/Nallennai.webp"
                alt="Cold-pressed gingelly oil in a glass bottle with sesame seeds and palm jaggery"
                fill
                priority
                sizes="(max-width: 1023px) 50vw, 28vw"
                style={{ objectPosition: "40% 50%" }}
              />
            </div>
          </div>
          <ul className="el-chips" aria-label="The five elements">
            {ELEMENTS.map((e) => (
              <li key={e.en}>
                <a href="#elements">
                  <span className="ta" lang="ta">
                    {e.ta}
                  </span>
                  <span>{e.en}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
