import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Ticker } from "@/components/site/ticker";
import { About } from "@/components/site/about";
import { Ecosystem } from "@/components/site/ecosystem";
import { Features } from "@/components/site/features";
import { TechStack } from "@/components/site/tech-stack";
import { Architecture } from "@/components/site/architecture";
import { CryptoLibrary } from "@/components/site/crypto-library";
import { CryptoConverter } from "@/components/site/crypto-converter";
import { Roadmap } from "@/components/site/roadmap";
import { Faq } from "@/components/site/faq";
import { GitHubStats } from "@/components/site/github-stats";
import { GetStarted } from "@/components/site/get-started";
import { Connect } from "@/components/site/connect";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { BackToTop } from "@/components/site/back-to-top";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Hero />
        <Ticker />
        <GitHubStats />
        <About />
        <Ecosystem />
        <Features />
        <TechStack />
        <Architecture />
        <CryptoLibrary />
        <CryptoConverter />
        <Roadmap />
        <Faq />
        <GetStarted />
        <Connect />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
