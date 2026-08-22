"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ArrowRight, CircleCheck } from "lucide-react";
import ParallaxImage from "@/components/ParallaxImage";
import MagneticButton from "@/components/MagneticButton";
import {
  FONT_DISPLAY, FONT_BODY, CARD_BG, TEAL_400, TEAL_500, SLATE_400, SLATE_500
} from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "6px 16px", borderRadius: 9999,
      border: "1px solid rgba(20,184,166,0.25)",
      background: "rgba(20,184,166,0.06)",
      color: TEAL_500, fontSize: 11, fontWeight: 600,
      letterSpacing: "0.2em", textTransform: "uppercase",
      ...FONT_BODY,
    }}>
      {children}
    </div>
  );
}

export function ServiceCard({ icon, title, desc, tag, large }: { icon: React.ReactNode; title: string; desc: string; tag: string; large: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const rx =  ((e.clientY - top)  / height - 0.5) * -12;
      const ry =  ((e.clientX - left) / width  - 0.5) * 12;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
      card.style.borderColor = "rgba(20,184,166,0.4)";
      card.style.boxShadow = "0 24px 48px -20px rgba(20,184,166,0.25)";
    };
    const onLeave = () => {
      card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
      card.style.borderColor = "rgba(0,0,0,0.08)";
      card.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        gridColumn: large ? "span 2" : "span 1",
        background: CARD_BG,
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 24,
        padding: "2rem",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        transition: "transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        willChange: "transform",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(20,184,166,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_400 }}>
          {icon}
        </div>
        <span style={{ fontSize: 11, color: SLATE_500, border: "1px solid rgba(71,85,105,0.2)", borderRadius: 9999, padding: "4px 12px", ...FONT_BODY }}>
          {tag}
        </span>
      </div>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#000000", marginBottom: 12, ...FONT_DISPLAY }}>{title}</h3>
      <p  style={{ fontSize: "0.875rem", lineHeight: 1.7, color: SLATE_400 }}>{desc}</p>
    </div>
  );
}

export function TestimonialCard({ quote, name, role, stars, index }: { quote: string; name: string; role: string; stars: number; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.set(cardRef.current, { opacity: 0, y: 40 });
    const anim = gsap.to(cardRef.current, {
      opacity: 1, y: 0, duration: 0.9, delay: index * 0.15, ease: "power4.out",
      scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none none" },
    });
    return () => { anim.kill(); };
  }, [index]);
  return (
    <div ref={cardRef} style={{ background: CARD_BG, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 24, padding: "2rem", boxShadow: "0 1px 2px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {Array(stars).fill(0).map((_, i) => <Star key={i} size={14} style={{ fill: TEAL_400, color: TEAL_400 }} />)}
      </div>
      <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "#334155", flex: 1 }}>&ldquo;{quote}&rdquo;</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(20,184,166,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_400, fontSize: 14, fontWeight: 700 }}>
          {name[0]}
        </div>
        <div>
          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#000000" }}>{name}</p>
          <p style={{ fontSize: "0.75rem", color: SLATE_500 }}>{role}</p>
        </div>
      </div>
    </div>
  );
}

export function PortfolioCard({ src, title, category, year, url, index }: { src: string; title: string; category: string; year: string; url?: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!cardRef.current) return;
    const fromLeft = index % 2 === 0;
    gsap.set(cardRef.current, { opacity: 0, x: fromLeft ? -60 : 60 });
    const anim = gsap.to(cardRef.current, {
      opacity: 1, x: 0, duration: 1.0, ease: "power4.out",
      scrollTrigger: { trigger: cardRef.current, start: "top 82%", toggleActions: "play none none none" },
    });
    return () => { anim.kill(); };
  }, [index]);

  const inner = (
    <>
      <div style={{ borderRadius: 16, overflow: "hidden", position: "relative" }}>
        <ParallaxImage src={src} alt={title} className="h-[320px] w-full" intensity={18} />
      </div>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL_500, marginBottom: 4, ...FONT_BODY }}>{category}</p>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#000000", ...FONT_DISPLAY }}>{title}</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "0.875rem", color: SLATE_500 }}>{year}</span>
          {url && (
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: TEAL_500, ...FONT_BODY }}>
              ↗ Visit
            </span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div ref={cardRef}>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
          {inner}
        </a>
      ) : inner}
    </div>
  );
}

export function PricingCard({ name, price, period, desc, features, highlighted }: { name: string; price: string; period: string; desc: string; features: string[]; highlighted: boolean }) {
  return (
    <div style={{
      background: highlighted ? "#000000" : CARD_BG,
      border: highlighted ? "1px solid #000000" : "1px solid rgba(0,0,0,0.08)",
      borderRadius: 24, padding: "2.5rem 2rem",
      display: "flex", flexDirection: "column",
      boxShadow: highlighted ? "0 24px 48px -20px rgba(0,0,0,0.35)" : "0 1px 2px rgba(0,0,0,0.04)",
      transform: highlighted ? "translateY(-8px)" : "none",
      position: "relative",
    }}>
      {highlighted && (
        <span style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: TEAL_500, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 9999, ...FONT_BODY }}>
          Most Popular
        </span>
      )}
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: highlighted ? "#fff" : "#000000", ...FONT_DISPLAY }}>{name}</h3>
      <p style={{ marginTop: 8, fontSize: "0.875rem", lineHeight: 1.6, color: highlighted ? "#94a3b8" : SLATE_400, minHeight: 40 }}>{desc}</p>
      <div style={{ marginTop: 20, display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: "2.25rem", fontWeight: 800, color: highlighted ? "#fff" : "#000000", ...FONT_DISPLAY }}>{price}</span>
        {period && <span style={{ fontSize: "0.875rem", color: highlighted ? "#94a3b8" : SLATE_400 }}>{period}</span>}
      </div>
      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {features.map(f => (
          <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.875rem", color: highlighted ? "#cbd5e1" : "#334155" }}>
            <CircleCheck size={16} style={{ flexShrink: 0, marginTop: 2, color: TEAL_400 }} />
            {f}
          </div>
        ))}
      </div>
      <MagneticButton>
        <a href="/contact" style={{
          marginTop: 32, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "14px", borderRadius: 9999, textDecoration: "none", fontSize: "0.9rem", fontWeight: 700,
          background: highlighted ? TEAL_500 : "rgba(0,0,0,0.04)",
          color: highlighted ? "#ffffff" : "#000000",
          border: highlighted ? "none" : "1px solid rgba(0,0,0,0.1)",
          transition: "background 0.2s",
          ...FONT_BODY,
        }}
          onMouseEnter={e => (e.currentTarget.style.background = highlighted ? TEAL_400 : "rgba(0,0,0,0.08)")}
          onMouseLeave={e => (e.currentTarget.style.background = highlighted ? TEAL_500 : "rgba(0,0,0,0.04)")}>
          Get Started <ArrowRight size={14} />
        </a>
      </MagneticButton>
    </div>
  );
}
