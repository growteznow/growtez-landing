"use client";

import { FONT_DISPLAY, FONT_BODY, SECTION_BG, PAGE_BG, SLATE_400, TEAL_400, TEAL_500, CARD_BG } from "@/lib/constants";
import { Pill } from "@/components/UI";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import { Mail, Phone, MapPin, CircleCheck, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main style={{ paddingTop: 120 }}>
      {/* ── CONTACT SECTION ── */}
      <section style={{ padding: "6rem 40px 8rem", background: PAGE_BG }}>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: 1280, margin: "0 auto", gap: 64, alignItems: "start" }}>
          <div>
            <Pill>Get In Touch</Pill>
            <div style={{ marginTop: 16 }}>
              <RevealText as="block" className="text-5xl md:text-6xl font-semibold tracking-tight" style={{ ...FONT_DISPLAY, color: "#000000" }}>Let&apos;s build</RevealText>
              <RevealText as="block" delay={0.1} className="text-5xl md:text-6xl font-semibold tracking-tight" style={{ ...FONT_DISPLAY, color: "#000000" }}>something great.</RevealText>
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

      {/* ── INTERNSHIP CTA ── */}
      <section style={{ padding: "8rem 40px", background: SECTION_BG }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Pill>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL_400, display: "inline-block", animation: "pulse 2s infinite" }} />
            Now Hiring — Summer 2026
          </Pill>
          <div style={{ marginTop: 24 }}>
            <RevealText as="block" className="text-6xl md:text-7xl font-semibold tracking-tight" style={{ ...FONT_DISPLAY, lineHeight: 1.05, color: "#000000" }}>Start your career</RevealText>
            <RevealText as="block" delay={0.1} className="text-6xl md:text-7xl font-semibold tracking-tight" style={{ ...FONT_DISPLAY, lineHeight: 1.05, color: "#000000" }}>with us.</RevealText>
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
    </main>
  );
}
