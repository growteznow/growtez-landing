"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Use 'block' to make the container a block element (for multi-line headings) */
  as?: "inline" | "block";
  style?: React.CSSProperties;
}

export default function RevealText({
  children,
  delay = 0,
  className = "",
  as = "inline",
  style,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    // Start text hidden below (translateY 105% to account for descenders)
    gsap.set(textRef.current, { yPercent: 105 });

    const anim = gsap.to(textRef.current, {
      yPercent: 0,
      duration: 1.1,
      delay,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.overflow = "visible";
        }
      }
    });

    return () => {
      anim.kill();
    };
  }, [delay]);

  const displayClass = as === "block" ? "block" : "inline-block";

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${displayClass} align-bottom`}
      style={{ marginBottom: '-0.4em', marginTop: '-0.2em' }}
    >
      <div 
        ref={textRef} 
        className={`${displayClass} ${className}`} 
        style={{ ...style, paddingBottom: '0.4em', paddingTop: '0.2em' }}
      >
        {children}
      </div>
    </div>
  );
}