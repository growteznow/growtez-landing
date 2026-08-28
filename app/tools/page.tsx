"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Palette, QrCode, Link as LinkIcon, ArrowRight } from "lucide-react";
import gsap from "gsap";

const tools = [
  {
    title: "Advanced Color Picker",
    description: "Pick, tweak, and copy colors with our advanced color tool.",
    icon: <Palette size={40} className="text-teal-400" />,
    href: "/tools/color-picker",
    color: "from-purple-500/20 to-indigo-500/20"
  },
  {
    title: "QR Code Generator",
    description: "Generate high-quality QR codes for your URLs instantly.",
    icon: <QrCode size={40} className="text-teal-400" />,
    href: "/tools/qr-generator",
    color: "from-teal-500/20 to-emerald-500/20"
  },
  {
    title: "URL Shortener",
    description: "Shorten and manage your links easily with a single click.",
    icon: <LinkIcon size={40} className="text-teal-400" />,
    href: "/tools/url-shortener",
    color: "from-orange-500/20 to-red-500/20"
  }
];

export default function ToolsPage() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-5 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 ref={headerRef} className="text-4xl md:text-6xl font-bold mb-6 font-display tracking-tight">
            Developer <span className="text-teal-400">Tools</span>
          </h1>
          <p className="text-gray-400 text-lg">
            A collection of handy utilities and tools to speed up your workflow. Fast, free, and easy to use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={tool.href} className="block h-full">
                <div className="relative h-full bg-[#121212] border border-white/5 rounded-2xl p-8 hover:border-teal-500/30 transition-all duration-300 group overflow-hidden">
                  
                  {/* Background gradient blob */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${tool.color} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="mb-6 p-4 bg-white/5 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-3">{tool.title}</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center text-teal-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Open Tool <ArrowRight size={18} className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
