"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Eye, Code, Layers, Database, ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface ProjectData {
  id: string;
  title: string;
  role: string;
  desc: string;
  tech: string[];
  links: { source: string; demo?: string };
  architecture: {
    pattern: string;
    details: string[];
    endpointsCount: string;
    databaseAspects: string[];
    extraTech: string;
  };
}

const projects: ProjectData[] = [
  {
    id: "forsa",
    title: "Forsa Event Platform",
    role: "Backend Architect (DEPI Graduation)",
    desc: "A high-performance event management system uniting Organizers, Venue Owners, and Attendees under an RBAC framework.",
    tech: ["ASP.NET Core Web API", "SQL Server", "EF Core", "JWT", "SignalR", "Clean Architecture", "React"],
    links: { source: "https://github.com/Zeyad-Azp", demo: "https://forsa-app.runasp.net/" },
    architecture: {
      pattern: "Clean Architecture (API -> Application -> Domain -> Infrastructure)",
      details: [
        "Role-Based Access Control (RBAC) via JWT Bearer handlers",
        "10+ RESTful API endpoints enforcing strict validation constraints",
        "Real-time notifications via SignalR hub capable of 50+ concurrent connections"
      ],
      endpointsCount: "12+ REST Endpoints",
      databaseAspects: ["SQL Server schema mapping", "Many-to-Many booking tables", "EF Core Migrations"],
      extraTech: "SignalR Socket Server",
    },
  },
  {
    id: "duvar",
    title: "Duvar Handmade Platform",
    role: "Core Developer",
    desc: "E-commerce platform showcasing artisan products, backed by security protocols and data seeding models.",
    tech: ["C#", "ASP.NET Core MVC", "SQL Server", "Entity Framework Core", "BCrypt.Net", "Repository Pattern"],
    links: { source: "https://github.com/Zeyad-Azp", demo: "https://duvar.runasp.net/" },
    architecture: {
      pattern: "N-Tier Architecture with Repository & Unit of Work Patterns",
      details: [
        "Cryptographic password security using BCrypt.Net",
        "Database abstraction layers isolating data retrieval queries",
        "Automated database seeders executing SQL constraints and populating static metrics"
      ],
      endpointsCount: "Razor Views & Controller Actions",
      databaseAspects: ["SQL Server mapping", "Auto-seeding configuration", "Normalized categories tables"],
      extraTech: "BCrypt.Net Encryption",
    },
  },
  {
    id: "car-repair",
    title: "Car Rent & Service System",
    role: "Backend Lead (ITI Graduation)",
    desc: "Full-stack booking and rental portal integrating third-party APIs, chat automations, and secure payment handling.",
    tech: ["C#", "ASP.NET Core MVC", "SQL Server", "EF Core", "PayPal SDK", "Gemini API", "SMTP Service"],
    links: { source: "https://github.com/Zeyad-Azp" },
    architecture: {
      pattern: "N-Tier (UI -> Business Logic -> Data Access Layers)",
      details: [
        "PayPal Gateway SDK wrapper handling webhooks and transaction states",
        "Google Gemini API integration for automated chatbot diagnostics over HttpClient",
        "SMTP email dispatch pipeline automated via action-filters"
      ],
      endpointsCount: "MVC Views & Actions",
      databaseAspects: ["Relational constraints mapping", "Role-based schema partitions", "Cascade deletion safety"],
      extraTech: "Google Gemini AI SDK & PayPal Webhooks",
    },
  },
  {
    id: "car-insurance",
    title: "Car Insurance DB System",
    role: "Database Architect & GUI Developer",
    desc: "Normalized desktop client optimizing operations for business models with zero data redundancy.",
    tech: ["C# GUI", "SQL Server", "EF Core", "ERD Modeling", "3NF Normalization", "Query Tuning"],
    links: { source: "https://github.com/Zeyad-Azp" },
    architecture: {
      pattern: "Normalized Database Centric Client-Server Topology",
      details: [
        "Fully normalized relational database model adhering strictly to 3rd Normal Form (3NF)",
        "T-SQL indexes on primary business keys reducing query redundancy by 40%",
        "CRUD transaction safety backed by entity-level check constraints"
      ],
      endpointsCount: "8+ DB Tables & 6+ Entities",
      databaseAspects: ["Normalized 3NF relational layout", "Indices performance mapping", "Constraints validation"],
      extraTech: "T-SQL Performance Indices",
    },
  },
];

// Magnetic Button Wrapper
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Trigger magnetism if mouse is close enough
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    if (distance < 75) {
      x.set(distanceX * 0.4);
      y.set(distanceY * 0.4);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.05] hover:border-cyber-blue/30 text-zinc-300 hover:text-cyber-blue font-mono text-xs transition-colors clickable inline-block"
    >
      {children}
    </motion.a>
  );
}

// 3D Tilt Card Wrapper
function ProjectCard({ project }: { project: ProjectData }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isFlipped) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    // Normalize mouse coords to [-0.5, 0.5]
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-[340px] sm:w-[440px] h-[500px] perspective-1000 flex-shrink-0">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full h-full relative cursor-default"
      >
        {/* CARD FRONT: User Interface Preview */}
        <div 
          className="absolute inset-0 w-full h-full glass border border-white/[0.04] p-6 rounded-2xl flex flex-col justify-between backface-hidden"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Card Head */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-cyber-blue tracking-widest uppercase font-bold">
                {project.role}
              </span>
              <button
                onClick={() => setIsFlipped(true)}
                className="flex items-center gap-1 text-[10px] font-mono text-cyber-purple hover:text-white transition-colors py-1 px-2.5 rounded bg-cyber-purple/10 border border-cyber-purple/20 cursor-pointer clickable"
              >
                <Layers className="w-3 h-3" />
                <span>Architecture X-Ray</span>
              </button>
            </div>
            <h3 className="text-2xl font-space font-bold text-white tracking-tight mt-2">
              {project.title}
            </h3>
          </div>

          {/* Screenshot Representation (Sleek abstract visual representation) */}
          <div className="flex-1 bg-black/40 border border-white/[0.02] rounded-xl my-4 overflow-hidden relative group/img flex flex-col justify-center items-center p-4">
            {/* Visual background grid */}
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute -inset-1 bg-gradient-to-tr from-cyber-blue/10 to-cyber-purple/10 opacity-50 rounded-xl blur-lg group-hover/img:opacity-80 transition-opacity" />
            
            {/* System Visual representation */}
            <div className="relative font-mono text-[9px] text-zinc-500 w-full flex flex-col gap-1.5 z-10 select-none">
              <div className="text-cyber-blue font-bold">~/controllers/{project.id}Controller.cs</div>
              <div className="text-zinc-600 pl-2">
                [HttpGet]
                <br />
                [Authorize]
                <br />
                <span className="text-pink-500">public async Task</span>&lt;IActionResult&gt; Get()
                <br />
                {"{"}
                <br />
                <span className="pl-4 text-emerald-400">_logger.LogInformation("Fetch request");</span>
                <br />
                <span className="pl-4 text-pink-500">return Ok</span>(await _service.GetAsync());
                <br />
                {"}"}
              </div>
            </div>
          </div>

          {/* Description & Tech Tags */}
          <div className="flex flex-col gap-4">
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">{project.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className="text-[9px] font-mono bg-white/[0.03] text-zinc-500 px-2 py-0.5 rounded border border-white/[0.01]">
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="text-[9px] font-mono bg-white/[0.03] text-cyber-blue px-2 py-0.5 rounded border border-white/[0.01]">
                  +{project.tech.length - 4} more
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-2 border-t border-white/[0.03]">
              <MagneticButton href={project.links.source}>
                <Code className="w-3.5 h-3.5" />
                <span>View Code</span>
              </MagneticButton>
              {project.links.demo && (
                <MagneticButton href={project.links.demo}>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </MagneticButton>
              )}
            </div>
          </div>
        </div>

        {/* CARD BACK: Backend X-Ray Architecture */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#0a0a0c] border border-cyber-purple/20 p-6 rounded-2xl flex flex-col justify-between"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          {/* Card Head */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-cyber-purple tracking-widest uppercase font-bold flex items-center gap-1.5">
                <Database className="w-3 h-3" />
                System Topology Flow
              </span>
              <button
                onClick={() => setIsFlipped(false)}
                className="flex items-center gap-1 text-[10px] font-mono text-cyber-blue hover:text-white transition-colors py-1 px-2.5 rounded bg-cyber-blue/10 border border-cyber-blue/20 cursor-pointer clickable"
              >
                <Eye className="w-3 h-3" />
                <span>Show UI Facade</span>
              </button>
            </div>
            <h3 className="text-xl font-space font-bold text-white tracking-tight mt-2">
              {project.title} Architecture
            </h3>
          </div>

          {/* Architecture Details Panel */}
          <div className="flex-1 bg-black/40 border border-white/[0.02] rounded-xl my-4 p-4 font-mono text-[10px] flex flex-col gap-3 justify-center select-text selection:bg-cyber-purple/30 selection:text-white">
            <div className="flex flex-col gap-1">
              <span className="text-cyber-blue text-[9px] uppercase tracking-widest font-bold">1. Architecture Pattern</span>
              <span className="text-zinc-300 leading-snug">{project.architecture.pattern}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-cyber-purple text-[9px] uppercase tracking-widest font-bold">2. Critical Workflows</span>
              <div className="flex flex-col gap-1 text-zinc-400">
                {project.architecture.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex gap-1.5 items-start">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="leading-snug">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/[0.02] text-[9px]">
              <div>
                <span className="text-zinc-500 block uppercase">DB Integration</span>
                <span className="text-zinc-300 font-bold">{project.architecture.databaseAspects[0]}</span>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase">APIs / Nodes</span>
                <span className="text-zinc-300 font-bold">{project.architecture.endpointsCount}</span>
              </div>
            </div>
          </div>

          {/* Back Card Footer */}
          <div className="flex justify-between items-center pt-2 border-t border-white/[0.03] font-mono text-[9px]">
            <span className="text-zinc-500">
              Platform: <span className="text-cyber-blue font-bold">{project.architecture.extraTech}</span>
            </span>
            <div className="flex items-center gap-1 text-cyber-purple font-bold">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>Optimized System</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef });
  
  useEffect(() => {
    const calculateRange = () => {
      if (trackRef.current) {
        const trackW = trackRef.current.scrollWidth;
        const parentW = trackRef.current.parentElement?.getBoundingClientRect().width || window.innerWidth;
        // Dynamic translation distance with subtle margin
        setScrollRange(Math.max(0, trackW - parentW + 100));
      }
    };

    calculateRange();
    const timer = setTimeout(calculateRange, 150); // Delay execution slightly to wait for render cycles
    window.addEventListener("resize", calculateRange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateRange);
    };
  }, []);

  const xTranslation = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#050505]">
      {/* Sticky page container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-10 py-12 md:py-20">
        
        {/* Section title */}
        <div className="px-6 max-w-6xl w-full mx-auto flex flex-col gap-2 mb-10 md:mb-12">
          <div className="text-xs font-mono text-cyber-purple uppercase tracking-widest">03 / Works</div>
          <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-white">
            Backend <span className="text-cyber-blue">Project Architectures</span>
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 font-mono mt-1">
            Scroll down to move horizontally. Flip cards to expose DB patterns and API workflows.
          </p>
        </div>

        {/* Horizontal Slider Track */}
        <div className="flex-1 flex items-center relative pl-[calc((100vw-min(1152px,85vw))/2)] pr-[15vw]">
          <motion.div
            ref={trackRef}
            style={{ x: xTranslation }}
            className="flex gap-8"
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* End Card */}
            <div className="w-[280px] sm:w-[320px] h-[500px] flex-shrink-0 flex flex-col justify-center items-center p-6 glass rounded-2xl text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center text-cyber-blue">
                <ArrowRight className="w-6 h-6 animate-pulse" />
              </div>
              <div className="font-space text-lg font-bold text-white">Looking for the full repo registry?</div>
              <p className="text-xs font-mono text-zinc-500">
                Explore all active controllers, automated migrations, and seed pipelines on GitHub.
              </p>
              <a
                href="https://github.com/Zeyad-Azp"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyber-blue text-black font-mono text-xs font-bold transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] clickable"
              >
                <span>Browse Github</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
