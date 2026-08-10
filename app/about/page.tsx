"use client";

import { FONT_DISPLAY, FONT_BODY, PAGE_BG, SECTION_BG, SLATE_500, SLATE_400, TEAL_400, TEAL_500 } from "@/lib/constants";
import { Pill } from "@/components/UI";
import RevealText from "@/components/RevealText";
import CountUp from "@/components/CountUp";
import { teamMembers } from "@/lib/data";
import { ShieldCheck, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

export default function AboutPage() {
  return (
    <main style={{ paddingTop: 100 }}>
      {/* ── HEADER ── */}
      <section style={{ padding: "2rem 40px 3rem", background: PAGE_BG, textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>

          <h1 style={{ marginTop: 24, lineHeight: 1.1 }}>
            <RevealText as="block" className="text-5xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000" }}>Your Partner in</RevealText>
            <RevealText as="block" delay={0.1} className="text-5xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: TEAL_500 }}>Digital Excellence</RevealText>
          </h1>
          <p style={{ marginTop: 32, fontSize: "1.25rem", color: SLATE_500, maxWidth: 680, lineHeight: 1.6, ...FONT_BODY }}>
            At growtez, we don't just build digital solutions – we architect your business's digital future with innovation, expertise, and unwavering commitment to your success.
          </p>
        </div>
      </section>

      {/* ── HIGHLIGHTS & INTRO ── */}
      <section style={{ padding: "0 40px 6rem", background: PAGE_BG }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {["Full-Service Digital Agency", "Smart Solutions, Scalable Growth", "Client-Centric Approach"].map((item, i) => (
              <div key={i} className="flex items-center justify-center py-6 px-8 rounded-2xl bg-slate-50 border border-black/5">
                <span className="font-semibold text-black text-center" style={FONT_BODY}>{item}</span>
              </div>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed" style={FONT_BODY}>
              Our comprehensive suite of services – from web and mobile development to digital marketing and IT consulting – ensures that every aspect of your digital presence is optimized for success. We believe in building lasting partnerships, not just completing projects.
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "6rem 40px", background: SECTION_BG }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { end: 4, suffix: "", label: "Successful Projects" },
              { end: 100, suffix: "+", label: "Happy Clients" },
              { end: 4, suffix: "", label: "Team Members" },
              { end: 100, suffix: "%", label: "On-time Project Delivery" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left" style={{ borderLeft: "2px solid rgba(0,0,0,0.08)", paddingLeft: 24 }}>
                <div style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 900, color: "#000000", ...FONT_DISPLAY }}>
                  <CountUp end={s.end} duration={2} />
                  <span style={{ color: TEAL_400 }}>{s.suffix}</span>
                </div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: SLATE_500, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 8, ...FONT_BODY }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section style={{ padding: "8rem 40px", background: PAGE_BG }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-bold mt-6 tracking-tight text-black" style={FONT_DISPLAY}>
              The principles that guide everything we do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <ShieldCheck size={32} className="text-teal-500" />,
                title: "Transparency", 
                desc: "Open communication and honest relationships form the foundation of our partnerships. We believe in keeping our clients informed at every step, ensuring clarity in processes, pricing, and progress." 
              },
              { 
                icon: <Target size={32} className="text-teal-500" />,
                title: "Client Success", 
                desc: "Your success is our success. We measure our achievements by the growth and satisfaction of our clients, going above and beyond to ensure every project delivers real, measurable results." 
              },
              { 
                icon: <TrendingUp size={32} className="text-teal-500" />,
                title: "Long-term Growth", 
                desc: "We focus on building sustainable solutions that support your business's long-term objectives. Our strategies are designed not just for immediate impact but for continued success and scalability." 
              },
            ].map((value, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-black/5 hover:border-teal-500/30 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4" style={FONT_DISPLAY}>{value.title}</h3>
                <p className="text-slate-600 leading-relaxed" style={FONT_BODY}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: "8rem 40px", background: SECTION_BG }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="text-center mb-20">

            <h2 className="text-4xl md:text-5xl font-bold mt-6 tracking-tight text-black" style={FONT_DISPLAY}>
              The talented individuals behind our success
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {teamMembers.map((member, i) => (
              <div key={i} className="group relative flex flex-col items-center bg-white p-8 rounded-3xl shadow-sm border border-black/5 hover:shadow-xl transition-all duration-500">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg relative">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.style.background = '#f1f5f9'; }}
                  />
                </div>
                <h3 className="text-xl font-bold text-black text-center" style={FONT_DISPLAY}>{member.name}</h3>
                <p className="text-slate-500 text-center mt-3 text-sm leading-relaxed" style={FONT_BODY}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "8rem 40px", background: PAGE_BG, textAlign: "center" }}>
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-black mb-8" style={FONT_DISPLAY}>
            Let's grow together.
          </h2>
          <MagneticButton>
            <Link 
              href="/contact" 
              className="px-10 py-4 bg-teal-500 text-white rounded-full font-bold text-lg hover:bg-teal-600 transition-colors shadow-lg hover:shadow-xl"
              style={FONT_BODY}
            >
              Get Started Today
            </Link>
          </MagneticButton>
        </div>
      </section>

    </main>
  );
}
