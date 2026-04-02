import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Cpu, Calendar, MapPin, Activity, Database, Cloud, Box, Braces } from 'lucide-react';
import GlitchText from './GlitchText';
import CyberCard from './CyberCard';

const TECH_CATEGORIES = [
  {
    label: 'FRONTEND',
    color: 'cyan',
    items: ['React', 'TypeScript', 'Next.js', 'Astro', 'Tailwind', 'WebGL', 'Three.js'],
  },
  {
    label: 'BACKEND',
    color: 'fuchsia',
    items: ['Node.js', 'Python'],
  },
  {
    label: 'DEVOPS',
    color: 'emerald',
    items: ['Docker', 'AWS'],
  },
  {
    label: 'DATA',
    color: 'amber',
    items: ['PostgreSQL'],
  },
] as const;

const CATEGORY_STYLES: Record<string, { border: string; text: string; bg: string; hoverBorder: string; hoverText: string; hoverBg: string }> = {
  cyan: {
    border: 'border-cyan-500/30',
    text: 'text-cyan-300',
    bg: 'bg-cyan-950/20',
    hoverBorder: 'hover:border-cyan-400',
    hoverText: 'hover:text-cyan-300',
    hoverBg: 'hover:bg-cyan-900/30',
  },
  fuchsia: {
    border: 'border-fuchsia-500/30',
    text: 'text-fuchsia-300',
    bg: 'bg-fuchsia-950/20',
    hoverBorder: 'hover:border-fuchsia-400',
    hoverText: 'hover:text-fuchsia-300',
    hoverBg: 'hover:bg-fuchsia-900/30',
  },
  emerald: {
    border: 'border-emerald-500/30',
    text: 'text-emerald-300',
    bg: 'bg-emerald-950/20',
    hoverBorder: 'hover:border-emerald-400',
    hoverText: 'hover:text-emerald-300',
    hoverBg: 'hover:bg-emerald-900/30',
  },
  amber: {
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    bg: 'bg-amber-950/20',
    hoverBorder: 'hover:border-amber-400',
    hoverText: 'hover:text-amber-300',
    hoverBg: 'hover:bg-amber-900/30',
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
          <div className="flex justify-center mb-6">
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-cyan-500 rounded-full bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
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
                  <div className="relative w-48 h-48 shrink-0 group tech-avatar-rings">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 ring-spin-outer"></div>
                    <div className="absolute inset-2 rounded-full border border-fuchsia-500/30 ring-spin-inner"></div>
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
                        <span className="block text-xs text-cyan-400 mb-1 font-mono tracking-wider">{about.location_label}</span>
                        <span className="text-lg font-mono text-white">{about.location_value}</span>
                      </div>
                      <div className="bg-fuchsia-950/30 p-3 rounded border border-fuchsia-500/20 relative overflow-hidden group hover:border-fuchsia-500/40 transition-colors">
                        <div className="absolute top-0 right-0 p-1 opacity-50">
                          <Activity size={12} className="text-fuchsia-500" />
                        </div>
                        <span className="block text-xs text-fuchsia-400 mb-1 font-mono tracking-wider">{about.status_label}</span>
                        <span className="text-lg font-mono text-white flex items-center justify-center md:justify-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 status-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
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
                <div className="flex flex-col gap-4 h-full">
                  {TECH_CATEGORIES.map((category) => {
                    const style = CATEGORY_STYLES[category.color];
                    return (
                      <div key={category.label}>
                        <div className={`text-[10px] font-mono tracking-[0.2em] uppercase mb-1.5 ${style.text} opacity-70`}>
                          {category.label}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {category.items.map(tech => (
                            <span
                              key={tech}
                              className={`
                                px-2.5 py-1
                                bg-black/40 border ${style.border}
                                ${style.text} text-xs font-mono
                                ${style.hoverBorder} ${style.hoverText} ${style.hoverBg}
                                transition-all duration-300 cursor-default
                                clip-path-tag
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
              <div className="space-y-4 text-gray-300 font-mono leading-relaxed relative">
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
                <div className="pl-6 space-y-4">
                  <p>{t.about.description1}</p>
                  <p>{t.about.description2}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-dashed border-cyan-500/20 relative overflow-hidden rounded">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-fuchsia-500/5 to-cyan-500/5" />
                <div className="relative flex gap-3 items-start">
                  <span className="text-3xl font-serif text-cyan-500/30 leading-none select-none">&ldquo;</span>
                  <p className="text-gray-300 italic text-sm leading-relaxed flex-1 pt-1">
                    {t.about.quote}
                  </p>
                  <span className="text-3xl font-serif text-fuchsia-500/30 leading-none select-none self-end">&rdquo;</span>
                </div>
                <div className="mt-3 flex justify-center">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                </div>
              </div>
            </CyberCard>

            <CyberCard glowColor="pink" title={about.experience_log}>
              <div className="relative pl-2">
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] timeline-track"></div>

                <div className="space-y-8">
                  {about.experiences && about.experiences.length > 0 ? (
                    about.experiences.map((exp: any, index: number) => (
                      <div key={index} className="relative pl-8 group/timeline">
                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-black border-2 border-fuchsia-500 z-10 group-hover/timeline:bg-fuchsia-500 transition-colors shadow-[0_0_10px_rgba(217,70,239,0.3)] timeline-node"></div>

                        <div className="bg-black/20 rounded-lg p-4 border border-transparent group-hover/timeline:border-fuchsia-500/20 transition-all duration-300">
                          <h4 className="text-lg font-bold text-white group-hover/timeline:text-fuchsia-400 transition-colors">{exp.role}</h4>
                          <div className="flex items-center gap-2 text-sm text-cyan-400 font-mono mb-2 mt-1">
                            <span className="font-semibold">{exp.company}</span>
                            <span className="text-gray-600">|</span>
                            <span className="flex items-center gap-1 opacity-80">
                              <Calendar size={12} />
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed pl-3 border-l-2 border-fuchsia-500/20 group-hover/timeline:border-fuchsia-500/50 transition-colors">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="pl-8 py-8 text-center">
                      <div className="inline-flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center">
                          <Calendar size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm font-mono">{about.experience_note || "No data available."}</p>
                          <p className="text-gray-600 text-xs font-mono mt-1">AWAITING DATA SYNC...</p>
                        </div>
                      </div>
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

        .timeline-track {
          background: linear-gradient(to bottom, transparent, rgba(217, 70, 239, 0.15), rgba(217, 70, 239, 0.05), transparent);
        }

        .timeline-node::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: rgba(217, 70, 239, 0.15);
          z-index: -1;
          animation: node-pulse 3s ease-in-out infinite;
        }

        @keyframes node-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.8); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ring-spin-outer,
          .ring-spin-inner,
          .status-pulse,
          .timeline-node::after {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DetailedAbout;
