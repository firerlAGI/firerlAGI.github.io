import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Calendar, MapPin, Activity } from 'lucide-react';
import GlitchText from './GlitchText';
import CyberCard from './CyberCard';

const TECH_CATEGORIES = [
  {
    label: 'FRONTEND',
    color: 'slate',
    items: ['React', 'TypeScript', 'Next.js', 'Astro', 'Tailwind', 'WebGL', 'Three.js'],
  },
  {
    label: 'BACKEND',
    color: 'slate',
    items: ['Node.js', 'Python'],
  },
  {
    label: 'DEVOPS',
    color: 'slate',
    items: ['Docker', 'AWS'],
  },
  {
    label: 'DATA',
    color: 'slate',
    items: ['PostgreSQL'],
  },
] as const;

const CATEGORY_STYLES: Record<string, { border: string; text: string; bg: string; hoverBorder: string; hoverText: string; hoverBg: string }> = {
  slate: {
    border: 'border-white/10',
    text: 'text-slate-300',
    bg: 'bg-white/5',
    hoverBorder: 'hover:border-white/20',
    hoverText: 'hover:text-white',
    hoverBg: 'hover:bg-white/10',
  },
  cyan: {
    border: 'border-white/10',
    text: 'text-slate-300',
    bg: 'bg-white/5',
    hoverBorder: 'hover:border-white/20',
    hoverText: 'hover:text-white',
    hoverBg: 'hover:bg-white/10',
  },
  fuchsia: {
    border: 'border-white/10',
    text: 'text-slate-300',
    bg: 'bg-white/5',
    hoverBorder: 'hover:border-white/20',
    hoverText: 'hover:text-white',
    hoverBg: 'hover:bg-white/10',
  },
  emerald: {
    border: 'border-white/10',
    text: 'text-slate-300',
    bg: 'bg-white/5',
    hoverBorder: 'hover:border-white/20',
    hoverText: 'hover:text-white',
    hoverBg: 'hover:bg-white/10',
  },
  amber: {
    border: 'border-white/10',
    text: 'text-slate-300',
    bg: 'bg-white/5',
    hoverBorder: 'hover:border-white/20',
    hoverText: 'hover:text-white',
    hoverBg: 'hover:bg-white/10',
  },
};

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
          <p className="text-[1.1rem] text-[#f5f5f7] font-sans max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
            {about.initializing}
          </p>
        </div>

        <div className="w-full max-w-[1100px] mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 h-full">
              <CyberCard glowColor="cyan" className="h-full">
                <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                  <div className="relative w-48 h-48 shrink-0 group tech-avatar-rings">
                    <div className="absolute inset-0 rounded-full border border-white/10 ring-spin-outer"></div>
                    <div className="absolute inset-2 rounded-full border border-white/5 ring-spin-inner"></div>
                    <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02] rounded-full overflow-hidden backdrop-blur-sm border border-white/10 transition-colors isolation-isolate transform-gpu">
                      <img
                        src="/assets/images/avatar-cyberpunk.svg"
                        alt="Cyber Ninja Avatar"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-grow text-center md:text-left w-full">
                    <h2 className="text-4xl font-cyber text-white mb-2 tracking-wider">FIRERLAGI</h2>
                    <div className="inline-block px-3 py-1 bg-fuchsia-900/20 border border-fuchsia-500/30 rounded mb-6">
                      <p className="text-fuchsia-400 font-mono text-sm tracking-widest">{t.about.roleBadge}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/10 hover:bg-white/[0.04] transition-colors">
                        <div className="absolute top-3 right-3 opacity-30">
                          <MapPin size={14} className="text-slate-400" />
                        </div>
                        <span className="block text-[10px] text-slate-500 mb-1 font-mono uppercase tracking-[0.16em]">{about.location_label}</span>
                        <span className="text-[1.1rem] font-sans font-medium text-[#f5f5f7]">{about.location_value}</span>
                      </div>
                      <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/10 hover:bg-white/[0.04] transition-colors">
                        <div className="absolute top-3 right-3 opacity-30">
                          <Activity size={14} className="text-slate-400" />
                        </div>
                        <span className="block text-[10px] text-slate-500 mb-1 font-mono uppercase tracking-[0.16em]">{about.status_label}</span>
                        <span className="text-[1.1rem] font-sans font-medium text-[#f5f5f7] flex items-center justify-center md:justify-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
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
                <div className="flex flex-col gap-5 h-full">
                  {TECH_CATEGORIES.map((category) => {
                    const style = CATEGORY_STYLES[category.color];
                    return (
                      <div key={category.label}>
                        <div className={`text-[10px] font-mono tracking-[0.2em] uppercase mb-2 text-slate-500`}>
                          {category.label}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.items.map(tech => (
                            <span
                              key={tech}
                              className={`
                                px-3 py-1.5 rounded-full
                                bg-white/[0.03] border ${style.border}
                                text-slate-300 text-[11px] font-mono
                                ${style.hoverBorder} ${style.hoverText} ${style.hoverBg}
                                transition-all duration-300 cursor-default hover:scale-105
                              `}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CyberCard>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CyberCard glowColor="cyan" title={about.bio_data}>
              <div className="space-y-4 text-[#f5f5f7] font-sans leading-relaxed relative">
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
                <div className="pl-6 space-y-4">
                  <p>{t.about.description1}</p>
                  <p>{t.about.description2}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 relative overflow-hidden rounded">
                <div className="relative flex gap-3 items-start">
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 pt-1">
                    {t.about.quote}
                  </p>
                </div>
              </div>
            </CyberCard>

            <CyberCard glowColor="pink" title={about.experience_log}>
              <div className="relative pl-2">
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-white/5"></div>

                <div className="space-y-8">
                  {about.experiences && about.experiences.length > 0 ? (
                    about.experiences.map((exp: any, index: number) => (
                      <div key={index} className="relative pl-8 group/timeline">
                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#1d1d1f] border-2 border-white/20 z-10 group-hover/timeline:border-white/50 transition-colors"></div>
                        
                        <div className="bg-white/[0.02] rounded-xl p-5 border border-white/5 group-hover/timeline:border-white/10 transition-all duration-300">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-[1.1rem] font-sans font-medium text-[#f5f5f7]">{exp.role}</h4>
                              <div className="text-sm text-slate-400 mt-1">{exp.company}</div>
                            </div>
                            <span className="text-[11px] font-mono text-slate-500 bg-white/5 px-2.5 py-1 rounded-full whitespace-nowrap">{exp.period}</span>
                          </div>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-500 font-mono text-sm border border-dashed border-white/10 rounded-xl">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4">
                        <Calendar size={20} className="text-slate-400" />
                      </div>
                      {about.experience_note || "NO RECORDS FOUND"}
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

        .ring-spin-outer {
          animation: spin-right 10s linear infinite;
        }

        .ring-spin-inner {
          animation: spin-left 15s linear infinite;
        }

        .status-pulse {
          animation: status-blink 2s infinite;
        }

        @keyframes spin-right {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-left {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes status-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ring-spin-outer,
          .ring-spin-inner,
          .status-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DetailedAbout;
