"use client";

import dynamic from "next/dynamic";

const BackendCanvas = dynamic(() => import("./BackendCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-transparent pointer-events-none">
      {/* Minimal grid loading state */}
      <div className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase animate-pulse-slow">
        Initializing 3D Topology...
      </div>
    </div>
  ),
});

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* Glow overlays */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-cyber-purple opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-cyber-blue opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />
      
      {/* The 3D Topology graph */}
      <BackendCanvas />
    </div>
  );
}
