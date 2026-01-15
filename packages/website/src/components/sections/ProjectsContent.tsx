import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { projects } from '../../data/projects';

const ProjectsContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-end text-right mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {t('projects.title')}
      </h2>
      <div className="h-1 w-24 bg-cyan-500" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={'relative bg-black/40 border ' + (index % 2 === 0 ? 'border-fuchsia-500/30' : 'border-cyan-500/30') + ' p-6 rounded-lg hover:border-fuchsia-500/50 transition-all duration-300 group flex flex-col h-full'}
          >
            <div className="relative mb-4 overflow-hidden rounded-lg">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-6xl">{project.icon}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-mono border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
                  {project.note || 'VIEW PROJECT'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{project.icon}</span>
              <h3
                className={'text-xl font-cyber ' + (index % 2 === 0 ? 'text-fuchsia-400' : 'text-cyan-400') + ' transition-colors duration-300 group-hover:text-white'}
              >
                {project.title}
              </h3>
            </div>
            
            <p className="text-gray-400 mb-4 flex-grow text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
            
            {project.techBadges && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techBadges.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs border border-gray-600 text-gray-300 font-mono bg-black/50 hover:border-cyan-500 hover:text-cyan-400 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-4 mt-auto pt-4 border-t border-gray-800">
              {project.ctaHref && (
                <a
                  href={project.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-400 hover:text-white transition-all duration-300 text-sm font-mono hover:scale-105 group/link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                  {t('projects.code')}
                </a>
              )}
              <a
                href={project.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-fuchsia-400 hover:text-white transition-all duration-300 text-sm font-mono hover:scale-105 group/link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                {t('projects.demo')}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
