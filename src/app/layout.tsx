import type { Metadata } from "next";
import { Chakra_Petch, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const chakra = Chakra_Petch({ variable: "--font-chakra", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashjan Quimpo — Press start. Ship code.",
  description: "Portfolio of Ashjan Quimpo, third-year IT student at the University of San Agustin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${chakra.variable} ${instrument.variable} ${jetbrains.variable} h-full`}>
      <body id="top" className="flex min-h-full flex-col">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
