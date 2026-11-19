"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { COMBOS } from "@/lib/data";
import { Calendar, Phone, Pin, Truck } from "./Icons";
import Reveal from "./Reveal";

export default function Pongal() {
  const dlg = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(0);

  const open = (i: number) => {
    setShown(i);
    dlg.current?.showModal();
  };

  return (
    <section id="pongal" className="pongal bg-forest on-dark" aria-labelledby="pongal-title">
      <div className="inner">
        <Reveal className="pongal-copy">
          <div>
            <p className="title-ta" lang="ta">
              தைப்பொங்கல் காம்போ
            </p>
            <h2 id="pongal-title" className="title-en">
              Thai Pongal combo
            </h2>
          </div>
          <p className="lede">
            Naturally grown rice, dals and pantry goods for your pongal pot, packed by Thaayanbu &amp; Naadu Nalam.
          </p>

          <div className="combos">
            {COMBOS.map((c) => (
              <div className="combo" key={c.price}>
                <span className="price">{c.price}</span>
                <span className="count">{c.items}</span>
                <p>{c.note}</p>
              </div>
            ))}
          </div>

          <ul className="dates">
            <li>
              <Calendar /> Book by <b>31 Dec 2026</b>
            </li>
            <li>
              <Truck /> Delivery <b>5–10 Jan 2027</b>
            </li>
            <li>
              <Pin /> Korattur, Chennai 80
            </li>
          </ul>

          <div className="book">
            <a href="tel:+919841009705" className="btn btn-sun">
              <Phone /> Book: 98410 09705
            </a>
            <p className="alt-nums">Also on 99407 06675 and 98401 89174</p>
          </div>
        </Reveal>

        <div className="posters">
          {COMBOS.map((c, i) => (
            <button
              key={c.poster}
              type="button"
              className="poster"
              onClick={() => open(i)}
              aria-label={`Open the ${c.price} combo poster`}
            >
              <Image src={c.poster} alt={c.alt} fill sizes="(max-width: 1023px) 50vw, 36vw" />
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dlg}
        className="lightbox"
        aria-label="Combo poster"
        onClick={(e) => e.target === dlg.current && dlg.current?.close()}
      >
        <Image
          src={COMBOS[shown].poster}
          alt={COMBOS[shown].alt}
          width={COMBOS[shown].w}
          height={COMBOS[shown].h}
          sizes="720px"
        />
        <button type="button" className="btn btn-sun close" onClick={() => dlg.current?.close()}>
          Close
        </button>
      </dialog>
    </section>
  );
}
