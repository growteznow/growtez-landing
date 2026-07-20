"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { FONT_DISPLAY, TEAL_400, TEAL_500 } from "@/lib/constants";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  // On homepage: transparent dark bg on dark slides. Other pages: white
  const isHome = pathname === "/";

  // Both home and other pages: white nav bar
  const navBg     = isHome ? "transparent" : "#ffffff";
  const navBorder = isHome ? "transparent" : "rgba(0,0,0,0.05)";
  const logoColor = "#000000";
  const linkColor = "#000000";
  const mobileDrawerBg     = "#ffffff";
  const mobileDrawerBorder = "rgba(0,0,0,0.05)";
  const mobileLinkColor    = "#000000";
  const dropdownBg         = "#ffffff";
  const dropdownBorder     = "rgba(0,0,0,0.06)";
  const dropdownLinkColor  = "#475569";
  // suppress unused var warning
  void isHome;

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: "power3.out" });
  }, []);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 1; // px of scroll needed to trigger hide/show

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY + threshold) {
        setHidden(true);
      } else if (currentY < lastScrollY - threshold) {
        setHidden(false);
      }
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home",      href: "/"          },
    { label: "Services",  href: "/services"  },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing",   href: "/pricing"   },
    { label: "Contact",   href: "/contact"   },
  ];
  
  const moreLinks = [
    { label: "About Us", href: "/about"   },
    { label: "Blog",     href: "/blog"    },
    { label: "Careers",  href: "/careers" },
  ];

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, opacity: 0,
        background: navBg,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${navBorder}`,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "background 0.4s, border-color 0.4s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ fontSize: "1.5rem", fontWeight: 800, color: logoColor, textDecoration: "none", letterSpacing: "-0.03em", transition: "color 0.3s", ...FONT_DISPLAY }}>
          growtez
        </Link>
        
        {/* Desktop links */}
        <ul style={{ gap: 32, listStyle: "none", margin: 0, padding: 0 }} className="hidden md:flex">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{
                  fontSize: "0.9rem", fontWeight: 600,
                  color: pathname === l.href ? TEAL_500 : linkColor,
                  textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = TEAL_500)}
                onMouseLeave={e => (e.currentTarget.style.color = pathname === l.href ? TEAL_500 : linkColor)}
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* More dropdown */}
          <li style={{ position: "relative" }} onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button
              style={{ background: "none", border: "none", fontSize: "0.9rem", fontWeight: 600, color: linkColor, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", transition: "color 0.2s", padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = TEAL_500)}
              onMouseLeave={e => (e.currentTarget.style.color = linkColor)}>
              More
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {moreOpen && (
              <div style={{ position: "absolute", top: "100%", right: 0, paddingTop: 14 }}>
                <div style={{ background: dropdownBg, borderRadius: 12, padding: "8px 0", border: `1px solid ${dropdownBorder}`, boxShadow: "0 12px 40px -8px rgba(0,0,0,0.3)", minWidth: 160 }}>
                  {moreLinks.map(l => (
                    <Link key={l.href} href={l.href}
                      style={{ display: "block", padding: "10px 20px", fontSize: "0.875rem", fontWeight: 500, color: dropdownLinkColor, textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = TEAL_500)}
                      onMouseLeave={e => (e.currentTarget.style.color = dropdownLinkColor)}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        </ul>
        
        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: logoColor, padding: 0, cursor: "pointer" }} className="md:hidden block">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      
      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ padding: "12px 40px 24px", borderTop: `1px solid ${mobileDrawerBorder}`, background: mobileDrawerBg }}>
          {[...links, ...moreLinks].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "14px 0", fontSize: "1.05rem", fontWeight: 600, color: mobileLinkColor, textDecoration: "none", borderBottom: `1px solid ${mobileDrawerBorder}` }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
