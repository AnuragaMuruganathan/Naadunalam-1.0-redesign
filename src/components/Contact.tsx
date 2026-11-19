import Image from "next/image";
import { PHONE, PHONE_TEL, WHATSAPP } from "@/lib/data";
import { Chat, Phone } from "./Icons";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="contact bg-sand" aria-labelledby="contact-title">
      <div className="inner">
        <div className="arch">
          <Image
            src="/images/photos/kolam-hands.webp"
            alt="Hands drawing a rice-flour kolam at the doorstep"
            fill
            sizes="(max-width: 1023px) 45vw, 24vw"
            style={{ objectPosition: "50% 62%" }}
          />
        </div>

        <Reveal className="contact-copy">
          <div>
            <p className="title-ta" lang="ta">
              வாங்க, பேசலாம்
            </p>
            <h2 id="contact-title" className="title-en">
              Come, let&apos;s talk
            </h2>
          </div>

          <ul className="rows">
            <li>
              <small>Orders &amp; questions</small>
              <a href={PHONE_TEL}>{PHONE}</a>
            </li>
            <li>
              <small>Pongal combo bookings</small>
              <a href="tel:+919841009705">98410 09705</a>
            </li>
            <li>
              <small>Delivery</small>
              <b>Flat ₹50 across Tamil Nadu</b>
            </li>
            <li>
              <small>Combo pickup point</small>
              <b>Korattur, Chennai 80</b>
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

        <div className="arch">
          <Image
            src="/images/photos/paati-red-wall.webp"
            alt="Paati in a maroon saree sitting by a red wall"
            fill
            sizes="(max-width: 1023px) 80vw, 66vw"
            style={{ objectPosition: "47% 45%" }}
          />
        </div>
      </div>
    </section>
  );
}
