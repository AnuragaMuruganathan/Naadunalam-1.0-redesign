"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/products";
import ProductCard from "./ProductCard";
import { useFitRows } from "./useFitRows";
import { Close, Search } from "../Icons";

const PAGE = 16;
const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Name: A to Z" },
] as const;
type SortId = (typeof SORTS)[number]["id"];

const COUNTS = PRODUCTS.reduce<Record<string, number>>((m, p) => ((m[p.cat] = (m[p.cat] ?? 0) + 1), m), {});
const CAT_NAME = new Map(PRODUCT_CATEGORIES.map((c) => [c.id, c]));

export default function ShopCatalogue({ initialCat, initialQuery }: { initialCat: string; initialQuery: string }) {
  const [cat, setCat] = useState(CAT_NAME.has(initialCat) ? initialCat : "all");
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortId>("featured");
  const [shown, setShown] = useState(PAGE);
  const searchId = useId();
  const sortId = useId();

  // Shareable URL: /shop?cat=millets&q=ragi
  useEffect(() => {
    const u = new URL(window.location.href);
    if (cat === "all") u.searchParams.delete("cat");
    else u.searchParams.set("cat", cat);
    if (query.trim()) u.searchParams.set("q", query.trim());
    else u.searchParams.delete("q");
    window.history.replaceState(window.history.state, "", u.pathname + u.search);
  }, [cat, query]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = PRODUCTS.filter((p) => cat === "all" || p.cat === cat);
    if (q) {
      out = out.filter((p) => {
        const c = CAT_NAME.get(p.cat);
        return [p.en, p.ta, c?.en, c?.ta].some((s) => s?.toLowerCase().includes(q));
      });
    }
    if (sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "name") out = [...out].sort((a, b) => a.en.localeCompare(b.en));
    return out;
  }, [cat, query, sort]);

  // Re-measure when the grid appears again after an empty search.
  const { ref: gridRef, rowH, measured } = useFitRows<HTMLUListElement>([list.length > 0]);

  const pick = (id: string) => {
    setCat(id);
    setShown(PAGE);
  };
  const visible = list.slice(0, shown);
  const catLabel = cat === "all" ? "All products" : CAT_NAME.get(cat)?.en;

  return (
    <div className="catalog-body">
      <aside className="cat-side" aria-label="Categories">
        <ul>
          <li>
            <button type="button" aria-pressed={cat === "all"} onClick={() => pick("all")}>
              <span className="nm">
                <strong>All products</strong>
                <span className="ta" lang="ta">
                  அனைத்தும்
                </span>
              </span>
              <span className="ct">{PRODUCTS.length}</span>
            </button>
          </li>
          {PRODUCT_CATEGORIES.map((c) => (
            <li key={c.id}>
              <button type="button" aria-pressed={cat === c.id} onClick={() => pick(c.id)}>
                <span className="nm">
                  <strong>{c.en}</strong>
                  <span className="ta" lang="ta">
                    {c.ta}
                  </span>
                </span>
                <span className="ct">{COUNTS[c.id] ?? 0}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="catalog-main">
        <div className="toolbar">
          <div className="field search">
            <label htmlFor={searchId} className="sr-only">
              Search products
            </label>
            <Search />
            <input
              id={searchId}
              type="search"
              placeholder="Search millets, ghee, கருப்பட்டி…"
              value={query}
              autoComplete="off"
              onChange={(e) => {
                setQuery(e.target.value);
                setShown(PAGE);
              }}
            />
          </div>
          <div className="field sort">
            <label htmlFor={sortId}>Sort</label>
            <select id={sortId} value={sort} onChange={(e) => setSort(e.target.value as SortId)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="result-line" aria-live="polite">
          <span>
            {catLabel}
            {query.trim() && <> matching “{query.trim()}”</>}
          </span>
          <span className="n">
            {list.length} {list.length === 1 ? "item" : "items"}
          </span>
          {(cat !== "all" || query) && (
            <button
              type="button"
              className="clear"
              onClick={() => {
                setCat("all");
                setQuery("");
                setShown(PAGE);
              }}
            >
              <Close /> Clear
            </button>
          )}
        </p>

        {list.length ? (
          <ul
            ref={gridRef}
            className={`pgrid${rowH ? " fit" : ""}${measured ? "" : " measuring"}`}
            style={rowH ? { gridAutoRows: `${rowH}px` } : undefined}
          >
            {visible.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} sizes="(max-width: 640px) 60vw, (max-width: 1023px) 40vw, 30vw" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p className="empty-t">Nothing matches that yet.</p>
            <p>Try another word or category, or ask us on WhatsApp.</p>
          </div>
        )}

        {list.length > shown && (
          <div className="more">
            <button type="button" className="btn btn-forest" onClick={() => setShown((n) => n + PAGE)}>
              Show more
            </button>
            <span>
              {visible.length} of {list.length} shown
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
