"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Trash2, CheckCircle } from "lucide-react";

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export default function ColorPicker() {
  const [color, setColor] = useState("#14B8A6"); 
  const [savedColors, setSavedColors] = useState<string[]>([]);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("growtez_savedColors");
    if (stored) {
      try { setSavedColors(JSON.parse(stored)); } catch (e) {}
    }
  }, []);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value.toUpperCase());
  };

  const handleSaveColor = () => {
    if (!savedColors.includes(color)) {
      const newSaved = [...savedColors, color];
      setSavedColors(newSaved);
      localStorage.setItem("growtez_savedColors", JSON.stringify(newSaved));
    }
  };

  const handleClearSaved = () => {
    setSavedColors([]);
    localStorage.removeItem("growtez_savedColors");
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 1500);
    });
  };

  const rgb = hexToRgb(color) || { r: 20, g: 184, b: 166 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const hexValue = color;
  const rgbValue = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslValue = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="w-full max-w-lg mx-auto bg-[#121212] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-white font-display">Advanced Color Picker</h2>
      
      <div className="relative mb-8 rounded-xl overflow-hidden group border border-white/5 shadow-inner">
        <div className="w-full h-48 transition-colors duration-200" style={{ backgroundColor: color }} />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">Click to Change Color</span>
        </div>
        <input 
          type="color" 
          value={color} 
          onChange={handleColorChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="space-y-4 mb-8">
        {[
          { label: "HEX", value: hexValue },
          { label: "RGB", value: rgbValue },
          { label: "HSL", value: hslValue },
        ].map((fmt) => (
          <div key={fmt.label} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
            <span className="text-teal-400 font-semibold text-sm w-12">{fmt.label}</span>
            <input 
              type="text" 
              readOnly 
              value={fmt.value}
              className="bg-transparent border-none text-white font-mono text-sm flex-1 text-right focus:outline-none selection:bg-teal-500/30"
            />
            <button 
              onClick={() => copyToClipboard(fmt.value, fmt.label)}
              className="ml-4 p-2 bg-white/10 hover:bg-teal-500/20 text-white rounded-md transition-colors"
              title="Copy"
            >
              {copiedFormat === fmt.label ? <CheckCircle size={16} className="text-teal-400" /> : <Copy size={16} />}
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={handleSaveColor}
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-xl transition-colors mb-8"
      >
        Save Current Color
      </button>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Saved Colors</h3>
          {savedColors.length > 0 && (
            <button onClick={handleClearSaved} className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>
        
        {savedColors.length === 0 ? (
          <div className="text-center py-6 text-white/40 bg-white/5 rounded-xl border border-white/5 italic">
            No colors saved yet.
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {savedColors.map((savedColor, i) => (
              <motion.button
                key={`${savedColor}-${i}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                onClick={() => setColor(savedColor)}
                className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg"
                style={{ backgroundColor: savedColor }}
                title={savedColor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
