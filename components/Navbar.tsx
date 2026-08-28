"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { X, MoreHorizontal } from "lucide-react";
import { TEAL_400, TEAL_500, FONT_DISPLAY } from "@/lib/constants";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // On homepage: transparent at top. Other pages: white
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled && !menuOpen;

  const navBg     = isTransparent ? "transparent" : "rgba(10,10,10,0.95)";
  const navBorder = isTransparent ? "transparent" : "rgba(255,255,255,0.05)";
  const navBlur   = isTransparent ? "none" : "blur(20px)";
  const logoColor = "#ffffff";
  const linkColor = "#ffffff";
  const mobileDrawerBg     = "#0a0a0a";
  const mobileDrawerBorder = "rgba(255,255,255,0.05)";
  const mobileLinkColor    = "#ffffff";
  // suppress unused var warning
  void isHome;


  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 1; // px of scroll needed to trigger hide/show

    // Initialize state asynchronously to avoid hydration mismatch and sync setState lint errors
    setTimeout(() => {
      setScrolled(window.scrollY > 50);
    }, 0);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

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
    { label: "Tools",    href: "/tools"   },
  ];

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: navBg,
        backdropFilter: navBlur, WebkitBackdropFilter: navBlur,
        borderBottom: `1px solid ${navBorder}`,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "background 0.4s, border-color 0.4s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-4 md:py-[18px] flex items-center justify-between w-full">
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
              objectFit: "contain"
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
          <li style={{ position: "relative", perspective: 1000 }} onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button
              style={{ 
                background: "transparent", 
                border: "none", 
                color: moreOpen ? TEAL_500 : linkColor, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                cursor: "pointer", 
                transition: "color 0.2s", 
                padding: "8px", // small padding for hit area
                margin: 0
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.color = TEAL_500;
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!moreOpen) {
                  e.currentTarget.style.color = linkColor;
                }
              }}
              aria-label="More options"
            >
              <motion.div
                animate={{ color: moreOpen ? TEAL_500 : linkColor }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <MoreHorizontal size={22} strokeWidth={2} />
              </motion.div>
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
                    background: "#121212", 
                    borderRadius: 12, 
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 12px 40px -8px rgba(0,0,0,0.5)", 
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
                            color: "#ffffff", 
                            textDecoration: "none", 
                            transition: "color 0.15s" 
                          }}
                          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = TEAL_500)}
                          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#ffffff")}
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
          {menuOpen ? (
            <X size={26} />
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="9" x2="20" y2="9" />
              <line x1="4" y1="15" x2="20" y2="15" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 68px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            style={{ 
              position: "absolute", 
              top: "100%", 
              left: 0, 
              width: "100%", 
              background: mobileDrawerBg, 
              borderTop: `1px solid ${mobileDrawerBorder}`,
              overflowY: "auto"
            }}
            className="flex flex-col items-center h-full px-5 py-10"
            data-lenis-prevent="true"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm mt-auto mb-auto">
              {[...links, ...moreLinks].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 + 0.1, ease: "easeOut" }}
                >
                  <Link href={l.href} onClick={() => setMenuOpen(false)}
                    style={{ display: "block", fontSize: "2rem", fontWeight: 500, color: mobileLinkColor, textDecoration: "none", ...FONT_DISPLAY }}
                    className="hover:text-teal-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
