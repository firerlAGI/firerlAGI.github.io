import React, { useState, useEffect } from 'react';
import GlitchText from './GlitchText';
import { ArrowDown, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "Building the future, one line of code at a time.";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4 text-center">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-cyber-dark/90 pointer-events-none" />
      
      <div className="z-10 space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 border border-cyan-500/50 rounded-full px-4 py-1 bg-cyan-950/30 mb-4 animate-pulse-fast">
          <Terminal size={16} className="text-cyan-400" />
          <span className="text-cyan-400 font-mono text-sm">System Online</span>
        </div>

        <GlitchText 
          text="FIRERLAGI" 
          as="h1" 
          className="text-6xl md:text-9xl font-black text-white mb-4 block"
        />

        <p className="text-lg md:text-2xl font-mono text-cyan-200/80 min-h-[3rem]">
          {text}<span className="animate-pulse">_</span>
        </p>
        
        <p className="text-gray-400 max-w-xl mx-auto mt-4 font-mono text-sm md:text-base">
          Full Stack Engineer | Cyberpunk Enthusiast | AI Integrator
        </p>

        <div className="mt-12 flex gap-4 justify-center">
          <a href="#projects" className="group relative px-8 py-3 bg-cyan-900/20 border border-cyan-500 overflow-hidden">
            <div className="absolute inset-0 w-0 bg-cyan-500 transition-all duration-[250ms] ease-out group-hover:w-full opacity-20" />
            <span className="relative text-cyan-400 font-cyber tracking-widest group-hover:text-cyan-200">VIEW WORK</span>
          </a>
          <a href="#contact" className="group relative px-8 py-3 bg-fuchsia-900/20 border border-fuchsia-500 overflow-hidden">
             <div className="absolute inset-0 w-0 bg-fuchsia-500 transition-all duration-[250ms] ease-out group-hover:w-full opacity-20" />
            <span className="relative text-fuchsia-400 font-cyber tracking-widest group-hover:text-fuchsia-200">CONTACT</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce text-cyan-500/50">
        <ArrowDown size={32} />
      </div>
    </section>
  );
};

export default Hero;