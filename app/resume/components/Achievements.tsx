"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Award, Medal, Star, ArrowUpRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface AchievementCardProps {
  title: string;
  subtitle: string;
  rank: string;
  details: string[];
  gradient: string;
  index: number;
  iconName?: string;
  primaryColor: string;
  accentColor: string;
  link?: string;
}

const renderDynamicIcon = (iconName: string, primaryColor: string, accentColor: string) => {
  switch (iconName?.toLowerCase()) {
    case "trophy":
      return <Trophy className="w-6 h-6 text-amber-400" />;
    case "award":
      return <Award className="w-6 h-6" style={{ color: primaryColor }} />;
    case "medal":
      return <Medal className="w-6 h-6" style={{ color: accentColor }} />;
    default:
      return <Trophy className="w-6 h-6 text-amber-400" />;
  }
};

const AchievementCard = ({
  title,
  subtitle,
  rank,
  details,
  gradient,
  index,
  iconName = "trophy",
  primaryColor,
  accentColor,
  link
}: AchievementCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const delay = index * 0.15;
  const customGradient = gradient || "from-amber-500/10 to-yellow-600/5 border-amber-500/20 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={`bg-gradient-to-br ${customGradient} bg-opacity-75 border p-6 md:p-8 rounded-3xl backdrop-blur-md relative overflow-hidden group flex flex-col justify-between gap-6 shadow-xl hover:-translate-y-2 transition-all duration-300`}
    >
      {/* Background glass filter glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="flex flex-col gap-4">
        {/* Trophy / Icon Row */}
        <div className="flex items-center justify-between w-full">
          <div className="p-3 bg-[#050816]/80 rounded-2xl border border-white/[0.04] text-white flex items-center justify-center">
            {renderDynamicIcon(iconName, primaryColor, accentColor)}
          </div>
          <span
            style={{ color: primaryColor, backgroundColor: `${primaryColor}1a` }}
            className="text-xs font-bold font-space py-1 px-3.5 rounded-full tracking-wide border border-transparent"
          >
            {rank}
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1 mt-2">
          <h3 className="text-xl md:text-2xl text-white font-bold tracking-tight font-space group-hover:text-[#00F5FF] transition-colors duration-300">
            {title}
          </h3>
          <span className="text-slate-400 text-sm font-semibold tracking-wide">
            {subtitle}
          </span>
        </div>

        {/* Details list */}
        <ul className="text-slate-400 text-sm leading-relaxed font-light flex flex-col gap-2.5 pl-0 list-none mt-2">
          {details.map((detail, idx) => (
            <li key={idx} className="relative pl-5 flex items-start">
              <span
                style={{
                  backgroundColor: primaryColor,
                  boxShadow: `0 0 8px ${primaryColor}cc`
                }}
                className="absolute left-0 top-[8px] w-1.5 h-1.5 rounded-full"
              />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 mt-1">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold tracking-widest font-mono">
          <Star className="w-3.5 h-3.5 fill-current animate-pulse" style={{ color: primaryColor }} />
          <span>CYBER-AUTHENTICATED V1.0</span>
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: primaryColor }}
            className="text-[10px] font-bold tracking-widest uppercase font-space hover:underline flex items-center gap-1 group/link pointer-events-auto cursor-pointer"
          >
            VIEW PROOF <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default function Achievements() {
  const { data } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const primaryColor = data.theme.primary || "#00F5FF";
  const accentColor = data.theme.accent || "#A855F7";
  const customBackground = data.theme.background || "#050816";

  const achievementsList = data.achievements;

  // Dynamically assign icon categories
  const getIconName = (index: number) => {
    if (index === 0) return "trophy";
    if (index === 1) return "award";
    return "medal";
  };

  return (
    <section
      style={{ backgroundColor: customBackground }}
      className="py-24 md:py-32 px-6 w-full flex flex-col items-center relative overflow-hidden"
    >
      {/* Background visual light flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#A855F7]/5 filter blur-[150px] pointer-events-none" />

      <div ref={containerRef} className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ color: primaryColor }}
            className="text-xs font-bold tracking-[0.2em] uppercase font-space"
          >
            Honors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl text-white font-bold tracking-tight font-space leading-none"
          >
            Awards & Engineering Laurels
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-xl text-base md:text-lg font-light mt-2"
          >
            Highlighting competitive rankings, national-level awards, and hackathon accomplishments.
          </motion.p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {achievementsList.map((item, idx) => (
            <AchievementCard
              key={idx}
              index={idx}
              iconName={getIconName(idx)}
              primaryColor={primaryColor}
              accentColor={accentColor}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
