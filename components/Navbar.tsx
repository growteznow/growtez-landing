"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { TEAL_500 } from "@/lib/constants";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // On homepage: transparent at top. Other pages: white
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  const navBg     = isTransparent ? "transparent" : "rgba(10,10,10,0.95)";
  const navBorder = isTransparent ? "transparent" : "rgba(255,255,255,0.05)";
  const logoColor = "#ffffff";
  const linkColor = "#ffffff";
  const mobileDrawerBg     = "#0a0a0a";
  const mobileDrawerBorder = "rgba(255,255,255,0.05)";
  const mobileLinkColor    = "#ffffff";
  const dropdownBg         = "#0a0a0a";
  const dropdownBorder     = "rgba(255,255,255,0.06)";
  const dropdownLinkColor  = "#cbd5e1";
  // suppress unused var warning
  void isHome;


  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 1; // px of scroll needed to trigger hide/show

    // Initialize scrolled state based on initial load position
    setScrolled(window.scrollY > 50);

    const handleScroll = () => {
      const currentY = window.scrollY;
      
      setScrolled(currentY > 50);

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
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: navBg,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${navBorder}`,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "background 0.4s, border-color 0.4s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Image 
            src="/logo.png" 
            alt="Growtez" 
            width={130} 
            height={40} 
            style={{ 
              height: 36, 
              width: "auto", 
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
              transition: "filter 0.4s"
            }} 
            priority 
          />
        </Link>
        
        {/* Desktop links */}
        <ul style={{ gap: 32, listStyle: "none", margin: 0, padding: 0 }} className="hidden md:flex items-center">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{
                  fontSize: "0.9rem", fontWeight: 600,
                  color: pathname === l.href ? TEAL_500 : linkColor,
                  textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = TEAL_500)}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = pathname === l.href ? TEAL_500 : linkColor)}
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* More dropdown */}
          <li style={{ position: "relative" }} onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button
              style={{ 
                background: moreOpen ? "rgba(255,255,255,0.15)" : "transparent", 
                borderRadius: 999,
                border: "none", 
                fontSize: "0.85rem", 
                fontWeight: 600, 
                color: linkColor, 
                display: "flex", 
                alignItems: "center", 
                gap: 6, 
                cursor: "pointer", 
                transition: "all 0.2s", 
                padding: "8px 16px",
                marginLeft: "-16px"
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = TEAL_500)}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = linkColor)}>
              MORE
              <motion.svg 
                animate={{ rotate: moreOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"/>
              </motion.svg>
            </button>
            <AnimatePresence>
            {moreOpen && (
              <div style={{ position: "absolute", top: "100%", right: 0, paddingTop: 8 }}>
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0, height: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                    visible: { opacity: 1, height: "auto", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], staggerChildren: 0.08, delayChildren: 0.15 } }
                  }}
                  style={{ 
                    background: "#ffffff", 
                    borderRadius: 12, 
                    boxShadow: "0 12px 40px -8px rgba(0,0,0,0.3)", 
                    minWidth: 130,
                    overflow: "hidden"
                  }}
                >
                  <div style={{ padding: "8px 0", display: "flex", flexDirection: "column", gap: 2 }}>
                    {moreLinks.map(l => (
                      <motion.div
                        key={l.href}
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <Link href={l.href}
                          style={{ 
                            display: "block", 
                            padding: "6px 16px", 
                            fontSize: "0.875rem", 
                            fontWeight: 600, 
                            color: "#000000", 
                            textDecoration: "none", 
                            transition: "color 0.15s" 
                          }}
                          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = TEAL_500)}
                          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#000000")}
                        >
                          {l.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
            </AnimatePresence>
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
