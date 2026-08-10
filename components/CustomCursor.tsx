"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current) return;

    // quickTo is highly optimised for rapid mousemove events — zero state updates
    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
    };

    // Expand dot on any hoverable element
    const onEnter = () => {
      gsap.to(dotRef.current, { scale: 2.5, opacity: 0.4, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, [role='button'], [data-magnetic]")) {
        onEnter();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, [role='button'], [data-magnetic]")) {
        onLeave();
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* The tiny solid dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference hidden lg:block"
      />
    </>
  );
}