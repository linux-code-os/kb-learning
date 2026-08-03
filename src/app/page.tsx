import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Ticker } from "@/components/site/ticker";
import { GitHubStats } from "@/components/site/github-stats";
import { About } from "@/components/site/about";
import { Audience } from "@/components/site/audience";
import { Ecosystem } from "@/components/site/ecosystem";
import { Features } from "@/components/site/features";
import { TechStack } from "@/components/site/tech-stack";
import { Architecture } from "@/components/site/architecture";
import { CryptoLibrary } from "@/components/site/crypto-library";
import { CryptoConverter } from "@/components/site/crypto-converter";
import { TradeSimulator } from "@/components/site/trade-simulator";
import { CrossRates } from "@/components/site/cross-rates";
import { Testimonials } from "@/components/site/testimonials";
import { Roadmap } from "@/components/site/roadmap";
import { Faq } from "@/components/site/faq";
import { GetStarted } from "@/components/site/get-started";
import { ContactForm } from "@/components/site/contact-form";
import { Connect } from "@/components/site/connect";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { BackToTop } from "@/components/site/back-to-top";
import { SkipLink } from "@/components/site/skip-link";
import { SectionDivider } from "@/components/site/section-divider";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Ticker />
        <GitHubStats />
        <About />
        <SectionDivider className="my-4" />
        <Audience />
        <Ecosystem />
        <SectionDivider className="my-4" />
        <Features />
        <TechStack />
        <Architecture />
        <CryptoLibrary />
        <SectionDivider className="my-4" />
        <CryptoConverter />
        <TradeSimulator />
        <CrossRates />
        <SectionDivider className="my-4" />
        <Testimonials />
        <Roadmap />
        <Faq />
        <SectionDivider className="my-4" />
        <GetStarted />
        <ContactForm />
        <Connect />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
