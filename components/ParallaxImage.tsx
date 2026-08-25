"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  /** How far the image drifts, as a yPercent value. Default 20 */
  intensity?: number;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  intensity = 20,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Set initial position so the image starts at the top of its range
    gsap.set(imageRef.current, { yPercent: -intensity / 2 });

    const st = gsap.to(imageRef.current, {
      yPercent: intensity / 2,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      st.kill();
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-slate-900 ${className}`}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`absolute inset-0 h-[120%] w-full object-cover ${imageClassName}`}
      />
    </div>
  );
}