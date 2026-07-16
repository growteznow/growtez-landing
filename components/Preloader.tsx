"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostRef    = useRef<HTMLSpanElement>(null);  // large ghost number
  const percentRef  = useRef<HTMLSpanElement>(null);  // bottom % label
  const barRef      = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true),
    });

    tl.to(counter, {
      value: 100,
      duration: 2.0,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(counter.value);
        // Update both DOM nodes directly — zero re-renders
        if (ghostRef.current)   ghostRef.current.innerText   = `${rounded}`;
        if (percentRef.current) percentRef.current.innerText = `${rounded}%`;
        if (barRef.current)     barRef.current.style.width   = `${rounded}%`;
      },
    })
    .to({}, { duration: 0.3 })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.1,
      ease: "power4.inOut",
    });
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col bg-[#ffffff] overflow-hidden"
    >
      {/* Large ghost number — decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          ref={ghostRef}
          style={{
            fontFamily: "var(--font-outfit), system-ui, sans-serif",
            fontSize: "clamp(120px, 25vw, 280px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "rgba(0,0,0,0.03)",
          }}
        >
          0
        </span>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
        <div className="mb-4 flex items-end justify-between">
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#2dd4bf",
            }}
          >
            Growtez
          </span>
          <span
            ref={percentRef}
            style={{
              fontFamily: "var(--font-outfit), system-ui, sans-serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 700,
              color: "#2dd4bf",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            0%
          </span>
        </div>
        {/* Progress track */}
        <div style={{ height: "1px", width: "100%", background: "rgba(0,0,0,0.08)" }}>
          <div
            ref={barRef}
            style={{ height: "100%", width: "0%", background: "#14b8a6", transition: "none" }}
          />
        </div>
      </div>
    </div>
  );
}