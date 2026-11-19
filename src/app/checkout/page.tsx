import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutView from "@/components/store/CheckoutView";
import { HelpBand } from "@/components/store/Bands";

export const metadata: Metadata = {
  title: "Checkout · Naadu Nalam",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main>
        <CheckoutView />
        <HelpBand />
      </main>
      <Footer />
    </>
  );
}
