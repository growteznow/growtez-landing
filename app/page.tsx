"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import gsap from "gsap";

import { FONT_DISPLAY, FONT_BODY, TEAL_400, TEAL_500 } from "@/lib/constants";
import { services, portfolio, testimonials } from "@/lib/data";
import InteractiveBackground from "@/components/InteractiveBackground";
import MouseGlow from "@/components/MouseGlow";

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

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    // Animate the text sliding up from behind an overflow-hidden mask
    const elements = heroRef.current.querySelectorAll(".hero-reveal");
    gsap.fromTo(
      elements,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.2, ease: "power4.out", delay: 0.1 }
    );
  }, []);

  return (
    <div className="w-full flex flex-col" style={{
      background: "#ffffff url('/bg2.png') center/cover fixed no-repeat",
    }}>
      {/* ── HERO ── */}
      <section style={{
        position: "relative", minHeight: "100vh", width: "100%",
        background: "transparent",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
      }}>
        <InteractiveBackground />
        <div ref={heroRef} style={{
          flex: "0 0 auto",
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", padding: "40px 40px 80px",
          position: "relative", zIndex: 1,
        }}>
          {/* Line 1 of H1 */}
          <div style={{ overflow: "hidden", paddingBottom: 4 }}>
            <h1 className="hero-reveal" style={{ margin: 0, lineHeight: 1.0 }}>
              <span className="block" style={{
                fontSize: "clamp(2.4rem, 5vw, 5rem)", fontWeight: 700,
                color: "#000000", letterSpacing: "-0.04em", ...FONT_DISPLAY,
              }}>We create solutions</span>
            </h1>
          </div>
          
          {/* Line 2 of H1 */}
          <div style={{ overflow: "hidden", paddingBottom: 8, marginTop: 4 }}>
            <h1 className="hero-reveal" style={{ margin: 0, lineHeight: 1.0 }}>
              <span className="block" style={{
                fontSize: "clamp(2.4rem, 5vw, 5rem)", fontWeight: 700,
                color: "#000000", letterSpacing: "-0.04em", ...FONT_DISPLAY,
              }}>for your business</span>
            </h1>
          </div>

          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ overflow: "hidden", paddingBottom: 4 }}>
              <p className="hero-reveal" style={{
                margin: 0, color: "#000000",
                fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                fontWeight: 400, lineHeight: 1.7, ...FONT_BODY,
              }}>
                From concept to launch, Growtez crafts web apps,
              </p>
            </div>
            <div style={{ overflow: "hidden", paddingBottom: 8 }}>
              <p className="hero-reveal" style={{
                margin: 0, color: "#000000",
                fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                fontWeight: 400, lineHeight: 1.7, ...FONT_BODY,
              }}>
                mobile products, and AI systems that actually move the needle.
              </p>
            </div>
          </div>

          <div style={{ overflow: "hidden", marginTop: 24, paddingTop: 4, paddingBottom: 12 }}>
            <div className="hero-reveal" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 30px", borderRadius: 9999,
                background: TEAL_500, color: "#ffffff",
                fontSize: "0.9rem", fontWeight: 700, textDecoration: "none",
                transition: "background 0.2s", ...FONT_BODY,
              }}
                onMouseEnter={e => (e.currentTarget.style.background = TEAL_400)}
                onMouseLeave={e => (e.currentTarget.style.background = TEAL_500)}>
                Start a Project <ArrowRight size={15} />
              </Link>
              <Link href="/portfolio" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 30px", borderRadius: 9999,
                background: "transparent", border: "1px solid rgba(0,0,0,0.1)",
                color: "#334155", fontSize: "0.9rem", fontWeight: 600,
                textDecoration: "none", transition: "border-color 0.2s, color 0.2s", ...FONT_BODY,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = TEAL_500; e.currentTarget.style.color = TEAL_500; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "#334155"; }}>
                View Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{
        position: "relative", minHeight: "100vh", width: "100%",
        background: "transparent",
        display: "flex", alignItems: "center", padding: "100px 60px",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ marginBottom: 44, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <SectionLabel>Our Expertise</SectionLabel>
              <h2 style={{
                margin: 0, color: "#000000",
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, ...FONT_DISPLAY,
              }}>
                Services built<br />
                <span style={{ color: TEAL_500 }}>for growth.</span>
              </h2>
            </div>
            <Link href="/services" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 26px", borderRadius: 9999,
              border: "1px solid rgba(0,0,0,0.1)",
              color: "#000", fontSize: "0.875rem", fontWeight: 600,
              textDecoration: "none", transition: "background 0.2s, border-color 0.2s", ...FONT_BODY,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = TEAL_500; e.currentTarget.style.borderColor = TEAL_500; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "#000"; }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {services.slice(0, 3).map((s, i) => (
              <MouseGlow key={i} className="rounded-[20px]" color="rgba(20,184,166,0.06)">
                <div style={{
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: 20, padding: "28px 24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  transition: "border-color 0.25s, box-shadow 0.25s, transform 0.2s",
                  height: "100%",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(20,184,166,0.4)"; e.currentTarget.style.boxShadow = "0 8px 32px -8px rgba(20,184,166,0.2)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.07)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(20,184,166,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: TEAL_500, marginBottom: 18,
                  }}>{s.icon}</div>
                  <span style={{
                    display: "inline-block", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: TEAL_500, border: "1px solid rgba(20,184,166,0.25)",
                    borderRadius: 9999, padding: "3px 10px", marginBottom: 12, ...FONT_BODY,
                  }}>{s.tag}</span>
                  <h3 style={{ color: "#000000", fontSize: "1.05rem", fontWeight: 700, marginBottom: 8, ...FONT_DISPLAY }}>{s.title}</h3>
                  <p style={{ color: "#64748b", fontSize: "0.84rem", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </MouseGlow>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section style={{
        position: "relative", minHeight: "100vh", width: "100%",
        background: "transparent",
        display: "flex", alignItems: "center", padding: "100px 60px",
      }}>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
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
      <section style={{
        position: "relative", minHeight: "100vh", width: "100%",
        background: "transparent",
        display: "flex", alignItems: "center", padding: "100px 60px",
      }}>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
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
  );
}