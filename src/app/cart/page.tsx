import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartView from "@/components/store/CartView";
import PairWith from "@/components/store/PairWith";

export const metadata: Metadata = {
  title: "Cart · Naadu Nalam",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main>
        <CartView />
        <PairWith />
      </main>
      <Footer />
    </>
  );
}
