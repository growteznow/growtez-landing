"use client";

import { FONT_DISPLAY, FONT_BODY, SECTION_BG, PAGE_BG, SLATE_500, SLATE_400, TEAL_400 } from "@/lib/constants";
import { portfolio, stats } from "@/lib/data";
import { Pill, PortfolioCard } from "@/components/UI";
import RevealText from "@/components/RevealText";
import CountUp from "@/components/CountUp";

export default function PortfolioPage() {
  return (
    <main style={{ paddingTop: 100 }}>
      {/* ── HEADER ── */}
      <section style={{ padding: "2rem 40px 3rem", background: PAGE_BG, textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          <h1 style={{ marginTop: 24 }}>
            <RevealText as="block" className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Projects that</RevealText>
            <RevealText as="block" delay={0.1} className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>speak for themselves.</RevealText>
          </h1>
        </div>
      </section>

      {/* ── PORTFOLIO GRID ── */}
      <section style={{ padding: "4rem 40px 8rem", background: PAGE_BG }}>
        <div style={{ maxWidth: 1050, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "64px 40px" }}>
            {portfolio.map((p, i) => (
              <PortfolioCard key={i} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
