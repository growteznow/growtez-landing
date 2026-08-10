"use client";

import { FONT_DISPLAY, FONT_BODY, SECTION_BG, PAGE_BG, SLATE_400, TEAL_400, TEAL_500, CARD_BG } from "@/lib/constants";
import { Pill } from "@/components/UI";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import { Mail, Phone, MapPin, CircleCheck, ArrowRight, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main style={{ paddingTop: 100, background: PAGE_BG }}>
      {/* ── CONTACT SECTION ── */}
      <section className="px-6 md:px-10 py-12 md:py-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <RevealText as="block" className="text-[80px] md:text-[140px] font-medium leading-[0.85] tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Have an</RevealText>
            <RevealText as="block" delay={0.1} className="text-[80px] md:text-[140px] font-medium leading-[0.85] tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>idea?</RevealText>
            
            <p className="mt-10 md:mt-16 text-xl md:text-2xl text-slate-500 max-w-lg leading-relaxed" style={FONT_BODY}>
              Have a project in mind? An idea you&apos;re still fleshing out? Either way, reach out—we&apos;d love to have a conversation.
            </p>

            <div className="mt-16 md:mt-24 flex flex-col sm:flex-row gap-12 sm:gap-24">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Email us</span>
                <a href="mailto:hello@growtez.com" className="text-2xl md:text-3xl font-medium hover:text-teal-500 transition-colors flex items-center gap-2 group" style={FONT_BODY}>
                  hello@growtez.com
                  <ArrowUpRight size={28} className="opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Call us</span>
                <a href="tel:+919000000000" className="text-2xl md:text-3xl font-medium hover:text-teal-500 transition-colors flex items-center gap-2 group" style={FONT_BODY}>
                  +91 90000 00000
                  <ArrowUpRight size={28} className="opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 w-full lg:mt-8">
            <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-12 md:gap-16">
              {[
                { type: "text",  placeholder: "What's your name?", name: "name" },
                { type: "email", placeholder: "Your email address", name: "email" },
                { type: "text",  placeholder: "Project Type (Web / App / AI)", name: "projectType" },
              ].map((f, i) => (
                <div key={i} className="relative group">
                  <input 
                    type={f.type} 
                    name={f.name}
                    placeholder={f.placeholder} 
                    className="w-full bg-transparent border-b border-black/20 pb-4 text-xl md:text-2xl outline-none focus:border-black transition-colors placeholder:text-black/30 peer" 
                    style={FONT_BODY} 
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-500 peer-focus:w-full"></span>
                </div>
              ))}
              
              <div className="relative group">
                <textarea 
                  placeholder="Tell us about your project..." 
                  name="message"
                  rows={3}
                  className="w-full bg-transparent border-b border-black/20 pb-4 text-xl md:text-2xl outline-none focus:border-black transition-colors placeholder:text-black/30 peer resize-none" 
                  style={FONT_BODY} 
                />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-500 peer-focus:w-full"></span>
              </div>
              
              <div className="mt-8 flex justify-start">
                <MagneticButton strength={0.2}>
                  <button type="submit" className="bg-black hover:bg-teal-500 text-white rounded-full w-32 h-32 md:w-44 md:h-44 flex items-center justify-center text-lg md:text-xl font-medium transition-colors duration-300" style={FONT_BODY}>
                    Send
                  </button>
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── INTERNSHIP CTA ── */}
      <section className="px-6 md:px-10 py-24 md:py-32 rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden" style={{ background: SECTION_BG }}>
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">

          <div className="mt-12">
            <RevealText as="block" className="text-6xl md:text-[90px] font-medium leading-[0.95] tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>Start your career</RevealText>
            <RevealText as="block" delay={0.1} className="text-6xl md:text-[90px] font-medium leading-[0.95] tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000000" }}>with us.</RevealText>
          </div>
          <RevealText as="block" delay={0.2}>
            <p className="mt-10 text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed" style={FONT_BODY}>
              Work on real products, learn from senior engineers and designers, get a certificate, and build a portfolio that actually stands out.
            </p>
          </RevealText>

          <div className="mt-14 flex flex-wrap justify-center gap-4">
            {["Stipend Provided", "Certificate", "Mentorship", "Real Projects"].map(b => (
              <span key={b} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-700 text-sm md:text-base font-semibold" style={FONT_BODY}>
                <CircleCheck size={18} /> {b}
              </span>
            ))}
          </div>
          
          <div className="mt-20">
            <MagneticButton strength={0.3}>
              <a href="#contact" className="inline-flex items-center gap-4 px-12 py-6 md:px-14 md:py-8 rounded-full bg-teal-500 hover:bg-black text-white text-lg md:text-xl font-bold no-underline transition-colors duration-300" style={FONT_BODY}>
                Apply Now <ArrowRight size={24} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
