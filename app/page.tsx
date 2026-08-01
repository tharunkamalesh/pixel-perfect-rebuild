import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { LogoTicker } from "@/components/site/LogoTicker";
import { Features } from "@/components/site/Features";
import { Showcase } from "@/components/site/Showcase";
import { Integrations } from "@/components/site/Integrations";
import { Testimonials } from "@/components/site/Testimonials";
import { Pricing } from "@/components/site/Pricing";
import { Faq } from "@/components/site/Faq";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Footer } from "@/components/site/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <Features />
        <Showcase />
        <Integrations />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
