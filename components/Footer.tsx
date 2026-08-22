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
              <Image src="/footer-logo.png" alt="Growtez" width={140} height={44} style={{ height: 38, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </Link>
            <p style={{ marginTop: 16, fontSize: "0.875rem", lineHeight: 1.75, color: "#94a3b8", maxWidth: 280 }}>
              Building digital products that help ambitious businesses grow faster and smarter.
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              {[
                { icon: <svg key="x" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.845L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, href: "#" },
                { icon: <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, href: "#" },
                { icon: <svg key="gh" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>, href: "#" },
              ].map((item, i) => (
                <a key={i} href={item.href} style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", textDecoration: "none", transition: "color 0.2s, border-color 0.2s" }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = TEAL_500; e.currentTarget.style.borderColor = "rgba(20,184,166,0.4)"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          {/* Columns */}
          {[
            { heading: "Services", links: [{ label: "Web Development", href: "/services" }, { label: "App Development", href: "/services" }, { label: "AI Integration", href: "/services" }, { label: "Brand Identity", href: "/services" }] },
            { heading: "Company",  links: [{ label: "About", href: "/about" }, { label: "Portfolio", href: "/portfolio" }, { label: "Careers", href: "/careers" }, { label: "Blog", href: "/blog" }] },
            { heading: "Legal",    links: [{ label: "Privacy Policy", href: "#" }, { label: "Terms of Service", href: "#" }, { label: "Cookie Policy", href: "#" }] },
          ].map(col => (
            <div key={col.heading}>
              <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#cbd5e1", marginBottom: 20, ...FONT_BODY }}>{col.heading}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ fontSize: "0.875rem", color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = TEAL_400)}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#94a3b8")}>
                      {l.label}
                    </Link>
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
