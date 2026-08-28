"use client";

import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Link as LinkIcon, Type } from "lucide-react";

export default function QRCodeGenerator() {
  const [type, setType] = useState<"link" | "text">("link");
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [qrColor, setQrColor] = useState("#000000");
  const [generatedText, setGeneratedText] = useState("");
  
  const handleGenerate = () => {
    let val = text.trim();
    if (!val) return;
    if (type === "link" && !/^https?:\/\//i.test(val)) {
      val = "https://" + val;
    }
    setGeneratedText(val);
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#121212] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl text-white">
      <h2 className="text-2xl font-bold text-center mb-2 font-display">QR Code Generator</h2>
      <p className="text-white/60 text-center mb-8">Create high-quality QR codes instantly</p>

      <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-white/5 rounded-lg border border-white/5">
        <button 
          onClick={() => setType("link")}
          className={`flex items-center justify-center gap-2 py-2 rounded-md font-medium transition-colors ${type === "link" ? "bg-teal-500 text-black" : "text-white/60 hover:text-white"}`}
        >
          <LinkIcon size={16} /> Link
        </button>
        <button 
          onClick={() => setType("text")}
          className={`flex items-center justify-center gap-2 py-2 rounded-md font-medium transition-colors ${type === "text" ? "bg-teal-500 text-black" : "text-white/60 hover:text-white"}`}
        >
          <Type size={16} /> Text
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-white/80">
          {type === "link" ? "Insert URL" : "Enter Text"}
        </label>
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder={type === "link" ? "https://example.com" : "Type your message..."}
          className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-semibold mb-2 text-white/80">Size (px)</label>
          <select 
            value={size} 
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-teal-500 transition-colors appearance-none"
          >
            <option value={128}>128 x 128</option>
            <option value={256}>256 x 256</option>
            <option value={512}>512 x 512</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-white/80">QR Color</label>
          <div className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-lg p-2 focus-within:border-teal-500 transition-colors">
            <input 
              type="color" 
              value={qrColor} 
              onChange={(e) => setQrColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0"
            />
            <span className="text-sm font-mono text-white/70">{qrColor.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleGenerate}
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-xl transition-colors mb-8"
      >
        Generate QR Code
      </button>

      {generatedText && (
        <div className="flex flex-col items-center bg-black/40 p-6 rounded-xl border border-white/5">
          <div className="bg-white p-4 rounded-xl mb-6 shadow-lg inline-block">
            <QRCodeCanvas 
              id="qr-canvas"
              value={generatedText} 
              size={size} 
              fgColor={qrColor}
              bgColor={"#ffffff"} 
              level="H" 
              includeMargin={false}
              style={{ width: "100%", height: "auto", maxWidth: 256 }}
            />
          </div>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors border border-white/10"
          >
            <Download size={18} /> Download PNG
          </button>
        </div>
      )}
    </div>
  );
}
