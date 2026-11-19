"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, PHONE, PHONE_TEL, navHref } from "@/lib/data";
import { useStore } from "./store/StoreProvider";
import { Basket, Close, Heart, Menu, Phone } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(onHome ? "home" : pathname === "/shop" ? "shop" : "");
  const { cartCount, wish, ready } = useStore();

  // On the home page, highlight the section that owns the middle of the screen.
  useEffect(() => {
    if (!onHome) return;
    const els = NAV.filter((n) => !n.route)
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const wishCount = ready ? wish.length : 0;
  const bagCount = ready ? cartCount : 0;

  const icons = (
    <div className="hd-icons">
      <Link
        href="/wishlist"
        className="hd-ic"
        aria-label={`Wishlist${wishCount ? `, ${wishCount} saved` : ""}`}
        aria-current={pathname === "/wishlist" ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        <Heart />
        {wishCount > 0 && <span className="dot-n">{wishCount}</span>}
      </Link>
      <Link
        href="/cart"
        className="hd-ic"
        aria-label={`Cart${bagCount ? `, ${bagCount} ${bagCount === 1 ? "item" : "items"}` : ""}`}
        aria-current={pathname === "/cart" || pathname === "/checkout" ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        <Basket />
        {bagCount > 0 && <span className="dot-n">{bagCount}</span>}
      </Link>
    </div>
  );

  return (
    <header className="site-header">
      <div className="bar">
        <a href={onHome ? "#home" : "/"} className="brand" aria-label="Naadu Nalam home" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.webp" alt="" width={112} height={108} />
          <span>Naadu Nalam</span>
        </a>

        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.id} href={navHref(n, onHome)} aria-current={active === n.id ? "true" : undefined}>
              {n.label}
            </a>
          ))}
        </nav>

        {icons}

        <a href={PHONE_TEL} className="btn btn-forest call-pill">
          <Phone />
          {PHONE}
        </a>

        <button
          className="menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
          {NAV.map((n) => (
            <a key={n.id} href={navHref(n, onHome)} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a href={PHONE_TEL} className="btn btn-forest" onClick={() => setOpen(false)}>
            <Phone />
            {PHONE}
          </a>
        </nav>
      )}
    </header>
  );
}
