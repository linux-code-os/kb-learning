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
        <Audience />
        <Ecosystem />
        <Features />
        <TechStack />
        <Architecture />
        <CryptoLibrary />
        <CryptoConverter />
        <Testimonials />
        <Roadmap />
        <Faq />
        <GetStarted />
        <ContactForm />
        <Connect />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
