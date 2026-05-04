import React from 'react';
import { ArrowUpRight, CircleDot, GitFork, Star } from 'lucide-react';
import CyberCard from './CyberCard';
import githubStatsData from '../../data/github-stats';
import { useLanguage } from '../../contexts/LanguageContext';

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
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
};

const PinnedRepos: React.FC = () => {
  const { t } = useLanguage();
  const repos: PinnedRepo[] = githubStatsData?.pinnedRepos || [];

  if (!repos.length) {
    return null;
  }

  return (
    <section id="repos" className="w-full py-16 md:py-24">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-5 md:px-8 lg:px-10">
        <div className="section-heading-block animate-on-scroll">
          <span className="section-kicker">GitHub</span>
          <h2 className="section-title" data-i18n="github.title">
            {t.github.title}
          </h2>
          <p className="section-description" data-i18n="github.subtitle">
            {t.github.subtitle}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {repos.map((repo, index) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block animate-on-scroll cursor-pointer"
            >
              <CyberCard glowColor={index % 2 === 0 ? 'cyan' : 'pink'} className="h-full">
                <article className="flex h-full flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="inline-flex h-2 w-2 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500" data-i18n="github.openSource">
                          {t.github.openSource}
                        </span>
                      </div>

                      <h3 className="truncate text-[1.15rem] font-semibold tracking-[-0.02em] text-slate-50">{repo.name}</h3>
                    </div>

                    <ArrowUpRight size={18} className="mt-1 shrink-0 text-slate-500 transition-colors duration-200 group-hover:text-slate-100" />
                  </div>

                  {repo.description ? (
                    <p className="min-h-[3.5rem] text-sm leading-7 text-slate-300/90">{repo.description}</p>
                  ) : null}

                  <div className="flex flex-wrap gap-3">
                    {repo.language ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] text-slate-300">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: repo.languageColor || '#8b949e' }}
                        />
                        {repo.language}
                      </span>
                    ) : null}

                    {repo.stars > 0 ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] text-slate-300">
                        <Star size={11} className="text-amber-300/90" />
                        {formatNumber(repo.stars)}
                      </span>
                    ) : null}

                    {repo.forks > 0 ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] text-slate-300">
                        <GitFork size={11} className="text-emerald-300/90" />
                        {formatNumber(repo.forks)}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <CircleDot size={10} className={index % 2 === 0 ? 'text-cyan-300/90' : 'text-pink-300/90'} />
                      Public
                    </span>
                    <span data-i18n="github.repository">{t.github.repository}</span>
                  </div>
                </article>
              </CyberCard>
            </a>
          ))}
        </div>

        <div className="mt-8 animate-on-scroll">
          <a
            href="https://github.com/firerlAGI?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[3rem] items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-slate-50 transition-all hover:scale-105 hover:border-white/20 hover:bg-white/[0.1]"
          >
            {t.github.visit}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PinnedRepos;
