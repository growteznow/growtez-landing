"use client";

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FONT_DISPLAY, SECTION_BG, PAGE_BG, SLATE_500 } from "@/lib/constants";
import { services, process } from "@/lib/data";
import { Pill } from "@/components/UI";
import RevealText from "@/components/RevealText";

function AnimatedServiceCard({ service, index }: { service: any, index: number }) {
  const ref = useRef(null);
  
  // Track the scroll progress of this specific card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "start 25%"]
  });

  // Interpolate colors tick-by-tick as the user scrolls
  const backgroundColor = useTransform(scrollYProgress, [0, 1], ["#f1f5f9", "#0f766e"]); // Slate-100 to Dark Teal
  const color = useTransform(scrollYProgress, [0, 0.5, 1], ["#0f172a", "#0f172a", "#ffffff"]);
  const secondaryColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#64748b", "#64748b", "rgba(255, 255, 255, 0.75)"]);
  
  // Interpolate the grid height so it unrolls smoothly with the scroll
  const gridRows = useTransform(scrollYProgress, [0, 1], ["0fr", "1fr"]);
  const innerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const isInView = useInView(ref, { margin: "0px 0px -25% 0px", amount: "some" });

  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div ref={ref} className="mb-6 md:mb-8">
      <motion.div 
        className={`relative rounded-3xl p-6 md:p-10 overflow-hidden transition-shadow duration-300 ${isInView ? 'shadow-xl' : 'shadow-none'}`}
        style={{ backgroundColor, color }}
      >
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-4 md:gap-6">
            <span className="opacity-80 hidden md:flex items-center justify-center bg-white/20 p-2.5 rounded-2xl">{service.icon}</span>
            <motion.h2 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight m-0" style={{ ...FONT_DISPLAY, color }}>
              {service.title}
            </motion.h2>
          </div>
          <motion.span className="text-xl md:text-3xl font-medium" style={{ ...FONT_DISPLAY, color: secondaryColor }}>
            {formattedIndex}
          </motion.span>
        </div>

        <motion.div 
          className="relative z-10 grid" 
          style={{ gridTemplateRows: gridRows }}
        >
          <motion.div 
            className="min-h-0 overflow-hidden"
            style={{ opacity: innerOpacity }}
          >
            <div className="pt-5 md:pt-8">
              <motion.p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color }}>{service.desc}</motion.p>
              {service.tag && (
                <motion.div className="mt-6">
                  <motion.span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-full border border-current" style={{ color: secondaryColor }}>
                    {service.tag}
                  </motion.span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: 100, background: PAGE_BG }}>
      {/* ── HEADER ── */}
      <section style={{ padding: "2rem 40px 3rem", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          <h1 style={{ marginTop: 24 }}>
            <RevealText as="block" className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Services built</RevealText>
            <RevealText as="block" delay={0.1} className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>for growth.</RevealText>
          </h1>
          <RevealText as="block" delay={0.2}>
            <p style={{ marginTop: 32, fontSize: "1.2rem", color: SLATE_500, lineHeight: 1.8 }}>
              We provide end-to-end digital solutions that help ambitious companies scale, from native mobile applications to comprehensive brand identities.
            </p>
          </RevealText>
        </div>
      </section>

      {/* ── ANIMATED LIST ── */}
      <section style={{ padding: "4rem 20px 8rem" }}>
        <div style={{ maxWidth: 850, margin: "0 auto" }}>
          {services.map((s, i) => (
            <AnimatedServiceCard key={i} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="rounded-t-[3rem] md:rounded-t-[5rem]" style={{ padding: "8rem 40px", background: SECTION_BG }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>

            <RevealText as="block" className="text-5xl md:text-[70px] font-medium leading-[0.95] tracking-tighter mt-6" style={{ ...FONT_DISPLAY, color: "#000000" }}>Our process is</RevealText>
            <RevealText as="block" delay={0.1} className="text-5xl md:text-[70px] font-medium leading-[0.95] tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>built for results.</RevealText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 40 }}>
            {process.map((s, i) => (
              <div key={i} style={{ borderTop: "2px solid rgba(0,0,0,0.05)", paddingTop: 32 }}>
                <RevealText as="block" delay={i * 0.1}><span style={{ fontSize: "1.25rem", fontWeight: 700, color: "#14b8a6", ...FONT_DISPLAY }}>{s.num}</span></RevealText>
                <RevealText as="block" delay={0.05}><h3 style={{ marginTop: 12, fontSize: "1.5rem", fontWeight: 700, color: "#000000", ...FONT_DISPLAY }}>{s.title}</h3></RevealText>
                <RevealText as="block" delay={0.1}><p style={{ marginTop: 16, fontSize: "1rem", lineHeight: 1.6, color: SLATE_500 }}>{s.desc}</p></RevealText>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
