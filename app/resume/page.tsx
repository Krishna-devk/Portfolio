"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Mail, ArrowUpRight, Terminal, Menu, X, ArrowDown } from "lucide-react";
import Link from "next/link";

// Component imports
import HeroCanvas from "./components/HeroCanvas";
import AboutStats from "./components/AboutStats";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ProjectsShowcase from "./components/ProjectsShowcase";
import TechStack from "./components/TechStack";
import Achievements from "./components/Achievements";
import ContactForm from "./components/ContactForm";

// Context import
import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

function ResumePageContent() {
  const { data, loading } = usePortfolio();
  const [headlineIndex, setHeadlineIndex] = useState(0);

  const headlines = data.personal.titles.length > 0
    ? data.personal.titles
    : ["AI Engineer", "MERN Developer", "Full Stack Developer", "Digital Architect", "Flutter"];

  // Rotating title headlines loop
  useEffect(() => {
    if (headlines.length <= 1) return;
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [headlines.length]);

  // Global mouse-glow position state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll Progress Setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "hero", label: "01 // HERO" },
    { id: "about", label: "02 // BIO" },
    { id: "timeline", label: "03 // TIMELINE" },
    { id: "projects", label: "04 // WORK" },
    { id: "tech", label: "05 // CAPABILITIES" },
    { id: "achievements", label: "06 // HONORS" },
    { id: "contact", label: "07 // TELEMETRY" },
  ];

  // Dynamic customization values from theme editor
  const primaryColor = data.theme.primary || "#00F5FF";
  const secondaryColor = data.theme.secondary || "#4F46E5";
  const accentColor = data.theme.accent || "#A855F7";
  const customBackground = data.theme.background || "#050816";

  return (
    <main
      style={{ backgroundColor: customBackground }}
      className="min-h-screen text-slate-300 relative selection:bg-[#00F5FF]/30 selection:text-white overflow-hidden"
    >
      
      {/* 1. Scroll Indicator Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{
          scaleX,
          background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor}, ${accentColor})`
        }}
      />

      {/* 2. Global Mouse Spotlight Glow */}
      <div
        className="fixed pointer-events-none z-10 w-[550px] h-[550px] rounded-full blur-[120px] transition-all duration-300 hidden md:block"
        style={{
          left: mousePos.x - 275,
          top: mousePos.y - 275,
          background: `radial-gradient(circle, ${primaryColor}14, ${secondaryColor}08, transparent 70%)`
        }}
      />

      {/* 3. Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none z-0" />

      {/* 4. Glassmorphic Navigation Bar */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-40 bg-[#0B1220]/75 backdrop-blur-md border border-white/6 rounded-2xl px-6 md:px-8 py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2">
          <div style={{ backgroundColor: primaryColor }} className="w-2.5 h-2.5 rounded-full animate-ping" />
          <span className="text-white text-base md:text-lg font-bold tracking-widest font-space">
            KA // <span style={{
              backgroundImage: `linear-gradient(to right, ${primaryColor}, ${accentColor})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}>ARCHITECT</span>
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              className="text-xs font-semibold tracking-wider text-slate-400 hover:text-[#00F5FF] transition-all duration-300 pointer-events-auto cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <a
            href={data.personal.resumeUrl || "/Krishna_Resume.pdf"}
            download="Krishna_Resume.pdf"
            style={{
              background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
            }}
            className="text-xs font-bold tracking-wider text-white px-4 py-2 rounded-lg hover:shadow-[0_0_12px_rgba(0,245,255,0.3)] transition-all duration-300 pointer-events-auto flex items-center gap-1 cursor-pointer"
          >
            RESUME <ArrowDown className="w-3 h-3" />
          </a>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-slate-400 hover:text-white transition-colors pointer-events-auto"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-28 left-[5%] right-[5%] z-45 bg-[#0B1220]/95 backdrop-blur-lg border border-white/8 p-6 rounded-2xl flex flex-col gap-4 lg:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="text-sm font-semibold tracking-wider text-slate-300 hover:text-[#00F5FF] text-left py-2 border-b border-white/4 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <a
              href={data.personal.resumeUrl || "/Krishna_Resume.pdf"}
              download="Krishna_Resume.pdf"
              style={{
                background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
              }}
              className="text-sm font-bold tracking-wider text-white py-3 rounded-xl text-center shadow-lg flex items-center justify-center gap-1 cursor-pointer"
            >
              DOWNLOAD RESUME <ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. HERO SECTION */}
      <section
        id="hero"
        className="min-h-screen w-full relative flex items-center justify-center px-6 pt-24"
      >
        {/* Floating Background Particle Canvas */}
        <div className="absolute inset-0 z-0">
          <HeroCanvas />
        </div>

        <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col items-center text-center gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              borderColor: `${primaryColor}33`,
              backgroundColor: `${primaryColor}0d`,
              color: primaryColor
            }}
            className="flex items-center gap-2 border py-1.5 px-4 rounded-full text-xs font-semibold tracking-widest uppercase font-mono shadow-[0_0_10px_rgba(0,245,255,0.1)]"
          >
            <Terminal className="w-3.5 h-3.5" /> SYSTEM MATRIX ACTIVE
          </motion.div>

          <div className="flex flex-col gap-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white font-space leading-none"
            >
              {data.personal.name}
            </motion.h1>

            {/* Sub-Headline deck */}
            <div className="h-12 md:h-16 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={headlineIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor}, ${accentColor})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}
                  className="text-2xl md:text-4xl font-bold font-space tracking-tight"
                >
                  {headlines[headlineIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-slate-400 text-base md:text-lg leading-relaxed font-light"
          >
            {data.personal.heroText}
          </motion.p>

          {/* Core CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center"
          >
            <button
              onClick={() => handleScrollTo("contact")}
              style={{
                background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor}, ${accentColor})`
              }}
              className="w-full sm:w-auto text-white font-bold py-3.5 px-8 rounded-xl hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-300 pointer-events-auto cursor-pointer text-sm font-space uppercase"
            >
              Initiate Project Telemetry
            </button>
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto bg-[#0B1220]/80 hover:bg-[#111827]/90 text-white font-bold py-3.5 px-8 rounded-xl border border-white/[0.06] hover:border-[#00F5FF]/30 transition-all duration-300 pointer-events-auto cursor-pointer text-sm font-space uppercase"
            >
              Inspect Architectures
            </button>
          </motion.div>

          {/* Social Icons row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex items-center gap-5 mt-8 z-10"
          >
            <a
              href={data.personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors pointer-events-auto p-2 border border-white/[0.04] bg-[#0B1220]/60 rounded-xl hover:border-[#00F5FF]/30"
              aria-label="GitHub Developer Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href={data.personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors pointer-events-auto p-2 border border-white/[0.04] bg-[#0B1220]/60 rounded-xl hover:border-[#A855F7]/30"
              aria-label="LinkedIn Professional Network"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${data.personal.email}`}
              className="text-slate-400 hover:text-white transition-colors pointer-events-auto p-2 border border-white/[0.04] bg-[#0B1220]/60 rounded-xl hover:border-[#00F5FF]/30"
              aria-label="Email Correspondence"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Floating Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
            onClick={() => handleScrollTo("about")}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 text-slate-500 hover:text-[#00F5FF] transition-colors"
          >
            <span className="text-[10px] tracking-widest font-bold font-space uppercase">SCROLL ENGINE</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* 6. ABOUT & STATS SECTION */}
      <div id="about" className="relative">
        <AboutStats />
      </div>

      {/* 7. EXPERIENCE TIMELINE SECTION */}
      <div id="timeline" className="relative border-t border-white/[0.04]">
        <ExperienceTimeline />
      </div>

      {/* 8. FEATURED PROJECTS SHOWCASE SECTION */}
      <div id="projects" className="relative border-t border-white/[0.04]">
        <ProjectsShowcase />
      </div>

      {/* 9. DETAILED TECH CAPABILITIES SECTION */}
      <div id="tech" className="relative border-t border-white/[0.04]">
        <TechStack />
      </div>

      {/* 10. HONORS & HACKATHONS ACHIEVEMENTS SECTION */}
      <div id="achievements" className="relative border-t border-white/[0.04]">
        <Achievements />
      </div>

      {/* 11. TELEMETRY CONTACT FORM SECTION */}
      <div id="contact" className="relative border-t border-white/[0.04]">
        <ContactForm />
      </div>

      {/* 12. MINIMALIST FOOTER */}
      <footer className="py-12 border-t border-white/[0.04] bg-[#050816] text-center flex flex-col items-center gap-4 relative overflow-hidden">
        <div className="max-w-6xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold tracking-wider uppercase font-space">
          <span>
            © 2026 {data.personal.name}. All system indices active.
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Designed with Next.js, Framer Motion & WebGL
          </span>
        </div>
      </footer>
    </main>
  );
}

export default function ResumePage() {
  return (
    <PortfolioProvider>
      <ResumePageContent />
    </PortfolioProvider>
  );
}
