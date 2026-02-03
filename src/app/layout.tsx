import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppSticky } from "@/components/cta/WhatsAppSticky";
import { MobileStickyBar } from "@/components/cta/MobileStickyBar";
import { TravelAgencyJsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sarerah Travel | Luxury Adventure Tours — North Pakistan & Asia",
    template: "%s | Sarerah Travel",
  },
  description:
    "Premium travel agency from Pakistan. Hunza, Skardu, Naran, Fairy Meadows, Thailand, Malaysia, Sri Lanka & more. Licensed guides, no hidden charges. Custom itineraries and expert guides.",
  keywords: ["Pakistan travel", "Hunza tours", "Skardu", "K2", "Thailand from Pakistan", "travel agency Pakistan"],
  openGraph: {
    type: "website",
    locale: "en_PK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${dmSans.variable} font-sans antialiased`}>
        <TravelAgencyJsonLd />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppSticky />
        <MobileStickyBar />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
