"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, Play, CheckCircle2, AlertCircle } from "lucide-react";

type Endpoint = "/skills" | "/system" | "/contacts";

interface ApiResponse {
  status: number;
  time: string;
  size: string;
  payload: string;
}

export default function Skills() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>("/skills");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestSteps, setRequestSteps] = useState<string[]>([]);

  const endpoints = [
    { path: "/skills", desc: "Get engineering skill tree & stack" },
    { path: "/system", desc: "Get portfolio system topology" },
    { path: "/contacts", desc: "Get developer communication nodes" },
  ];

  const skillPayload = {
    status: "success",
    data: {
      engineer: "Zeyad Azab",
      role: "Software Engineer / Backend Developer",
      coreStack: {
        language: "C# (.NET 8)",
        frameworks: ["ASP.NET Core Web API", "ASP.NET Core MVC"],
        orm: "Entity Framework Core (EF Core)",
        linq: "LINQ (Language Integrated Query)"
      },
      databases: {
        engine: "Microsoft SQL Server",
        querying: "T-SQL",
        modeling: ["ERD Mappings", "Normalization (3NF)"],
        caching: "Redis"
      },
      architectures: ["Clean Architecture", "Onion Architecture", "N-Tier", "Repository Pattern"],
      methodologies: ["SOLID Principles", "Dependency Injection", "JWT-based Authorization", "Real-time SignalR notifications"],
      tools: ["Git / GitHub", "Docker", "Microsoft Azure", "Postman", "Swagger / OpenAPI"],
      otherLanguages: ["C++", "Java", "Python"],
      productivity: ["Prompt Engineering", "AI-assisted development"]
    }
  };

  const systemPayload = {
    status: "success",
    environment: "Production",
    framework: "Next.js 14 App Router",
    styling: "Tailwind CSS",
    animations: ["Framer Motion", "Lenis Scroll"],
    renderEngine: "React Three Fiber / Three.js (3D Server request visualizer)",
    deployment: "Vercel Static Edge Network"
  };

  const contactsPayload = {
    status: "success",
    nodes: [
      { type: "Email", value: "zeyadazzap0@gmail.com", active: true },
      { type: "LinkedIn", value: "linkedin.com/in/zeyad-azab/", active: true },
      { type: "GitHub", value: "github.com/Zeyad-Azp", active: true },
      { type: "Location", value: "Giza, Egypt", timezone: "GMT+3" }
    ]
  };

  const handleSend = () => {
    setIsLoading(true);
    setResponse(null);
    setRequestSteps([]);

    const steps = [
      "dns_lookup: resolving api.zeyad.dev...",
      "api_gateway: routing request -> core-api-microservice...",
      "auth: validating mock JWT bearer token...",
      "sql_server: executing SELECT queries...",
      "response: payload serialization successful."
    ];

    // Animate console logs
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setRequestSteps((prev) => [...prev, step]);
      }, (idx + 1) * 200);
    });

    // Output final payload
    setTimeout(() => {
      let finalPayload = "";
      if (selectedEndpoint === "/skills") {
        finalPayload = JSON.stringify(skillPayload, null, 2);
      } else if (selectedEndpoint === "/system") {
        finalPayload = JSON.stringify(systemPayload, null, 2);
      } else if (selectedEndpoint === "/contacts") {
        finalPayload = JSON.stringify(contactsPayload, null, 2);
      }

      setResponse({
        status: 200,
        time: `${35 + Math.floor(Math.random() * 15)}ms`,
        size: selectedEndpoint === "/skills" ? "1.4 KB" : "480 B",
        payload: finalPayload,
      });
      setIsLoading(false);
    }, 1300);
  };

  const renderHighlightedJson = (json: string) => {
    return (
      <pre className="text-xs sm:text-sm font-mono overflow-x-auto text-zinc-400 leading-relaxed max-h-[380px] pr-2">
        {json.split("\n").map((line, idx) => {
          let lineContent: React.ReactNode = line;

          // Check if line contains a key-value or array elements
          if (line.includes(":")) {
            const parts = line.split(":");
            const key = parts[0];
            const val = parts.slice(1).join(":");

            // Syntax highlight parts
            const highlightedKey = <span className="text-pink-500">{key}</span>;
            let highlightedVal: React.ReactNode = val;

            if (val.includes('"')) {
              highlightedVal = <span className="text-amber-300">{val}</span>;
            } else if (val.includes("true") || val.includes("200")) {
              highlightedVal = <span className="text-emerald-400">{val}</span>;
            } else if (!isNaN(Number(val.trim().replace(",", "")))) {
              highlightedVal = <span className="text-cyan-400">{val}</span>;
            }

            lineContent = (
              <span>
                {highlightedKey}:{highlightedVal}
              </span>
            );
          } else {
            if (line.includes('"')) {
              lineContent = <span className="text-amber-300">{line}</span>;
            }
          }

          return (
            <div key={idx} className="hover:bg-white/[0.01] px-1 rounded">
              <span className="text-zinc-700 mr-4 select-none inline-block w-6 text-right">
                {idx + 1}
              </span>
              {lineContent}
            </div>
          );
        })}
      </pre>
    );
  };

  return (
    <section className="py-20 md:py-32 px-6 max-w-6xl mx-auto z-10 relative">
      {/* Section headers */}
      <div className="flex flex-col gap-2 mb-12 md:mb-16">
        <div className="text-xs font-mono text-cyber-blue uppercase tracking-widest">02 / Technical Skills</div>
        <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-white">
          Interactive <span className="text-cyber-purple">API Playground</span>
        </h2>
        <p className="text-sm text-zinc-500 max-w-xl font-mono mt-2">
          Test real-time mock backend endpoints to retrieve active stack schemas and system integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Endpoint Selectors */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="glass p-4 rounded-xl border border-white/[0.03]">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyber-blue" />
              API Endpoints
            </div>
            <div className="flex flex-col gap-2.5">
              {endpoints.map((ep) => (
                <button
                  key={ep.path}
                  onClick={() => {
                    setSelectedEndpoint(ep.path as Endpoint);
                    setResponse(null);
                    setRequestSteps([]);
                  }}
                  className={`flex flex-col text-left p-3 rounded-lg border transition-all duration-300 cursor-pointer ${selectedEndpoint === ep.path ? "bg-cyber-blue/5 border-cyber-blue/40" : "bg-transparent border-white/[0.03] hover:border-zinc-800"}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/25 text-emerald-400 font-mono">
                      GET
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-200">
                      {ep.path}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1 font-mono">{ep.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Console / DNS logger log */}
          <div className="glass p-4 rounded-xl border border-white/[0.03] flex-1 flex flex-col min-h-[160px]">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              System Gateway Log
            </div>
            <div className="flex-1 bg-black/40 rounded-lg p-3 font-mono text-[10px] text-zinc-500 flex flex-col gap-1.5 overflow-y-auto">
              {requestSteps.length === 0 && !isLoading && (
                <div className="text-zinc-600 italic">Awaiting API request execution...</div>
              )}
              {requestSteps.map((step, idx) => (
                <div key={idx} className="flex gap-1.5 items-start">
                  <span className="text-cyber-purple">▸</span>
                  <span className={idx === stepsLength() - 1 ? "text-emerald-400" : ""}>{step}</span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-cyber-blue animate-pulse mt-1">
                  <Play className="w-2.5 h-2.5 animate-spin" />
                  <span>Processing client request stream...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Request UI & JSON Response Pane */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Address Bar */}
          <div className="glass p-3 rounded-xl border border-white/[0.03] flex items-center gap-3">
            <div className="text-xs font-bold px-2 py-1 rounded bg-emerald-500/25 text-emerald-400 font-mono">
              GET
            </div>
            <div className="flex-1 font-mono text-xs text-zinc-400 bg-black/30 border border-white/[0.02] px-3 py-1.5 rounded-lg flex items-center select-none overflow-hidden">
              <span className="text-zinc-600 mr-0.5">https://api.zeyad.dev/v1/engineer</span>
              <span className="text-white font-bold">{selectedEndpoint}</span>
            </div>
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-cyber-blue hover:bg-cyber-blue/90 text-black font-mono text-xs font-bold transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed clickable"
            >
              <span>{isLoading ? "Sending..." : "Send"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Response Payload Viewer */}
          <div className="terminal-window flex-1 flex flex-col min-h-[380px] overflow-hidden">
            {/* Headers */}
            <div className="h-9 bg-[#0c0c0f] flex items-center justify-between px-4 border-b border-white/[0.03]">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                HTTP Response Stream
              </div>
              {response && (
                <div className="flex items-center gap-3 font-mono text-[10px]">
                  <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold border border-emerald-500/20">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    {response.status} OK
                  </span>
                  <span className="text-zinc-500">Time: <span className="text-zinc-300">{response.time}</span></span>
                  <span className="text-zinc-500">Size: <span className="text-zinc-300">{response.size}</span></span>
                </div>
              )}
            </div>

            {/* Content pane */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#070709] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center gap-3 my-auto"
                  >
                    <div className="relative w-10 h-10 border-2 border-cyber-purple/20 border-t-cyber-blue rounded-full animate-spin" />
                    <div className="text-xs font-mono text-zinc-500 animate-pulse">
                      Establishing database connection pool...
                    </div>
                  </motion.div>
                ) : response ? (
                  <motion.div
                    key="response"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    {renderHighlightedJson(response.payload)}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center text-zinc-600 font-mono text-xs gap-2 my-auto select-none"
                  >
                    <AlertCircle className="w-8 h-8 text-zinc-700" />
                    <div>Click "Send" above to invoke the REST endpoint</div>
                    <div>and pull the payload parameters.</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  function stepsLength() {
    return requestSteps.length;
  }
}
