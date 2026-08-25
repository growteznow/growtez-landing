"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FONT_BODY, SLATE_400, SLATE_500, TEAL_400, TEAL_500
} from "@/lib/constants";

export default function Footer({ forceRender = false }: { forceRender?: boolean }) {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.1)", background: "#000000", padding: "56px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr]" style={{ gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              <Image src="/logo.png" alt="Growtez" width={140} height={44} style={{ height: 38, width: "auto", objectFit: "contain" }} />
            </Link>
            <p style={{ marginTop: 16, fontSize: "0.875rem", lineHeight: 1.75, color: "#94a3b8", maxWidth: 280 }}>
              Building digital products that help ambitious businesses grow faster and smarter.
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              {[
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, href: "https://www.linkedin.com/company/100117056/", label: "LinkedIn" },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, href: "https://www.instagram.com/growteznow/", label: "Instagram" }
              ].map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", textDecoration: "none", transition: "color 0.2s, border-color 0.2s" }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = TEAL_500; e.currentTarget.style.borderColor = "rgba(20,184,166,0.4)"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          {/* Columns */}
          {[
            { heading: "Services", links: [{ label: "Web Development" }, { label: "App Development" }, { label: "AI Integration" }, { label: "Brand Identity" }] },
            { heading: "Company",  links: [{ label: "About", href: "/about" }, { label: "Portfolio", href: "/portfolio" }, { label: "Careers", href: "/careers" }, { label: "Blog", href: "/blog" }] },
            { heading: "Legal",    links: [{ label: "Privacy Policy", href: "/privacy-policy" }, { label: "Terms of Service", href: "/terms-of-service" }, { label: "Cookie Policy", href: "#" }] },
          ].map(col => (
            <div key={col.heading}>
              <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#cbd5e1", marginBottom: 20, ...FONT_BODY }}>{col.heading}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l: { label: string; href?: string }) => (
                  <li key={l.label}>
                    {l.href ? (
                      <Link href={l.href} style={{ fontSize: "0.875rem", color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = TEAL_400)}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#94a3b8")}>
                        {l.label}
                      </Link>
                    ) : (
                      <span style={{ fontSize: "0.875rem", color: "#94a3b8", cursor: "default" }}>
                        {l.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 28, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#64748b" }}>
          <span>© {new Date().getFullYear()} Growtez. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
