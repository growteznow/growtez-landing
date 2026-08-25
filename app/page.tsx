"use client";

import Link from "next/link";
import { ArrowRight, Star, Rocket } from "lucide-react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

import { FONT_DISPLAY, FONT_BODY, TEAL_400, TEAL_500 } from "@/lib/constants";
import { portfolio, communityTestimonials } from "@/lib/data";
import InteractiveBackground from "@/components/InteractiveBackground";
import MouseGlow from "@/components/MouseGlow";
import ParallaxImage from "@/components/ParallaxImage";
import { PortfolioCard } from "@/components/UI";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

const serviceCards = [
  {
    image: "/service_mobile.png",
    title: "App development",
    alt: "App development",
    desc: "Mobile products built for performance, scalability, and delightful everyday use.",
  },
  {
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800&q=80",
    title: "Web development",
    alt: "Web development",
    desc: "Websites, web apps, and systems engineered for reliable growth.",
  },
  {
    image: "https://images.unsplash.com/photo-1677691820099-a6e8040aa077?w=800&q=80",
    title: "AI integration",
    alt: "AI integration",
    desc: "Custom AI workflows and automation that make operations faster and smarter.",
  },
  {
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
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



let isInitialLoad = false;

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(isInitialLoad ? 0 : 100);
  const [isLoading, setIsLoading] = useState(isInitialLoad);
  const servicesSectionRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const strategySectionRef = useRef<HTMLElement>(null);
  const strategyLeftRef = useRef<HTMLDivElement>(null);

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

  // Mobile card observation is no longer needed since we are using CSS grid cards.

  useEffect(() => {
    const section = strategySectionRef.current;
    const leftCol = strategyLeftRef.current;
    if (!section || !leftCol) return;

    const stepColors = ["#1e1b4b", "#3b1c32", "#0f3d3e"];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)"
      }, (context) => {
        const { isDesktop, isMobile } = context.conditions as any;
        const steps = section.querySelectorAll(".strategy-step");

        steps.forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            start: isDesktop ? "top 10%" : "top 50%",
            end: isDesktop ? "bottom 10%" : "bottom 50%",
            onEnter: () => gsap.to(section, { backgroundColor: stepColors[i], duration: 0.8, overwrite: "auto" }),
            onEnterBack: () => gsap.to(section, { backgroundColor: stepColors[i], duration: 0.8, overwrite: "auto" }),
            onLeaveBack: () => {
              if (i === 0) gsap.to(section, { backgroundColor: "#000000", duration: 0.8, overwrite: "auto" });
            }
          });
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll(".community-quote, .portfolio-item");
      elements.forEach((el) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });

      // Staggered grid animation for service cards
      const serviceCardsEl = document.querySelectorAll(".service-card");
      if (serviceCardsEl.length > 0) {
        gsap.fromTo(serviceCardsEl,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: serviceCardsEl[0].parentElement,
              start: "top 85%",
            }
          }
        );
      }
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
        <section className="relative w-full bg-black pt-12 md:pt-16 pb-16 md:pb-24">
          <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12">
            <div className="w-full pb-8 md:pb-12 border-b border-white/10">
              <h2
                className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.05] font-normal tracking-tight text-white"
                style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
              >
                Our Services
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-12">
              {serviceCards.map((service: any, i) => (
                <div key={i} className="service-card">
                  <TiltCard className="group flex flex-col h-full bg-[#0F8A8A] border border-[#0B6666] rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#0F8A8A]/30">
                    <ParallaxImage
                      src={service.image}
                      alt={service.alt}
                      className="w-full aspect-[4/3] bg-[#0A5C5C]"
                      imageClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                      intensity={20}
                    />
                    <div className="p-8 md:p-10 flex flex-col flex-grow">
                      <h3 className="text-2xl md:text-3xl text-white mb-4" style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", fontWeight: 300, letterSpacing: "-0.02em" }}>
                        {service.title}
                      </h3>
                      <p className="text-teal-50 text-sm md:text-base leading-relaxed" style={FONT_BODY}>
                        {service.desc}
                      </p>
                      {service.features && (
                        <ul className="flex flex-col gap-2 mt-6">
                          {service.features.map((feature: string, idx: number) => (
                            <li key={idx} className="text-sm text-teal-100 flex items-center gap-2" style={FONT_BODY}>
                              <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span> {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STRATEGY ── */}
        <div className="w-full block">
          <section ref={strategySectionRef} className="relative w-full bg-black text-white py-24 lg:py-40 z-10 shadow-2xl flex flex-col">
            <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12 flex flex-col lg:flex-row relative items-start gap-16 lg:gap-24">

              {/* Left Column (Sticky on desktop) */}
              <div ref={strategyLeftRef} className="w-full lg:w-5/12 shrink-0 relative z-20 lg:sticky lg:top-40 h-fit">
                <h2
                  className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.05] font-normal tracking-tight mt-6"
                  style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
                >
                  Our Strategy
                </h2>
                <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-md leading-relaxed" style={FONT_BODY}>
                  Our proven methodology ensures consistent quality and exceptional results for every client we serve.
                </p>
              </div>

              {/* Right Column (Vertical List) */}
              <div className="w-full lg:w-7/12 flex flex-col pt-8 lg:pt-0 relative z-10">
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
                  <div key={i} className="strategy-step group flex flex-col justify-start lg:justify-center items-start w-full py-12 lg:py-0 lg:min-h-[60vh] border-t border-white/20 transition-colors duration-500 hover:border-teal-500">
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
        <section className="relative w-full bg-black text-white py-16 md:py-24 overflow-hidden z-10">
          <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-12 md:mb-20">
              <div className="w-full md:w-5/12">
                <h2
                  className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.05] font-normal tracking-tight mt-4"
                  style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
                >
                  Our Community
                </h2>
              </div>
              <div className="w-full md:w-5/12 md:ml-auto flex items-end pb-2">
                <p className="text-lg text-gray-400 leading-relaxed" style={FONT_BODY}>
                  Join thousands of satisfied clients who have transformed their businesses with our solutions.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-14 md:gap-20">
              {communityTestimonials.map((t, i) => (
                <div key={i} className="community-quote flex flex-col gap-6 md:gap-8 w-full max-w-6xl ml-auto border-t border-white/10 pt-8 md:pt-10">
                  <h3
                    className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] leading-[1.3] font-light text-white tracking-tight"
                    style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </h3>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10 flex items-center justify-center text-white font-bold text-xl shrink-0 border border-white/10" style={FONT_BODY}>
                      {t.logo ? (
                        <img src={t.logo} alt={t.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = t.name[0]; }} />
                      ) : (
                        t.name[0]
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white m-0" style={FONT_BODY}>{t.name}</p>
                      <p className="text-gray-400 m-0" style={FONT_BODY}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="relative min-h-screen w-full bg-black text-white flex items-center py-20 px-6 md:py-[100px] md:px-[60px]">
          <div style={{ maxWidth: 1050, margin: "0 auto", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
              <div>
                <h2
                  className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.05] font-normal tracking-tight text-white"
                  style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
                >
                  Selected Work
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-12 gap-y-20 mt-12 md:mt-24">
              {portfolio.slice(0, 4).map((p, i) => (
                <PortfolioCard key={i} {...p} index={i} dark />
              ))}
            </div>

            <div className="mt-20 md:mt-32 flex justify-center w-full">
              <MagneticButton>
                <Link href="/portfolio" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 32px", borderRadius: 9999,
                  border: `1px solid ${TEAL_500}`, background: TEAL_500,
                  color: "#ffffff", fontSize: "1rem", fontWeight: 600,
                  textDecoration: "none", transition: "background 0.2s, border-color 0.2s, color 0.2s", ...FONT_BODY,
                }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "#000000"; e.currentTarget.style.borderColor = "#000000"; e.currentTarget.style.color = "#ffffff"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = TEAL_500; e.currentTarget.style.borderColor = TEAL_500; e.currentTarget.style.color = "#ffffff"; }}>
                  View All Projects <ArrowRight size={20} />
                </Link>
              </MagneticButton>
            </div>

          </div>
        </section>

        {/* ── CTA FOOTER ── */}
        <section className="relative w-full bg-black flex items-center py-20 px-6 md:py-32 md:px-12">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="border-t border-white/10 pt-16 md:pt-24 flex justify-between items-center flex-wrap gap-8">
              <h2 className="text-[2.5rem] md:text-[4rem] tracking-tight leading-none text-white" style={FONT_DISPLAY}>
                Ready to transform <br /> <span className="text-teal-500">your business?</span>
              </h2>
              <MagneticButton>
                <Link href="/contact" className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 bg-teal-500 text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl" style={FONT_BODY}>
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                  <span className="relative z-10 text-lg font-bold">Start a Project</span>
                  <Rocket size={20} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
