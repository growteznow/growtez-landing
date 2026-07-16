"use client";

import { useEffect, useRef, CSSProperties } from "react";
import gsap from "gsap";

interface HorizontalMarqueeProps {
  items: string[];
  /** Pixels per second. Default 60 */
  speed?: number;
  /** Reverse direction. Default false */
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function HorizontalMarquee({
  items,
  speed = 60,
  reverse = false,
  className = "",
  style,
}: HorizontalMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Two copies of items placed side-by-side.
    // Moving by -50% of total width loops seamlessly back to start.
    const totalWidth = track.scrollWidth / 2;
    const duration   = totalWidth / speed;

    const anim = gsap.fromTo(
      track,
      { x: reverse ? -totalWidth : 0 },
      { x: reverse ? 0 : -totalWidth, duration, ease: "none", repeat: -1 }
    );

    return () => { anim.kill(); };
  }, [speed, reverse]);

  const doubled = [...items, ...items];

  return (
    <div
      style={{ overflow: "hidden", whiteSpace: "nowrap", ...style }}
      className={className}
    >
      <div
        ref={trackRef}
        style={{ display: "inline-flex", willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "0 16px" }}
          >
            {item}
            <span style={{ color: "#14b8a6", fontSize: "1.1rem" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
