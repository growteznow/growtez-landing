"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import gsap from "gsap";

import { FONT_DISPLAY, FONT_BODY, TEAL_400, TEAL_500 } from "@/lib/constants";
import { services, portfolio, testimonials } from "@/lib/data";
import InteractiveBackground from "@/components/InteractiveBackground";
import MouseGlow from "@/components/MouseGlow";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 14px", borderRadius: 9999,
      border: "1px solid rgba(20,184,166,0.3)",
      background: "rgba(20,184,166,0.07)",
      color: TEAL_500, fontSize: 10, fontWeight: 700,
      letterSpacing: "0.2em", textTransform: "uppercase",
      marginBottom: 20, ...FONT_BODY,
    }}>{children}</div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    // Animate the text sliding up from behind an overflow-hidden mask
    const elements = heroRef.current.querySelectorAll(".hero-reveal");
    gsap.fromTo(
      elements,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.2, ease: "power4.out", delay: 0.1 }
    );
  }, []);

  return (
    <div className="w-full flex flex-col" style={{
      background: "#ffffff url('/bg2.png') center/cover fixed no-repeat",
    }}>
      {/* ── HERO ── */}
      <section style={{
        position: "relative", minHeight: "100vh", width: "100%",
        background: "transparent",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
      }}>
        <InteractiveBackground />
        <div ref={heroRef} className="flex-none flex flex-col items-center text-center px-4 py-12 md:px-10 md:py-20 relative z-10 w-full max-w-5xl mx-auto">
          {/* H1 Heading */}
          <div className="overflow-hidden pb-1 w-full">
            <h1 className="hero-reveal m-0 leading-[1.15] md:leading-none">
              <span className="block font-bold text-black tracking-tight text-[clamp(2rem,8vw,5rem)]" style={FONT_DISPLAY}>
                We create solutions<br className="hidden md:block" />
                <span className="md:hidden"> </span>for your business
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <div className="mt-4 md:mt-6 flex flex-col items-center px-2 w-full max-w-2xl">
            <div className="overflow-hidden pb-2">
              <p className="hero-reveal m-0 text-black font-normal leading-relaxed text-[clamp(0.95rem,3.5vw,1.1rem)]" style={FONT_BODY}>
                From concept to launch, Growtez crafts web apps, mobile products, and AI systems that actually move the needle.
              </p>
            </div>
          </div>

          <div className="overflow-hidden mt-8 md:mt-10 pt-1 pb-4 w-full px-4 md:px-0">
            <div className="hero-reveal flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 md:py-[13px] md:px-[30px] rounded-full text-white text-[1rem] md:text-[0.9rem] font-bold no-underline transition-colors w-full sm:w-auto" style={{
                background: TEAL_500, ...FONT_BODY,
              }}
                onMouseEnter={e => (e.currentTarget.style.background = TEAL_400)}
                onMouseLeave={e => (e.currentTarget.style.background = TEAL_500)}>
                Start a Project <ArrowRight size={15} />
              </Link>
              <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 md:py-[13px] md:px-[30px] rounded-full bg-transparent border border-black/10 text-slate-700 text-[1rem] md:text-[0.9rem] font-semibold no-underline transition-colors w-full sm:w-auto" style={{
                ...FONT_BODY,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = TEAL_500; e.currentTarget.style.color = TEAL_500; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "#334155"; }}>
                View Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="relative w-full bg-white py-32 px-6 md:px-12 flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">

          <div className="mb-24 max-w-2xl">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-black tracking-tight leading-[1.05]" style={FONT_DISPLAY}>
              Our services
            </h2>
            <p className="mt-6 text-xl md:text-2xl text-slate-500 font-medium leading-relaxed" style={FONT_BODY}>
              We build websites, apps, AI solutions, and digital experiences that drive business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 items-start">

            {/* Left Column (Card 1) */}
            <div className="flex flex-col md:mt-48">
              <div className="w-full overflow-hidden rounded-[2rem] bg-slate-100 aspect-[4/5] relative">
                <img src="/service_brand.png" alt="Brand Identity" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <h3 className="mt-10 text-3xl font-bold text-black tracking-tight" style={FONT_DISPLAY}>Brand Identity</h3>
              <p className="mt-4 text-lg text-slate-500 max-w-md" style={FONT_BODY}>
                Strategic design that positions AI products for trust and clarity.
              </p>
            </div>

            {/* Right Column (Cards 2 and 3) */}
            <div className="flex flex-col gap-32">
              {/* Card 2 */}
              <div className="flex flex-col">
                <div className="w-full overflow-hidden rounded-[2rem] bg-slate-100 aspect-[4/5] relative">
                  <img src="/service_mobile.png" alt="AI-enhanced UX/UI design" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <h3 className="mt-10 text-3xl font-bold text-black tracking-tight" style={FONT_DISPLAY}>AI-enhanced UX/UI design</h3>
                <p className="mt-4 text-lg text-slate-500 max-w-md" style={FONT_BODY}>
                  Interfaces that adapt, predict, and respond intelligently.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col">
                <div className="w-full overflow-hidden rounded-[2rem] bg-slate-100 aspect-square relative">
                  <img src="/service_laptop.png" alt="Custom development" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <h3 className="mt-10 text-3xl font-bold text-black tracking-tight" style={FONT_DISPLAY}>Custom development</h3>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="relative min-h-screen w-full bg-transparent flex items-center py-20 px-6 md:py-[100px] md:px-[60px]">
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
            <div>
              <SectionLabel>Selected Work</SectionLabel>
              <h2 style={{
                margin: 0, color: "#000000",
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, ...FONT_DISPLAY,
              }}>
                Projects that speak<br />
                <span style={{ color: TEAL_500 }}>for themselves.</span>
              </h2>
            </div>
            <Link href="/portfolio" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 26px", borderRadius: 9999,
              border: "1px solid rgba(0,0,0,0.1)",
              color: "#000", fontSize: "0.875rem", fontWeight: 600,
              textDecoration: "none", transition: "background 0.2s, border-color 0.2s", ...FONT_BODY,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = TEAL_500; e.currentTarget.style.borderColor = TEAL_500; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "#000"; }}>
              View Portfolio <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {portfolio.slice(0, 3).map((p, i) => (
              <MouseGlow key={i} className="rounded-[20px]" color="rgba(20,184,166,0.08)">
                <div style={{
                  borderRadius: 20, overflow: "hidden", position: "relative",
                  height: 240,
                  background: i === 0 ? "#f0fdf9" : i === 1 ? "#f0f9ff" : "#fdf4ff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  transition: "box-shadow 0.25s, transform 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px -12px rgba(20,184,166,0.25)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: "3.5rem", opacity: 0.35 }}>
                      {i === 0 ? "📊" : i === 1 ? "📱" : "🎨"}
                    </span>
                  </div>
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "18px 20px",
                    background: "linear-gradient(to top, rgba(255,255,255,0.97) 60%, transparent)",
                  }}>
                    <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL_500, marginBottom: 4, ...FONT_BODY }}>{p.category}</p>
                    <h3 style={{ margin: 0, color: "#000000", fontSize: "1rem", fontWeight: 700, ...FONT_DISPLAY }}>{p.title}</h3>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{p.year}</span>
                  </div>
                </div>
              </MouseGlow>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative min-h-screen w-full bg-transparent flex items-center py-20 px-6 md:py-[100px] md:px-[60px]">
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ marginBottom: 44, textAlign: "center" }}>
            <SectionLabel>Client Stories</SectionLabel>
            <h2 style={{
              margin: 0, color: "#000000",
              fontSize: "clamp(2.2rem, 3.8vw, 3.5rem)",
              fontWeight: 700, letterSpacing: "-0.03em", ...FONT_DISPLAY,
            }}>
              Don&apos;t take our <span style={{ color: TEAL_500 }}>word</span> for it.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <MouseGlow key={i} className="rounded-[20px]" color="rgba(20,184,166,0.06)">
                <div style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: 20, padding: "28px",
                  display: "flex", flexDirection: "column", gap: 14,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.25s, transform 0.2s",
                  height: "100%",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px -8px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ display: "flex", gap: 3 }}>
                    {Array(t.stars).fill(0).map((_, j) => (
                      <Star key={j} size={13} style={{ fill: TEAL_400, color: TEAL_400 }} />
                    ))}
                  </div>
                  <p style={{ flex: 1, fontSize: "0.875rem", lineHeight: 1.8, color: "#475569", margin: 0 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "rgba(20,184,166,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: TEAL_500, fontSize: 14, fontWeight: 700,
                    }}>{t.name[0]}</div>
                    <div>
                      <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "#000000" }}>{t.name}</p>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </MouseGlow>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: "center", position: "relative" }}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 44px", borderRadius: 9999,
              background: TEAL_500, color: "#ffffff",
              fontSize: "0.95rem", fontWeight: 700, textDecoration: "none",
              transition: "background 0.2s", ...FONT_BODY,
              position: "relative", zIndex: 11
            }}
              onMouseEnter={e => (e.currentTarget.style.background = TEAL_400)}
              onMouseLeave={e => (e.currentTarget.style.background = TEAL_500)}>
              Start Your Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}