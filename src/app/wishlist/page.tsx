import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WishlistView from "@/components/store/WishlistView";
import { ExploreTiles } from "@/components/store/Bands";

export const metadata: Metadata = {
  title: "Wishlist · Naadu Nalam",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main>
        <WishlistView />
        <ExploreTiles />
      </main>
      <Footer />
    </>
  );
}
