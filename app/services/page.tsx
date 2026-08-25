"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FONT_DISPLAY, FONT_BODY } from "@/lib/constants";
import { services } from "@/lib/data";

import RevealText from "@/components/RevealText";

gsap.registerPlugin(ScrollTrigger);

function AnimatedServiceCard({ service, index }: { service: any, index: number }) {
  const ref = useRef(null);
  
  // Track the scroll progress of this specific card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "start 25%"]
  });

  // Interpolate colors tick-by-tick as the user scrolls
  const backgroundColor = useTransform(scrollYProgress, [0, 1], ["#1e293b", "#0f766e"]); // Slate-800 to Dark Teal
  const color = useTransform(scrollYProgress, [0, 0.5, 1], ["#f8fafc", "#f8fafc", "#ffffff"]);
  const secondaryColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#94a3b8", "#94a3b8", "rgba(255, 255, 255, 0.75)"]);
  
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
                <motion.div className="mt-6 pb-1">
                  <motion.span className="inline-block text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-full border border-current" style={{ color: secondaryColor }}>
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
  const strategySectionRef = useRef<HTMLElement>(null);
  const strategyLeftRef = useRef<HTMLDivElement>(null);

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

  return (
    <main className="bg-black min-h-screen text-slate-50" style={{ paddingTop: 100 }}>
      {/* ── HEADER ── */}
      <section style={{ padding: "2rem 40px 3rem", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          <h1 style={{ marginTop: 24 }}>
            <RevealText as="block" className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#f8fafc" }}>Services built</RevealText>
            <RevealText as="block" delay={0.1} className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#f8fafc" }}>for growth.</RevealText>
          </h1>
          <RevealText as="block" delay={0.2}>
            <p style={{ marginTop: 32, fontSize: "1.2rem", color: "#94a3b8", lineHeight: 1.8 }}>
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
      <div className="w-full block">
        <section ref={strategySectionRef} className="rounded-t-[3rem] md:rounded-t-[5rem] relative w-full bg-black text-white py-24 lg:py-40 z-10 shadow-2xl flex flex-col transition-colors duration-500">
          <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12 flex flex-col lg:flex-row relative items-start gap-16 lg:gap-24">
            
            {/* Left Column (Sticky on desktop) */}
            <div ref={strategyLeftRef} className="w-full lg:w-5/12 shrink-0 relative z-20 lg:sticky lg:top-40 h-fit">
              <h2
                className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.05] font-normal tracking-tight mt-6"
                style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
              >
                Our process is<br />built for results.
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
    </main>
  );
}
