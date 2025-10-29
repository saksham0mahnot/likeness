import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import SectionHeader from "@/components/section-header";
import PortfolioGrid from "@/components/portfolio-grid";
import ReelsCarousel from "@/components/reels-carousel";
import Services from "@/components/services";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import BackgroundFX from "@/components/background-fx";
import SectionReveal from "@/components/section-reveal";
import SectionIndex from "@/components/section-index";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-foreground dark:bg-black">
      <Navbar />
      <BackgroundFX />
      <SectionIndex />
      <SectionReveal>
        <Hero />
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <SectionHeader id="work" eyebrow="Selected Work" title="Featured Projects" subtitle="A mix of branded content, narrative, and social-first edits." />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <PortfolioGrid />
      </SectionReveal>
      <SectionReveal delay={0.15}>
        <SectionHeader id="reels" eyebrow="Reels" title="Cuts in Motion" />
      </SectionReveal>
      <SectionReveal delay={0.2}>
        <ReelsCarousel />
      </SectionReveal>
      <SectionReveal delay={0.25}>
        <SectionHeader id="services" eyebrow="Capabilities" title="Services" />
      </SectionReveal>
      <SectionReveal delay={0.3}>
        <Services />
      </SectionReveal>
      <SectionReveal delay={0.35}>
        <SectionHeader id="about" eyebrow="Behind the Cuts" title="About" />
      </SectionReveal>
      <SectionReveal delay={0.4}>
        <About />
      </SectionReveal>
      <SectionReveal delay={0.45}>
        <SectionHeader id="contact" eyebrow="Let’s Collaborate" title="Contact" />
      </SectionReveal>
      <SectionReveal delay={0.5}>
        <Contact />
      </SectionReveal>
      <Footer />
    </div>
  );
}
