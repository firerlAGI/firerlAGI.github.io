import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Cpu, Calendar, MapPin, Activity } from 'lucide-react';
import GlitchText from './GlitchText';
import CyberCard from './CyberCard';

const DetailedAbout: React.FC = () => {
  const { t } = useLanguage();
  
  const about = t.detailed_about || {
    title: "ABOUT_ME.EXE",
    initializing: "> INITIALIZING PROFILE SEQUENCE...\n> LOADING PERSONAL DATA...\n> ACCESS GRANTED.",
    core_modules: "CORE_MODULES",
    bio_data: "BIO_DATA",
    experience_log: "EXPERIENCE_LOG",
    experience_note: "EXPERIENCE_NOTE",
    location_label: "LOC",
    status_label: "STATUS",
    status_online: "ONLINE",
    location_value: "CN/Remote",
    experiences: []
  };

  return (
    <section id="about" className="py-24 px-4 min-h-screen">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="mb-16 text-center">
          <GlitchText 
            text={about.title} 
            tag="h1" 
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight" 
          />
          <div className="flex justify-center mb-6">
            <div className="h-1 w-32 bg-cyan-500 rounded-full animate-pulse" />
          </div>
          <p className="text-xl text-cyan-400 font-mono max-w-2xl mx-auto leading-relaxed whitespace-pre-line bg-black/30 p-4 rounded border border-cyan-900/50">
            {about.initializing}
          </p>
        </div>

        <div className="w-full max-w-[1100px] mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 h-full">
              <CyberCard glowColor="cyan" className="h-full">
                <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                  <div className="relative w-48 h-48 shrink-0 group">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-2 rounded-full border border-fuchsia-500/30 animate-[spin_15s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full overflow-hidden backdrop-blur-sm border border-cyan-500/50 group-hover:border-cyan-400 transition-colors isolation-isolate transform-gpu">
                      <img 
            src="/assets/images/avatar-cyberpunk.svg" 
            alt="Cyber Ninja Avatar" 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 filter contrast-125 saturate-150"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-fuchsia-500/20 mix-blend-overlay pointer-events-none" />
                      <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.3)_3px)] bg-[length:100%_4px] pointer-events-none opacity-30" />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-2 bg-cyan-500/20 blur-md rounded-[100%]" />
                  </div>
                  
                  <div className="flex-grow text-center md:text-left w-full">
                    <h2 className="text-4xl font-cyber text-white mb-2 tracking-wider">FIRERLAGI</h2>
                    <div className="inline-block px-3 py-1 bg-fuchsia-900/20 border border-fuchsia-500/30 rounded mb-6">
                      <p className="text-fuchsia-400 font-mono text-sm tracking-widest">{t.about.roleBadge}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-cyan-950/30 p-3 rounded border border-cyan-500/20 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
                        <div className="absolute top-0 right-0 p-1 opacity-50">
                          <MapPin size={12} className="text-cyan-500" />
                        </div>
                        <span className="block text-xs text-cyan-500 mb-1 font-mono tracking-wider">{about.location_label}</span>
                        <span className="text-lg font-mono text-white">{about.location_value}</span>
                      </div>
                      <div className="bg-fuchsia-950/30 p-3 rounded border border-fuchsia-500/20 relative overflow-hidden group hover:border-fuchsia-500/40 transition-colors">
                        <div className="absolute top-0 right-0 p-1 opacity-50">
                          <Activity size={12} className="text-fuchsia-500" />
                        </div>
                        <span className="block text-xs text-fuchsia-500 mb-1 font-mono tracking-wider">{about.status_label}</span>
                        <span className="text-lg font-mono text-white flex items-center justify-center md:justify-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                          {about.status_online}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CyberCard>
            </div>

            <div className="lg:col-span-5 h-full">
              <CyberCard glowColor="pink" title={about.core_modules} className="h-full">
                <div className="flex flex-wrap gap-2 content-start h-full">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'Astro', 'Tailwind', 'Next.js', 'WebGL', 'Three.js', 'PostgreSQL', 'Docker', 'AWS'].map(tech => (
                    <span key={tech} className="
                      px-3 py-1.5 
                      bg-black/40 border border-gray-700/50 
                      text-gray-300 text-sm font-mono 
                      hover:border-cyan-500 hover:text-cyan-400 hover:bg-cyan-950/30
                      transition-all duration-300 cursor-default
                      clip-path-tag
                    ">
                      {tech}
                    </span>
                  ))}
                </div>
              </CyberCard>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CyberCard glowColor="cyan" title={about.bio_data}>
              <div className="space-y-4 text-gray-300 font-mono leading-relaxed relative">
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
                <div className="pl-6 space-y-4">
                  <p>{t.about.description1}</p>
                  <p>{t.about.description2}</p>
                  <div className="mt-6 pt-4 border-t border-dashed border-cyan-500/20">
                    <p className="text-cyan-300/80 italic">
                      <span className="text-fuchsia-500 font-bold mr-2">&gt;</span>
                      "{t.about.quote}"
                    </p>
                  </div>
                </div>
              </div>
            </CyberCard>

            <CyberCard glowColor="pink" title={about.experience_log}>
              <div className="relative pl-2">
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-800"></div>

                <div className="space-y-8">
                  {about.experiences && about.experiences.length > 0 ? (
                    about.experiences.map((exp: any, index: number) => (
                      <div key={index} className="relative pl-8 group">
                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-black border-2 border-fuchsia-500 z-10 group-hover:bg-fuchsia-500 transition-colors shadow-[0_0_10px_rgba(217,70,239,0.3)]"></div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">{exp.role}</h4>
                          <div className="flex items-center gap-2 text-sm text-cyan-400 font-mono mb-2">
                            <span className="font-bold">{exp.company}</span>
                            <span>|</span>
                            <span className="flex items-center gap-1 opacity-80">
                              <Calendar size={12} />
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-gray-800 pl-4 py-1 group-hover:border-fuchsia-500/30 transition-colors">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 italic pl-8">
                      {about.experience_note || "No data available."}
                    </div>
                  )}
                </div>
              </div>
            </CyberCard>
          </div>
        </div>
      </div>
      
      <style>{`
        .clip-path-tag {
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
        }
      `}</style>
    </section>
  );
};

export default DetailedAbout;
