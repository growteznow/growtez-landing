"use client";

import { use, useEffect, useRef } from "react";
import Link from "next/link";
// @ts-expect-error: notFound might not be typed for client components but exists at runtime
import { useRouter, notFound } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/lib/data";
import { FONT_DISPLAY, FONT_BODY, TEAL_500, SLATE_400, SLATE_500 } from "@/lib/constants";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ────────────────────────────────────────────────────────────────── */
interface PortfolioItem {
  slug: string;
  src: string;
  title: string;
  category: string;
  year: string;
  client?: string;
  role?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  gallery?: string[];
  coverImage?: string;
  liveUrl?: string;
}

/* ─── Page Component ───────────────────────────────────────────────────────── */
export default function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = use(params);
  const slug = decodeURIComponent(rawSlug);

  const project = (portfolio as PortfolioItem[]).find((p) => p.slug === slug);
  if (!project) {
    notFound();
    return null;
  }

  /* Find next project for the footer CTA */
  const currentIdx = (portfolio as PortfolioItem[]).findIndex((p) => p.slug === slug);
  const nextProject = (portfolio as PortfolioItem[])[(currentIdx + 1) % portfolio.length] as PortfolioItem;

  return (
    <main style={{ background: "#fff" }}>
      <HeroSection project={project} />
      <OverviewSection project={project} />
      <ChallengeSection project={project} />
      <GallerySection project={project} />
      <SolutionSection project={project} />
      <NextProjectSection next={nextProject} />
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ *
 *  HERO SECTION — Full-viewport, massive title, cover image reveal
 * ═══════════════════════════════════════════════════════════════════════════ */
function HeroSection({ project }: { project: PortfolioItem }) {
  const sectionRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const coverImgRef = useRef<HTMLImageElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Meta items fade in staggered */
      if (metaRef.current) {
        const items = metaRef.current.querySelectorAll(".meta-item");
        gsap.fromTo(items,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, delay: 0.6, ease: "power3.out" }
        );
      }

      /* Cover image scales down from 1.15 and clips into view */
      if (coverRef.current && coverImgRef.current) {
        gsap.fromTo(coverRef.current,
          { clipPath: "inset(8% 8% 8% 8% round 24px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            duration: 1.4, delay: 0.3, ease: "power3.inOut",
          }
        );
        gsap.fromTo(coverImgRef.current,
          { scale: 1.15 },
          { scale: 1, duration: 1.8, delay: 0.3, ease: "power3.out" }
        );
      }

      /* Cover parallax on scroll */
      if (coverImgRef.current && coverRef.current) {
        gsap.to(coverImgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: coverRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const meta = [
    { label: "Client", value: project.client || project.title },
    { label: "Category", value: project.category },
    { label: "Year", value: project.year },
  ];

  return (
    <section ref={sectionRef} style={{ paddingTop: 140, background: "#fff" }}>
      {/* Title */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Back button */}
        <div style={{ marginBottom: 40 }}>
          <Link
            href="/portfolio"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: SLATE_500, textDecoration: "none", fontSize: 14, fontWeight: 500,
              transition: "color 0.2s", ...FONT_BODY,
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#000")}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = SLATE_500)}
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </div>

        <h1 style={{ margin: 0, lineHeight: 1.02, letterSpacing: "-0.04em" }}>
          <RevealText
            as="block"
            className="text-[clamp(2.8rem,8vw,7rem)] font-semibold tracking-tighter"
            style={{ ...FONT_DISPLAY, color: "#000" }}
          >
            {project.title}
          </RevealText>
        </h1>

        {/* Meta row */}
        <div ref={metaRef} style={{
          display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "32px 48px",
          marginTop: 40, paddingBottom: 48,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}>
          {meta.map((m) => (
            <div key={m.label} className="meta-item">
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL_500, marginBottom: 6, ...FONT_BODY }}>
                {m.label}
              </p>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#000", margin: 0, ...FONT_BODY }}>
                {m.value}
              </p>
            </div>
          ))}

          {project.liveUrl && (
            <div className="meta-item" style={{ marginLeft: "auto" }}>
              <MagneticButton>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "14px 28px", borderRadius: 9999,
                    background: "#000", color: "#fff",
                    fontSize: 14, fontWeight: 600, textDecoration: "none",
                    transition: "background 0.3s, transform 0.3s",
                    ...FONT_BODY,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = TEAL_500; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#000"; }}
                >
                  Visit Project <ArrowUpRight size={16} />
                </a>
              </MagneticButton>
            </div>
          )}
        </div>
      </div>

      {/* Cover Image */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 24px 0" }}>
        <div
          ref={coverRef}
          style={{
            width: "100%",
            borderRadius: 24,
            overflow: "hidden",
            position: "relative",
            aspectRatio: "16 / 9",
            background: "#0a0a0a",
          }}
        >
          <img
            ref={coverImgRef}
            src={project.coverImage || project.src}
            alt={project.title}
            style={{
              width: "100%",
              height: "120%",
              objectFit: "cover",
              display: "block",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ *
 *  OVERVIEW SECTION — Two-column: description left, details right
 * ═══════════════════════════════════════════════════════════════════════════ */
function OverviewSection({ project }: { project: PortfolioItem }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".overview-text",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".overview-text", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!project.description) return null;

  return (
    <section ref={sectionRef} style={{ padding: "120px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column" }}>

        <div className="overview-text">
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase", color: TEAL_500, marginBottom: 20, ...FONT_BODY,
          }}>
            Overview
          </p>
          <p style={{
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
            lineHeight: 1.5, color: "#1a1a1a", fontWeight: 400, margin: 0,
            ...FONT_DISPLAY,
          }}>
            {project.description}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ *
 *  CHALLENGE SECTION — Full-width dark band with large text
 * ═══════════════════════════════════════════════════════════════════════════ */
function ChallengeSection({ project }: { project: PortfolioItem }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = sectionRef.current?.querySelectorAll(".challenge-line");
      if (lines) {
        gsap.fromTo(lines,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current!, start: "top 70%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!project.challenge) return null;

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "120px 24px",
        background: "#0a0a0a",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p className="challenge-line" style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.2em",
          textTransform: "uppercase", color: TEAL_500, marginBottom: 32, ...FONT_BODY,
        }}>
          The Challenge
        </p>
        <p className="challenge-line" style={{
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          lineHeight: 1.4, fontWeight: 300, color: "#e5e5e5", margin: 0,
          letterSpacing: "-0.02em",
          ...FONT_DISPLAY,
        }}>
          {project.challenge}
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ *
 *  GALLERY SECTION — Staggered image grid with scroll-triggered reveals
 * ═══════════════════════════════════════════════════════════════════════════ */
function GallerySection({ project }: { project: PortfolioItem }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = sectionRef.current?.querySelectorAll(".gallery-img");
      if (images) {
        images.forEach((img, i) => {
          /* Each image reveals with a clip-path wipe and subtle scale */
          gsap.fromTo(img,
            { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.4,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: img,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );

          /* Parallax drift on each image */
          const innerImg = img.querySelector("img");
          if (innerImg) {
            gsap.to(innerImg, {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            });
          }
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!project.gallery || project.gallery.length === 0) return null;

  return (
    <section ref={sectionRef} style={{ padding: "80px 24px 120px", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* First image — full width */}
        {project.gallery[0] && (
          <div
            className="gallery-img"
            style={{
              width: "100%",
              borderRadius: 20,
              overflow: "hidden",
              position: "relative",
              aspectRatio: "16 / 9",
              background: "#111",
              marginBottom: 24,
            }}
          >
            <img
              src={project.gallery[0]}
              alt={`${project.title} showcase 1`}
              style={{ width: "100%", height: "120%", objectFit: "cover", display: "block" }}
            />
          </div>
        )}

        {/* Second and third — side by side */}
        {project.gallery.length > 1 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
          }} className="md:!grid-cols-2">
            {project.gallery.slice(1, 3).map((img, i) => (
              <div
                key={i}
                className="gallery-img"
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                  aspectRatio: "4 / 3",
                  background: "#111",
                }}
              >
                <img
                  src={img}
                  alt={`${project.title} showcase ${i + 2}`}
                  style={{ width: "100%", height: "120%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ *
 *  SOLUTION SECTION — Light background, large elegant text
 * ═══════════════════════════════════════════════════════════════════════════ */
function SolutionSection({ project }: { project: PortfolioItem }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll(".solution-reveal");
      if (els) {
        gsap.fromTo(els,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current!, start: "top 70%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!project.solution) return null;

  return (
    <section
      ref={sectionRef}
      style={{ padding: "120px 24px", background: "#f8fafc" }}
    >
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr", gap: 48,
      }} className="md:!grid-cols-[auto_1fr]">

        <div className="solution-reveal" style={{ maxWidth: 200 }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase", color: TEAL_500, margin: 0, ...FONT_BODY,
          }}>
            The Solution
          </p>
        </div>

        <div className="solution-reveal">
          <p style={{
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
            lineHeight: 1.55, fontWeight: 400, color: "#1a1a1a", margin: 0,
            ...FONT_DISPLAY,
          }}>
            {project.solution}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ *
 *  NEXT PROJECT SECTION — Large footer CTA to the next case study
 * ═══════════════════════════════════════════════════════════════════════════ */
function NextProjectSection({ next }: { next: PortfolioItem }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Title slides up */
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current!, start: "top 70%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: "relative",
      overflow: "hidden",
      background: "#0a0a0a",
      minHeight: "70vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "120px 24px",
    }}>
      {/* Background image with opacity */}
      <div
        ref={bgRef}
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${next.coverImage || next.src})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.08,
          transition: "opacity 0.6s ease",
        }}
      />

      <Link
        href={`/portfolio/${next.slug}`}
        style={{
          textDecoration: "none", color: "inherit",
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", position: "relative", zIndex: 1,
          gap: 24,
        }}
        onMouseEnter={() => {
          if (bgRef.current) bgRef.current.style.opacity = "0.2";
          if (titleRef.current) titleRef.current.style.transform = "scale(1.03)";
        }}
        onMouseLeave={() => {
          if (bgRef.current) bgRef.current.style.opacity = "0.08";
          if (titleRef.current) titleRef.current.style.transform = "scale(1)";
        }}
      >
        <p style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.25em",
          textTransform: "uppercase", color: TEAL_500, margin: 0, ...FONT_BODY,
        }}>
          Next Project
        </p>

        <h2
          ref={titleRef}
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            fontWeight: 600, color: "#fff", margin: 0,
            letterSpacing: "-0.04em", lineHeight: 1.05,
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            ...FONT_DISPLAY,
          }}
        >
          {next.title}
        </h2>

        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          color: SLATE_400, fontSize: 14, fontWeight: 500, ...FONT_BODY,
          marginTop: 8,
        }}>
          View Project <ArrowUpRight size={16} />
        </div>
      </Link>
    </section>
  );
}
