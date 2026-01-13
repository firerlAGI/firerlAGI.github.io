import React from 'react';
import CyberCard from './CyberCard';
import GlitchText from './GlitchText';
import { Project } from '../types';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Projects: React.FC = () => {
  const { t, language } = useLanguage();

  const projectsData = [
    {
      id: '1',
      title: 'Neon Nexus',
      description: language === 'en' 
        ? 'A decentralized social platform built on Web3 technologies with a cyberpunk aesthetic UI.' 
        : '基于Web3技术构建的去中心化社交平台，具有赛博朋克美学UI。',
      tech: ['React', 'Solidity', 'IPFS'],
      imageUrl: 'https://picsum.photos/600/400?random=1',
    },
    {
      id: '2',
      title: 'AI Dreamscape',
      description: language === 'en'
        ? 'Generative art engine utilizing Gemini Vision API to create real-time dream visualizations.'
        : '利用 Gemini Vision API 创建实时梦境可视化的生成艺术引擎。',
      tech: ['Python', 'Gemini API', 'WebGL'],
      imageUrl: 'https://picsum.photos/600/400?random=2',
    },
    {
      id: '3',
      title: 'Cyber Security Grid',
      description: language === 'en'
        ? 'Real-time network traffic visualizer for detecting anomalies in large scale clusters.'
        : '用于检测大规模集群异常的实时网络流量可视化工具。',
      tech: ['D3.js', 'Node.js', 'Socket.io'],
      imageUrl: 'https://picsum.photos/600/400?random=3',
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
       <div className="mb-12 flex flex-col items-end text-right">
        <GlitchText text={t.projects.title} as="h2" className="text-4xl md:text-5xl font-bold text-white mb-4" />
        <div className="h-1 w-24 bg-cyan-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => (
          <CyberCard key={project.id} className="h-full flex flex-col" glowColor={index % 2 === 0 ? 'pink' : 'cyan'}>
            <div className="relative mb-4 overflow-hidden group-hover:border-b border-cyan-500/50">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                loading="lazy"
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h3 className="text-2xl font-cyber text-white mb-2">{project.title}</h3>
            <p className="text-gray-400 mb-4 flex-grow text-sm leading-relaxed">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map(t => (
                <span key={t} className="px-2 py-1 text-xs border border-gray-600 text-gray-300 font-mono bg-black/50">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mt-auto pt-4 border-t border-gray-800">
               <button className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors text-sm font-mono">
                  <Github size={16} /> {t.projects.code}
               </button>
               <button className="flex items-center gap-2 text-fuchsia-400 hover:text-white transition-colors text-sm font-mono">
                  <ExternalLink size={16} /> {t.projects.demo}
               </button>
            </div>
          </CyberCard>
        ))}
      </div>
    </section>
  );
};

export default Projects;