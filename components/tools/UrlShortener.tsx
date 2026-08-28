"use client";

import React, { useState } from "react";
import { Copy, Link as LinkIcon, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    let target = url.trim();
    if (!target) {
      setError("Please enter a URL.");
      return;
    }
    if (!/^https?:\/\//i.test(target)) {
      target = "https://" + target;
      setUrl(target);
    }
    if (!isValidUrl(target)) {
      setError("Please enter a valid URL.");
      return;
    }

    setError("");
    setLoading(true);
    setShortUrl("");

    try {
      const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(target)}`);
      const data = await response.json();
      
      if (data.shorturl) {
        setShortUrl(data.shorturl);
      } else {
        setError(data.errormessage || "Failed to shorten URL.");
      }
    } catch (err) {
      setError("Network error. Could not connect to shortening service.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#121212] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl text-white">
      <h2 className="text-2xl font-bold text-center mb-2 font-display">URL Shortener</h2>
      <p className="text-white/60 text-center mb-8">Shorten and manage your long links</p>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-white/80">Enter Long URL</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
            <LinkIcon size={18} />
          </div>
          <input 
            type="url" 
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleShorten()}
            placeholder="https://example.com/very/long/url"
            className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      <button 
        onClick={handleShorten}
        disabled={loading}
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/50 disabled:cursor-not-allowed text-black font-semibold rounded-xl transition-colors mb-6"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>

      <AnimatePresence>
        {shortUrl && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="bg-black/40 border border-teal-500/30 rounded-xl p-5 overflow-hidden"
          >
            <h3 className="text-teal-400 font-semibold mb-3">Your Shortened URL</h3>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-2 mb-4">
              <input 
                type="text" 
                readOnly 
                value={shortUrl} 
                className="bg-transparent border-none text-white font-medium flex-1 px-2 focus:outline-none selection:bg-teal-500/30"
              />
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded-md transition-colors font-medium"
              >
                {copied ? <><CheckCircle size={16} /> Copied!</> : <><Copy size={16} /> Copy</>}
              </button>
            </div>
            
            <div className="flex justify-between text-sm text-white/50 bg-white/5 rounded-lg p-3 border border-white/5">
              <div>
                <p className="mb-1">Original Length</p>
                <p className="font-mono text-white/80">{url.length}</p>
              </div>
              <div className="text-right">
                <p className="mb-1">Shortened Length</p>
                <p className="font-mono text-teal-400">{shortUrl.length}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
