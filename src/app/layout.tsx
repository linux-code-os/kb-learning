import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/site/language-toggle";
import { siteConfig } from "@/lib/site-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://linux-code-dev.github.io"),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline.ru}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description.ru,
  keywords: [
    "KB Learning",
    "KB Wallet",
    "криптовалюта",
    "обучение",
    "Kotlin Multiplatform",
    "Compose",
    "трейдинг симулятор",
    "крипто портфель",
    "Aleksey Balandin",
  ],
  authors: [{ name: siteConfig.owner.name, url: siteConfig.github }],
  creator: siteConfig.owner.name,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline.ru}`,
    description: siteConfig.description.ru,
    url: "https://linux-code-dev.github.io",
    siteName: siteConfig.name,
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline.ru}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline.ru}`,
    description: siteConfig.description.ru,
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
