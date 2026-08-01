import { createFileRoute } from "@tanstack/react-router";
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

const title = "Accretion — All your work pulled into one powerful place";
const description =
  "Organize tasks and projects in one connected, accessible platform. Automations, live collaboration, 17 integrations and insights for modern teams.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
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
