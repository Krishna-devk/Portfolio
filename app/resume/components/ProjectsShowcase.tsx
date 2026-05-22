"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Leaf, Stethoscope, LayoutGrid, Cpu, LineChart, Play, CheckCircle } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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

export default function ProjectsShowcase() {
  const { data } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const primaryColor = data.theme.primary || "#00F5FF";
  const accentColor = data.theme.accent || "#A855F7";
  const secondaryColor = data.theme.secondary || "#4F46E5";
  const customBackground = data.theme.background || "#050816";
  
  // Custom states for interactive card sub-systems
  const [agriTelemetry, setAgriTelemetry] = useState({ moisture: 64, ph: 6.8, temp: 24.2 });
  const [clinicalCallState, setClinicalCallState] = useState<"idle" | "playing" | "done">("idle");
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [boardlyNodes, setBoardlyNodes] = useState<{ id: number; x: number; y: number; label: string }[]>([
    { id: 1, x: 20, y: 30, label: "Brainstorm" },
    { id: 2, x: 70, y: 25, label: "User Flows" },
    { id: 3, x: 45, y: 70, label: "Database" },
  ]);

  // AgriSense Telemetry mock loop
  useEffect(() => {
    const timer = setInterval(() => {
      setAgriTelemetry((prev) => ({
        moisture: Math.max(40, Math.min(85, prev.moisture + (Math.random() - 0.5) * 3)),
        ph: Math.max(5.5, Math.min(8.0, Number((prev.ph + (Math.random() - 0.5) * 0.1).toFixed(2)))),
        temp: Math.max(18, Math.min(30, Number((prev.temp + (Math.random() - 0.5) * 0.5).toFixed(1)))),
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // QuickCare call transcription logic
  useEffect(() => {
    if (clinicalCallState !== "playing") return;
    const lines = [
      "Patient: Experiencing persistent dry cough and light chest tightening.",
      "Doctor: Let's check vital indexes. Heart rate looks solid.",
      "AI Diagnostics: 85% probability matching Upper Respiratory Congestion.",
      "System Summary: Generating standard inhaler prescription recommendations...",
    ];

    let current = 0;
    setTranscripts([]);

    const timer = setInterval(() => {
      if (current < lines.length) {
        setTranscripts((prev) => [...prev, lines[current]]);
        current++;
      } else {
        setClinicalCallState("done");
        clearInterval(timer);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [clinicalCallState]);

  // Interactive Node connector for Boardly
  const handleBoardlyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (boardlyNodes.length >= 6) {
      setBoardlyNodes((prev) => [...prev.slice(1), { id: Date.now(), x, y, label: `Idea ${prev.length + 1}` }]);
    } else {
      setBoardlyNodes((prev) => [...prev, { id: Date.now(), x, y, label: `Idea ${prev.length + 1}` }]);
    }
  };

  const getProjectHighlight = (highlightType: string, projectTitle: string, projectTech: string[]) => {
    switch (highlightType) {
      case "agrisense":
        return (
          <div className="bg-[#050816] rounded-xl p-4 border border-white/[0.04] flex flex-col gap-3 font-mono text-xs text-[#00F5FF]">
            <div className="flex justify-between items-center border-b border-white/[0.06] pb-2 text-slate-500">
              <span className="flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5 text-[#00F5FF]" /> AgriSense-Core v2.1</span>
              <span className="text-[10px] bg-[#00F5FF]/10 text-[#00F5FF] px-2 py-0.5 rounded-full font-bold">ONLINE</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#0B1220] p-2 rounded-lg border border-[#00F5FF]/10 flex flex-col">
                <span className="text-[10px] text-slate-500 font-semibold tracking-wide">SOIL MOISTURE</span>
                <span className="text-base font-bold text-white mt-1 font-space">{agriTelemetry.moisture.toFixed(0)}%</span>
              </div>
              <div className="bg-[#0B1220] p-2 rounded-lg border border-[#00F5FF]/10 flex flex-col">
                <span className="text-[10px] text-slate-500 font-semibold tracking-wide">PH INDEX</span>
                <span className="text-base font-bold text-white mt-1 font-space">{agriTelemetry.ph}</span>
              </div>
              <div className="bg-[#0B1220] p-2 rounded-lg border border-[#00F5FF]/10 flex flex-col">
                <span className="text-[10px] text-slate-500 font-semibold tracking-wide">TEMP (°C)</span>
                <span className="text-base font-bold text-white mt-1 font-space">{agriTelemetry.temp}°C</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><LineChart className="w-3.5 h-3.5 text-emerald-400" /> Soil diagnostic system ready</span>
              <span className="text-slate-600">REFRESHING LIVE...</span>
            </div>
          </div>
        );
      case "quickcare":
        return (
          <div className="bg-[#050816] rounded-xl p-4 border border-white/[0.04] flex flex-col gap-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/[0.06] pb-2 text-slate-500">
              <span className="flex items-center gap-1.5"><Stethoscope className="w-3.5 h-3.5 text-[#A855F7]" /> Clinical-Link v4.8</span>
              {clinicalCallState === "playing" ? (
                <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full font-bold animate-pulse">RECORDING</span>
              ) : clinicalCallState === "done" ? (
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">PROCESSED</span>
              ) : (
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">READY</span>
              )}
            </div>
            
            <div className="bg-[#0B1220] p-3 rounded-lg border border-white/[0.04] min-h-[90px] flex flex-col gap-1.5 text-slate-400 leading-normal">
              {transcripts.length === 0 && (
                <div className="text-center text-slate-500 flex flex-col justify-center items-center h-full py-4 gap-2">
                  <span>Transcriptions empty. Start consult telemetry.</span>
                  <button 
                    onClick={() => setClinicalCallState("playing")}
                    className="bg-[#A855F7] hover:bg-[#8B5CF6] text-white text-xs font-semibold py-1 px-3 rounded-full flex items-center gap-1 transition-colors pointer-events-auto"
                  >
                    <Play className="w-3 h-3 fill-current" /> Begin AI Stream
                  </button>
                </div>
              )}
              {transcripts.map((line, idx) => (
                <div key={idx} className="flex gap-1.5 text-[10px]">
                  <span className="text-[#A855F7]">►</span>
                  <span className={line.startsWith("AI") ? "text-emerald-400 font-semibold" : ""}>{line}</span>
                </div>
              ))}
            </div>
            
            {clinicalCallState === "done" && (
              <div className="flex items-center justify-between text-[9px] text-[#A855F7] bg-[#A855F7]/5 p-2 rounded border border-[#A855F7]/10">
                <span className="flex items-center gap-1 font-semibold"><CheckCircle className="w-3 h-3 text-emerald-400" /> Diagnosis summarized successfully</span>
                <button 
                  onClick={() => { setClinicalCallState("idle"); setTranscripts([]); }}
                  className="hover:underline font-bold tracking-wider pointer-events-auto"
                >
                  CLEAR
                </button>
              </div>
            )}
          </div>
        );
      case "boardly":
        return (
          <div className="bg-[#050816] rounded-xl p-4 border border-white/[0.04] flex flex-col gap-2 font-mono text-xs relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-white/[0.06] pb-2 text-slate-500">
              <span className="flex items-center gap-1.5"><LayoutGrid className="w-3.5 h-3.5 text-[#4F46E5]" /> Boardly-Engine v1.0</span>
              <span className="text-[9px] text-slate-500 font-semibold">TAP CANVAS TO DRAW</span>
            </div>

            <div 
              onClick={handleBoardlyClick}
              className="w-full h-24 bg-[#0B1220] rounded-lg border border-dashed border-white/[0.08] relative overflow-hidden cursor-crosshair pointer-events-auto flex items-center justify-center"
            >
              {boardlyNodes.length === 0 && (
                <span className="text-[10px] text-slate-600">Click coordinates to link ideas</span>
              )}
              
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {boardlyNodes.map((node, i) => {
                  if (i === 0) return null;
                  const prev = boardlyNodes[i - 1];
                  return (
                    <line
                      key={i}
                      x1={`${prev.x}%`}
                      y1={`${prev.y}%`}
                      x2={`${node.x}%`}
                      y2={`${node.y}%`}
                      stroke="rgba(79, 70, 229, 0.4)"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                  );
                })}
              </svg>

              {boardlyNodes.map((node) => (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 bg-[#4F46E5] text-white text-[8px] font-bold py-0.5 px-1.5 rounded-md border border-[#00F5FF]/30 whitespace-nowrap shadow-md flex items-center gap-1"
                >
                  <div className="w-1 h-1 rounded-full bg-[#00F5FF] animate-ping" />
                  {node.label}
                </div>
              ))}
            </div>
          </div>
        );
      case "threed":
        return (
          <div className="bg-[#050816] rounded-xl p-4 border border-white/[0.04] flex flex-col gap-3 font-mono text-xs text-[#00F5FF]">
            <div className="flex justify-between items-center border-b border-white/[0.06] pb-2 text-slate-500">
              <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-[#00F5FF]" /> WebGL-Render v9.3</span>
              <span className="text-[10px] text-emerald-400 font-bold">60 FPS</span>
            </div>

            <div className="bg-[#0B1220] rounded-lg border border-white/[0.04] h-24 relative overflow-hidden flex flex-col justify-center items-center gap-1">
              <div className="w-12 h-12 rounded-full border border-dashed border-[#00F5FF]/40 flex items-center justify-center animate-spin pointer-events-none">
                <div className="w-8 h-8 rounded-full border border-[#A855F7]/40 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#00F5FF]/20" />
                </div>
              </div>
              <span className="text-[9px] text-slate-500 tracking-widest font-semibold mt-1">SHADERS ACTIVE</span>
            </div>
          </div>
        );
      default:
        // Render detailed customized analytics console for user-added projects!
        return (
          <div className="bg-[#050816] rounded-xl p-4 border border-white/[0.04] flex flex-col gap-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/[0.06] pb-2 text-slate-500">
              <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" style={{ color: accentColor }} /> System Telemetry</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">COMPILED</span>
            </div>
            <div className="bg-[#0B1220] p-3 rounded-lg border border-white/[0.04] flex flex-col gap-1.5 text-slate-400">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">ENGINE BASE:</span>
                <span className="text-white font-semibold">{projectTech.slice(0, 2).join(" + ") || "Vite + Tailwind"}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">SERVER LATENCY:</span>
                <span className="text-emerald-400 font-semibold">14.6 ms</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">SSL CHANNELS:</span>
                <span className="text-[#00F5FF] font-semibold">SECURE TLS v1.3</span>
              </div>
            </div>
          </div>
        );
    }
  };

  const projects = data.projects;

  return (
    <section
      style={{ backgroundColor: customBackground }}
      className="py-24 md:py-32 px-6 w-full flex flex-col items-center relative overflow-hidden"
    >
      {/* Visual lighting spots */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00F5FF]/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#A855F7]/5 rounded-full filter blur-[150px] pointer-events-none" />

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
            Showcase
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl text-white font-bold tracking-tight font-space leading-none"
          >
            Featured Digital Architectures
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-xl text-base md:text-lg font-light mt-2"
          >
            Interactive widgets and high-performance, real-time products engineered for scale.
          </motion.p>
        </div>

        {/* Projects Grid mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
          {projects.map((project, index) => {
            const delay = index * 0.15;
            
            // Map the accent outline and shadows
            const customAccent = project.accent || "from-[#00F5FF]/20 to-[#4F46E5]/10 border-[#00F5FF]/30 hover:shadow-[0_0_25px_rgba(0,245,255,0.15)]";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay, ease: "easeOut" }}
                className={`bg-gradient-to-br ${customAccent} bg-opacity-75 border p-6 md:p-8 rounded-3xl flex flex-col justify-between gap-6 hover:-translate-y-2 transition-all duration-300 backdrop-blur-md relative overflow-hidden group`}
              >
                {/* Visual Glass Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />

                <div className="flex flex-col gap-4">
                  {/* Category header */}
                  <div className="flex justify-between items-start w-full">
                    <span
                      style={{ color: primaryColor, backgroundColor: `${primaryColor}0d`, borderColor: `${primaryColor}1a` }}
                      className="text-xs font-semibold tracking-wider border py-1 px-3 rounded-full"
                    >
                      {project.tag}
                    </span>
                    <div className="flex items-center gap-2 text-slate-500">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors duration-200 pointer-events-auto p-1.5 bg-[#050816]/60 border border-white/[0.04] rounded-lg hover:border-white/[0.15]"
                          aria-label="GitHub Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors duration-200 pointer-events-auto p-1.5 bg-[#050816]/60 border border-white/[0.04] rounded-lg hover:border-white/[0.15]"
                          aria-label="Live Demo Link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & description */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <h3 className="text-2xl font-bold tracking-tight text-white font-space group-hover:text-[#00F5FF] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Simulated custom UI widget panels */}
                <div className="w-full relative z-20">
                  {getProjectHighlight(project.highlightType, project.title, project.tech)}
                </div>

                {/* Tech specifications stack badges */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/4">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] text-slate-400 bg-white/3 border border-white/5 rounded-md px-2 py-0.5 font-space"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
