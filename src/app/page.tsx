import ThreeBackground from "@/components/ThreeBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* R3F Node Topology Background */}
      <ThreeBackground />

      {/* Floating Navigator Dock */}
      <Navbar />

      {/* Section Blocks */}
      <div id="hero" className="relative w-full">
        <Hero />
      </div>

      <div id="about" className="relative w-full border-t border-white/[0.01]">
        <About />
      </div>

      <div id="skills" className="relative w-full border-t border-white/[0.01]">
        <Skills />
      </div>

      <div id="projects" className="relative w-full">
        <Projects />
      </div>

      <div id="contact" className="relative w-full border-t border-white/[0.01]">
        <Contact />
      </div>
    </main>
  );
}
