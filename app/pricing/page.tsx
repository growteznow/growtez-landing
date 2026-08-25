"use client";

import { useState } from "react";
import { FONT_DISPLAY, FONT_BODY, TEAL_500 } from "@/lib/constants";
import { webPricingPlans, appPricingPlans } from "@/lib/data";
import RevealText from "@/components/RevealText";
import { Check, Minus } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"web" | "app">("web");

  const currentPlans = activeTab === "web" ? webPricingPlans : appPricingPlans;

  return (
    <main style={{ paddingTop: 100, backgroundColor: "#000", minHeight: "100vh" }}>
      {/* ── HEADER ── */}
      <section style={{ padding: "2rem 40px 1rem", background: "#000", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <h1 style={{ marginTop: 0, lineHeight: 1.1 }}>
            <RevealText as="block" className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter" style={{ ...FONT_DISPLAY, color: "#fff" }}>
              Simple, Transparent <span style={{ color: TEAL_500 }}>Pricing.</span>
            </RevealText>
          </h1>
          <p style={{ marginTop: 16, fontSize: "1.125rem", color: "#a1a1aa", maxWidth: 1000, lineHeight: 1.6, ...FONT_BODY }}>
            No hidden fees. No surprises. Just great value for your investment. Prices are negotiable. <Link href="/contact" style={{ color: TEAL_500, textDecoration: "underline" }}>Contact us</Link> to know more.
          </p>
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section style={{ padding: "1rem 24px 8rem", background: "#000" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="inline-flex bg-zinc-900 p-1.5 rounded-full border border-white/10 shadow-inner">
              <button 
                onClick={() => setActiveTab("web")}
                className={`px-6 md:px-10 py-2.5 md:py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeTab === "web" ? "bg-white text-black shadow-lg scale-100" : "text-zinc-400 hover:text-white scale-95"}`}
                style={FONT_BODY}
              >
                Web Development
              </button>
              <button 
                onClick={() => setActiveTab("app")}
                className={`px-6 md:px-10 py-2.5 md:py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeTab === "app" ? "bg-white text-black shadow-lg scale-100" : "text-zinc-400 hover:text-white scale-95"}`}
                style={FONT_BODY}
              >
                App Development
              </button>
            </div>
          </div>

          {/* Pricing Grid - Side-by-Side Premium Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {currentPlans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative flex flex-col p-6 md:p-8 rounded-[2rem] transition-all duration-500 overflow-hidden ${
                  plan.highlighted 
                  ? "bg-teal-900 text-white shadow-2xl scale-100 lg:scale-105 z-10 border border-teal-500/30" 
                  : "bg-teal-950 text-white border border-teal-800/50 hover:bg-teal-900/80"
                }`}
              >
                {plan.tag && (
                  <div className="absolute top-0 right-0 bg-teal-500 text-white px-4 py-1.5 rounded-bl-[2rem] text-[10px] font-bold tracking-[0.2em] uppercase" style={FONT_BODY}>
                    {plan.tag}
                  </div>
                )}
                
                <h3 className="text-2xl lg:text-3xl font-medium tracking-tight mt-2 text-white" style={FONT_DISPLAY}>
                  {plan.name}
                </h3>
                <p className="text-sm mt-3 min-h-[40px] text-teal-100/80" style={FONT_BODY}>
                  {plan.desc}
                </p>
                
                <div className="mt-6 mb-6">
                  <span className="text-4xl lg:text-[3rem] leading-none font-medium tracking-tighter text-white" style={FONT_DISPLAY}>
                    {plan.price}
                  </span>
                </div>

                <div className="w-full h-px mb-8 bg-teal-500/20"></div>

                <ul className="flex flex-col gap-3.5 flex-grow mb-8">
                  {plan.features.map((feat: any, idx: number) => (
                    <li key={idx} className={`flex items-start gap-3 text-sm leading-relaxed ${feat.included ? "text-teal-50" : "text-teal-100/50"}`} style={FONT_BODY}>
                      <span className="mt-0.5 shrink-0">
                        {feat.included ? (
                          <Check size={18} className="text-teal-400" />
                        ) : (
                          <Minus size={18} className="text-teal-100/30" />
                        )}
                      </span>
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton className="w-full">
                  <Link 
                    href="/contact"
                    className="w-full py-4 rounded-full text-center font-bold text-sm transition-colors duration-300 block bg-teal-500 text-white hover:bg-white hover:text-black"
                    style={FONT_BODY}
                  >
                    {plan.cta}
                  </Link>
                </MagneticButton>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
