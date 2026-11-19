"use client";

import Image from "next/image";
import { useState } from "react";
import { ELEMENTS } from "@/lib/data";
import Reveal from "./Reveal";

export default function Elements() {
  const [active, setActive] = useState(0);

  return (
    <section id="elements" className="elements bg-forest on-dark" aria-labelledby="elements-title">
      <div className="inner">
        <Reveal className="sec-head">
          <div>
            <p className="title-ta" lang="ta">
              இயற்கை ஐம்பூதங்கள்
            </p>
            <h2 id="elements-title" className="title-en">
              Grown in balance with the five elements
            </h2>
          </div>
          <p className="lede">Soil, water, fire, wind and sky. We keep all five clean, so the food stays pure.</p>
        </Reveal>

        <div className="panels">
          {ELEMENTS.map((e, i) => (
            <button
              key={e.en}
              type="button"
              className="panel"
              aria-pressed={active === i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className="ph">
                <Image
                  src={e.img}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 100vw, 60vw"
                  style={{ objectPosition: e.pos }}
                />
              </span>
              <span className="cap">
                <span className="cap-top">
                  <span className="ta" lang="ta">
                    {e.ta}
                  </span>
                  <span className="en">{e.en}</span>
                </span>
                <span className="line">{e.line}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
