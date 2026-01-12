import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate system boot sequence
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-cyan-500 font-mono text-xl animate-pulse mb-4">INITIALIZING SYSTEM...</div>
          <div className="w-64 h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
            <div className="h-full bg-cyan-500 animate-[width_1s_ease-out_forwards]" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-200 selection:bg-cyan-500/30 selection:text-white">
      <ParticleBackground />
      
      {/* Navigation Overlay (simple fixed header) */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="font-cyber font-bold text-xl text-white tracking-wider">
          F<span className="text-cyan-500">IR</span>ER<span className="text-fuchsia-500">LA</span>GI
        </div>
        <div className="hidden md:flex gap-8 font-mono text-sm text-gray-400">
          <a href="#about" className="hover:text-cyan-400 transition-colors">/ABOUT</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">/SKILLS</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">/PROJECTS</a>
          <a href="#contact" className="hover:text-fuchsia-400 transition-colors">/CONTACT</a>
        </div>
      </nav>

      <main className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <AiAssistant />
      
      <footer className="py-8 text-center border-t border-gray-900 bg-black text-gray-600 font-mono text-xs">
        © 2024 FIRERLAGI. SYSTEM.VERSION(2.0). ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
};

export default App;