import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import AttributionCapture from "@/components/AttributionCapture";
import GhlChatWidget from "@/components/GhlChatWidget";
import PageMain from "@/components/PageMain";
import { siteConfig } from "@/config/site.config";
import { localBusinessSchema } from "@/lib/schema";

// Heavy condensed display face for headlines — this is most of what
// makes a bold, aggressive local-trade site feel intentional rather than
// stock. Body stays a normal grotesk for actual readability.
const displayFont = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.business.name} | ${siteConfig.hero.headline}`,
    template: `%s | ${siteConfig.business.name}`,
  },
  description: siteConfig.business.tagline,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: siteConfig.business.logoSrc, type: "image/png" }],
    shortcut: [{ url: siteConfig.business.logoSrc, type: "image/png" }],
    apple: [{ url: siteConfig.business.logoSrc, type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.business.name,
    title: siteConfig.business.name,
    description: siteConfig.business.tagline,
    url: siteConfig.siteUrl,
    images: [{ url: siteConfig.hero.posterSrc }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.business.name,
    description: siteConfig.business.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} bg-paper text-ink font-body antialiased`}>
        <JsonLd data={localBusinessSchema()} />
        <AttributionCapture />
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <Header />
        <PageMain>{children}</PageMain>
        <Footer />
        <GhlChatWidget />
      </body>
    </html>
  );
}
