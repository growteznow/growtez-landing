"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: CountUpProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const counter = { value: 0 };

    // Set initial text immediately (avoids flash of 0 on fast load)
    el.innerText = `${prefix}0${suffix}`;

    const anim = gsap.to(counter, {
      value: end,
      duration,
      ease: "power3.out",
      // Direct DOM mutation — no useState, no re-renders
      onUpdate: () => {
        el.innerText = `${prefix}${Math.round(counter.value)}${suffix}`;
      },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.kill();
    };
  }, [end, suffix, prefix, duration]);

  return (
    <span ref={spanRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
