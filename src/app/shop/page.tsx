import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopCatalogue from "@/components/store/ShopCatalogue";
import { ShopPromise } from "@/components/store/Bands";

export const metadata: Metadata = {
  title: "Shop · Naadu Nalam",
  description:
    "Native rice, aval, millets, pulses, health mixes, cold-pressed oils, ghee, karupatti and honey. Flat ₹50 delivery across Tamil Nadu.",
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ cat?: string; q?: string }> }) {
  const { cat = "all", q = "" } = await searchParams;
  return (
    <>
      <Header />
      <main>
        <section className="catalog bg-sand flow" aria-labelledby="shop-title">
          <div className="inner">
            <div className="sec-head">
              <div>
                <p className="title-ta" lang="ta">
                  நம் அங்காடி
                </p>
                <h1 id="shop-title" className="title-en">
                  Shop the harvest
                </h1>
              </div>
              <p className="lede">Prices are per pack. Flat ₹50 delivery across Tamil Nadu.</p>
            </div>
            <ShopCatalogue initialCat={cat} initialQuery={q} />
          </div>
        </section>
        <ShopPromise />
      </main>
      <Footer />
    </>
  );
}
