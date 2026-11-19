"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { GENERATIONS } from "@/lib/data";
import { Arrow } from "./Icons";
import Reveal from "./Reveal";

const N = GENERATIONS.length;

export default function Generations() {
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = useCallback((i: number, focus = false) => {
    const next = (i + N) % N;
    setCur(next);
    if (focus) tabs.current[next]?.focus();
  }, []);

  // Walk back through time on its own while the section is on screen, until the visitor takes over.
  useEffect(() => {
    if (!auto || reduce) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.5 });
    if (sectionRef.current) io.observe(sectionRef.current);
    const t = window.setInterval(() => visible && setCur((c) => (c + 1) % N), 5200);
    return () => {
      window.clearInterval(t);
      io.disconnect();
    };
  }, [auto, reduce]);

  const pick = (i: number, focus = false) => {
    setAuto(false);
    go(i, focus);
  };

  const g = GENERATIONS[cur];

  return (
    <section
      id="generations"
      ref={sectionRef}
      className="generations bg-paper"
      aria-labelledby="gen-title"
    >
      <div className="inner">
        <Reveal className="gen-left">
          <div>
            <p className="title-ta" lang="ta">
              ஏழு தலைமுறை
            </p>
            <h2 id="gen-title" className="title-en">
              One family, seven generations
            </h2>
          </div>
          <p className="lede">The food that kept our elders strong, kept for the ones still to come.</p>

          <ul className="rail" role="tablist" aria-orientation="vertical" aria-label="Seven generations">
            {GENERATIONS.map((x, i) => (
              <li key={x.ta} role="presentation">
                <button
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`gen-tab-${i}`}
                  aria-selected={cur === i}
                  aria-controls="gen-panel"
                  tabIndex={cur === i ? 0 : -1}
                  onClick={() => pick(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      pick(i + 1, true);
                    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      pick(i - 1, true);
                    }
                  }}
                >
                  <span className="dot" aria-hidden="true" />
                  <span className="ta" lang="ta">
                    {x.ta}
                  </span>
                  <span className="en">{x.en}</span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <div
          className="stage"
          id="gen-panel"
          role="tabpanel"
          aria-labelledby={`gen-tab-${cur}`}
          onMouseEnter={() => setAuto(false)}
        >
          <div className="stage-imgs">
            {GENERATIONS.map((x, i) => (
              <div
                key={x.ta}
                className={`slide${x.imgs.length > 1 ? " pair" : ""}${cur === i ? " is-on" : ""}`}
                aria-hidden={cur !== i}
              >
                {x.imgs.map((im) => (
                  <div className="frame-img" key={im.src}>
                    <Image
                      src={im.src}
                      alt={im.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 80vw"
                      style={{ objectPosition: im.pos, filter: x.filter }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="stage-cap">
            <div>
              <div className="who">
                <span className="ta" lang="ta">
                  {g.ta}
                </span>
                <span className="en">{g.en}</span>
              </div>
              <p aria-live="polite">{g.line}</p>
            </div>
            <div className="arrows">
              <button type="button" aria-label="Previous generation" onClick={() => pick(cur - 1)}>
                <Arrow dir="left" />
              </button>
              <button type="button" aria-label="Next generation" onClick={() => pick(cur + 1)}>
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
