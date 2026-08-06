"use client";

import Link from "next/link";
import { ArrowRight, Star, Rocket } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

import { FONT_DISPLAY, FONT_BODY, TEAL_400, TEAL_500 } from "@/lib/constants";
import { portfolio, communityTestimonials } from "@/lib/data";
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
    title: "UI/UX Design",
    alt: "UI/UX Design",
    desc: "User-centered design solutions that create engaging and intuitive digital experiences.",
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

let isInitialLoad = false;

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(isInitialLoad ? 0 : 100);
  const [isLoading, setIsLoading] = useState(isInitialLoad);
  const [activeServices, setActiveServices] = useState<number[]>([]);

  const heroRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const strategySectionRef = useRef<HTMLElement>(null);
  const strategyTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.playbackRate = 0.4;
    }
  }, []);

  useEffect(() => {
    if (!isInitialLoad) return;

    let ticks = 0;
    const interval = setInterval(() => {
      ticks++;
      setLoadingProgress((prev) => {
        let next = prev;
        
        // The video is considered ready if it has enough data to play, OR if 5 seconds have passed (fallback)
        const isReady = (bgVideoRef.current && bgVideoRef.current.readyState >= 3) || ticks > 125;
        
        if (isReady) {
          next += 15; // Race to 100 once ready
        } else {
          // Keep incrementing, but stall at 90% if the video isn't ready yet
          if (next < 90) {
            next += Math.floor(Math.random() * 8) + 2;
          }
        }

        if (next >= 100) {
          next = 100;
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            isInitialLoad = false;
          }, 400);
        }
        return next;
      });
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
    const section = strategySectionRef.current;
    const track = strategyTrackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        // Find the last card in the track to accurately calculate its position
        const cards = track.querySelectorAll('.strategy-card');
        const lastCard = cards[cards.length - 1] as HTMLElement;

        const getScrollDistance = () => {
          if (!lastCard) return window.innerHeight * 1.5;
          // The distance we need to move the track so the last card aligns with the left edge
          // We subtract 64px (4rem) to give it a nice breathing room from the left edge
          const maxScroll = lastCard.offsetLeft - 64; 
          return Math.max(maxScroll, window.innerHeight * 1.5);
        };

        gsap.to(track, {
          x: () => {
            if (!lastCard) return 0;
            const maxScroll = lastCard.offsetLeft - 64;
            return -maxScroll;
          },
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      const quotes = document.querySelectorAll(".community-quote");
      quotes.forEach((q) => {
        gsap.fromTo(q,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: q,
              start: "top 85%",
            }
          }
        );
      });
    });
    return () => ctx.revert();
  }, [isLoading]);



  return (
    <>
      {/* Preloader disabled in favor of native video posters
      <AnimatePresence>
        {isLoading && (
          <motion.div ... />
        )}
      </AnimatePresence>
      */}
      <div className="w-full flex flex-col" style={{
        background: "#ffffff url('/bg2.png') center/cover fixed no-repeat",
      }}>
        {/* ── HERO ── */}
        <section className="relative w-full overflow-hidden bg-black flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-24">
          <video
            ref={bgVideoRef}
            poster="/abstract-lines.png"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            {/* The browser will try to load the tiny WebM first */}
            <source src="/bg-video.webm" type="video/webm" />
            
            {/* If it's an older iPhone, it will fall back to the MP4 */}
            <source src="/bg-video.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>

          <InteractiveBackground />
          <div ref={heroRef} className="flex-none flex flex-col items-center text-center px-6 md:px-10 relative z-10 w-full max-w-[1200px] mx-auto">
            {/* H1 Heading */}
            <div className="overflow-hidden pb-1 w-full">
              <h1 className="hero-reveal m-0 leading-[1.1] md:leading-[1.05]">
                <span className="block font-bold text-white tracking-tighter text-[clamp(2rem,6vw,4.5rem)]" style={FONT_DISPLAY}>
                  We create <span style={{ color: TEAL_500 }}>solutions</span><br className="hidden md:block" />
                  <span className="md:hidden"> </span>for your business
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <div className="mt-4 md:mt-6 flex flex-col items-center px-2 w-full max-w-3xl">
              <div className="overflow-hidden pb-2">
                <p className="hero-reveal m-0 text-gray-200 font-medium leading-relaxed text-[clamp(0.95rem,1.5vw,1.15rem)]" style={FONT_BODY}>
                  From concept to launch, Growtez crafts web apps, mobile products, and AI systems that actually move the needle.
                </p>
              </div>
            </div>

            {/* Video Container */}
            <div className="hero-reveal w-full max-w-5xl mx-auto mt-8 md:mt-12 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative bg-black shadow-2xl border border-black/5 aspect-[9/16] md:aspect-video">
              <video
                poster="/1.jpg"
                src="/promo-portrait.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block md:hidden"
              />
              <video
                poster="/1.jpg"
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
        <section className="relative w-full overflow-visible bg-white pt-12 md:pt-16 pb-16 md:pb-24">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12">
            <div className="w-full flex justify-between items-end pb-4">
              <span className="text-xl md:text-2xl text-black font-medium tracking-tight" style={FONT_BODY}>Our Services</span>
            </div>
            
            <div className="w-full border-t border-black">
              {serviceCards.map((service: any, i) => {
                const isActive = activeServices.includes(i);
                return (
                <div
                  key={`${service.title}-${i}`}
                  className="w-full border-b border-black cursor-pointer transition-colors duration-300 hover:bg-slate-50/50"
                  onMouseEnter={() => {
                    if (!activeServices.includes(i)) {
                      setActiveServices(prev => [...prev, i]);
                    }
                  }}
                >
                  <div className="relative w-full px-4 md:px-8 min-h-[5rem] md:min-h-[10rem] flex items-center justify-center md:justify-start">
                    
                    {/* Mobile title */}
                    <h3 className="block md:hidden text-[2rem] sm:text-[2.5rem] text-black text-center w-full" style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", fontWeight: 300, letterSpacing: "-0.03em" }}>
                      {service.title}
                    </h3>

                    {/* Desktop title */}
                    <h3 
                      className={`hidden md:block text-[3rem] lg:text-[4rem] text-black absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] leading-none whitespace-nowrap z-10 ${isActive ? 'left-8 -translate-x-0' : 'left-1/2 -translate-x-1/2'}`} 
                      style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", fontWeight: 300, letterSpacing: "-0.03em" }}
                    >
                      {service.title}
                    </h3>
                    
                    {/* Hover content (Right side) */}
                    <div className={`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-6 md:gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 ${isActive ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
                      <div className="text-right max-w-xs xl:max-w-sm flex flex-col items-end gap-3">
                        <p className="text-sm lg:text-base text-slate-600 leading-relaxed" style={FONT_DISPLAY}>
                          {service.desc}
                        </p>
                        {service.features && (
                          <ul className="flex flex-col items-end gap-1 mt-1">
                            {service.features.map((feature: string, idx: number) => (
                              <li key={idx} className="text-xs lg:text-sm text-slate-500 flex items-center gap-2" style={FONT_BODY}>
                                {feature} <span className="w-1 h-1 rounded-full bg-teal-500"></span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className={`w-40 lg:w-48 shrink-0 rounded-2xl overflow-hidden shadow-xl bg-slate-100 border border-black/5 transform transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}>
                        <img src={service.image} alt={service.alt} className="w-full h-auto object-cover aspect-[4/3]" />
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </section>

        {/* ── STRATEGY ── */}
        <div className="w-full block">
          <section ref={strategySectionRef} className="relative w-full bg-black text-white pt-24 pb-32 md:pt-0 md:pb-0 md:h-screen z-10 overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row h-full items-center md:items-start pt-12 md:pt-20 lg:pt-24 relative">
            
            {/* Left Column (Sticky context on mobile, fixed in place on desktop since section is pinned) */}
            <div className="w-full lg:w-5/12 shrink-0 relative z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]" style={FONT_BODY}>
                OUR STRATEGY
              </div>
              <h2 
                className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.05] font-normal tracking-tight mt-6"
                style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
              >
                3 steps we take <br className="hidden lg:block"/> for our projects.
              </h2>
              <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-md leading-relaxed" style={FONT_BODY}>
                Our proven methodology ensures consistent quality and exceptional results for every client we serve.
              </p>
            </div>

            {/* Right Column (Horizontal Scroll Window for Desktop) */}
            <div className="hidden lg:block w-7/12 h-full absolute right-0 top-0 z-10 overflow-hidden mask-edge-left">
              <div ref={strategyTrackRef} className="flex h-full items-center pl-16 pr-16 md:pr-24 w-max gap-20">
                {[
                  {
                    num: "01",
                    title: "Discover & Plan",
                    desc: "We understand your vision, analyze requirements, and craft a clear roadmap.",
                  },
                  {
                    num: "02",
                    title: "Design & Build",
                    desc: "We create intuitive designs and develop robust, scalable solutions tailored to your needs.",
                  },
                  {
                    num: "03",
                    title: "Launch & Grow",
                    desc: "We deploy, optimize, and provide continuous support to ensure long-term success.",
                  },
                ].map((step, i) => (
                  <div key={i} className="strategy-card group flex flex-col items-start w-[450px] shrink-0 border-t border-white/20 pt-8 transition-colors duration-500 hover:border-teal-500">
                    <span 
                      className="text-[5rem] md:text-[7rem] lg:text-[9rem] leading-none font-light text-white/10 transition-colors duration-500 group-hover:text-teal-500" 
                      style={FONT_DISPLAY}
                    >
                      {step.num}
                    </span>
                    <h3 
                      className="text-[2.2rem] md:text-[3rem] text-white mt-6 font-normal tracking-tight"
                      style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-lg md:text-xl mt-4 max-w-lg leading-relaxed" style={FONT_BODY}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Fallback (Vertical List) */}
            <div className="w-full lg:hidden flex flex-col gap-16 mt-12 pb-12 relative z-10">
              {[
                  {
                    num: "01",
                    title: "Discover & Plan",
                    desc: "We understand your vision, analyze requirements, and craft a clear roadmap.",
                  },
                  {
                    num: "02",
                    title: "Design & Build",
                    desc: "We create intuitive designs and develop robust, scalable solutions tailored to your needs.",
                  },
                  {
                    num: "03",
                    title: "Launch & Grow",
                    desc: "We deploy, optimize, and provide continuous support to ensure long-term success.",
                  },
                ].map((step, i) => (
                  <div key={i} className="group flex flex-col items-start w-full border-t border-white/20 pt-8 transition-colors duration-500 hover:border-teal-500">
                    <span 
                      className="text-[5rem] md:text-[7rem] lg:text-[9rem] leading-none font-light text-white/10 transition-colors duration-500 group-hover:text-teal-500" 
                      style={FONT_DISPLAY}
                    >
                      {step.num}
                    </span>
                    <h3 
                      className="text-[2.2rem] md:text-[3rem] text-white mt-6 font-normal tracking-tight"
                      style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-lg md:text-xl mt-4 max-w-lg leading-relaxed" style={FONT_BODY}>
                      {step.desc}
                    </p>
                  </div>
                ))}
            </div>

          </div>
        </section>
        </div>

        {/* ── OUR COMMUNITY ── */}
        <section className="relative w-full bg-white text-black py-24 md:py-40 overflow-hidden z-10 shadow-2xl rounded-b-[3rem] md:rounded-b-[4rem]">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-20 md:mb-32">
              <div className="w-full md:w-5/12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]" style={FONT_BODY}>
                  OUR COMMUNITY
                </div>
                <h2 
                  className="text-[3rem] md:text-[4rem] lg:text-[5rem] leading-[1.05] font-normal tracking-tight mt-6"
                  style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
                >
                  See what customers are saying about us.
                </h2>
              </div>
              <div className="w-full md:w-5/12 md:ml-auto flex items-end pb-4">
                <p className="text-xl text-gray-500 leading-relaxed" style={FONT_BODY}>
                  Join thousands of satisfied clients who have transformed their businesses with our solutions.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-24 md:gap-32">
              {communityTestimonials.map((t, i) => (
                <div key={i} className="community-quote flex flex-col gap-8 md:gap-12 w-full max-w-6xl ml-auto border-t border-black/10 pt-12 md:pt-16">
                  <h3 
                    className="text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] leading-[1.2] font-light text-black tracking-tight"
                    style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </h3>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white font-bold text-xl" style={FONT_BODY}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-black m-0" style={FONT_BODY}>{t.name}</p>
                      <p className="text-gray-500 m-0" style={FONT_BODY}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
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

        {/* ── CTA FOOTER ── */}
        <section className="relative w-full bg-transparent flex items-center py-20 px-6 md:py-32 md:px-12">
          <div className="max-w-[1400px] mx-auto w-full">
            <div className="border-t border-black/10 pt-16 md:pt-24 flex justify-between items-center flex-wrap gap-8">
              <h2 className="text-[2.5rem] md:text-[4rem] tracking-tight leading-none text-black" style={FONT_DISPLAY}>
                Ready to transform <br/> <span className="text-teal-500">your business?</span>
              </h2>
              <Link href="/contact" className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 bg-black text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl" style={FONT_BODY}>
                <span className="relative z-10 text-lg font-medium">Start Your Project</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-teal-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
