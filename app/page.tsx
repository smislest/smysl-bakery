import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ScrollingIcons from "./components/ScrollingIcons";
import ProductsSection from "./components/ProductsSection";
import AboutSection from "./components/AboutSection";
import NewsSection from "./components/NewsSection";
import HeartSection from "./components/HeartSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ScrollingIcons />
        <ProductsSection />
        <AboutSection />
        <NewsSection />
        <HeartSection />
      </main>
      <Footer />
    </>
  );
}
