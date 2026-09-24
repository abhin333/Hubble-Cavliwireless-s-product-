import ConsultNow from "@/component/consult";
import Hero from "@/component/Hero";
import WhyHubble from "@/component/hubble";
import Products from "@/component/product";

export default function Home() {
  return (
    <main>
      {/* <Navbar /> */}
      <Hero />
      <Products />
      <WhyHubble/>
      <ConsultNow/>
    </main>
  );
}