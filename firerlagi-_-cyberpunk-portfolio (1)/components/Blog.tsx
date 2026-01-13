import React from 'react';
import CyberCard from './CyberCard';
import GlitchText from './GlitchText';
import { useLanguage } from '../contexts/LanguageContext';
import { BlogPost } from '../types';
import { ArrowRight, Calendar, Hash } from 'lucide-react';

const Blog: React.FC = () => {
  const { t, language } = useLanguage();

  const posts: BlogPost[] = [
    {
      id: '1',
      title: language === 'en' ? 'The Ghost in the Machine: AI Consciousness' : '机器中的幽灵：AI 意识觉醒',
      excerpt: language === 'en' 
        ? 'Exploring the boundaries between advanced LLMs and true sentience in the age of neural networks.' 
        : '探索神经网络时代下，高级大语言模型与真实感知之间的界限。',
      date: '2024.11.15',
      readTime: '5 MIN',
      category: 'AI_ETHICS'
    },
    {
      id: '2',
      title: language === 'en' ? 'Optimizing WebGL for Low-End Cyberdecks' : '为低端设备优化 WebGL 性能',
      excerpt: language === 'en' 
        ? 'Techniques for rendering high-fidelity particle systems on limited hardware resources.' 
        : '在受限硬件资源上渲染高保真粒子系统的技术方案。',
      date: '2024.10.28',
      readTime: '8 MIN',
      category: 'RENDERING'
    },
    {
      id: '3',
      title: language === 'en' ? 'Zero-Trust Architecture in 2077' : '2077年的零信任架构',
      excerpt: language === 'en' 
        ? 'Why traditional firewalls are obsolete and how identity-based security is the future.' 
        : '为何传统防火墙已过时，以及基于身份的安全机制为何是未来。',
      date: '2024.09.10',
      readTime: '6 MIN',
      category: 'SECURITY'
    }
  ];

  return (
    <section id="blog" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <GlitchText text={t.blog.title} as="h2" className="text-4xl md:text-5xl font-bold text-white mb-4" />
        <div className="h-1 w-24 bg-fuchsia-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <CyberCard key={post.id} glowColor="pink" className="flex flex-col h-full group">
            <div className="flex justify-between items-start mb-4 border-b border-fuchsia-500/20 pb-2">
                <div className="flex items-center gap-2 text-fuchsia-400 font-mono text-xs">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                </div>
                 <div className="flex items-center gap-1 text-gray-500 font-mono text-xs">
                    <Hash size={10} />
                    <span>{post.category}</span>
                </div>
            </div>

            <h3 className="text-xl font-cyber text-white mb-3 group-hover:text-fuchsia-400 transition-colors">
                {post.title}
            </h3>
            
            <p className="text-gray-400 text-sm font-mono mb-6 leading-relaxed flex-grow">
                {post.excerpt}
            </p>

            <button className="flex items-center justify-between w-full p-2 border border-fuchsia-500/30 bg-fuchsia-900/10 hover:bg-fuchsia-500/20 text-fuchsia-400 hover:text-white transition-all group/btn">
                <span className="font-cyber text-xs tracking-widest">{t.blog.readMore}</span>
                <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </CyberCard>
        ))}
      </div>
    </section>
  );
};

export default Blog;