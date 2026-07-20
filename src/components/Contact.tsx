"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, MapPin, Mail, CheckCircle2, ServerCrash } from "lucide-react";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const [formState, setFormState] = useState<{ status: "idle" | "submitting" | "success" | "error" }>({
    status: "idle",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ status: "submitting" });

    // Simulate API submission
    setTimeout(() => {
      setFormState({ status: "success" });
    }, 1200);
  };

  return (
    <section className="py-20 md:py-32 px-6 max-w-6xl mx-auto z-10 relative">
      {/* Section headers */}
      <div className="flex flex-col gap-2 mb-12 md:mb-16">
        <div className="text-xs font-mono text-cyber-blue uppercase tracking-widest">04 / Connection</div>
        <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-white">
          Contact <span className="text-cyber-purple">Gateway</span>
        </h2>
        <p className="text-sm text-zinc-500 max-w-xl font-mono mt-2">
          Initialize a communication request or check socket coordinates to establish connection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Left Side: Socket Info & Coordinates */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-6">
            <div className="text-sm font-mono text-zinc-400 leading-relaxed">
              Have an opening for a C# .NET engineer, or looking to build a high-performance REST API?
              Ping my client nodes or trigger a gateway dispatch form.
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {/* Email Node */}
              <div className="glass p-4 rounded-xl flex items-center gap-4 hover:border-cyber-blue/30 transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center text-cyber-blue">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="font-mono">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Email Protocol</div>
                  <a href="mailto:zeyadazzap0@gmail.com" className="text-sm text-white hover:text-cyber-blue transition-colors clickable font-bold">
                    zeyadazzap0@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Node */}
              <div className="glass p-4 rounded-xl flex items-center gap-4 hover:border-cyber-purple/30 transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center text-cyber-purple">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="font-mono">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Cell Connection</div>
                  <a href="tel:+201063736694" className="text-sm text-white hover:text-cyber-purple transition-colors clickable font-bold">
                    +20 106 373 6694
                  </a>
                </div>
              </div>

              {/* Location Node */}
              <div className="glass p-4 rounded-xl flex items-center gap-4 hover:border-cyber-blue/30 transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center text-cyber-blue">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="font-mono">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Geolocation Coordinates</div>
                  <span className="text-sm text-white font-bold">
                    Giza, Egypt (GMT+3)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Status panel */}
          <div className="glass p-4 rounded-xl border border-white/[0.03] font-mono text-[10px] text-zinc-500 flex flex-col gap-1 mt-6 lg:mt-0">
            <div className="text-zinc-400 uppercase font-bold tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Connection Listeners
            </div>
            <div>[IP_RESOLVE]: client connected via port 443</div>
            <div>[SSL_VALID]: cipher suite TLS_AES_256_GCM_SHA384 active</div>
            <div>[PING]: response latency 18ms</div>
          </div>
        </div>

        {/* Right Side: Contact Form with Mouse Spotlight */}
        <div className="lg:col-span-7 flex flex-col">
          <form
            ref={formRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
            onSubmit={handleSubmit}
            className="flex-1 glass border border-white/[0.04] p-6 sm:p-8 rounded-2xl flex flex-col gap-6 relative overflow-hidden"
          >
            {/* Spotlight Gradient element */}
            <div
              className="absolute pointer-events-none transition-opacity duration-500"
              style={{
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, rgba(157, 78, 221, 0.01) 50%, transparent 100%)",
                left: `${coords.x - 200}px`,
                top: `${coords.y - 200}px`,
                opacity: isFocused ? 1 : 0,
              }}
            />

            {formState.status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-grow flex flex-col items-center justify-center text-center gap-4 my-auto py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <div className="font-space text-2xl font-bold text-white">HTTP 201 Created</div>
                <p className="text-xs font-mono text-zinc-400 max-w-sm leading-relaxed">
                  Message schema validated and successfully injected into the data pipeline. I'll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setFormState({ status: "idle" })}
                  className="mt-4 px-4 py-2 rounded-lg bg-cyber-blue text-black font-mono text-xs font-bold transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer clickable"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g., Mohamed Ahmed"
                      className="bg-black/40 border border-white/[0.04] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-blue/50 transition-colors font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g., mohamed@company.com"
                      className="bg-black/40 border border-white/[0.04] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-purple/50 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 relative z-10">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Subject</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., Database Architectural Consultation"
                    className="bg-black/40 border border-white/[0.04] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-blue/50 transition-colors font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5 relative z-10 flex-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Message Body</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Define request payload..."
                    className="bg-black/40 border border-white/[0.04] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-purple/50 transition-colors resize-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState.status === "submitting"}
                  className="w-full relative z-10 flex items-center justify-center gap-2 py-3 rounded-lg bg-cyber-blue hover:bg-cyber-blue/90 text-black font-mono text-xs font-bold transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer clickable"
                >
                  <span>{formState.status === "submitting" ? "POSTing Payload..." : "POST MESSAGE"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
