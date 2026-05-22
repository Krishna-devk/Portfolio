"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Cpu, Layout, Server, Database, Settings, Terminal } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function TechStack() {
  const { data } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeCategory, setActiveCategory] = useState<"all" | "core" | "frontend" | "backend" | "database" | "tools">("all");

  const primaryColor = data.theme.primary || "#00F5FF";
  const secondaryColor = data.theme.secondary || "#4F46E5";
  const accentColor = data.theme.accent || "#A855F7";
  const customBackground = data.theme.background || "#050816";

  const categories = [
    { id: "all", label: "All Tech", icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: "core", label: "Languages", icon: <Cpu className="w-3.5 h-2.5" /> },
    { id: "frontend", label: "Front-end", icon: <Layout className="w-3.5 h-3.5" /> },
    { id: "backend", label: "Back-end", icon: <Server className="w-3.5 h-3.5" /> },
    { id: "database", label: "Databases", icon: <Database className="w-3.5 h-3.5" /> },
    { id: "tools", label: "DevOps & Tools", icon: <Settings className="w-3.5 h-3.5" /> },
  ];

  const technologies = data.skills;

  const filteredTechnologies = activeCategory === "all"
    ? technologies
    : technologies.filter((t) => t.category === activeCategory);

  const marqueeItems = technologies.length > 0
    ? technologies.map((t) => t.name)
    : ["TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "Redis", "Tailwind CSS"];

  return (
    <section
      style={{ backgroundColor: customBackground }}
      className="py-24 md:py-32 px-6 w-full flex flex-col items-center relative overflow-hidden"
    >
      {/* Dynamic neon circles */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#00F5FF]/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-[#A855F7]/5 filter blur-[100px] pointer-events-none" />

      <div ref={containerRef} className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ color: primaryColor }}
            className="text-xs font-bold tracking-[0.2em] uppercase font-space"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl text-white font-bold tracking-tight font-space leading-none"
          >
            My Tech Stacks & Core Competencies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-xl text-base md:text-lg font-light mt-2"
          >
            Categorized filters showcasing advanced skill proficiencies across full-stack ecosystems.
          </motion.p>
        </div>

        {/* Categories Tabs Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                style={{
                  background: isActive
                    ? `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                    : "#0B1220bf",
                  boxShadow: isActive ? `0 0 15px ${primaryColor}4d` : "none",
                  borderColor: isActive ? "transparent" : "rgba(255,255,255,0.06)"
                }}
                className={`flex items-center gap-2 py-2 px-5 rounded-full border text-sm font-semibold tracking-wide font-space transition-all duration-300 pointer-events-auto cursor-pointer ${
                  isActive ? "text-white scale-105" : "text-slate-400 hover:border-[#00F5FF]/30"
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechnologies.map((tech) => {
              // Custom gradient outline settings
              const itemAccent = tech.accent || "from-[#00F5FF]/20 to-[#4F46E5]/5 border-[#00F5FF]/20 text-[#00F5FF]";
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  key={tech.name}
                  className={`bg-linear-to-br ${itemAccent} bg-opacity-75 border p-5 rounded-2xl backdrop-blur-md relative overflow-hidden group shadow-lg flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white text-base md:text-lg font-bold font-space group-hover:text-[#00F5FF] transition-colors duration-300">
                      {tech.name}
                    </span>
                    <span className="text-xs font-semibold tracking-wider font-space opacity-80">
                      {tech.level}%
                    </span>
                  </div>

                  {/* Loading indicator bar */}
                  <div className="w-full h-1.5 bg-[#050816] rounded-full overflow-hidden border border-white/[0.04]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${tech.level}%` }}
                      transition={{ duration: 1.0, ease: "easeOut" }}
                      style={{
                        background: `linear-gradient(to right, ${primaryColor}, ${accentColor})`
                      }}
                      className="h-full rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Flowing Marquee Loop */}
        <div className="w-full mt-24 border-t border-b border-white/4 py-8 overflow-hidden relative flex">
          {/* Fades on left and right */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#050816] to-transparent z-15 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#050816] to-transparent z-15 pointer-events-none" />

          {/* Marquee group 1 */}
          <div className="flex gap-16 animate-marquee whitespace-nowrap min-w-full">
            {marqueeItems.concat(marqueeItems).map((item, idx) => (
              <span
                key={idx}
                style={{
                  color: `${primaryColor}1a`
                }}
                className="text-2xl md:text-3xl font-bold tracking-widest font-space uppercase"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
