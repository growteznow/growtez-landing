"use client";

import React, { useEffect, useRef } from "react";

export default function TiltCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rafId: number;

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const rx = ((e.clientY - top) / height - 0.5) * -12;
      const ry = ((e.clientX - left) / width - 0.5) * 12;
      
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(rafId);
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transition: "transform 0.15s ease-out",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
