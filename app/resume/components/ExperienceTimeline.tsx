"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface TimelineItemProps {
  type: "work" | "education";
  title: string;
  subtitle: string;
  duration: string;
  points: string[];
  metrics?: { label: string; value: string }[];
  skills?: string[];
  index: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

const TimelineItem = ({
  type,
  title,
  subtitle,
  duration,
  points,
  metrics,
  skills,
  index,
  primaryColor,
  secondaryColor,
  accentColor,
}: TimelineItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-stretch md:justify-between mb-16 last:mb-0 w-full ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Date indicator for larger displays */}
      <div className="w-full md:w-[44%] hidden md:flex flex-col items-center justify-center p-6 text-slate-400">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
          className="flex items-center gap-2 border bg-[#0B1220]/60 backdrop-blur-md py-2 px-4 rounded-full text-sm font-semibold tracking-wide"
        >
          <Calendar className="w-4 h-4" style={{ color: primaryColor }} />
          <span>{duration}</span>
        </motion.div>
      </div>

      {/* Central Connector Circle */}
      <div className="absolute left-6 md:left-1/2 top-4 md:-translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          style={{
            borderColor: primaryColor,
            boxShadow: `0 0 15px ${primaryColor}66`
          }}
          className="w-10 h-10 rounded-full bg-[#050816] border-2 flex items-center justify-center"
        >
          {type === "work" ? (
            <Briefcase className="w-4 h-4" style={{ color: primaryColor }} />
          ) : (
            <GraduationCap className="w-4 h-4" style={{ color: accentColor }} />
          )}
        </motion.div>
      </div>

      {/* Main Glassmorphic Card Container */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-[44%] pl-16 md:pl-0"
      >
        <div
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
          className="bg-[#0B1220]/75 hover:bg-[#111827]/80 border p-6 md:p-8 rounded-2xl transition-all duration-300 relative overflow-hidden group backdrop-blur-md shadow-xl flex flex-col gap-4 hover:border-slate-500/30"
        >
          {/* Card Border Glow */}
          <div
            style={{
              background: `linear-gradient(to bottom right, ${primaryColor}0d, transparent, ${accentColor}0d)`
            }}
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          />

          {/* Date header for small viewport */}
          <div
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
            className="flex md:hidden items-center gap-2 text-slate-400 text-xs font-semibold tracking-wide border bg-[#050816]/80 py-1 px-3 rounded-full w-max mb-2"
          >
            <Calendar className="w-3.5 h-3.5" style={{ color: primaryColor }} />
            <span>{duration}</span>
          </div>

          <div className="flex flex-col gap-1">
            <h3
              style={{ color: "#ffffff" }}
              className="text-xl md:text-2xl font-bold tracking-tight font-space group-hover:text-[#00F5FF] transition-colors duration-300"
            >
              {title}
            </h3>
            <span className="text-slate-400 text-sm md:text-base font-medium tracking-wide">
              {subtitle}
            </span>
          </div>

          {/* Bullet achievements points */}
          <ul className="text-slate-400 text-sm md:text-base leading-relaxed font-light flex flex-col gap-2.5 list-none pl-0">
            {points.map((pt, i) => (
              <li key={i} className="relative pl-5 flex items-start">
                <span
                  style={{
                    backgroundColor: primaryColor,
                    boxShadow: `0 0 8px ${primaryColor}cc`
                  }}
                  className="absolute left-0 top-[10px] w-1.5 h-1.5 rounded-full"
                />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          {/* Core Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-2 p-4 bg-[#050816]/80 rounded-xl border border-white/[0.04]">
              {metrics.map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xs text-slate-500 tracking-wider uppercase font-medium">
                    {metric.label}
                  </span>
                  <span className="text-base md:text-lg font-bold text-white font-space mt-0.5">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Skills Badges */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-white/[0.04]">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    color: primaryColor,
                    backgroundColor: `${primaryColor}0d`,
                    borderColor: `${primaryColor}1a`
                  }}
                  className="text-xs font-medium px-2.5 py-1 rounded-md border font-space tracking-wide"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function ExperienceTimeline() {
  const { data } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const primaryColor = data.theme.primary || "#00F5FF";
  const secondaryColor = data.theme.secondary || "#4F46E5";
  const accentColor = data.theme.accent || "#A855F7";
  const customBackground = data.theme.background || "#050816";

  const timelineData = data.experiences;

  return (
    <section
      style={{ backgroundColor: customBackground }}
      className="py-24 md:py-32 px-6 w-full flex flex-col items-center relative overflow-hidden"
    >
      {/* Background radial overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#4F46E5]/5 filter blur-[150px] pointer-events-none" />

      <div ref={containerRef} className="max-w-5xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ color: primaryColor }}
            className="text-xs font-bold tracking-[0.2em] uppercase font-space"
          >
            Milestones
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl text-white font-bold tracking-tight font-space leading-none"
          >
            My Professional Timeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-xl text-base md:text-lg font-light mt-2"
          >
            Highlighting structural career points, engineering achievements, and educational excellence.
          </motion.p>
        </div>

        {/* Vertical Timeline wrapper */}
        <div className="relative">
          {/* Vertical Connecting line */}
          <div
            style={{
              background: `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor}, ${accentColor}4d)`,
              boxShadow: `0 0 8px ${primaryColor}4d`
            }}
            className="absolute left-[43px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] z-10"
          />

          {/* Timeline Items mappings */}
          {timelineData.map((item, idx) => (
            <TimelineItem
              key={idx}
              index={idx}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              accentColor={accentColor}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
