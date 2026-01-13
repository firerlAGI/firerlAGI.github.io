import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import AiAssistant from './components/AiAssistant';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
    <div className="relative min-h-screen text-gray-200 selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      
      {/* Particle Effects - Middle Layer */}
      <div className="fixed inset-0 z-[-40] pointer-events-none">
         <ParticleBackground />
      </div>

      {/* CRT Scanline Effect - Top Overlay */}
      <div className="crt-overlay pointer-events-none fixed inset-0 z-[60]" />
      
      {/* Navigation Overlay */}
      <nav className="fixed top-0 w-full z-[50] px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="font-cyber font-bold text-xl text-white tracking-wider">
          F<span className="text-cyan-500">IR</span>ER<span className="text-fuchsia-500">LA</span>GI
        </div>
        
        <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 font-mono text-sm text-gray-400">
                <a href="#about" className="hover:text-cyan-400 transition-colors">{t.nav.about}</a>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">{t.nav.skills}</a>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">{t.nav.projects}</a>
                <a href="#blog" className="hover:text-fuchsia-400 transition-colors">{t.nav.blog}</a>
                <a href="#contact" className="hover:text-fuchsia-400 transition-colors">{t.nav.contact}</a>
            </div>

            {/* Language Toggle */}
            <div className="flex border border-gray-700 rounded overflow-hidden">
                <button 
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-1 text-xs font-mono transition-colors ${language === 'en' ? 'bg-cyan-900/50 text-cyan-400' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    EN
                </button>
                <button 
                    onClick={() => setLanguage('zh')}
                    className={`px-2 py-1 text-xs font-mono transition-colors ${language === 'zh' ? 'bg-fuchsia-900/50 text-fuchsia-400' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    CN
                </button>
            </div>
        </div>
      </nav>

      {/* Main Content - High Layer */}
      <main className="relative z-10 pt-20">
        <Hero />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>

      <AiAssistant />
      
      <footer className="py-8 text-center border-t border-gray-900 bg-black/80 backdrop-blur text-gray-600 font-mono text-xs relative z-10">
        {t.footer}
      </footer>
    </div>
  );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
};

export default App;