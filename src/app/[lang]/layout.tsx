import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteConfig } from "@/lib/site-data";
import { type Lang } from "@/lib/translations";
import { getT } from "@/lib/dictionary";

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "en" }];
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> | { lang: Lang } }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;
  const t = getT(lang);
  
  return {
    metadataBase: new URL("https://linux-code-dev.github.io"),
    title: {
      default: `${siteConfig.name} — ${t("brand.subtitle")}`,
      template: `%s · ${siteConfig.name}`,
    },
    description: siteConfig.description[lang],
    keywords: [
      "KB Learning",
      "криптовалюта",
      "обучение",
      "Kotlin Multiplatform",
      "Compose",
      "трейдинг симулятор",
      "крипто портфель",
    ],
    authors: [{ name: siteConfig.owner.name, url: siteConfig.github }],
    creator: siteConfig.owner.name,
    openGraph: {
      title: `${siteConfig.name} — ${t("brand.subtitle")}`,
      description: siteConfig.description[lang],
      url: "https://linux-code-dev.github.io/KB_Learning/",
      siteName: siteConfig.name,
      type: "website",
      locale: lang === "ru" ? "ru_RU" : "en_US",
    },
    twitter: {
      card: "summary",
      title: `${siteConfig.name} — ${t("brand.subtitle")}`,
      description: siteConfig.description[lang],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Lang }> | { lang: Lang };
}>) {
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
