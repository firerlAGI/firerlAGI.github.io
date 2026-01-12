import React from 'react';
import CyberCard from './CyberCard';
import { Skill } from '../types';
import GlitchText from './GlitchText';

const skills: Skill[] = [
  { name: 'React / TypeScript', level: 95, category: 'frontend' },
  { name: 'Node.js / Express', level: 85, category: 'backend' },
  { name: 'Gemini AI API', level: 90, category: 'ai' },
  { name: 'Tailwind CSS', level: 98, category: 'frontend' },
  { name: 'Three.js / WebGL', level: 75, category: 'frontend' },
  { name: 'Python / PyTorch', level: 70, category: 'ai' },
  { name: 'Docker / K8s', level: 80, category: 'tools' },
  { name: 'PostgreSQL', level: 85, category: 'backend' },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto">
      <div className="mb-12">
        <GlitchText text="TECH ARSENAL" as="h2" className="text-4xl md:text-5xl font-bold text-white mb-4" />
        <div className="h-1 w-24 bg-fuchsia-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <CyberCard key={index} glowColor={index % 2 === 0 ? 'cyan' : 'pink'} className="border-l-4">
            <div className="flex justify-between items-end mb-2">
              <span className="font-cyber text-lg text-white">{skill.name}</span>
              <span className="font-mono text-xs text-gray-400">{skill.level}% SYNCHRONIZED</span>
            </div>
            <div className="w-full bg-gray-800 h-2 relative overflow-hidden">
              <div 
                className={`h-full absolute top-0 left-0 transition-all duration-1000 ease-out ${index % 2 === 0 ? 'bg-cyan-500' : 'bg-fuchsia-500'}`}
                style={{ width: `${skill.level}%` }}
              />
              {/* Scanline effect on bar */}
               <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] w-full animate-[shimmer_2s_infinite]" />
            </div>
          </CyberCard>
        ))}
      </div>
    </section>
  );
};

export default Skills;