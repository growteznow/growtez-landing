"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Rocket } from "lucide-react";
import RevealText from "@/components/RevealText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { FONT_DISPLAY, FONT_BODY, TEAL_400, TEAL_500, SLATE_400, SLATE_500, PAGE_BG } from "@/lib/constants";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
  gradient: string;
  icon: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "future-of-web-development-2025",
    title: "The Future of Web Development: Trends Shaping 2025 and Beyond",
    excerpt: "From AI-assisted coding to edge-first architectures, we explore the technologies and paradigms redefining how the web is built — and what it means for your next project.",
    category: "Web Development",
    readTime: "8 min read",
    date: "Aug 18, 2026",
    featured: true,
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f3d3e 100%)",
    icon: "🌐",
  },
  {
    slug: "ui-ux-design-principles",
    title: "10 UI/UX Principles That Separate Good Products from Great Ones",
    excerpt: "Great design is not just aesthetic — it is purposeful. Discover the principles our design team uses to craft interfaces that convert, retain, and delight users.",
    category: "UI/UX Design",
    readTime: "6 min read",
    date: "Aug 10, 2026",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b0764 50%, #1e1b4b 100%)",
    icon: "🎨",
  },
  {
    slug: "mobile-app-performance-tips",
    title: "Optimising Mobile App Performance: A Developer Playbook",
    excerpt: "Speed is a feature. We break down the proven techniques — lazy loading, tree shaking, caching strategies — that keep your mobile app snappy at every interaction.",
    category: "App Development",
    readTime: "10 min read",
    date: "Jul 28, 2026",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    icon: "📱",
  },
  {
    slug: "digital-marketing-seo-2025",
    title: "SEO in the Age of AI: What Changed and How to Adapt",
    excerpt: "Search is no longer just about keywords. With AI-generated answers reshaping SERPs, here is your updated playbook for staying visible and driving organic growth.",
    category: "Digital Marketing",
    readTime: "7 min read",
    date: "Jul 15, 2026",
    gradient: "linear-gradient(135deg, #3b1c32 0%, #7c2d12 50%, #431407 100%)",
    icon: "📈",
  },
  {
    slug: "ai-integration-business",
    title: "Integrating AI into Your Business: A Practical Roadmap",
    excerpt: "Not every company needs a large language model. Learn how to identify the right AI use cases, avoid costly pitfalls, and ship integrations that create real leverage.",
    category: "AI Integration",
    readTime: "9 min read",
    date: "Jul 2, 2026",
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #1b4332 50%, #064e3b 100%)",
    icon: "🤖",
  },
  {
    slug: "brand-identity-design",
    title: "Why Your Brand Identity Is Your Most Valuable Business Asset",
    excerpt: "A logo is not a brand. Discover how strategic visual identity — from typography to motion — shapes perception and builds the kind of trust that outlasts any campaign.",
    category: "Branding",
    readTime: "5 min read",
    date: "Jun 20, 2026",
    gradient: "linear-gradient(135deg, #1c1917 0%, #292524 50%, #3f3f46 100%)",
    icon: "✨",
  },
];

const categories = ["All", "Web Development", "UI/UX Design", "App Development", "Digital Marketing", "AI Integration", "Branding"];

function categoryColor(cat: string): string {
  const map: Record<string, string> = {
    "Web Development": "#0F8A8A",
    "UI/UX Design": "#7c3aed",
    "App Development": "#0891b2",
    "Digital Marketing": "#b45309",
    "AI Integration": "#059669",
    "Branding": "#64748b",
  };
  return map[cat] ?? TEAL_500;
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.fromTo(
      card,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.9, delay: index * 0.1, ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%" } }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24, overflow: "hidden", background: "#ffffff",
        border: hovered ? `1px solid ${categoryColor(post.category)}40` : "1px solid rgba(0,0,0,0.08)",
        boxShadow: hovered ? `0 24px 48px -12px ${categoryColor(post.category)}30` : "0 1px 3px rgba(0,0,0,0.05)",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{
        height: 180, background: post.gradient, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "3.5rem", position: "relative", overflow: "hidden",
      }}>
        <span style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))", transition: "transform 0.4s", transform: hovered ? "scale(1.15)" : "scale(1)" }}>
          {post.icon}
        </span>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
            color: categoryColor(post.category), background: `${categoryColor(post.category)}12`,
            padding: "3px 10px", borderRadius: 9999, ...FONT_BODY,
          }}>
            {post.category}
          </span>
          <span style={{ fontSize: "0.75rem", color: SLATE_400, display: "flex", alignItems: "center", gap: 4, ...FONT_BODY }}>
            <Clock size={11} />{post.readTime}
          </span>
        </div>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.4, margin: 0, ...FONT_DISPLAY }}>
          {post.title}
        </h3>

        <p style={{ fontSize: "0.875rem", color: SLATE_500, lineHeight: 1.75, margin: 0, flex: 1, ...FONT_BODY }}>
          {post.excerpt}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <span style={{ fontSize: "0.8rem", color: SLATE_400, ...FONT_BODY }}>{post.date}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", fontWeight: 600, color: categoryColor(post.category), ...FONT_BODY }}>
            Read more <ArrowRight size={13} style={{ transition: "transform 0.2s", transform: hovered ? "translateX(4px)" : "none" }} />
          </span>
        </div>
      </div>
    </div>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.2 });
  }, []);

  return (
    <div ref={ref} style={{
      borderRadius: 32, overflow: "hidden", background: post.gradient, position: "relative",
      minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "flex-end",
      padding: "2.5rem", border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 32px 80px -20px rgba(0,0,0,0.45)",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "20%", right: "15%", width: 300, height: 300, borderRadius: "50%",
        background: `radial-gradient(circle, ${TEAL_500}50 0%, transparent 70%)`,
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{ position: "absolute", top: "2rem", right: "2.5rem", fontSize: "5rem", opacity: 0.4 }}>{post.icon}</div>

      <div style={{ marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL_400, background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.25)", padding: "4px 12px", borderRadius: 9999, ...FONT_BODY }}>
          Featured
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.08)", padding: "4px 12px", borderRadius: 9999, ...FONT_BODY }}>
          {post.category}
        </span>
      </div>

      <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, letterSpacing: "-0.03em", maxWidth: 680, position: "relative", zIndex: 1, ...FONT_DISPLAY }}>
        {post.title}
      </h2>
      <p style={{ marginTop: 16, fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 560, position: "relative", zIndex: 1, ...FONT_BODY }}>
        {post.excerpt}
      </p>

      <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 20, position: "relative", zIndex: 1, flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 5, ...FONT_BODY }}>
          <Clock size={13} /> {post.readTime}
        </span>
        <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", ...FONT_BODY }}>{post.date}</span>
        <MagneticButton>
          <a href={`/blog/${post.slug}`} style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px",
            borderRadius: 9999, background: TEAL_500, color: "#fff", fontSize: "0.875rem",
            fontWeight: 700, textDecoration: "none", transition: "background 0.2s, transform 0.2s", ...FONT_BODY,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = TEAL_400; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = TEAL_500; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Read Article <ArrowRight size={15} />
          </a>
        </MagneticButton>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredPost = blogPosts.find((p) => p.featured)!;
  const filtered = activeCategory === "All"
    ? blogPosts.filter((p) => !p.featured)
    : blogPosts.filter((p) => p.category === activeCategory && !p.featured);

  return (
    <main style={{ paddingTop: 100, background: PAGE_BG }}>
      {/* ── HEADER ── */}
      <section style={{ padding: "2rem 40px 3rem", background: PAGE_BG, textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ marginTop: 24, lineHeight: 1.1 }}>
            <RevealText as="block" className="text-5xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000" }}>Insights &amp;</RevealText>
            <RevealText as="block" delay={0.1} className="text-5xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: TEAL_500 }}>Ideas.</RevealText>
          </h1>
          <RevealText as="block" delay={0.2}>
            <p style={{ marginTop: 32, fontSize: "1.2rem", color: SLATE_500, maxWidth: 680, lineHeight: 1.8, ...FONT_BODY }}>
              Insights, tips, and deep-dives into web development, design, AI, and digital marketing from the Growtez team.
            </p>
          </RevealText>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ padding: "5rem 40px 8rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem" }}>
          <FeaturedPost post={featuredPost} />
        </div>

        {/* Category Filter */}
        <div style={{
          display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "3rem",
          padding: "0.5rem", background: "#f8fafc", borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.06)", width: "fit-content",
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 20px", borderRadius: 12, border: "none",
                  background: isActive ? "#000000" : "transparent",
                  color: isActive ? "#ffffff" : SLATE_500,
                  fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.15)" : "none", ...FONT_BODY,
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.75rem" }}
          >
            {filtered.length > 0 ? (
              filtered.map((post, i) => <BlogCard key={post.slug} post={post} index={i} />)
            ) : (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "5rem 2rem", color: SLATE_400, ...FONT_BODY }}>
                <p style={{ fontSize: "3rem", marginBottom: 16 }}>📭</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 600, color: SLATE_500 }}>No posts in this category yet.</p>
                <p style={{ marginTop: 8 }}>We are working on some great content. Check back soon!</p>
                <button
                  onClick={() => setActiveCategory("All")}
                  style={{
                    marginTop: 24, padding: "10px 28px", borderRadius: 9999,
                    border: "1px solid rgba(0,0,0,0.1)", background: "transparent",
                    color: "#000", fontWeight: 600, cursor: "pointer", transition: "background 0.2s", ...FONT_BODY,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  View all posts
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section style={{ background: "#000000", padding: "7rem 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 500, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${TEAL_500}25 0%, transparent 70%)`,
          filter: "blur(70px)", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, color: "#ffffff",
            letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0, ...FONT_DISPLAY,
          }}>
            Ready to build something <span style={{ color: TEAL_500 }}>remarkable?</span>
          </h2>
          <p style={{ marginTop: 20, fontSize: "1.1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, ...FONT_BODY }}>
            Let us turn your vision into a high-performance digital product. Our team is ready when you are.
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <MagneticButton>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px",
                borderRadius: 9999, background: TEAL_500, color: "#ffffff", fontWeight: 700,
                fontSize: "0.95rem", textDecoration: "none", transition: "background 0.2s, transform 0.2s", ...FONT_BODY,
              }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = TEAL_400; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = TEAL_500; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <Rocket size={17} /> Start a Project
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/portfolio" style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
                borderRadius: 9999, border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "0.95rem",
                textDecoration: "none", transition: "border-color 0.2s, color 0.2s", ...FONT_BODY,
              }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = TEAL_500; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
              >
                View Our Work <ArrowRight size={15} />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
