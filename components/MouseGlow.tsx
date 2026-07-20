"use client";

import React, { useRef, useState, ReactNode } from "react";

interface MouseGlowProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export default function MouseGlow({ 
  children, 
  className = "", 
  style = {}, 
  color = "rgba(20, 184, 166, 0.15)" 
}: MouseGlowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div className="relative z-0 w-full h-full">
        {children}
      </div>
      <div 
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
        }}
      />
    </div>
  );
}
