import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Cpu, Code2, Brain, Zap } from 'lucide-react';

const AboutContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t('about.title')}
        </h2>
        <div className="h-1 w-24 bg-cyan-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-black/40 border border-fuchsia-500/30 p-6 rounded-lg h-full hover:border-fuchsia-500/50 transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="avatar-container">
              <div className="avatar-image">👨‍💻</div>
              <div className="avatar-status animate-pulse">ONLINE</div>
            </div>
            
            <div className="flex-grow">
              <h3 className="text-2xl font-cyber text-cyan-400 mb-2">FIRERLAGI</h3>
              <p className="text-fuchsia-400 font-mono text-sm mb-4">{t('about.roleBadge')}</p>
              
              <div className="space-y-3 text-gray-300 font-mono text-sm">
                <p className="leading-relaxed">
                  {t('about.description1')}
                </p>
                <p className="leading-relaxed">
                  {t('about.description2')}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-cyan-500/20">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs border border-cyan-500/30 text-cyan-400 font-mono bg-cyan-900/10">
                    REACT
                  </span>
                  <span className="px-3 py-1 text-xs border border-fuchsia-500/30 text-fuchsia-400 font-mono bg-fuchsia-900/10">
                    PYTHON
                  </span>
                  <span className="px-3 py-1 text-xs border border-cyan-500/30 text-cyan-400 font-mono bg-cyan-900/10">
                    NODE.JS
                  </span>
                  <span className="px-3 py-1 text-xs border border-fuchsia-500/30 text-fuchsia-400 font-mono bg-fuchsia-900/10">
                    AI/ML
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-black/40 border border-fuchsia-500/30 p-4 rounded-lg group hover:border-fuchsia-500/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="skill-icon text-fuchsia-400">
                <Cpu size={32} />
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-cyber text-fuchsia-400 mb-2">{t('about.skills.architecture')}</h4>
                <p className="text-gray-400 text-sm font-mono leading-relaxed">
                  {t('about.skills.architectureDesc')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-cyan-500/30 p-4 rounded-lg group hover:border-cyan-500/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="skill-icon text-cyan-400">
                <Code2 size={32} />
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-cyber text-cyan-400 mb-2">{t('about.skills.fullstack')}</h4>
                <p className="text-gray-400 text-sm font-mono leading-relaxed">
                  {t('about.skills.fullstackDesc')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-fuchsia-500/30 p-4 rounded-lg group hover:border-fuchsia-500/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="skill-icon text-fuchsia-400">
                <Brain size={32} />
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-cyber text-fuchsia-400 mb-2">{t('about.skills.ai')}</h4>
                <p className="text-gray-400 text-sm font-mono leading-relaxed">
                  {t('about.skills.aiDesc')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-cyan-500/30 p-4 rounded-lg group hover:border-cyan-500/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="skill-icon text-cyan-400">
                <Zap size={32} />
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-cyber text-cyan-400 mb-2">{t('about.skills.prototyping')}</h4>
                <p className="text-gray-400 text-sm font-mono leading-relaxed">
                  {t('about.skills.prototypingDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="relative max-w-2xl mx-auto p-10 bg-black/30 border border-cyan-500/20 rounded-lg overflow-hidden">
          <div className="quote-mark text-6xl text-cyan-500/20">"</div>
          <p className="relative z-10 text-xl text-gray-300 font-mono italic text-center leading-relaxed">
            {t('about.quote')}
          </p>
          <div className="quote-mark text-6xl text-fuchsia-500/20 transform rotate-180">"</div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
