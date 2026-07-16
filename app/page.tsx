"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Smartphone, Code2, Bot, Palette, BarChart3, Globe,
  ArrowRight, Star, Mail, Phone, MapPin, CircleCheck, Menu, X,
} from "lucide-react";

import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import ParallaxImage from "@/components/ParallaxImage";
import HorizontalMarquee from "@/components/HorizontalMarquee";
import CountUp from "@/components/CountUp";

gsap.registerPlugin(ScrollTrigger);

/* ─── Shared style constants ─────────────────────────────────────────────── */
const FONT_DISPLAY = { fontFamily: "var(--font-outfit), system-ui, sans-serif" };
const FONT_BODY    = { fontFamily: "var(--font-inter), system-ui, sans-serif" };

const CARD_BG   = "#ffffff";
const PAGE_BG   = "#ffffff";
const SECTION_BG = "#f8fafc";

const TEAL_400 = "#2dd4bf";
const TEAL_500 = "#14b8a6";
const SLATE_400 = "#64748b"; // Darker slate for light mode
const SLATE_500 = "#475569"; // Even darker slate for light mode

/* ─── Data ───────────────────────────────────────────────────────────────── */
const services = [
  { icon: <Smartphone size={24} />, title: "App Development",  desc: "Native iOS & Android or cross-platform apps built for performance, scalability, and delightful UX.", tag: "Mobile",           large: false },
  { icon: <Code2      size={24} />, title: "Web Development",  desc: "Responsive, blazing-fast websites and web apps tailored precisely to your brand and business goals.", tag: "Frontend · Backend", large: true  },
  { icon: <Bot        size={24} />, title: "AI Integration",   desc: "Custom AI workflows, chatbots, and predictive analytics to supercharge your operational efficiency.", tag: "AI · Automation",   large: false },
  { icon: <Palette    size={24} />, title: "Brand Identity",   desc: "Logos, guidelines, motion assets—every touch point refined into one cohesive brand world.",           tag: "Design",            large: false },
  { icon: <BarChart3  size={24} />, title: "Growth Marketing", desc: "Data-driven campaigns, SEO, and conversion optimisation that measurably grow your revenue.",           tag: "Marketing",         large: false },
  { icon: <Globe      size={24} />, title: "Digital Strategy", desc: "From product roadmap to go-to-market—strategic clarity so every sprint moves the needle.",             tag: "Strategy",          large: false },
];

const stats = [
  { end: 120, suffix: "+", label: "Projects Shipped"  },
  { end: 98,  suffix: "%", label: "Client Retention"  },
  { end: 14,  suffix: "+", label: "Countries Served"  },
  { end: 5,   suffix: "★", label: "Average Rating"    },
];

const process = [
  { num: "01", title: "Discovery & Strategy", desc: "We deep-dive into your goals, users, and market. Every decision starts with clarity." },
  { num: "02", title: "Design & Prototype",   desc: "High-fidelity prototypes that feel real before a line of code is written." },
  { num: "03", title: "Build & Iterate",      desc: "Agile sprints. Constant demos. You see progress every single week." },
  { num: "04", title: "Launch & Scale",       desc: "Zero-downtime deployment, monitoring, and ongoing optimisation as you grow." },
];

const portfolio = [
  { src: "/portfolio_saas.png",   title: "NovaDash",      category: "SaaS Analytics Platform", year: "2025" },
  { src: "/portfolio_mobile.png", title: "Kova Finance",  category: "Mobile Banking App",       year: "2025" },
  { src: "/portfolio_brand.png",  title: "Arkon Studio",  category: "Brand Identity System",    year: "2024" },
];

const testimonials = [
  { quote: "Growtez didn't just build our product—they transformed our entire digital DNA. The result is a platform our users genuinely love.",             name: "Ayesha Rahman", role: "CEO, NovaDash",       stars: 5 },
  { quote: "Working with them felt like having a world-class product team embedded in our company. Communication was flawless, delivery was early.",        name: "Marcus Osei",   role: "Founder, Kova Finance", stars: 5 },
  { quote: "Our new brand identity elevated every customer touchpoint. We saw a 40% jump in brand recognition in the first quarter alone.",                 name: "Priya Nair",    role: "CMO, Arkon Studio",    stars: 5 },
];

const marqueeTechItems    = ["Next.js","React","Node.js","TypeScript","PostgreSQL","AWS","Figma","Flutter","TensorFlow","Kubernetes"];
const marqueeServiceItems = ["Web Development","App Development","AI Integration","Brand Identity","Growth Marketing","Digital Strategy"];

/* ─── Pill label ──────────────────────────────────────────────────────────── */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "6px 16px", borderRadius: 9999,
      border: "1px solid rgba(20,184,166,0.25)",
      background: "rgba(20,184,166,0.06)",
      color: TEAL_400, fontSize: 11, fontWeight: 600,
      letterSpacing: "0.2em", textTransform: "uppercase",
      ...FONT_BODY,
    }}>
      {children}
    </div>
  );
}

/* ─── Service Card with 3-D tilt ─────────────────────────────────────────── */
function ServiceCard({ icon, title, desc, tag, large }: { icon: React.ReactNode; title: string; desc: string; tag: string; large: boolean }) {
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
    };
    const onLeave = () => {
      card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
      card.style.borderColor = "rgba(51,65,85,0.6)";
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
        border: "1px solid rgba(51,65,85,0.6)",
        borderRadius: 24,
        padding: "2rem",
        transition: "transform 0.15s ease, border-color 0.3s ease",
        willChange: "transform",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(20,184,166,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_400 }}>
          {icon}
        </div>
        <span style={{ fontSize: 11, color: SLATE_500, border: "1px solid rgba(71,85,105,0.5)", borderRadius: 9999, padding: "4px 12px", ...FONT_BODY }}>
          {tag}
        </span>
      </div>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: 12, ...FONT_DISPLAY }}>{title}</h3>
      <p  style={{ fontSize: "0.875rem", lineHeight: 1.7, color: SLATE_400 }}>{desc}</p>
    </div>
  );
}

/* ─── Testimonial Card ───────────────────────────────────────────────────── */
function TestimonialCard({ quote, name, role, stars, index }: { quote: string; name: string; role: string; stars: number; index: number }) {
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
    <div ref={cardRef} style={{ background: CARD_BG, border: "1px solid rgba(51,65,85,0.6)", borderRadius: 24, padding: "2rem", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {Array(stars).fill(0).map((_, i) => <Star key={i} size={14} style={{ fill: TEAL_400, color: TEAL_400 }} />)}
      </div>
      <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "#cbd5e1", flex: 1 }}>&ldquo;{quote}&rdquo;</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(20,184,166,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_400, fontSize: 14, fontWeight: 700 }}>
          {name[0]}
        </div>
        <div>
          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}>{name}</p>
          <p style={{ fontSize: "0.75rem", color: SLATE_500 }}>{role}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Portfolio Card ─────────────────────────────────────────────────────── */
function PortfolioCard({ src, title, category, year, index }: { src: string; title: string; category: string; year: string; index: number }) {
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
  return (
    <div ref={cardRef}>
      <div style={{ borderRadius: 16, overflow: "hidden", position: "relative" }}>
        <ParallaxImage src={src} alt={title} className="h-[320px] w-full" intensity={18} />
      </div>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL_400, marginBottom: 4, ...FONT_BODY }}>{category}</p>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", ...FONT_DISPLAY }}>{title}</h3>
        </div>
        <span style={{ fontSize: "0.875rem", color: SLATE_500 }}>{year}</span>
      </div>
    </div>
  );
}

/* ─── Navbar ──────────────────────────────────────────────────────────────── */
function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    let lastY = 0;
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const y = self.scroll();
        gsap.to(navRef.current, { yPercent: (y > lastY && y > 80) ? -120 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        lastY = y;
      },
    });
    gsap.fromTo(navRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 2.8, ease: "power3.out" });
    return () => st.kill();
  }, []);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" }
  ];
  
  const moreLinks = [
    { label: "About Us", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers" }
  ];

  return (
    <nav ref={navRef} style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, opacity: 0,
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="/" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#000000", textDecoration: "none", letterSpacing: "-0.03em", ...FONT_DISPLAY }}>
          growtez
        </a>
        
        {/* Desktop links */}
        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }} className="hidden md:flex">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{ fontSize: "0.95rem", fontWeight: 600, color: "#000000", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = TEAL_500)}
                onMouseLeave={e => (e.currentTarget.style.color = "#000000")}>
                {l.label}
              </a>
            </li>
          ))}
          {/* Dropdown */}
          <li style={{ position: "relative" }} onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button style={{ background: "none", border: "none", fontSize: "0.95rem", fontWeight: 600, color: "#000000", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", transition: "color 0.2s", padding: 0 }}
                onMouseEnter={e => (e.currentTarget.style.color = TEAL_500)}
                onMouseLeave={e => (e.currentTarget.style.color = "#000000")}>
              More
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {moreOpen && (
              <div style={{ position: "absolute", top: "100%", right: 0, paddingTop: 16 }}>
                <div style={{ background: "#fff", borderRadius: 12, padding: "8px 0", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)", minWidth: 160 }}>
                  {moreLinks.map(l => (
                    <a key={l.href} href={l.href} style={{ display: "block", padding: "10px 20px", fontSize: "0.9rem", fontWeight: 500, color: "#475569", textDecoration: "none", transition: "background 0.2s, color 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#000000"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; }}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </li>
        </ul>
        
        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#000000", padding: 0 }} className="md:hidden">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      
      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ padding: "12px 40px 24px", borderTop: "1px solid rgba(0,0,0,0.05)", background: "#ffffff" }}>
          {[...links, ...moreLinks].map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "14px 0", fontSize: "1.1rem", fontWeight: 600, color: "#000000", textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Process Section ────────────────────────────────────────────────────── */
function ProcessSection() {
  const lineRef    = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;
    gsap.set(lineRef.current, { scaleY: 0 });
    const anim = gsap.to(lineRef.current, {
      scaleY: 1, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top 60%", end: "bottom 60%", scrub: 1 },
    });
    return () => { anim.kill(); };
  }, []);

  const left  = process.filter((_, i) => i % 2 === 0);
  const right = process.filter((_, i) => i % 2 === 1);

  return (
    <section id="process" ref={sectionRef} style={{ position: "relative", padding: "7rem 40px", background: PAGE_BG, backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Pill>How We Work</Pill>
        <div style={{ marginTop: 24, marginBottom: 56 }}>
          <RevealText as="block" className="text-5xl md:text-6xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Our process is</RevealText>
          <RevealText as="block" delay={0.1} className="text-5xl md:text-6xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>built for results.</RevealText>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2px 1fr", gap: "0 40px" }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
            {left.map(s => (
              <div key={s.num}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", color: TEAL_500, textTransform: "uppercase" }}>{s.num}</p>
                <RevealText as="block" delay={0.05}><h3 style={{ marginTop: 8, fontSize: "1.2rem", fontWeight: 700, color: "#000000", ...FONT_DISPLAY }}>{s.title}</h3></RevealText>
                <RevealText as="block" delay={0.1}><p style={{ marginTop: 8, fontSize: "0.875rem", lineHeight: 1.75, color: SLATE_500 }}>{s.desc}</p></RevealText>
              </div>
            ))}
          </div>
          {/* Centre line */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, transform: "translateX(-50%)", background: "rgba(0,0,0,0.1)" }} />
            <div ref={lineRef} style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, transform: "translateX(-50%) scaleY(0)", transformOrigin: "top center", background: TEAL_500 }} />
          </div>
          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: 56, paddingTop: 96 }}>
            {right.map(s => (
              <div key={s.num}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", color: TEAL_500, textTransform: "uppercase" }}>{s.num}</p>
                <RevealText as="block" delay={0.05}><h3 style={{ marginTop: 8, fontSize: "1.2rem", fontWeight: 700, color: "#000000", ...FONT_DISPLAY }}>{s.title}</h3></RevealText>
                <RevealText as="block" delay={0.1}><p style={{ marginTop: 8, fontSize: "0.875rem", lineHeight: 1.75, color: SLATE_500 }}>{s.desc}</p></RevealText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const anim = gsap.to(heroRef.current, {
      opacity: 0.3, scale: 0.97, ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
    });
    return () => { anim.kill(); };
  }, []);

  return (
    <main style={{ background: PAGE_BG, position: "relative", width: "100%" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section id="hero" ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", overflow: "hidden" }}>
        {/* Orbs */}
        <div className="animate-float" style={{ position: "absolute", left: "-12rem", top: "25%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,184,166,0.3) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div className="animate-float-reverse" style={{ position: "absolute", right: "-12rem", bottom: "25%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 900, width: "100%" }}>
          <RevealText delay={2.5}>
            <Pill>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL_400, display: "inline-block", animation: "pulse 2s infinite" }} />
              Digital Agency · Est. 2022
            </Pill>
          </RevealText>

          <h1 style={{ marginTop: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <RevealText delay={2.65} as="block" className="text-6xl md:text-[5.5rem] lg:text-[7rem] font-semibold leading-[0.95] tracking-tight" style={{ ...FONT_DISPLAY, color: "#000000" }}>
              We build
            </RevealText>
            <RevealText delay={2.75} as="block" className="text-6xl md:text-[5.5rem] lg:text-[7rem] font-semibold leading-[0.95] tracking-tight" style={{ ...FONT_DISPLAY, color: "#000000" }}>
              digital futures.
            </RevealText>
          </h1>

          <div style={{ maxWidth: 640, margin: "28px auto 0" }}>
            <RevealText delay={2.9} as="block" className="text-base md:text-lg font-medium leading-relaxed" style={{ color: "#000000" }}>
              From concept to launch, Growtez crafts web apps, mobile products, and AI systems that actually move the needle for your business.
            </RevealText>
          </div>

          <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
            <RevealText delay={3.05}>
              <MagneticButton>
                <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 9999, background: TEAL_500, color: "#ffffff", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none", transition: "background 0.2s", ...FONT_BODY }}
                  onMouseEnter={e => (e.currentTarget.style.background = TEAL_400)}
                  onMouseLeave={e => (e.currentTarget.style.background = TEAL_500)}>
                  Start a Project <ArrowRight size={16} />
                </a>
              </MagneticButton>
            </RevealText>
            <RevealText delay={3.15}>
              <MagneticButton>
                <a href="#portfolio" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 9999, border: "1px solid rgba(0,0,0,0.1)", color: "#475569", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(20,184,166,0.5)"; e.currentTarget.style.color = "#000000"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "#475569"; }}>
                  View Work
                </a>
              </MagneticButton>
            </RevealText>
          </div>

          <div style={{ marginTop: 64, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.3 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: SLATE_400, ...FONT_BODY }}>Scroll</span>
            <div style={{ width: 1, height: 32, background: SLATE_400 }} />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)", background: SECTION_BG, padding: "20px 0" }}>
        <HorizontalMarquee items={marqueeServiceItems} speed={55} className="text-sm font-semibold tracking-widest uppercase" style={{ color: SLATE_400 }} />
        <HorizontalMarquee items={marqueeTechItems} speed={45} reverse className="mt-3 text-sm font-medium tracking-widest uppercase" style={{ color: "#94a3b8" }} />
      </div>

      {/* ── SERVICES ── */}
      <section id="services" style={{ position: "relative", padding: "7rem 40px", background: PAGE_BG }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 64, display: "flex", flexDirection: "column", gap: 12 }}>
            <Pill>What We Do</Pill>
            <RevealText as="block" className="text-5xl md:text-6xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Services built</RevealText>
            <RevealText as="block" delay={0.1} className="text-5xl md:text-6xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>for growth.</RevealText>
          </div>
          {/* Bento grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {services.map((s, i) => <ServiceCard key={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: SECTION_BG, borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)", padding: "56px 40px" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, color: "#000000", ...FONT_DISPLAY }}>
                <CountUp end={s.end} suffix={s.suffix} duration={2.2} />
              </div>
              <p style={{ marginTop: 8, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: SLATE_500, ...FONT_BODY }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <ProcessSection />

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ background: SECTION_BG, padding: "7rem 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <Pill>Selected Work</Pill>
            <div style={{ marginTop: 16 }}>
              <RevealText as="block" className="text-5xl md:text-6xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Projects that</RevealText>
              <RevealText as="block" delay={0.1} className="text-5xl md:text-6xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>speak for themselves.</RevealText>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {portfolio.map((p, i) => <PortfolioCard key={i} {...p} index={i} />)}
          </div>
          <div style={{ marginTop: 56, textAlign: "center" }}>
            <MagneticButton>
              <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 9999, border: "1px solid rgba(0,0,0,0.1)", color: "#475569", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                 onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(20,184,166,0.5)"; e.currentTarget.style.color = "#000000"; }}
                 onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "#475569"; }}>
                See All Projects <ArrowRight size={14} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "7rem 40px", position: "relative", background: PAGE_BG }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "50%", height: 1, background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.4), transparent)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Pill>Client Love</Pill>
            <div style={{ marginTop: 16 }}>
              <RevealText as="block" className="text-5xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Don&apos;t take our word for it.</RevealText>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map((t, i) => <TestimonialCard key={i} {...t} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── INTERN CTA ── */}
      <section id="careers" style={{ position: "relative", overflow: "hidden", padding: "7rem 40px", background: SECTION_BG, textAlign: "center" }}>
        {/* Ghost word */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden" }}>
          <span style={{ fontSize: "clamp(80px, 20vw, 220px)", fontWeight: 900, color: "rgba(0,0,0,0.03)", lineHeight: 1, ...FONT_DISPLAY }}>INTERNS</span>
        </div>
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          <Pill>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL_400, display: "inline-block" }} />
            Now Hiring — Summer 2026
          </Pill>
          <div style={{ marginTop: 24 }}>
            <RevealText as="block" className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, lineHeight: 0.95, color: "#000000" }}>Start your career</RevealText>
            <RevealText as="block" delay={0.1} className="text-6xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, lineHeight: 0.95, color: "#000000" }}>with us.</RevealText>
          </div>
          <RevealText as="block" delay={0.2}><p style={{ marginTop: 24, color: SLATE_400, fontSize: "1rem", lineHeight: 1.7, maxWidth: 480, margin: "24px auto 0" }}>Work on real products, learn from senior engineers and designers, get a certificate, and build a portfolio that actually stands out.</p></RevealText>

          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {["Stipend Provided", "Certificate", "Mentorship", "Real Projects"].map(b => (
              <span key={b} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9999, border: "1px solid rgba(20,184,166,0.3)", background: "rgba(20,184,166,0.06)", color: TEAL_500, fontSize: 12, fontWeight: 600, ...FONT_BODY }}>
                <CircleCheck size={12} /> {b}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <MagneticButton strength={0.4}>
              <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 40px", borderRadius: 9999, background: TEAL_500, color: "#ffffff", fontSize: "1rem", fontWeight: 700, textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = TEAL_400)}
                onMouseLeave={e => (e.currentTarget.style.background = TEAL_500)}>
                Apply Now <ArrowRight size={18} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "7rem 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <Pill>Get In Touch</Pill>
            <div style={{ marginTop: 16 }}>
              <RevealText as="block" className="text-5xl md:text-6xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Let&apos;s build</RevealText>
              <RevealText as="block" delay={0.1} className="text-5xl md:text-6xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>something great.</RevealText>
            </div>
            <p style={{ marginTop: 24, color: SLATE_400, fontSize: "0.9rem", lineHeight: 1.75, maxWidth: 380 }}>Have a project in mind? An idea you&apos;re still fleshing out? Either way, reach out—we&apos;d love to have a conversation.</p>
            <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: <Mail size={16} />, label: "hello@growtez.com",  href: "mailto:hello@growtez.com" },
                { icon: <Phone size={16} />, label: "+91 90000 00000",   href: "tel:+919000000000" },
                { icon: <MapPin size={16} />, label: "Hyderabad, India", href: "#" },
              ].map((item, i) => (
                <a key={i} href={item.href} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.95rem", fontWeight: 500, color: "#475569", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = TEAL_500)}
                  onMouseLeave={e => (e.currentTarget.style.color = "#475569")}>
                  <span style={{ width: 40, height: 40, borderRadius: 10, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: TEAL_500 }}>{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          {/* Form */}
          <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { type: "text",  placeholder: "Your Name"     },
              { type: "email", placeholder: "Email Address" },
              { type: "text",  placeholder: "Project Type (Web / App / AI / Brand)" },
            ].map((f, i) => (
              <input key={i} type={f.type} placeholder={f.placeholder} style={{ background: CARD_BG, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: "16px", fontSize: "0.95rem", color: "#000000", outline: "none", width: "100%", boxSizing: "border-box", ...FONT_BODY }} />
            ))}
            <textarea rows={5} placeholder="Tell us about your project..." style={{ background: CARD_BG, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: "16px", fontSize: "0.95rem", color: "#000000", outline: "none", resize: "none", width: "100%", boxSizing: "border-box", ...FONT_BODY }} />
            <button type="submit" style={{ background: TEAL_500, color: "#ffffff", fontWeight: 700, fontSize: "1rem", padding: "18px", borderRadius: 12, border: "none", width: "100%", transition: "background 0.2s", cursor: "pointer", ...FONT_BODY }}
              onMouseEnter={e => (e.currentTarget.style.background = TEAL_400)}
              onMouseLeave={e => (e.currentTarget.style.background = TEAL_500)}>
              Send Message →
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(0,0,0,0.05)", background: PAGE_BG, padding: "56px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <span style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#000000", ...FONT_DISPLAY }}>
                growtez
              </span>
              <p style={{ marginTop: 16, fontSize: "0.875rem", lineHeight: 1.75, color: SLATE_500, maxWidth: 280 }}>
                Building digital products that help ambitious businesses grow faster and smarter.
              </p>
              <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                {[
                  <svg key="x"  width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.845L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                  <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                  <svg key="gh" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
                ].map((icon, i) => (
                  <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: SLATE_500, textDecoration: "none", transition: "color 0.2s, border-color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = TEAL_500; e.currentTarget.style.borderColor = "rgba(20,184,166,0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = SLATE_500; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            {/* Columns */}
            {[
              { heading: "Services", links: ["Web Development","App Development","AI Integration","Brand Identity"] },
              { heading: "Company",  links: ["About","Portfolio","Careers","Blog"] },
              { heading: "Legal",    links: ["Privacy Policy","Terms of Service","Cookie Policy"] },
            ].map(col => (
              <div key={col.heading}>
                <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: SLATE_400, marginBottom: 20, ...FONT_BODY }}>{col.heading}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" style={{ fontSize: "0.875rem", color: SLATE_500, textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = TEAL_400)}
                        onMouseLeave={e => (e.currentTarget.style.color = SLATE_500)}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: SLATE_400 }}>
            <span>© {new Date().getFullYear()} Growtez. All rights reserved.</span>
            <span>Made with ♥ in Hyderabad, India</span>
          </div>
        </div>
      </footer>
    </main>
  );
}