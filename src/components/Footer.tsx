"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { NAV, PHONE, PHONE_TEL, navHref } from "@/lib/data";
import { Phone } from "./Icons";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const onHome = usePathname() === "/";

  // Keep --footer-h equal to the real footer height so the last section + footer fill exactly one screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty("--footer-h", `${Math.ceil(el.offsetHeight)}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <footer ref={ref} className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          <a
            href={onHome ? "#home" : "/"}
            className="foot-brand"
            aria-label={onHome ? "Back to top" : "Naadu Nalam home"}
          >
            <span className="chip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo.webp" alt="" width={108} height={104} />
            </span>
            <span>
              <b>Naadu Nalam</b>
              <span>Our inclusive well-being</span>
            </span>
          </a>
          <nav className="foot-nav" aria-label="Footer">
            {NAV.map((n) => (
              <a key={n.id} href={navHref(n, onHome)}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href={PHONE_TEL} className="foot-phone">
            <Phone /> {PHONE}
          </a>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Naadu Nalam. All rights reserved.</span>
          <span>Good food · Healthy people · Sustainable tomorrow</span>
        </div>
      </div>
    </footer>
  );
}
