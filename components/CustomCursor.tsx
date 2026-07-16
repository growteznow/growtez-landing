"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    // quickTo is highly optimised for rapid mousemove events — zero state updates
    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.15, ease: "power3.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    // Expand ring on any hoverable element
    const onEnter = () => {
      gsap.to(ringRef.current, { scale: 2.5, opacity: 0.4, duration: 0.3, ease: "power2.out" });
      gsap.to(dotRef.current, { scale: 0.4, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(ringRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dotRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    const interactiveEls = document.querySelectorAll("a, button, [data-magnetic]");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* The tiny solid dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
      {/* The lagging ring — mix-blend-difference inverts it over any colour */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white mix-blend-difference"
      />
    </>
  );
}