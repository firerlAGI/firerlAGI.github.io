import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight, Calendar, Hash } from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    date: Date;
    category: string;
  };
}

interface BlogContentProps {
  posts: BlogPost[];
}

const BlogContent: React.FC<BlogContentProps> = ({ posts }) => {
  const { t, language } = useLanguage();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date).replace(/\//g, '.');
  };

  return (
    <div className="mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {t('blog.title')}
      </h2>
      <div className="h-1 w-24 bg-fuchsia-500" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative bg-black/40 border border-fuchsia-500/30 p-6 rounded-lg hover:border-fuchsia-500/50 transition-all duration-300 group flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4 border-b border-fuchsia-500/20 pb-2">
              <div className="flex items-center gap-2 text-fuchsia-400 font-mono text-xs">
                <Calendar size={12} />
                <span>{formatDate(post.data.date)}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 font-mono text-xs">
                <Hash size={10} />
                <span>{post.data.category}</span>
              </div>
            </div>

            <h3 className="text-xl font-cyber text-white mb-3 group-hover:text-fuchsia-400 transition-colors">
              {post.data.title}
            </h3>
            
            <p className="text-gray-400 text-sm font-mono mb-6 leading-relaxed flex-grow">
              {post.data.description}
            </p>

            <a
              href={`/blog/${post.slug}`}
              className="flex items-center justify-between w-full p-2 border border-fuchsia-500/30 bg-fuchsia-900/10 hover:bg-fuchsia-500/20 text-fuchsia-400 hover:text-white transition-all group/btn"
            >
              <span className="font-cyber text-xs tracking-widest">{t('blog.readMore')}</span>
              <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogContent;
