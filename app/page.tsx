import Navbar from "@/component/Header";
import Hero from "@/component/Hero";
import Products from "@/component/product";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Products />
    </main>
  );
}