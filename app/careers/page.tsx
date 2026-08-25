"use client";

import { useState, useRef } from "react";
import { FONT_DISPLAY, FONT_BODY, TEAL_400, TEAL_500 } from "@/lib/constants";
import RevealText from "@/components/RevealText";
import {
  Briefcase, GraduationCap, MapPin, Award, Rocket, Users,
  Check, AlertCircle, Loader2, ChevronDown, UploadCloud,
  FileText, X, Link as LinkIcon
} from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    linkedin: "",
    portfolio: "",
    resume: "",
    whyJoin: "",
  });

  const [resumeMode, setResumeMode] = useState<"file" | "link">("file");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setError("Please select a PDF or DOC/DOCX document.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB.");
      return;
    }

    setError(null);
    setResumeFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.position ||
      !formData.whyJoin.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (resumeMode === "file" && !resumeFile) {
      setError("Please upload your resume file or provide a resume link.");
      return;
    }

    if (resumeMode === "link" && !formData.resume.trim()) {
      setError("Please enter a link to your resume.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      let finalResumeUrl = formData.resume.trim();

      if (resumeMode === "file" && resumeFile) {
        setUploadProgress(0);
        const storageRef = ref(storage, `resumes/${Date.now()}_${resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`);
        const uploadTask = uploadBytesResumable(storageRef, resumeFile);

        finalResumeUrl = await new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setUploadProgress(progress);
            },
            (err) => reject(err),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      }

      await addDoc(collection(db, "internships"), {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        position: formData.position,
        linkedin: formData.linkedin.trim() || null,
        portfolio: formData.portfolio.trim() || null,
        resume: finalResumeUrl,
        whyJoin: formData.whyJoin.trim(),
        createdAt: serverTimestamp(),
      });

      setIsSubmitting(false);
      setUploadProgress(null);
      setSubmitted(true);
      setResumeFile(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        linkedin: "",
        portfolio: "",
        resume: "",
        whyJoin: "",
      });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err: any) {
      console.error("Error submitting internship application to Firebase:", err);
      setIsSubmitting(false);
      setUploadProgress(null);
      setError("Failed to submit application. Please check your file size and try again.");
    }
  };

  return (
    <main className="text-white" style={{ paddingTop: 100, background: "#000000", minHeight: "100vh" }}>
      {/* ── HEADER ── */}
      <section style={{ padding: "2rem 40px 3rem", background: "#000000", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>

          <h1 style={{ marginTop: 24, lineHeight: 1.1 }}>
            <RevealText as="block" className="text-5xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: "#ffffff" }}>Build your career</RevealText>
            <RevealText as="block" delay={0.1} className="text-5xl md:text-7xl font-semibold tracking-tighter" style={{ ...FONT_DISPLAY, color: TEAL_400 }}>with growtez</RevealText>
          </h1>
          <p className="text-slate-300" style={{ marginTop: 24, fontSize: "1.25rem", maxWidth: 600, lineHeight: 1.6, ...FONT_BODY }}>
            Where innovation meets opportunity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full justify-center">
            <MagneticButton>
              <a
                href="#internships"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-teal-400 rounded-full transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-sm text-white group-hover:text-teal-400 group-hover:bg-white/20 transition-colors">
                  <GraduationCap size={20} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-sm" style={FONT_DISPLAY}>Join as Intern</div>
                  <div className="text-xs text-slate-400" style={FONT_BODY}>Learn & grow with us</div>
                </div>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#jobs"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-teal-400 rounded-full transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-sm text-white group-hover:text-teal-400 group-hover:bg-white/20 transition-colors">
                  <Briefcase size={20} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-sm" style={FONT_DISPLAY}>Job Openings</div>
                  <div className="text-xs text-slate-400" style={FONT_BODY}>Full-time positions</div>
                </div>
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── JOB OPENINGS ── */}
      <section id="jobs" style={{ padding: "6rem 40px", background: "#000000", scrollMarginTop: "100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>

          <h2 className="text-4xl md:text-5xl font-bold mt-6 tracking-tight text-white" style={FONT_DISPLAY}>
            Full-time positions at growtez
          </h2>

          <div className="mt-12 p-12 bg-white/5 rounded-3xl border border-white/10 border-dashed flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <Briefcase size={24} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3" style={FONT_DISPLAY}>No Current Openings</h3>
            <p className="text-slate-300" style={FONT_BODY}>
              We don't have any full-time positions available right now.<br />
              Check back soon or follow us on social media for updates!
            </p>
          </div>
        </div>
      </section>

      {/* ── INTERNSHIPS ── */}
      <section id="internships" style={{ padding: "8rem 40px", background: "#000000", scrollMarginTop: "100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <div className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-bold mt-6 tracking-tight text-white" style={FONT_DISPLAY}>
              Benefits of interning at growtez
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {[
              { icon: <MapPin size={28} className="text-teal-400" />, title: "Remote Work", desc: "Work from anywhere with flexible hours" },
              { icon: <Award size={28} className="text-teal-400" />, title: "Certificate", desc: "Get an official internship certificate" },
              { icon: <Rocket size={28} className="text-teal-400" />, title: "Real Projects", desc: "Work on actual client projects" },
              { icon: <Users size={28} className="text-teal-400" />, title: "Mentorship", desc: "Learn from experienced professionals" },
            ].map((benefit, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center hover:-translate-y-2 hover:border-white/20 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white/10 shadow-sm flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={FONT_DISPLAY}>{benefit.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed" style={FONT_BODY}>{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* ── APPLICATION FORM ── */}
          <div className="max-w-3xl mx-auto bg-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl border border-white/10 backdrop-blur-sm">
            <div className="mb-10 text-center">
              <h3 className="text-3xl font-bold text-white mb-4" style={FONT_DISPLAY}>Apply for Internship</h3>
              <p className="text-slate-300" style={FONT_BODY}>Fill out the form below and we'll get back to you within 48 hours</p>
            </div>

            {submitted && (
              <div className="mb-8 p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center gap-4 text-emerald-300 animate-in fade-in slide-in-from-top-4 duration-300" style={FONT_BODY}>
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white" style={FONT_DISPLAY}>Application Submitted!</h4>
                  <p className="text-sm text-emerald-400">Thank you for applying. Our team will review your application and contact you soon.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-8 p-4 bg-rose-950/40 border border-rose-500/30 rounded-xl flex items-center gap-3 text-rose-300 text-sm font-medium" style={FONT_BODY}>
                <AlertCircle size={20} className="shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form className="flex flex-col gap-6" style={FONT_BODY} onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white">Position Applying For *</label>
                  <div className="relative">
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className={`w-full px-5 py-4 pr-12 rounded-xl bg-white/5 border border-white/10 focus:border-teal-400 focus:outline-none transition-colors appearance-none cursor-pointer ${formData.position ? "text-white" : "text-slate-500"
                        }`}
                    >
                      <option value="" disabled className="bg-zinc-900 text-slate-500">Select a position</option>
                      <option value="Web Development Intern" className="bg-zinc-900 text-white">Web Development Intern</option>
                      <option value="App Development Intern" className="bg-zinc-900 text-white">App Development Intern</option>
                      <option value="UI/UX Design Intern" className="bg-zinc-900 text-white">UI/UX Design Intern</option>
                      <option value="Digital Marketing Intern" className="bg-zinc-900 text-white">Digital Marketing Intern</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-white">LinkedIn Profile</label>
                    <span className="text-xs text-slate-400">Link to your public LinkedIn profile</span>
                  </div>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none transition-colors"
                    placeholder="e.g. linkedin.com/in/yourname"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-white">Portfolio / GitHub / Projects</label>
                    <span className="text-xs text-slate-400">Link to your website, GitHub, Behance, or Figma</span>
                  </div>
                  <input
                    type="text"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none transition-colors"
                    placeholder="e.g. github.com/yourname or portfolio link"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-white">Resume / CV *</label>
                    <span className="text-xs text-slate-400">
                      {resumeMode === "file" ? "Upload a document (PDF, DOCX, up to 10MB)" : "Paste a shareable link to your resume"}
                    </span>
                  </div>
                  <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl gap-1 text-xs font-semibold self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setResumeMode("file")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${resumeMode === "file" ? "bg-white/20 text-white shadow-sm" : "text-slate-400 hover:text-white"
                        }`}
                    >
                      <UploadCloud size={14} className="inline mr-1" />
                      Drag & Drop File
                    </button>
                    <button
                      type="button"
                      onClick={() => setResumeMode("link")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${resumeMode === "link" ? "bg-white/20 text-white shadow-sm" : "text-slate-400 hover:text-white"
                        }`}
                    >
                      <LinkIcon size={14} className="inline mr-1" />
                      Paste Link
                    </button>
                  </div>
                </div>

                {resumeMode === "file" ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                      className="hidden"
                    />

                    {resumeFile ? (
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                            <FileText size={20} />
                          </div>
                          <div className="flex flex-col truncate">
                            <span className="text-sm font-semibold text-white truncate">{resumeFile.name}</span>
                            <span className="text-xs text-slate-400">{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="w-8 h-8 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
                          title="Remove file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${isDragging
                          ? "border-teal-400 bg-teal-500/10 scale-[0.99]"
                          : "border-white/15 bg-white/[0.02] hover:border-teal-400/50 hover:bg-white/[0.05]"
                          }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 mb-1">
                          <UploadCloud size={24} className={isDragging ? "text-teal-400 animate-bounce" : ""} />
                        </div>
                        <p className="text-sm font-semibold text-white">
                          <span className="text-teal-400 underline">Click to upload</span> or drag and drop your resume
                        </p>
                        <p className="text-xs text-slate-400">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
                      </div>
                    )}

                    {uploadProgress !== null && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                          <span>Uploading resume...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-teal-500 h-full transition-all duration-300 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                    required={resumeMode === "link"}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none transition-colors"
                    placeholder="e.g. drive.google.com/file/d/your-resume-id"
                  />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-white">Why do you want to join growtez? *</label>
                  <span className="text-xs text-slate-400">Share your background, key skills, and why you're interested in this internship.</span>
                </div>
                <textarea
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about yourself, your skills, and what you hope to achieve..."
                />
              </div>

              <MagneticButton>
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`mt-4 w-full py-4 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-90 ${submitted
                    ? "bg-emerald-600 shadow-emerald-600/20"
                    : "bg-teal-500 hover:bg-teal-600 shadow-teal-500/20"
                    }`}
                >
                  {submitted ? (
                    <>
                      <Check className="w-5 h-5 stroke-[2.5]" />
                      <span>Submitted!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </MagneticButton>
            </form>
          </div>

        </div>
      </section>

    </main>
  );
}

