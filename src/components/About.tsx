"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, FileCode, FileJson, FileText, ChevronRight, Folder, FolderOpen } from "lucide-react";

type FileTab = "Bio.cs" | "Education.json" | "Experience.md";

export default function About() {
  const [activeTab, setActiveTab] = useState<FileTab>("Bio.cs");
  const [isFolderOpen, setIsFolderOpen] = useState(true);

  const tabs: { name: FileTab; icon: React.ReactNode; color: string }[] = [
    { name: "Bio.cs", icon: <FileCode className="w-4 h-4" />, color: "text-amber-500" },
    { name: "Education.json", icon: <FileJson className="w-4 h-4" />, color: "text-cyber-blue" },
    { name: "Experience.md", icon: <FileText className="w-4 h-4" />, color: "text-cyber-purple" },
  ];

  // Syntax highlighted code blocks
  const renderBioCode = () => (
    <pre className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-zinc-400">
      <div>
        <span className="text-pink-500">using</span> System;
      </div>
      <div>
        <span className="text-pink-500">using</span> System.Collections.Generic;
      </div>
      <br />
      <div>
        <span className="text-pink-500">namespace</span> <span className="text-sky-400">ZeyadAzab.Developer</span>
      </div>
      {"{"}
      <div className="pl-4">
        <span className="text-pink-500">public class</span> <span className="text-emerald-400">Bio</span> : <span className="text-emerald-400">IBackendDeveloper</span>
        {" {"}
        <div className="pl-4">
          <span className="text-pink-500">public string</span> Name =&gt; <span className="text-amber-300">"Zeyad Azab"</span>;
          <br />
          <span className="text-pink-500">public string</span> Role =&gt; <span className="text-amber-300">"Software Engineer / Backend Developer"</span>;
          <br />
          <span className="text-pink-500">public string</span> Location =&gt; <span className="text-amber-300">"Giza, Egypt"</span>;
          <br />
          <span className="text-pink-500">public string</span> Focus =&gt; <span className="text-amber-300">"High-Performance APIs & Scalable Workflows"</span>;
          <br />
          <br />
          <span className="text-pink-500">public string</span> Description =&gt;
          <div className="pl-4 text-amber-300">
            "Third-year AI student at Cairo University with a strong interest in backend development using ASP.NET Core\n" +
            <br />
            "and the .NET ecosystem. Passionate about writing clean, scalable code and eager to grow as a\n" +
            <br />
            "Software Engineer through real-world projects."
          </div>
          <br />
          <span className="text-pink-500">public</span> <span className="text-emerald-400">List</span>&lt;<span className="text-pink-500">string</span>&gt; ArchitecturePatterns =&gt; <span className="text-pink-500">new</span>()
          <br />
          {"{"}
          <div className="pl-4 text-amber-300">
            "N-Tier Architecture", "Onion Architecture", "Clean Architecture"
          </div>
          {"};"}
        </div>
        {"}"}
      </div>
      {"}"}
    </pre>
  );

  const renderEducationCode = () => (
    <pre className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-sky-400">
      <div>{"{"}</div>
      <div className="pl-4 text-zinc-400">
        <span className="text-pink-500">"University"</span>: <span className="text-amber-300">"Cairo University"</span>,
        <br />
        <span className="text-pink-500">"College"</span>: <span className="text-amber-300">"Faculty of Computers and Artificial Intelligence (FCAI)"</span>,
        <br />
        <span className="text-pink-500">"Major"</span>: <span className="text-amber-300">"Artificial Intelligence"</span>,
        <br />
        <span className="text-pink-500">"GraduationYear"</span>: <span className="text-amber-300">"2027 (Current Third-Year Student)"</span>,
        <br />
        <span className="text-pink-500">"CoreStudies"</span>: {"["}
        <div className="pl-4 text-amber-300">
          "Data Structures", "Algorithms", "Database Modeling",
          <br />
          "Operating Systems", "Relational Database Systems (ERD & 3NF)"
        </div>
        {"],"}
        <br />
        <span className="text-pink-500">"Scholarships"</span>: {"["}
        <div className="pl-4 text-emerald-400">
          {"{"}
          <div className="pl-4 text-zinc-400">
            <span className="text-pink-500">"Program"</span>: <span className="text-amber-300">"Digital Egypt Pioneers Initiative (DEPI)"</span>,
            <br />
            <span className="text-pink-500">"Track"</span>: <span className="text-amber-300">"Full stack .NET Web Development"</span>
          </div>
          {"},"}
          <br />
          {"{"}
          <div className="pl-4 text-zinc-400">
            <span className="text-pink-500">"Program"</span>: <span className="text-amber-300">"Information Technology Institute (ITI)"</span>,
            <br />
            <span className="text-pink-500">"Track"</span>: <span className="text-amber-300">"Full stack .NET Training Program"</span>
          </div>
          {"}"}
        </div>
        {"]"}
      </div>
      <div>{"}"}</div>
    </pre>
  );

  const renderExperienceCode = () => (
    <div className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-zinc-300">
      <div className="text-cyber-purple font-bold text-lg mb-2"># Professional & Academic Background</div>
      <br />
      <div className="border-l-2 border-cyber-purple pl-4 my-4">
        <div className="text-white font-bold text-base flex justify-between">
          <span>Digital Egypt Pioneers Initiative (DEPI)</span>
          <span className="text-xs text-zinc-500">Nov 2025 – Jul 2026</span>
        </div>
        <div className="text-xs text-cyber-blue font-mono mb-2">Fullstack .NET Web Developer Scholar</div>
        <ul className="list-disc pl-4 text-zinc-400 text-xs flex flex-col gap-1">
          <li>Engineered RESTful Web APIs using ASP.NET Core, employing Clean Architecture and SOLID.</li>
          <li>Built server-side MVC systems, Razor Views, EF Core database models, and SQL Server queries.</li>
          <li>Participated in agile workflows (Trello) and containerized workflows via Docker.</li>
        </ul>
      </div>

      <div className="border-l-2 border-cyber-blue pl-4 my-4">
        <div className="text-white font-bold text-base flex justify-between">
          <span>Information Technology Institute (ITI)</span>
          <span className="text-xs text-zinc-500">Aug 2025 – Oct 2025</span>
        </div>
        <div className="text-xs text-cyber-purple font-mono mb-2">Full Stack .NET Web Development Graduate</div>
        <ul className="list-disc pl-4 text-zinc-400 text-xs flex flex-col gap-1">
          <li>Completed intensive 120-hour full-stack training program.</li>
          <li>Delivered a production-ready ASP.NET Core MVC application with SQL Server.</li>
          <li>Designed databases modeling using ERD mappings and Entity Framework Core migrations.</li>
        </ul>
      </div>
    </div>
  );

  return (
    <section className="py-20 md:py-32 px-6 max-w-6xl mx-auto z-10 relative">
      {/* Section title */}
      <div className="flex flex-col gap-2 mb-12 md:mb-16">
        <div className="text-xs font-mono text-cyber-purple uppercase tracking-widest">01 / Profile</div>
        <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-white">
          About The <span className="text-cyber-blue">Engineer</span>
        </h2>
      </div>

      {/* Editor Mock Window */}
      <div className="terminal-window flex flex-col w-full h-[550px] overflow-hidden">
        {/* Editor Top Titlebar */}
        <div className="h-9 bg-[#0c0c0f] flex items-center justify-between px-4 border-b border-white/[0.03]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-xs text-zinc-500 font-mono">VS Code - {activeTab}</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-800" />
            <span className="w-2 h-2 rounded-full bg-zinc-800" />
            <span className="w-2 h-2 rounded-full bg-zinc-800" />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - File Explorer */}
          <div className="w-48 bg-[#0a0a0c] border-r border-white/[0.03] flex flex-col hidden sm:flex select-none">
            <div className="p-2 text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">
              Explorer
            </div>
            
            {/* Folder structures */}
            <div className="flex flex-col px-2">
              <div 
                className="flex items-center gap-1 py-1 text-zinc-400 hover:text-white cursor-pointer"
                onClick={() => setIsFolderOpen(!isFolderOpen)}
              >
                <ChevronRight className={`w-3.5 h-3.5 transform transition-transform duration-200 ${isFolderOpen ? "rotate-90" : ""}`} />
                {isFolderOpen ? <FolderOpen className="w-3.5 h-3.5 text-cyber-purple" /> : <Folder className="w-3.5 h-3.5 text-cyber-purple" />}
                <span className="text-xs font-mono">zeyad-portfolio</span>
              </div>

              {isFolderOpen && (
                <div className="pl-4 flex flex-col border-l border-zinc-800/80 ml-2.5 mt-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`flex items-center gap-1.5 py-1 text-left hover:text-white transition-colors cursor-pointer w-full ${activeTab === tab.name ? "text-white bg-white/[0.03] rounded px-1 -mx-1" : "text-zinc-500"}`}
                    >
                      <span className={tab.color}>{tab.icon}</span>
                      <span className="text-xs font-mono">{tab.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main workspace */}
          <div className="flex-1 flex flex-col bg-[#070709] overflow-hidden">
            {/* Tab Bar */}
            <div className="h-9 bg-[#09090b] flex border-b border-white/[0.03] overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-2 px-4 border-r border-white/[0.03] text-xs font-mono relative transition-colors cursor-pointer select-none ${activeTab === tab.name ? "bg-[#070709] text-white" : "text-zinc-500 hover:bg-white/[0.01]"}`}
                >
                  <span className={tab.color}>{tab.icon}</span>
                  <span>{tab.name}</span>
                  {activeTab === tab.name && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyber-blue"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Code Content Editor Area */}
            <div className="flex-1 p-6 overflow-y-auto select-text selection:bg-cyber-blue/30 selection:text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {activeTab === "Bio.cs" && renderBioCode()}
                  {activeTab === "Education.json" && renderEducationCode()}
                  {activeTab === "Experience.md" && renderExperienceCode()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Editor Status Bar */}
            <div className="h-6 bg-cyber-blue/5 border-t border-cyber-blue/10 flex justify-between items-center px-4 font-mono text-[10px] text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-cyber-blue">
                  <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-ping" />
                  UTF-8
                </span>
                <span>Language: {activeTab === "Bio.cs" ? "C#" : activeTab === "Education.json" ? "JSON" : "Markdown"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Ln 1, Col 1</span>
                <span>Spaces: 4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
