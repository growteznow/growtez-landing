"use client";

import { useState } from "react";
import { FONT_DISPLAY, FONT_BODY, PAGE_BG, SECTION_BG, SLATE_500, TEAL_500 } from "@/lib/constants";
import { webPricingPlans, appPricingPlans } from "@/lib/data";
import RevealText from "@/components/RevealText";
import { Check, Minus } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"web" | "app">("web");

  const currentPlans = activeTab === "web" ? webPricingPlans : appPricingPlans;

  return (
    <main style={{ paddingTop: 100 }}>
      {/* ── HEADER ── */}
      <section style={{ padding: "2rem 40px 1rem", background: PAGE_BG, textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <h1 style={{ marginTop: 0, lineHeight: 1.1 }}>
            <RevealText as="block" className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000" }}>
              Simple, Transparent <span style={{ color: TEAL_500 }}>Pricing.</span>
            </RevealText>
          </h1>
          <p style={{ marginTop: 16, fontSize: "1.125rem", color: SLATE_500, maxWidth: 1000, lineHeight: 1.6, ...FONT_BODY }}>
            No hidden fees. No surprises. Just great value for your investment. Prices are negotiable. <Link href="/contact" style={{ color: TEAL_500, textDecoration: "underline" }}>Contact us</Link> to know more.
          </p>
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section style={{ padding: "1rem 24px 8rem", background: PAGE_BG }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="inline-flex bg-slate-100 p-1.5 rounded-full border border-black/5 shadow-inner">
              <button 
                onClick={() => setActiveTab("web")}
                className={`px-6 md:px-10 py-2.5 md:py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeTab === "web" ? "bg-white text-black shadow-lg scale-100" : "text-slate-500 hover:text-black scale-95"}`}
                style={FONT_BODY}
              >
                Web Development
              </button>
              <button 
                onClick={() => setActiveTab("app")}
                className={`px-6 md:px-10 py-2.5 md:py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeTab === "app" ? "bg-white text-black shadow-lg scale-100" : "text-slate-500 hover:text-black scale-95"}`}
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
                  ? "bg-[#0f172a] text-white shadow-2xl scale-100 lg:scale-105 z-10" 
                  : "bg-slate-100 text-black border border-black/5 hover:bg-slate-200"
                }`}
              >
                {plan.tag && (
                  <div className="absolute top-0 right-0 bg-teal-500 text-white px-4 py-1.5 rounded-bl-[2rem] text-[10px] font-bold tracking-[0.2em] uppercase" style={FONT_BODY}>
                    {plan.tag}
                  </div>
                )}
                
                <h3 className={`text-2xl lg:text-3xl font-medium tracking-tight mt-2 ${plan.highlighted ? "text-white" : "text-black"}`} style={FONT_DISPLAY}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-3 min-h-[40px] ${plan.highlighted ? "text-slate-400" : "text-slate-500"}`} style={FONT_BODY}>
                  {plan.desc}
                </p>
                
                <div className="mt-6 mb-6">
                  <span className={`text-4xl lg:text-[3rem] leading-none font-medium tracking-tighter ${plan.highlighted ? "text-white" : "text-black"}`} style={FONT_DISPLAY}>
                    {plan.price}
                  </span>
                </div>

                <div className={`w-full h-px mb-8 ${plan.highlighted ? "bg-white/10" : "bg-black/10"}`}></div>

                <ul className="flex flex-col gap-3.5 flex-grow mb-8">
                  {plan.features.map((feat: any, idx: number) => (
                    <li key={idx} className={`flex items-start gap-3 text-sm leading-relaxed ${plan.highlighted ? (feat.included ? "text-slate-300" : "text-slate-600") : (feat.included ? "text-slate-700" : "text-slate-400")}`} style={FONT_BODY}>
                      <span className="mt-0.5 shrink-0">
                        {feat.included ? (
                          <Check size={18} className={plan.highlighted ? "text-teal-400" : "text-teal-500"} />
                        ) : (
                          <Minus size={18} className={plan.highlighted ? "text-slate-700" : "text-slate-300"} />
                        )}
                      </span>
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton className="w-full">
                  <Link 
                    href={plan.cta === "Contact Sales" ? "/contact" : "/contact"} 
                    className={`w-full py-4 rounded-full text-center font-bold text-sm transition-colors duration-300 block ${
                      plan.highlighted 
                      ? "bg-teal-500 text-white hover:bg-white hover:text-black" 
                      : "bg-teal-500 text-white hover:bg-black"
                    }`}
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
