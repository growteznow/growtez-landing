"use client";

import Link from "next/link";
import { ArrowRight, Star, Rocket } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

import { FONT_DISPLAY, FONT_BODY, TEAL_400, TEAL_500 } from "@/lib/constants";
import { portfolio, testimonials } from "@/lib/data";
import InteractiveBackground from "@/components/InteractiveBackground";
import MouseGlow from "@/components/MouseGlow";

gsap.registerPlugin(ScrollTrigger);

const serviceCards = [
  {
    image: "/service_mobile.png",
    title: "App development",
    alt: "App development",
    desc: "Mobile products built for performance, scalability, and delightful everyday use.",
  },
  {
    image: "/service_laptop.png",
    title: "Web development",
    alt: "Web development",
    desc: "Websites, web apps, and systems engineered for reliable growth.",
  },
  {
    image: "/service_laptop.png",
    title: "AI integration",
    alt: "AI integration",
    desc: "Custom AI workflows and automation that make operations faster and smarter.",
  },
  {
    image: "/service_mobile.png",
    title: "AI-enhanced UX/UI design",
    alt: "AI-enhanced UX/UI design",
    desc: "Interfaces that adapt, predict, and respond intelligently.",
  },
  {
    image: "/service_brand.png",
    title: "Digital marketing",
    alt: "Digital marketing",
    desc: "Focused roadmaps and strategies that connect product decisions to measurable business outcomes.",
  },
];

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

let isInitialLoad = true;

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(isInitialLoad ? 0 : 100);
  const [isLoading, setIsLoading] = useState(isInitialLoad);

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesPanelRef = useRef<HTMLDivElement>(null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInitialLoad) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          isInitialLoad = false;
        }, 400);
      }
      setLoadingProgress(progress);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || !heroRef.current) return;
    // Animate the text sliding up from behind an overflow-hidden mask
    const elements = heroRef.current.querySelectorAll(".hero-reveal");
    gsap.fromTo(
      elements,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.2, ease: "power4.out", delay: 0.1 }
    );
  }, [isLoading]);

  useEffect(() => {
    const panel = servicesPanelRef.current;
    const track = servicesTrackRef.current;
    if (!panel || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const getScrollDistance = () => {
          const overflow = track.scrollWidth - window.innerWidth;
          return Math.max(overflow, window.innerHeight * 1.25);
        };

        gsap.to(track, {
          x: () => {
            const overflow = track.scrollWidth - window.innerWidth;
            return overflow > 0 ? -overflow : 0;
          },
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            pin: true,
            start: "center center",
            end: () => `+=${getScrollDistance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    }, panel);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          >
            <div className="text-[clamp(4rem,10vw,8rem)] font-bold text-black tracking-tighter flex items-baseline gap-1" style={FONT_DISPLAY}>
              {loadingProgress}<span style={{ color: TEAL_500, fontSize: "0.75em" }}>%</span>
            </div>
            
            <div className="relative w-64 md:w-96 h-1 bg-gray-100 rounded-full mt-4">
              <div 
                className="absolute top-0 left-0 h-full bg-teal-500 rounded-full transition-all duration-75"
                style={{ width: `${loadingProgress}%` }}
              ></div>
              <div 
                className="absolute top-1/2 transition-all duration-75"
                style={{ 
                  left: `${loadingProgress}%`, 
                  transform: `translate(-50%, -50%) rotate(45deg)` 
                }}
              >
                <Rocket size={32} style={{ color: TEAL_500, fill: "rgba(20,184,166,0.1)" }} />
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full flex flex-col" style={{
        background: "#ffffff url('/bg2.png') center/cover fixed no-repeat",
      }}>
        {/* ── HERO ── */}
        <section className="relative w-full bg-transparent flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-24">
          <InteractiveBackground />
          <div ref={heroRef} className="flex-none flex flex-col items-center text-center px-6 md:px-10 relative z-10 w-full max-w-[1200px] mx-auto">
            {/* H1 Heading */}
            <div className="overflow-hidden pb-1 w-full">
              <h1 className="hero-reveal m-0 leading-[1.1] md:leading-[1.05]">
                <span className="block font-bold text-black tracking-tighter text-[clamp(2rem,6vw,4.5rem)]" style={FONT_DISPLAY}>
                  We create <span style={{ color: TEAL_500 }}>solutions</span><br className="hidden md:block" />
                  <span className="md:hidden"> </span>for your business
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <div className="mt-4 md:mt-6 flex flex-col items-center px-2 w-full max-w-3xl">
              <div className="overflow-hidden pb-2">
                <p className="hero-reveal m-0 text-gray-700 font-medium leading-relaxed text-[clamp(0.95rem,1.5vw,1.15rem)]" style={FONT_BODY}>
                  From concept to launch, Growtez crafts web apps, mobile products, and AI systems that actually move the needle.
                </p>
              </div>
            </div>

            {/* Video Container */}
            <div className="hero-reveal w-full max-w-5xl mx-auto mt-8 md:mt-12 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative bg-slate-100 shadow-2xl border border-black/5">
              <video
                src="/promo-portrait.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block md:hidden"
              />
              <video
                src="/promo-desktop.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto hidden md:block"
              />
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section ref={servicesSectionRef} className="relative w-full overflow-visible bg-white">
          <div className="max-w-7xl mx-auto w-full px-6 pt-24 pb-14 md:px-12 md:pt-32 md:pb-20">
            <div className="max-w-2xl">
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold text-black tracking-tight leading-[1.05]" style={FONT_DISPLAY}>
                Our <span style={{ color: TEAL_500 }}>services</span>
              </h2>
              <p className="mt-3 text-base md:text-lg text-slate-500 font-medium leading-relaxed" style={FONT_BODY}>
                We build websites, apps, AI solutions, and digital experiences that drive business growth.
              </p>
            </div>
          </div>

          <div ref={servicesPanelRef} className="relative z-30 w-full bg-white pb-16 md:pb-20 overflow-hidden">
            <div className="w-full pb-8">
              <div ref={servicesTrackRef} className="flex flex-col md:flex-row md:w-max gap-12 md:gap-10 px-6 md:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] md:pr-12">
                {serviceCards.map((service, i) => (
                  <motion.article
                    key={`${service.title}-${i}`}
                    className="service-card w-full max-w-[480px] mx-auto md:mx-0 shrink-0 md:w-[clamp(280px,28vw,380px)]"
                    initial={{ opacity: 0, y: 34 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  >
                    <div className="overflow-hidden rounded-[2rem] bg-slate-100 relative">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="w-full h-auto hover:scale-105 transition-transform duration-700 ease-out block"
                      />
                    </div>
                    <h3 className="mt-6 text-2xl md:text-[1.65rem] font-bold text-black tracking-tight leading-tight" style={FONT_DISPLAY}>
                      {service.title}
                    </h3>
                    <p className="mt-2 text-base md:text-[1.05rem] text-slate-500 max-w-md leading-relaxed" style={FONT_BODY}>
                      {service.desc}
                    </p>
                  </motion.article>
                ))}
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
    </>
  );
}
