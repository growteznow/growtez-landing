"use client";

import { FONT_DISPLAY, FONT_BODY, SECTION_BG, PAGE_BG, SLATE_500, SLATE_400, TEAL_400 } from "@/lib/constants";
import { portfolio, stats } from "@/lib/data";
import { Pill, PortfolioCard } from "@/components/UI";
import RevealText from "@/components/RevealText";
import CountUp from "@/components/CountUp";

export default function PortfolioPage() {
  return (
    <main style={{ paddingTop: 120 }}>
      {/* ── HEADER ── */}
      <section style={{ padding: "6rem 40px", background: PAGE_BG, textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Pill>Our Work</Pill>
          <h1 style={{ marginTop: 24 }}>
            <RevealText as="block" className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Projects that</RevealText>
            <RevealText as="block" delay={0.1} className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>speak for themselves.</RevealText>
          </h1>
        </div>
      </section>

      {/* ── PORTFOLIO GRID ── */}
      <section style={{ padding: "4rem 40px 8rem", background: PAGE_BG }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "64px 40px" }}>
            {portfolio.map((p, i) => (
              <PortfolioCard key={i} {...p} index={i} />
            ))}
            {/* Adding extra items to fill out the page just for visual weight */}
            <PortfolioCard src="/portfolio_brand.png" title="Verto App" category="Fintech Platform" year="2023" index={3} />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "8rem 40px", background: SECTION_BG }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 64 }} className="md:grid-cols-[1fr_2fr]">
          <div>
            <Pill>By The Numbers</Pill>
            <RevealText as="block" className="text-4xl font-semibold tracking-tight" style={{ ...FONT_DISPLAY, marginTop: 16, color: "#000000" }}>Proof in performance.</RevealText>
            <p style={{ marginTop: 16, color: SLATE_400, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 320 }}>
              We measure our success entirely by the success of our clients. Here is a snapshot of our impact over the last three years.
            </p>
          </div>
          <div className="grid grid-cols-2" style={{ gap: "40px 24px" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ borderLeft: "2px solid rgba(0,0,0,0.08)", paddingLeft: 24 }}>
                <div style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, color: "#000000", ...FONT_DISPLAY }}>
                  <CountUp end={s.end} duration={2.5} />
                  <span style={{ color: TEAL_400 }}>{s.suffix}</span>
                </div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: SLATE_500, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 8, ...FONT_BODY }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
