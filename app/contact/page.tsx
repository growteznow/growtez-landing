"use client";

import { useState } from "react";
import Link from "next/link";
import { FONT_DISPLAY, FONT_BODY, SECTION_BG, PAGE_BG, SLATE_400, TEAL_400, TEAL_500, CARD_BG } from "@/lib/constants";
import { Pill } from "@/components/UI";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import { Mail, Phone, MapPin, CircleCheck, ArrowRight, ArrowUpRight, Send, Check, AlertCircle } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill in your name, email address, and message.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        projectType: formData.projectType.trim() || "General Inquiry",
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
      });

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", projectType: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error("Error saving contact message to Firebase:", err);
      setIsSubmitting(false);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <main className="text-white" style={{ paddingTop: 100, background: "#000000" }}>
      {/* ── CONTACT SECTION ── */}
      <section className="px-6 md:px-10 py-10 md:py-16 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <RevealText as="block" className="text-5xl md:text-[80px] font-medium leading-[0.95] tracking-tighter" style={{ ...FONT_DISPLAY, color: "#ffffff" }}>Have an</RevealText>
            <RevealText as="block" delay={0.1} className="text-5xl md:text-[80px] font-medium leading-[0.95] tracking-tighter" style={{ ...FONT_DISPLAY, color: "#ffffff" }}>idea?</RevealText>

            <p className="mt-8 md:mt-10 text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed" style={FONT_BODY}>
              Have a project in mind? An idea you&apos;re still fleshing out? Either way, reach out—we&apos;d love to have a conversation.
            </p>

            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-10 sm:gap-16">
              <div className="flex flex-col gap-3">
                <span className="text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wider">Email us</span>
                <a href="mailto:contact@growtez.com" className="text-lg sm:text-xl md:text-2xl font-medium hover:text-teal-400 transition-colors flex items-center gap-2 group whitespace-nowrap" style={FONT_BODY}>
                  contact@growtez.com
                  <ArrowUpRight size={24} className="shrink-0 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wider">Call us</span>
                <div className="flex flex-col gap-2">
                  <a href="tel:+919101840955" className="text-lg sm:text-xl md:text-2xl font-medium hover:text-teal-400 transition-colors flex items-center gap-2 group whitespace-nowrap" style={FONT_BODY}>
                    +91 9101840955
                    <ArrowUpRight size={24} className="shrink-0 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                  <a href="tel:+919387794423" className="text-lg sm:text-xl md:text-2xl font-medium hover:text-teal-400 transition-colors flex items-center gap-2 group whitespace-nowrap" style={FONT_BODY}>
                    +91 9387794423
                    <ArrowUpRight size={24} className="shrink-0 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 w-full lg:mt-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10">
              {[
                { type: "text", placeholder: "What's your name?", name: "name" },
                { type: "email", placeholder: "Your email address", name: "email" },
                { type: "text", placeholder: "Project Type (Web / App / AI)", name: "projectType" },
              ].map((f, i) => (
                <div key={i} className="relative group">
                  <input
                    type={f.type}
                    name={f.name}
                    value={formData[f.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg md:text-xl text-white outline-none focus:border-white transition-colors placeholder:text-white/30 peer"
                    style={FONT_BODY}
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-500 peer-focus:w-full"></span>
                </div>
              ))}

              <div className="relative group">
                <textarea
                  placeholder="Tell us about your project..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-lg md:text-xl text-white outline-none focus:border-white transition-colors placeholder:text-white/30 peer resize-none"
                  style={FONT_BODY}
                />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-500 peer-focus:w-full"></span>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-rose-400 text-sm font-medium" style={FONT_BODY}>
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <MagneticButton strength={0.2}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative bg-teal-500 hover:bg-teal-400 text-black rounded-full w-28 h-28 md:w-36 md:h-36 flex flex-col items-center justify-center gap-1.5 text-sm md:text-base font-medium transition-all duration-300 shadow-xl cursor-pointer disabled:opacity-80 overflow-hidden"
                    style={FONT_BODY}
                  >
                    {submitted ? (
                      <div className="flex flex-col items-center justify-center gap-1.5 animate-in fade-in zoom-in duration-300">
                        <Check className="w-6 h-6 md:w-8 md:h-8 text-black stroke-[2.5]" />
                        <span className="font-semibold text-black">Sent!</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 group-hover:-translate-y-1">
                        <Send className={`w-6 h-6 md:w-8 md:h-8 text-black transition-all duration-300 ${isSubmitting ? "translate-x-12 -translate-y-12 opacity-0" : "group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:rotate-12"
                          }`} />
                        <span className="font-semibold text-black">{isSubmitting ? "Sending..." : "Send"}</span>
                      </div>
                    )}
                  </button>
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── INTERNSHIP CTA ── */}
      <section className="px-6 md:px-10 py-24 md:py-32 rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">

          <div className="mt-12">
            <RevealText as="block" className="text-6xl md:text-[90px] font-medium leading-[0.95] tracking-tighter" style={{ ...FONT_DISPLAY, color: "#ffffff" }}>Start your career</RevealText>
            <RevealText as="block" delay={0.1} className="text-6xl md:text-[90px] font-medium leading-[0.95] tracking-tighter" style={{ ...FONT_DISPLAY, color: "#ffffff" }}>with us.</RevealText>
          </div>
          <RevealText as="block" delay={0.2}>
            <p className="mt-10 text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed" style={FONT_BODY}>
              Work on real products, learn from senior engineers and designers, get a certificate, and build a portfolio that actually stands out.
            </p>
          </RevealText>

          <div className="mt-14 flex flex-wrap justify-center gap-4">
            {["Stipend Provided", "Certificate", "Mentorship", "Real Projects"].map(b => (
              <span key={b} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm md:text-base font-semibold" style={FONT_BODY}>
                <CircleCheck size={18} /> {b}
              </span>
            ))}
          </div>

          <div className="mt-20">
            <MagneticButton strength={0.3}>
              <Link href="/careers#internships" className="inline-flex items-center gap-4 px-12 py-6 md:px-14 md:py-8 rounded-full bg-teal-500 hover:bg-teal-400 text-black text-lg md:text-xl font-bold no-underline transition-colors duration-300" style={FONT_BODY}>
                Apply Now <ArrowRight size={24} />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
