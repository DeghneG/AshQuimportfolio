import type { Metadata } from "next";
import { Chakra_Petch, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Preloader } from "@/components/Preloader";
import { PRELOADER_BOOT_SCRIPT } from "@/lib/preloader";

const chakra = Chakra_Petch({ variable: "--font-chakra", subsets: ["latin"], weight: ["500", "600", "700"] });
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashjan Quimpo — Press start. Ship code.",
  description: "Portfolio of Ashjan Quimpo, third-year IT student at the University of San Agustin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${chakra.variable} ${instrument.variable} ${jetbrains.variable} h-full`}
    >
      <head>
        {/* Runs before first paint so returning visitors never see the curtain flash. */}
        <Script id="preloader-boot" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: PRELOADER_BOOT_SCRIPT }} />
        <noscript>
          <style>{`#preloader{display:none}`}</style>
        </noscript>
      </head>
      <body id="top" className="flex min-h-full flex-col">
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
