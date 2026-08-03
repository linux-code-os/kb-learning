import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Ecosystem } from "@/components/site/ecosystem";
import { Features } from "@/components/site/features";
import { TechStack } from "@/components/site/tech-stack";
import { Architecture } from "@/components/site/architecture";
import { CryptoLibrary } from "@/components/site/crypto-library";
import { GetStarted } from "@/components/site/get-started";
import { Connect } from "@/components/site/connect";
import { Footer } from "@/components/site/footer";
import { Ticker } from "@/components/site/ticker";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Ticker />
        <About />
        <Ecosystem />
        <Features />
        <TechStack />
        <Architecture />
        <CryptoLibrary />
        <GetStarted />
        <Connect />
      </main>
      <Footer />
    </div>
  );
}
