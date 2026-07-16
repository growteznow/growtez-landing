"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Careers", href: "#careers" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;

    let lastY = 0;

    // Hide on scroll-down, reveal on scroll-up
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const currentY = self.scroll();
        const isScrollingDown = currentY > lastY && currentY > 80;

        gsap.to(navRef.current, {
          yPercent: isScrollingDown ? -120 : 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
        lastY = currentY;
      },
    });

    // Initial fade-in (delayed past the preloader)
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 2.8, ease: "power3.out" }
    );

    return () => st.kill();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[1000] glass border-b border-white/[0.04]"
        style={{ opacity: 0 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-display font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <span className="text-teal-400">G</span>rowtez
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-teal-400 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticButton strength={0.25}>
              <a
                href="#contact"
                className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-teal-400 transition-colors"
              >
                Let&apos;s Talk
              </a>
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden glass border-t border-white/[0.04] px-6 pb-6 pt-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-base font-medium text-slate-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="inline-block rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-900"
                  onClick={() => setMenuOpen(false)}
                >
                  Let&apos;s Talk
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
