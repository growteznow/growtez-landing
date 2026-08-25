"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { doc, getDoc, collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowLeft, Clock, Calendar, Tag, AlertTriangle, Loader2, ArrowRight, Rocket } from "lucide-react";
import { FONT_DISPLAY, FONT_BODY, TEAL_400, TEAL_500 } from "@/lib/constants";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";

interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  author?: { name?: string; avatar?: string };
  publishedAt?: Timestamp | null;
  readingTime?: string;
  tags?: string[];
}

function formatDate(ts?: Timestamp | null): string {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts as unknown as string);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function categoryColor(cat?: string): string {
  const map: Record<string, string> = {
    "Web Development": "#2dd4bf",
    "UI/UX Design": "#a855f7",
    "App Development": "#38bdf8",
    "Digital Marketing": "#fbbf24",
    "AI Integration": "#34d399",
    "Branding": "#94a3b8",
  };
  return (cat && map[cat]) ? map[cat] : TEAL_400;
}

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const identifier = resolvedParams?.id ? decodeURIComponent(resolvedParams.id) : "";
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!identifier) return;
    async function load() {
      try {
        setLoading(true);
        // 1. Try finding by Firestore doc ID
        const docRef = doc(db, "blog_posts", identifier);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setPost({ id: snap.id, ...snap.data() } as BlogPost);
          return;
        }

        // 2. Fallback: try finding by slug field
        const q = query(collection(db, "blog_posts"), where("slug", "==", identifier));
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
          const matched = querySnap.docs[0];
          setPost({ id: matched.id, ...matched.data() } as BlogPost);
          return;
        }

        setError("Post not found.");
      } catch (err: unknown) {
        setError((err as Error).message ?? "Failed to load post.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [identifier]);

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(post?.title ?? "");

  if (loading) return (
    <main style={{ paddingTop: 140, minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000000" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, color: "#94a3b8", ...FONT_BODY }}>
        <Loader2 size={40} style={{ animation: "spin 1s linear infinite", color: TEAL_400 }} />
        <p style={{ fontSize: "1.05rem" }}>Loading article...</p>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    </main>
  );

  if (error || !post) return (
    <main style={{ paddingTop: 140, minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000000" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", padding: "0 40px" }}>
        <AlertTriangle size={48} style={{ color: "#ef4444" }} />
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#ffffff", ...FONT_DISPLAY }}>
          {error === "Post not found." ? "Post Not Found" : "Unable to Load Post"}
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 420, lineHeight: 1.7, ...FONT_BODY }}>
          {error ?? "The post you are looking for does not exist."}
        </p>
        <MagneticButton>
          <Link href="/blog" style={{
            marginTop: 12, display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 28px", borderRadius: 9999, background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#ffffff", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem",
            transition: "background 0.2s, border-color 0.2s", ...FONT_BODY,
          }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </MagneticButton>
      </div>
    </main>
  );

  const color = categoryColor(post.category);

  return (
    <main style={{ paddingTop: 100, background: "#000000", minHeight: "100vh", color: "#f8fafc" }}>
      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {post.coverImage && (
          <div style={{ height: "clamp(280px,46vw,540px)", position: "relative", overflow: "hidden" }}>
            <img src={post.coverImage} alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 50%, #000000 100%)"
            }} />
          </div>
        )}

        <div style={{ maxWidth: 820, margin: "0 auto", padding: post.coverImage ? "2.5rem 24px 0" : "3.5rem 24px 0" }}>
          <Link href="/blog" style={{
            display: "inline-flex", alignItems: "center", gap: 7, fontSize: "0.875rem",
            fontWeight: 600, color: "#94a3b8", textDecoration: "none", marginBottom: 28,
            transition: "color 0.2s", ...FONT_BODY,
          }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#94a3b8")}
          >
            <ArrowLeft size={15} /> Back to Blog
          </Link>

          {post.category && (
            <div style={{ marginBottom: 16 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                color, background: `${color}18`, border: `1px solid ${color}35`, padding: "5px 14px", borderRadius: 9999, ...FONT_BODY
              }}>
                {post.category}
              </span>
            </div>
          )}

          <h1 style={{ marginTop: 12, lineHeight: 1.12 }}>
            <RevealText as="block" className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#ffffff" }}>
              {post.title}
            </RevealText>
          </h1>

          <div style={{
            marginTop: 28, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
            paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.1)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%", overflow: "hidden",
                background: `${color}25`, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", border: `1px solid rgba(255,255,255,0.15)`
              }}>
                {post.author?.avatar
                  ? <img src={post.author.avatar} alt={post.author.name ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : (post.author?.name?.[0] ?? "G")}
              </div>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#ffffff", margin: 0, ...FONT_BODY }}>
                {post.author?.name ?? "Team Growtez"}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              {post.publishedAt && (
                <span style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: 6, ...FONT_BODY }}>
                  <Calendar size={13} style={{ color: TEAL_400 }} />{formatDate(post.publishedAt)}
                </span>
              )}
              {post.readingTime && (
                <span style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: 6, ...FONT_BODY }}>
                  <Clock size={13} style={{ color: TEAL_400 }} />{post.readingTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <section style={{ maxWidth: 820, margin: "0 auto", padding: "2.5rem 24px 6rem" }}>
        {post.excerpt && (
          <p style={{
            fontSize: "1.2rem", color: "#cbd5e1", lineHeight: 1.8, marginBottom: "2.5rem",
            paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", fontStyle: "italic", ...FONT_BODY
          }}>
            {post.excerpt}
          </p>
        )}

        {post.content ? (
          <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ fontSize: "1.1rem", lineHeight: 1.85, color: "#cbd5e1", ...FONT_BODY }} />
        ) : (
          <p style={{ color: "#94a3b8", fontStyle: "italic", ...FONT_BODY }}>No content available for this post.</p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{
            marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center"
          }}>
            <Tag size={15} style={{ color: TEAL_400 }} />
            {post.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                padding: "5px 14px", borderRadius: 9999, transition: "background 0.2s, color 0.2s", ...FONT_BODY
              }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share buttons */}
        <div style={{
          marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap"
        }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#94a3b8", ...FONT_BODY }}>Share this article:</span>
          {[
            { href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.845L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: "X / Twitter" },
            { href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, label: "LinkedIn" },
            { href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, label: "Facebook" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={`Share on ${s.label}`}
              style={{
                width: 38, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#cbd5e1", textDecoration: "none", transition: "all 0.2s"
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = TEAL_400;
                e.currentTarget.style.borderColor = `${TEAL_400}60`;
                e.currentTarget.style.background = `${TEAL_400}18`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = "#cbd5e1";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >{s.icon}</a>
          ))}
        </div>

        {/* Back button */}
        <div style={{ marginTop: "3.5rem" }}>
          <MagneticButton>
            <Link href="/blog" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
              borderRadius: 9999, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)",
              color: "#ffffff", fontWeight: 600, textDecoration: "none", fontSize: "0.875rem",
              transition: "background 0.2s, border-color 0.2s, transform 0.2s", ...FONT_BODY,
            }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              <ArrowLeft size={15} /> Back to Blog
            </Link>
          </MagneticButton>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: "#000000", padding: "6rem 24px", textAlign: "center", position: "relative",
        overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.08)"
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 500, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${TEAL_500}25 0%, transparent 70%)`,
          filter: "blur(70px)", pointerEvents: "none"
        }} />
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#ffffff",
            letterSpacing: "-0.04em", lineHeight: 1.15, margin: 0, ...FONT_DISPLAY
          }}>
            Ready to build something <span style={{ color: TEAL_400 }}>remarkable?</span>
          </h2>
          <p style={{ marginTop: 18, fontSize: "1rem", color: "#94a3b8", lineHeight: 1.7, ...FONT_BODY }}>
            Let us turn your vision into a high-performance digital product.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <MagneticButton>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 30px",
                borderRadius: 9999, background: TEAL_500, color: "#ffffff", fontWeight: 700,
                fontSize: "0.9rem", textDecoration: "none", transition: "background 0.2s, transform 0.2s", ...FONT_BODY,
              }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = TEAL_400; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = TEAL_500; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <Rocket size={16} /> Start a Project
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/blog" style={{
                display: "inline-flex", alignItems: "center", gap: 7, padding: "13px 30px",
                borderRadius: 9999, border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.9rem",
                textDecoration: "none", transition: "border-color 0.2s, color 0.2s, background 0.2s", ...FONT_BODY,
              }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = TEAL_400; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.background = "transparent"; }}
              >
                Explore More Articles <ArrowRight size={14} />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      <style>{`
        .blog-post-body {
          color: #cbd5e1;
        }
        .blog-post-body h1, .blog-post-body h2, .blog-post-body h3, .blog-post-body h4, .blog-post-body h5, .blog-post-body h6 {
          color: #ffffff;
          font-family: var(--font-outfit), system-ui, sans-serif;
          letter-spacing: -0.025em;
          font-weight: 700;
        }
        .blog-post-body h1 {
          font-size: 2rem;
          margin: 2.5rem 0 1.25rem;
        }
        .blog-post-body h2 {
          font-size: 1.75rem;
          margin: 2.5rem 0 1.2rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .blog-post-body h3 {
          font-size: 1.35rem;
          margin: 2rem 0 0.85rem;
        }
        .blog-post-body h4 {
          font-size: 1.15rem;
          margin: 1.5rem 0 0.6rem;
        }
        .blog-post-body p {
          margin: 0 0 1.5rem;
          line-height: 1.85;
          color: #cbd5e1;
        }
        .blog-post-body strong, .blog-post-body b {
          color: #ffffff;
          font-weight: 600;
        }
        .blog-post-body em, .blog-post-body i {
          color: #e2e8f0;
        }
        .blog-post-body ul, .blog-post-body ol {
          margin: 0 0 1.6rem 1.6rem;
          color: #cbd5e1;
        }
        .blog-post-body li {
          margin-bottom: 0.6rem;
          line-height: 1.75;
        }
        .blog-post-body a {
          color: ${TEAL_400};
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .blog-post-body a:hover {
          color: #5eead4;
        }
        .blog-post-body blockquote {
          border-left: 3px solid ${TEAL_400};
          background: rgba(255, 255, 255, 0.03);
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          border-radius: 0 12px 12px 0;
          color: #e2e8f0;
          font-style: italic;
        }
        .blog-post-body blockquote p:last-child {
          margin-bottom: 0;
        }
        .blog-post-body pre {
          background: #0f172a;
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin: 2rem 0;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .blog-post-body code {
          background: rgba(255, 255, 255, 0.08);
          color: #2dd4bf;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 0.88em;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
        .blog-post-body pre code {
          background: none;
          border: none;
          padding: 0;
          color: inherit;
          font-size: inherit;
        }
        .blog-post-body img {
          max-width: 100%;
          height: auto;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
        }
        .blog-post-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 0.95rem;
        }
        .blog-post-body th, .blog-post-body td {
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1rem;
          text-align: left;
        }
        .blog-post-body th {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          font-weight: 600;
        }
        .blog-post-body td {
          color: #cbd5e1;
        }
        .blog-post-body hr {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin: 3rem 0;
        }
      `}</style>
    </main>
  );
}