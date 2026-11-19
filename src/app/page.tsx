import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Elements from "@/components/Elements";
import Generations from "@/components/Generations";
import Shop from "@/components/Shop";
import Pongal from "@/components/Pongal";
import Sellers from "@/components/Sellers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Elements />
        <Generations />
        <Shop />
        <Pongal />
        <Sellers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
