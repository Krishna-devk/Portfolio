"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Mail, Send, User, MessageSquare, Terminal, MapPin, Check, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (*).");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please supply a valid email address.");
      return;
    }

    setStatus("submitting");

    // Simulate server ingestion
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1800);
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-[#050816] w-full flex flex-col items-center relative overflow-hidden">
      {/* Background neon visual grids */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#00F5FF]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-[#A855F7]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div ref={containerRef} className="max-w-5xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#00F5FF] text-xs font-bold tracking-[0.2em] uppercase font-space"
          >
            Connection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl text-white font-bold tracking-tight font-space leading-none"
          >
            Initiate Project Telemetry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-xl text-base md:text-lg font-light mt-2"
          >
            Have a project query, research scope, or looking to build advanced full-stack apps? Let's connect.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-stretch">
          
          {/* Left Column: Coordinates / Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-between gap-8 bg-[#0B1220]/75 border border-white/[0.06] p-8 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/5 via-transparent to-transparent pointer-events-none" />

            <div className="flex flex-col gap-6">
              <span className="text-white text-xl font-bold tracking-tight font-space">
                Developer Nodes
              </span>
              
              <div className="flex flex-col gap-5 mt-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#050816] border border-white/[0.04] flex items-center justify-center text-[#00F5FF]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">EMAIL</span>
                    <a href="mailto:mailto:krishnaagdevk@gmail.com" className="text-white text-sm md:text-base font-semibold hover:text-[#00F5FF] transition-colors pointer-events-auto">
                      krishnaagdevk@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#050816] border border-white/[0.04] flex items-center justify-center text-[#A855F7]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">LOCATION</span>
                    <span className="text-white text-sm md:text-base font-semibold">
                      Meerut, Uttar Pradesh, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Shell Simulation */}
            <div className="bg-[#050816] rounded-xl p-4 border border-white/[0.04] font-mono text-[10px] text-[#00F5FF] flex flex-col gap-2 mt-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-1 text-slate-500 font-sans">
                <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Node-Ping v1.0</span>
                <span className="text-[9px] font-bold text-emerald-400">ACTIVE</span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-600">$</span>
                <span className="text-white">ping -c 3 krishna-portfolio.ai</span>
              </div>
              <div className="text-slate-500">
                64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.032 ms <br />
                64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.029 ms <br />
                --- krishna-portfolio.ai ping stats --- <br />
                3 packets transmitted, 3 received, 0% packet loss
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7 bg-[#0B1220]/75 border border-white/[0.06] p-8 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/5 via-transparent to-transparent pointer-events-none" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold tracking-wider flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#00F5FF]" /> FULL NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="bg-[#050816] text-white border border-white/[0.06] focus:border-[#00F5FF]/60 rounded-xl py-3 px-4 outline-none text-sm transition-all duration-300 font-space"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-semibold tracking-wider flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#00F5FF]" /> EMAIL ADDRESS <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    className="bg-[#050816] text-white border border-white/[0.06] focus:border-[#00F5FF]/60 rounded-xl py-3 px-4 outline-none text-sm transition-all duration-300 font-space"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold tracking-wider flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[#A855F7]" /> PROJECT OBJECTIVE
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Scaling REST API cluster / Contract Build"
                  className="bg-[#050816] text-white border border-white/[0.06] focus:border-[#A855F7]/60 rounded-xl py-3 px-4 outline-none text-sm transition-all duration-300 font-space"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-semibold tracking-wider flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-[#A855F7]" /> TELEMETRY CORRESPONDENCE <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter details of your project parameters..."
                  rows={4}
                  required
                  className="bg-[#050816] text-white border border-white/[0.06] focus:border-[#A855F7]/60 rounded-xl py-3 px-4 outline-none text-sm resize-none transition-all duration-300 font-space"
                />
              </div>

              {/* Submit triggers / alerts */}
              <div className="flex flex-col gap-3 mt-2">
                <AnimatePresence mode="wait">
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 font-space"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 font-space"
                    >
                      <Check className="w-4 h-4 flex-shrink-0" />
                      <span>Telemetry submitted successfully. Connecting shortly.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className="bg-gradient-to-r from-[#00F5FF] via-[#4F46E5] to-[#A855F7] text-white font-bold py-3.5 rounded-xl border border-transparent flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-300 pointer-events-auto cursor-pointer text-sm font-space uppercase"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 fill-current" />
                      <span>SEND</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
