"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, User, Cpu, Layers, Mail } from "lucide-react";

interface NavItem {
  label: string;
  sectionId: string;
  icon: React.ReactNode;
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  const navItems: NavItem[] = [
    { label: "Root", sectionId: "hero", icon: <Terminal className="w-4 h-4" /> },
    { label: "Profile", sectionId: "about", icon: <User className="w-4 h-4" /> },
    { label: "API Stack", sectionId: "skills", icon: <Cpu className="w-4 h-4" /> },
    { label: "Architectures", sectionId: "projects", icon: <Layers className="w-4 h-4" /> },
    { label: "Gateway", sectionId: "contact", icon: <Mail className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Active when section occupies center screen
      threshold: 0,
    });

    const sections = ["hero", "about", "skills", "projects", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="glass bg-[#08080a]/60 border border-white/[0.04] px-4 py-2.5 rounded-full flex gap-1.5 sm:gap-3 items-center shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-lg">
        {navItems.map((item) => {
          const isActive = activeSection === item.sectionId;
          return (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className={`relative p-2.5 rounded-full transition-all duration-300 group flex items-center justify-center cursor-pointer clickable ${isActive ? "text-cyber-blue" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              {/* Tooltip */}
              <span className="absolute top-12 bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 font-mono px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none tracking-widest uppercase">
                {item.label}
              </span>

              {/* Icon */}
              <span className="relative z-10">{item.icon}</span>

              {/* Glowing active indicator background */}
              {isActive && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
