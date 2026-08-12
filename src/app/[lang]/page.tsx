import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Ticker } from "@/components/site/ticker";
import { GitHubStats } from "@/components/site/github-stats";
import { About } from "@/components/site/about";
import { Audience } from "@/components/site/audience";
import { Features } from "@/components/site/features";
import { TechStack } from "@/components/site/tech-stack";
import { Architecture } from "@/components/site/architecture";
import { CryptoLibrary } from "@/components/site/crypto-library";
import { Roadmap } from "@/components/site/roadmap";
import { Faq } from "@/components/site/faq";
import { GetStarted } from "@/components/site/get-started";
import { Connect } from "@/components/site/connect";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { BackToTop } from "@/components/site/back-to-top";
import { SkipLink } from "@/components/site/skip-link";
import { SectionDivider } from "@/components/site/section-divider";

import { type Lang } from "@/lib/translations";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Lang }> | { lang: Lang };
}) {
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SkipLink lang={lang} />
      <ScrollProgress />
      <Header lang={lang} />
      <main id="main" className="flex-1">
        <Hero lang={lang} />
        <Ticker lang={lang} />
        <GitHubStats lang={lang} />
        <About lang={lang} />
        <SectionDivider className="my-4" />
        <Audience lang={lang} />
        <SectionDivider className="my-4" />
        <Features lang={lang} />
        <TechStack lang={lang} />
        <Architecture lang={lang} />
        <CryptoLibrary lang={lang} />
        <SectionDivider className="my-4" />
        <Roadmap lang={lang} />
        <Faq lang={lang} />
        <SectionDivider className="my-4" />
        <GetStarted lang={lang} />
        <Connect lang={lang} />
      </main>
      <Footer lang={lang} />
      <BackToTop lang={lang} />
    </div>
  );
}
