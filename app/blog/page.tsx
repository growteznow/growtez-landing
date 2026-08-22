"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Rocket, AlertTriangle, Newspaper, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import { FONT_DISPLAY, FONT_BODY, TEAL_400, TEAL_500, SLATE_400, SLATE_500, PAGE_BG } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  publishedAt?: Timestamp | null;
  readingTime?: string;
  isPublished?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(ts?: Timestamp | null): string {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts as unknown as string);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function categoryColor(cat?: string): string {
  const map: Record<string, string> = {
    "Web Development": "#0F8A8A",
    "UI/UX Design": "#7c3aed",
    "App Development": "#0891b2",
    "Digital Marketing": "#b45309",
    "AI Integration": "#059669",
    "Branding": "#64748b",
  };
  return (cat && map[cat]) ? map[cat] : TEAL_500;
}

const GRADIENTS: string[] = [
  "linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 50%,#0f3d3e 100%)",
  "linear-gradient(135deg,#1a0533 0%,#3b0764 50%,#1e1b4b 100%)",
  "linear-gradient(135deg,#0f2027 0%,#203a43 50%,#2c5364 100%)",
  "linear-gradient(135deg,#3b1c32 0%,#7c2d12 50%,#431407 100%)",
  "linear-gradient(135deg,#0d1b2a 0%,#1b4332 50%,#064e3b 100%)",
  "linear-gradient(135deg,#1c1917 0%,#292524 50%,#3f3f46 100%)",
];

// ─── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const color = categoryColor(post.category);
  const gradient = GRADIENTS[index % GRADIENTS.length];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.fromTo(card, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 0.9, delay: index * 0.08, ease: "power3.out",
      scrollTrigger: { trigger: card, start: "top 88%" },
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24, overflow: "hidden", background: "#ffffff",
        border: hovered ? `1px solid ${color}40` : "1px solid rgba(0,0,0,0.08)",
        boxShadow: hovered ? `0 24px 48px -12px ${color}25` : "0 1px 3px rgba(0,0,0,0.05)",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Cover image or gradient strip */}
      <div style={{ height: 200, position: "relative", overflow: "hidden", background: gradient }}>
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Newspaper size={48} style={{ color: "rgba(255,255,255,0.2)" }} />
          </div>
        )}
        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px" }} />
        {/* Category badge on image */}
        {post.category && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#fff", background: `${color}cc`,
            padding: "3px 10px", borderRadius: 9999, backdropFilter: "blur(8px)", ...FONT_BODY,
          }}>
            {post.category}
          </span>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "1.4rem", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {post.readingTime && (
            <span style={{ fontSize: "0.75rem", color: SLATE_400, display: "flex", alignItems: "center", gap: 4, ...FONT_BODY }}>
              <Clock size={11} />{post.readingTime}
            </span>
          )}
          {post.publishedAt && (
            <span style={{ fontSize: "0.75rem", color: SLATE_400, ...FONT_BODY }}>· {formatDate(post.publishedAt)}</span>
          )}
        </div>

        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.45, margin: 0, ...FONT_DISPLAY }}>
          {post.title}
        </h3>

        {post.excerpt && (
          <p style={{ fontSize: "0.875rem", color: SLATE_500, lineHeight: 1.75, margin: 0, flex: 1,
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", ...FONT_BODY }}>
            {post.excerpt}
          </p>
        )}

        <div style={{ paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "flex-end" }}>
          <Link href={`/blog/${post.id}`} style={{
            display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.82rem",
            fontWeight: 600, color: color, textDecoration: "none", ...FONT_BODY,
          }}>
            Read more
            <ArrowRight size={13} style={{ transition: "transform 0.2s", transform: hovered ? "translateX(4px)" : "none" }} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: BlogPost }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const color = categoryColor(post.category);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, ease: "power4.out", delay: 0.15 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 28, overflow: "hidden", background: "#000",
        position: "relative", minHeight: 380,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered ? "0 32px 80px -16px rgba(0,0,0,0.5)" : "0 20px 60px -20px rgba(0,0,0,0.35)",
        transition: "box-shadow 0.35s",
      }}
    >
      {/* Cover or gradient background */}
      {post.coverImage ? (
        <img src={post.coverImage} alt={post.title} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          transition: "transform 0.6s ease", transform: hovered ? "scale(1.04)" : "scale(1)",
        }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: GRADIENTS[0] }} />
      )}
      {/* Dark gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)" }} />
      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px" }} />
      {/* Teal glow */}
      <div style={{ position: "absolute", bottom: 0, right: "10%", width: 260, height: 200,
        background: `radial-gradient(circle, ${TEAL_500}40 0%, transparent 70%)`, filter: "blur(50px)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "2rem" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
            color: TEAL_400, background: "rgba(45,212,191,0.15)", border: "1px solid rgba(45,212,191,0.3)",
            padding: "4px 12px", borderRadius: 9999, ...FONT_BODY }}>Featured</span>
          {post.category && (
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.1)",
              padding: "4px 12px", borderRadius: 9999, ...FONT_BODY }}>{post.category}</span>
          )}
        </div>

        <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700, color: "#fff",
          lineHeight: 1.25, letterSpacing: "-0.025em", margin: 0, maxWidth: 680, ...FONT_DISPLAY }}>
          {post.title}
        </h2>

        {post.excerpt && (
          <p style={{ marginTop: 12, fontSize: "0.95rem", color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7, maxWidth: 560, ...FONT_BODY,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.excerpt}
          </p>
        )}

        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          {post.readingTime && (
            <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 5, ...FONT_BODY }}>
              <Clock size={12} />{post.readingTime}
            </span>
          )}
          {post.publishedAt && (
            <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", ...FONT_BODY }}>
              {formatDate(post.publishedAt)}
            </span>
          )}
          <MagneticButton>
            <Link href={`/blog/${post.id}`} style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 22px",
              borderRadius: 9999, background: TEAL_500, color: "#fff",
              fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
              transition: "background 0.2s, transform 0.2s", ...FONT_BODY,
            }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = TEAL_400; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = TEAL_500; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Read Article <ArrowRight size={14} />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const q = query(
          collection(db, "blog_posts"),
          where("isPublished", "==", true),
          orderBy("publishedAt", "desc")
        );
        const snap = await getDocs(q);
        const data: BlogPost[] = snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
        setPosts(data);
      } catch (err: unknown) {
        console.error(err);
        setError((err as Error).message ?? "Failed to load posts.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Derive categories from live data
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean) as string[]))];
  const featured = posts[0] ?? null;
  const rest = posts.slice(1);
  const filtered = activeCategory === "All" ? rest : rest.filter((p) => p.category === activeCategory);

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

      {/* ── CONTENT ── */}
      <section style={{ padding: "2rem 40px 8rem", maxWidth: 1200, margin: "0 auto" }}>

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "6rem 0", color: SLATE_400, ...FONT_BODY }}>
            <Loader2 size={36} style={{ animation: "spin 1s linear infinite", color: TEAL_500 }} />
            <p style={{ fontSize: "1rem" }}>Loading articles…</p>
            <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "6rem 0", textAlign: "center", color: SLATE_500, ...FONT_BODY }}>
            <AlertTriangle size={40} style={{ color: "#ef4444" }} />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", ...FONT_DISPLAY }}>Unable to load blog posts</h3>
            <p style={{ maxWidth: 400, lineHeight: 1.7, fontSize: "0.9rem" }}>{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && posts.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "6rem 0", textAlign: "center", color: SLATE_500, ...FONT_BODY }}>
            <Newspaper size={48} style={{ color: SLATE_400 }} />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", ...FONT_DISPLAY }}>No posts yet</h3>
            <p style={{ fontSize: "0.9rem" }}>We are working on some great content. Check back soon!</p>
          </div>
        )}

        {/* Posts */}
        {!loading && !error && posts.length > 0 && (
          <>
            {/* Featured */}
            {featured && (
              <div style={{ marginBottom: "3.5rem" }}>
                <FeaturedCard post={featured} />
              </div>
            )}

            {/* Category filter */}
            {categories.length > 1 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2.5rem",
                padding: "0.4rem", background: "#f8fafc", borderRadius: 14,
                border: "1px solid rgba(0,0,0,0.06)", width: "fit-content" }}>
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                      padding: "7px 18px", borderRadius: 10, border: "none",
                      background: isActive ? "#000" : "transparent",
                      color: isActive ? "#fff" : SLATE_500,
                      fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                      transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
                      boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.14)" : "none", ...FONT_BODY,
                    }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.75rem" }}
              >
                {filtered.length > 0 ? (
                  filtered.map((p, i) => <BlogCard key={p.id} post={p} index={i} />)
                ) : (
                  <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem 2rem", color: SLATE_400, ...FONT_BODY }}>
                    <p style={{ fontSize: "2.5rem", marginBottom: 12 }}>📭</p>
                    <p style={{ fontWeight: 600, color: SLATE_500 }}>No posts in this category yet.</p>
                    <button onClick={() => setActiveCategory("All")} style={{
                      marginTop: 20, padding: "9px 24px", borderRadius: 9999,
                      border: "1px solid rgba(0,0,0,0.1)", background: "transparent",
                      color: "#000", fontWeight: 600, cursor: "pointer", transition: "background 0.2s", ...FONT_BODY,
                    }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >View all posts</button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#000", padding: "7rem 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 500, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle,${TEAL_500}22 0%,transparent 70%)`,
          filter: "blur(70px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "#fff",
            letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0, ...FONT_DISPLAY }}>
            Ready to build something <span style={{ color: TEAL_500 }}>remarkable?</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, ...FONT_BODY }}>
            Let us turn your vision into a high-performance digital product.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <MagneticButton>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 30px",
                borderRadius: 9999, background: TEAL_500, color: "#fff", fontWeight: 700,
                fontSize: "0.9rem", textDecoration: "none", transition: "background 0.2s,transform 0.2s", ...FONT_BODY,
              }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = TEAL_400; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = TEAL_500; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <Rocket size={16} /> Start a Project
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/portfolio" style={{
                display: "inline-flex", alignItems: "center", gap: 7, padding: "13px 30px",
                borderRadius: 9999, border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.75)", fontWeight: 600, fontSize: "0.9rem",
                textDecoration: "none", transition: "border-color 0.2s,color 0.2s", ...FONT_BODY,
              }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = TEAL_500; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
              >
                View Our Work <ArrowRight size={14} />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
