"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

const StatCounter = ({ value, suffix, label, delay = 0 }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1500; // ms
    const incrementTime = 30; // ms
    const steps = Math.ceil(duration / incrementTime);
    const stepValue = end / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      start = Math.min(Math.round(stepValue * currentStep), end);
      setCount(start);

      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="bg-[#0B1220]/75 hover:bg-[#111827]/80 border border-white/[0.06] hover:border-[#00F5FF]/30 p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 backdrop-blur-md relative overflow-hidden group shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/5 via-transparent to-[#A855F7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00F5FF] via-[#4F46E5] to-[#A855F7] bg-clip-text text-transparent tracking-tight font-space">
        {count}
        {suffix}
      </span>
      <span className="text-slate-400 text-sm md:text-base mt-2 font-medium tracking-wide">
        {label}
      </span>
    </div>
  );
};

export default function AboutStats() {
  const { data } = usePortfolio();
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" });

  const primaryColor = data.theme.primary || "#00F5FF";
  const customBackground = data.theme.background || "#050816";

  // Gracefully parse biography paragraphs split by double newlines
  const biographyParagraphs = data.personal.aboutBio
    ? data.personal.aboutBio.split("\n\n")
    : [];

  return (
    <section
      style={{ backgroundColor: customBackground }}
      className="py-24 md:py-32 px-6 w-full flex flex-col items-center relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#4F46E5]/10 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#A855F7]/10 filter blur-[120px] pointer-events-none" />

      <div ref={contentRef} className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Summary & Biography */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <span
              style={{ color: primaryColor }}
              className="text-xs font-bold tracking-[0.2em] uppercase font-space"
            >
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl text-white font-bold tracking-tight font-space leading-tight">
              {data.personal.aboutTitle}
            </h2>
            <div className="text-slate-400 text-base md:text-lg leading-relaxed font-light flex flex-col gap-5">
              {biographyParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Showcase Cards & Core Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6"
          >
            {data.stats.map((stat, index) => (
              <StatCounter
                key={index}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
