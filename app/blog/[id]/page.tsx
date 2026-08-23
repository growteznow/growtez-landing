"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowLeft, Clock, Calendar, Tag, Share2, AlertTriangle, Loader2 } from "lucide-react";
import { FONT_DISPLAY, FONT_BODY, TEAL_500, SLATE_400, SLATE_500, PAGE_BG } from "@/lib/constants";
import RevealText from "@/components/RevealText";

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
    "Web Development": "#0F8A8A",
    "UI/UX Design": "#7c3aed",
    "App Development": "#0891b2",
    "Digital Marketing": "#b45309",
    "AI Integration": "#059669",
    "Branding": "#64748b",
  };
  return (cat && map[cat]) ? map[cat] : TEAL_500;
}

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const postId = resolvedParams?.id ?? "";
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;
    async function load() {
      try {
        setLoading(true);
        const snap = await getDoc(doc(db, "blog_posts", postId));
        if (!snap.exists()) {
          setError("Post not found.");
        } else {
          setPost({ id: snap.id, ...snap.data() } as BlogPost);
        }
      } catch (err: unknown) {
        setError((err as Error).message ?? "Failed to load post.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [postId]);

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(post?.title ?? "");

  if (loading) return (
    <main style={{ paddingTop: 120, minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, color: SLATE_400, ...FONT_BODY }}>
        <Loader2 size={36} style={{ animation: "spin 1s linear infinite", color: TEAL_500 }} />
        <p>Loading article...</p>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    </main>
  );

  if (error || !post) return (
    <main style={{ paddingTop: 120, minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center", padding: "0 40px" }}>
        <AlertTriangle size={44} style={{ color: "#ef4444" }} />
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", ...FONT_DISPLAY }}>
          {error === "Post not found." ? "Post Not Found" : "Unable to Load Post"}
        </h1>
        <p style={{ color: SLATE_500, maxWidth: 400, lineHeight: 1.7, ...FONT_BODY }}>{error ?? "The post you are looking for does not exist."}</p>
        <Link href="/blog" style={{
          marginTop: 8, display: "inline-flex", alignItems: "center", gap: 7,
          padding: "10px 24px", borderRadius: 9999, background: "#000",
          color: "#fff", fontWeight: 600, textDecoration: "none", fontSize: "0.875rem", ...FONT_BODY,
        }}>
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    </main>
  );

  const color = categoryColor(post.category);

  return (
    <main style={{ paddingTop: 100, background: PAGE_BG }}>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {post.coverImage && (
          <div style={{ height: "clamp(260px,45vw,520px)", position: "relative", overflow: "hidden" }}>
            <img src={post.coverImage} alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(255,255,255,0) 60%, #ffffff 100%)" }} />
          </div>
        )}

        <div style={{ maxWidth: 780, margin: "0 auto", padding: post.coverImage ? "2rem 40px 0" : "3rem 40px 0" }}>
          <Link href="/blog" style={{
            display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.85rem",
            fontWeight: 600, color: SLATE_500, textDecoration: "none", marginBottom: 28,
            transition: "color 0.2s", ...FONT_BODY,
          }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#000")}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = SLATE_500)}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {post.category && (
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                color, background: `${color}12`, padding: "4px 12px", borderRadius: 9999, ...FONT_BODY }}>
                {post.category}
              </span>
            </div>
          )}

          <h1 style={{ marginTop: 8, lineHeight: 1.1 }}>
            <RevealText as="block" className="text-4xl md:text-6xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000" }}>
              {post.title}
            </RevealText>
          </h1>

          <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
            paddingBottom: 24, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden",
                background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.875rem", fontWeight: 700, color, border: `1px solid ${color}25` }}>
                {post.author?.avatar
                  ? <img src={post.author.avatar} alt={post.author.name ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : (post.author?.name?.[0] ?? "G")}
              </div>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0f172a", margin: 0, ...FONT_BODY }}>
                {post.author?.name ?? "Team Growtez"}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              {post.publishedAt && (
                <span style={{ fontSize: "0.8rem", color: SLATE_400, display: "flex", alignItems: "center", gap: 5, ...FONT_BODY }}>
                  <Calendar size={12} />{formatDate(post.publishedAt)}
                </span>
              )}
              {post.readingTime && (
                <span style={{ fontSize: "0.8rem", color: SLATE_400, display: "flex", alignItems: "center", gap: 5, ...FONT_BODY }}>
                  <Clock size={12} />{post.readingTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "2.5rem 40px 6rem" }}>
        {post.excerpt && (
          <p style={{ fontSize: "1.15rem", color: SLATE_500, lineHeight: 1.8, marginBottom: "2rem",
            paddingBottom: "2rem", borderBottom: "1px solid rgba(0,0,0,0.06)", ...FONT_BODY }}>
            {post.excerpt}
          </p>
        )}

        {post.content ? (
          <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#334155", ...FONT_BODY }} />
        ) : (
          <p style={{ color: SLATE_400, fontStyle: "italic", ...FONT_BODY }}>No content available for this post.</p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <Tag size={14} style={{ color: SLATE_400 }} />
            {post.tags.map((tag) => (
              <span key={tag} style={{ fontSize: "0.8rem", fontWeight: 600, color: SLATE_500,
                background: "#f1f5f9", padding: "4px 12px", borderRadius: 9999, ...FONT_BODY }}>#{tag}</span>
            ))}
          </div>
        )}

        <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: SLATE_500, ...FONT_BODY }}>Share:</span>
          {[
            { href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.845L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: "X / Twitter" },
            { href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, label: "LinkedIn" },
            { href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, label: "Facebook" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={`Share on ${s.label}`}
              style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: SLATE_500, textDecoration: "none", transition: "color 0.2s,border-color 0.2s,background 0.2s" }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = TEAL_500; e.currentTarget.style.borderColor = `${TEAL_500}40`; e.currentTarget.style.background = `${TEAL_500}08`; }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = SLATE_500; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.background = "transparent"; }}
            >{s.icon}</a>
          ))}
        </div>

        <div style={{ marginTop: "3rem" }}>
          <Link href="/blog" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 26px",
            borderRadius: 9999, border: "1px solid rgba(0,0,0,0.1)", background: "transparent",
            color: "#000", fontWeight: 600, textDecoration: "none", fontSize: "0.875rem",
            transition: "background 0.2s,border-color 0.2s", ...FONT_BODY,
          }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; }}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </section>

      <style>{`
        .blog-post-body h2{font-size:1.65rem;font-weight:700;color:#0f172a;margin:2.5rem 0 1rem;letter-spacing:-0.02em}
        .blog-post-body h3{font-size:1.3rem;font-weight:700;color:#0f172a;margin:2rem 0 .75rem}
        .blog-post-body h4{font-size:1.1rem;font-weight:700;color:#0f172a;margin:1.5rem 0 .5rem}
        .blog-post-body p{margin:0 0 1.4rem}
        .blog-post-body ul,.blog-post-body ol{margin:0 0 1.4rem 1.5rem}
        .blog-post-body li{margin-bottom:.5rem}
        .blog-post-body a{color:${TEAL_500};text-decoration:underline}
        .blog-post-body blockquote{border-left:3px solid ${TEAL_500};padding:.5rem 1.25rem;margin:1.75rem 0;color:${SLATE_500};font-style:italic}
        .blog-post-body pre{background:#0f172a;color:#e2e8f0;border-radius:12px;padding:1.25rem;overflow-x:auto;margin:1.75rem 0;font-size:.875rem}
        .blog-post-body code{background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:.875em}
        .blog-post-body pre code{background:none;padding:0}
        .blog-post-body img{max-width:100%;border-radius:12px;margin:1.5rem 0}
        .blog-post-body hr{border:none;border-top:1px solid rgba(0,0,0,.08);margin:2.5rem 0}
      `}</style>
    </main>
  );
}