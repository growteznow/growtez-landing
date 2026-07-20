"use client";

import { FONT_DISPLAY, SECTION_BG, PAGE_BG, SLATE_500 } from "@/lib/constants";
import { services, process } from "@/lib/data";
import { Pill, ServiceCard } from "@/components/UI";
import RevealText from "@/components/RevealText";

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: 120 }}>
      {/* ── HEADER ── */}
      <section style={{ padding: "6rem 40px", background: PAGE_BG, textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Pill>Our Expertise</Pill>
          <h1 style={{ marginTop: 24 }}>
            <RevealText as="block" className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Services built</RevealText>
            <RevealText as="block" delay={0.1} className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>for growth.</RevealText>
          </h1>
          <RevealText as="block" delay={0.2}>
            <p style={{ marginTop: 24, fontSize: "1.1rem", color: SLATE_500, lineHeight: 1.8 }}>
              We provide end-to-end digital solutions that help ambitious companies scale, from native mobile applications to comprehensive brand identities.
            </p>
          </RevealText>
        </div>
      </section>

      {/* ── BENTO GRID ── */}
      <section style={{ padding: "4rem 40px 8rem", background: PAGE_BG }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: "8rem 40px", background: SECTION_BG }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <Pill>How We Work</Pill>
            <RevealText as="block" className="text-5xl md:text-6xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Our process is</RevealText>
            <RevealText as="block" delay={0.1} className="text-5xl md:text-6xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>built for results.</RevealText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 40 }}>
            {process.map((s, i) => (
              <div key={i} style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 24 }}>
                <RevealText as="block" delay={i * 0.1}><span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#14b8a6", ...FONT_DISPLAY }}>{s.num}</span></RevealText>
                <RevealText as="block" delay={0.05}><h3 style={{ marginTop: 8, fontSize: "1.2rem", fontWeight: 700, color: "#000000", ...FONT_DISPLAY }}>{s.title}</h3></RevealText>
                <RevealText as="block" delay={0.1}><p style={{ marginTop: 12, fontSize: "0.95rem", lineHeight: 1.6, color: SLATE_500 }}>{s.desc}</p></RevealText>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
