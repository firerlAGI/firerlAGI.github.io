import React from 'react';
import { Star, GitFork, ExternalLink, Code2, Rocket, CircleDot } from 'lucide-react';
import CyberCard from './CyberCard';
import GlitchText from './GlitchText';
import githubStatsData from '../../data/github-stats';

interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string | null;
}

const formatNumber = (num: number) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};

const PinnedRepos: React.FC = () => {
  const repos: PinnedRepo[] = githubStatsData?.pinnedRepos || [];

  if (!repos || repos.length === 0) {
    return null;
  }

  return (
    <section id="repos" className="py-20 px-4">
      <div className="w-full max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <GlitchText
            text="PINNED_REPOS.EXE"
            tag="h2"
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          />
          <div className="flex justify-center mb-6">
            <div className="h-1 w-32 bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500 rounded-full bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
          </div>
          <p className="text-sm font-mono text-gray-500 max-w-md mx-auto">
            {'> SCANNING GITHUB REPOSITORIES... FOUND ' + repos.length + ' ACTIVE MODULES'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo, index) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/repo block"
            >
              <CyberCard
                glowColor={index % 2 === 0 ? 'cyan' : 'pink'}
                className="h-full hover:translate-y-[-4px] transition-transform duration-300"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        index % 2 === 0
                          ? 'bg-cyan-900/30 border border-cyan-500/30'
                          : 'bg-fuchsia-900/30 border border-fuchsia-500/30'
                      }`}>
                        <Code2 size={18} className={index % 2 === 0 ? 'text-cyan-400' : 'text-fuchsia-400'} />
                      </div>
                      <div className="min-w-0">
                        <h3 className={`font-mono font-bold text-base truncate group-hover/repo:text-white transition-colors ${
                          index % 2 === 0 ? 'text-cyan-300' : 'text-fuchsia-300'
                        }`}>
                          {repo.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {repo.language && (
                            <>
                              <span
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: repo.languageColor || '#8b949e' }}
                              />
                              <span className="text-[11px] font-mono text-gray-500">{repo.language}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-gray-600 flex-shrink-0 mt-1 opacity-0 group-hover/repo:opacity-100 transition-opacity" />
                  </div>

                  {/* Description */}
                  {repo.description && (
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4 flex-grow font-mono">
                      {repo.description}
                    </p>
                  )}

                  {/* Footer Stats */}
                  <div className="flex items-center gap-4 pt-3 border-t border-gray-800/50">
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1 text-xs font-mono text-yellow-500/80">
                        <Star size={13} />
                        {formatNumber(repo.stars)}
                      </span>
                    )}
                    {repo.forks > 0 && (
                      <span className="flex items-center gap-1 text-xs font-mono text-emerald-500/80">
                        <GitFork size={13} />
                        {formatNumber(repo.forks)}
                      </span>
                    )}
                    <span className="ml-auto text-[10px] font-mono text-gray-600 uppercase tracking-wider flex items-center gap-1">
                      <CircleDot size={10} className={index % 2 === 0 ? 'text-cyan-600' : 'text-fuchsia-600'} />
                      Public
                    </span>
                  </div>

                  {/* Hover glow line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[1px] ${
                    index % 2 === 0
                      ? 'bg-gradient-to-r from-transparent via-cyan-500/0 group-hover/repo:via-cyan-500/60 to-transparent'
                      : 'bg-gradient-to-r from-transparent via-fuchsia-500/0 group-hover/repo:via-fuchsia-500/60 to-transparent'
                  } transition-all duration-500`} />
                </div>
              </CyberCard>
            </a>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/firerlAGI?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-widest uppercase rounded hover:border-cyan-400 hover:bg-cyan-950/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 group/viewall"
          >
            <Rocket size={14} className="group-viewall:hover:rotate-12 transition-transform" />
            VIEW ALL REPOSITORIES
            <ExternalLink size={12} className="opacity-50 group-viewall:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[shimmer_3s_ease-in-out_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PinnedRepos;
