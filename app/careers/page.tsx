"use client";

import { FONT_DISPLAY, FONT_BODY, PAGE_BG, SECTION_BG, SLATE_500, TEAL_500 } from "@/lib/constants";
import { Pill } from "@/components/UI";
import RevealText from "@/components/RevealText";
import { Briefcase, GraduationCap, MapPin, Award, Rocket, Users } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

export default function CareersPage() {
  return (
    <main style={{ paddingTop: 100 }}>
      {/* ── HEADER ── */}
      <section style={{ padding: "2rem 40px 3rem", background: PAGE_BG, textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>

          <h1 style={{ marginTop: 24, lineHeight: 1.1 }}>
            <RevealText as="block" className="text-5xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#000" }}>Build your career</RevealText>
            <RevealText as="block" delay={0.1} className="text-5xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: TEAL_500 }}>with growtez</RevealText>
          </h1>
          <p style={{ marginTop: 24, fontSize: "1.25rem", color: SLATE_500, maxWidth: 600, lineHeight: 1.6, ...FONT_BODY }}>
            Where innovation meets opportunity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full justify-center">
            <MagneticButton>
              <a 
                href="#internships"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-100 border border-black/5 hover:border-teal-500 rounded-full transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:text-teal-500 transition-colors">
                  <GraduationCap size={20} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-black text-sm" style={FONT_DISPLAY}>Join as Intern</div>
                  <div className="text-xs text-slate-500" style={FONT_BODY}>Learn & grow with us</div>
                </div>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a 
                href="#jobs"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-100 border border-black/5 hover:border-teal-500 rounded-full transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:text-teal-500 transition-colors">
                  <Briefcase size={20} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-black text-sm" style={FONT_DISPLAY}>Job Openings</div>
                  <div className="text-xs text-slate-500" style={FONT_BODY}>Full-time positions</div>
                </div>
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── JOB OPENINGS ── */}
      <section id="jobs" style={{ padding: "6rem 40px", background: SECTION_BG, scrollMarginTop: "100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>

          <h2 className="text-4xl md:text-5xl font-bold mt-6 tracking-tight text-black" style={FONT_DISPLAY}>
            Full-time positions at growtez
          </h2>
          
          <div className="mt-12 p-12 bg-white rounded-3xl border border-black/5 border-dashed flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Briefcase size={24} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-3" style={FONT_DISPLAY}>No Current Openings</h3>
            <p className="text-slate-500" style={FONT_BODY}>
              We don't have any full-time positions available right now.<br />
              Check back soon or follow us on social media for updates!
            </p>
          </div>
        </div>
      </section>

      {/* ── INTERNSHIPS ── */}
      <section id="internships" style={{ padding: "8rem 40px", background: PAGE_BG, scrollMarginTop: "100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          
          <div className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-bold mt-6 tracking-tight text-black" style={FONT_DISPLAY}>
              Benefits of interning at growtez
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {[
              { icon: <MapPin size={28} className="text-teal-500" />, title: "Remote Work", desc: "Work from anywhere with flexible hours" },
              { icon: <Award size={28} className="text-teal-500" />, title: "Certificate", desc: "Get an official internship certificate" },
              { icon: <Rocket size={28} className="text-teal-500" />, title: "Real Projects", desc: "Work on actual client projects" },
              { icon: <Users size={28} className="text-teal-500" />, title: "Mentorship", desc: "Learn from experienced professionals" },
            ].map((benefit, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-black/5 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3" style={FONT_DISPLAY}>{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed" style={FONT_BODY}>{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* ── APPLICATION FORM ── */}
          <div className="max-w-3xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-black/5">
            <div className="mb-10 text-center">
              <h3 className="text-3xl font-bold text-black mb-4" style={FONT_DISPLAY}>Apply for Internship</h3>
              <p className="text-slate-500" style={FONT_BODY}>Fill out the form below and we'll get back to you within 48 hours</p>
            </div>

            <form className="flex flex-col gap-6" style={FONT_BODY} onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black">Full Name *</label>
                  <input type="text" required className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-black/10 focus:border-teal-500 focus:outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black">Email Address *</label>
                  <input type="email" required className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-black/10 focus:border-teal-500 focus:outline-none transition-colors" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black">Phone Number *</label>
                  <input type="tel" required className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-black/10 focus:border-teal-500 focus:outline-none transition-colors" placeholder="+91 98765 43210" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black">Position Applying For *</label>
                  <select required className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-black/10 focus:border-teal-500 focus:outline-none transition-colors appearance-none cursor-pointer">
                    <option value="" disabled selected>Select a position</option>
                    <option value="web">Web Development Intern</option>
                    <option value="app">App Development Intern</option>
                    <option value="ui">UI/UX Design Intern</option>
                    <option value="marketing">Digital Marketing Intern</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black">LinkedIn Profile</label>
                  <input type="url" className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-black/10 focus:border-teal-500 focus:outline-none transition-colors" placeholder="https://linkedin.com/in/..." />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black">Portfolio / GitHub URL</label>
                  <input type="url" className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-black/10 focus:border-teal-500 focus:outline-none transition-colors" placeholder="https://github.com/..." />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-black">Resume/CV Link *</label>
                <input type="url" required className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-black/10 focus:border-teal-500 focus:outline-none transition-colors" placeholder="Google Drive or Dropbox link to your resume" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-black">Why do you want to join growtez? *</label>
                <textarea required rows={4} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-black/10 focus:border-teal-500 focus:outline-none transition-colors resize-none" placeholder="Tell us a bit about yourself and why you'd be a great fit..." />
              </div>

              <MagneticButton>
                <button type="submit" className="mt-4 w-full py-4 bg-teal-500 text-white rounded-xl font-bold text-lg hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20">
                  Submit Application
                </button>
              </MagneticButton>
            </form>
          </div>

        </div>
      </section>

    </main>
  );
}
