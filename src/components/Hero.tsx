"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Cpu, Database, Server } from "lucide-react";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const subtitleText = "Architecting scalable backend systems & APIs.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText((prev) => prev + subtitleText.charAt(index));
      index++;
      if (index >= subtitleText.length) {
        clearInterval(timer);
      }
    }, 55);

    return () => clearInterval(timer);
  }, []);

  const nameWords = "ZEYAD AZAB".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 120,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
        delay: 1.5,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 py-12 md:px-16 md:py-20 select-none overflow-hidden z-10">
      {/* Header Bar at the start of the app */}
      <header className="w-full max-w-5xl mx-auto flex justify-between items-center z-20">
        <div className="font-mono text-xs sm:text-sm font-bold text-white tracking-widest flex items-center gap-2 select-none">
          <span className="w-2 h-2 rounded-full bg-cyber-blue animate-ping" />
          <span>ZEYAD // BACKEND</span>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/Zeyad-Azp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.03] border border-white/[0.05] hover:border-cyber-purple/40 text-[10px] sm:text-xs font-mono text-zinc-300 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(157,78,221,0.05)] hover:shadow-[0_0_20px_rgba(157,78,221,0.2)] clickable"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/zeyad-azab/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.03] border border-white/[0.05] hover:border-cyber-blue/40 text-[10px] sm:text-xs font-mono text-zinc-300 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] clickable"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </header>

      {/* Main Hero Header */}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 md:gap-8 justify-center my-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2"
        >
          {/* Accent Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center gap-2 self-start px-3 py-1 rounded-full border border-cyber-blue/20 bg-cyber-blue/5 text-cyber-blue text-xs tracking-widest font-mono uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            Core Stack: .NET Core & SQL Server
          </motion.div>

          {/* Name Header */}
          <h1 className="text-5xl sm:text-7xl md:text-[7rem] font-space font-bold tracking-tighter leading-none text-white select-none">
            {nameWords.map((word, wordIdx) => (
              <motion.span
                key={`word-${wordIdx}`}
                variants={wordVariants}
                className="inline-block mr-4 overflow-hidden"
              >
                {word.split("").map((letter, letterIdx) => (
                  <motion.span
                    key={`letter-${letterIdx}`}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Typing Subtitle Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full max-w-xl terminal-window glass p-4 font-mono text-sm border border-white/[0.03]"
        >
          <div className="flex gap-1.5 mb-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex text-zinc-400">
            <span className="text-cyber-purple mr-2">➜</span>
            <span className="text-cyber-blue mr-2">sys@zeyad-azab:~$</span>
            <span className="text-white">
              {typedText}
              <span className="inline-block w-1.5 h-4 bg-cyber-blue ml-0.5 animate-pulse" />
            </span>
          </div>
        </motion.div>

        {/* Micro-Architecture Panels */}
        <motion.div
          variants={statVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mt-4"
        >
          {/* API Load Balancer */}
          <div className="glass hover:border-cyber-blue/20 transition-all duration-300 p-4 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 flex items-center justify-center text-cyber-blue border border-cyber-blue/20">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="font-mono">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Gateway Status</div>
              <div className="text-xs text-emerald-400 font-bold">200 OK / 100% SLA</div>
            </div>
          </div>

          {/* Core Server MVC/API */}
          <div className="glass hover:border-cyber-purple/20 transition-all duration-300 p-4 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyber-purple/10 flex items-center justify-center text-cyber-purple border border-cyber-purple/20">
              <Server className="w-4 h-4" />
            </div>
            <div className="font-mono">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Backend Platform</div>
              <div className="text-xs text-white font-bold">ASP.NET Core Web API</div>
            </div>
          </div>

          {/* Database Stack */}
          <div className="glass hover:border-cyber-blue/20 transition-all duration-300 p-4 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 flex items-center justify-center text-cyber-blue border border-cyber-blue/20">
              <Database className="w-4 h-4" />
            </div>
            <div className="font-mono">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Database Nodes</div>
              <div className="text-xs text-white font-bold">SQL Server / Redis</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Info (Contacts & Indicator) */}
      <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 mt-8 font-mono text-xs text-zinc-500">
        {/* Social Link Badges */}
        <div className="flex gap-4">
          <a
            href="mailto:zeyadazzap0@gmail.com"
            className="flex items-center gap-1.5 hover:text-cyber-blue transition-colors duration-300 clickable"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
          <a
            href="https://github.com/Zeyad-Azp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-cyber-purple transition-colors duration-300 clickable"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/zeyad-azab/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-cyber-blue transition-colors duration-300 clickable"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-cyber-blue" />
        </motion.div>
      </div>
    </section>
  );
}
