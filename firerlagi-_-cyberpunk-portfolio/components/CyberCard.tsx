import React from 'react';

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  glowColor?: 'cyan' | 'pink';
}

const CyberCard: React.FC<CyberCardProps> = ({ children, className = '', title, glowColor = 'cyan' }) => {
  const borderColor = glowColor === 'cyan' ? 'border-cyan-500/30' : 'border-fuchsia-500/30';
  const glowClass = glowColor === 'cyan' ? 'hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'hover:shadow-[0_0_20px_rgba(217,70,239,0.3)]';
  const titleColor = glowColor === 'cyan' ? 'text-cyan-400' : 'text-fuchsia-400';

  return (
    <div className={`relative group ${className}`}>
      {/* Background with glass effect */}
      <div className={`
        relative overflow-hidden
        bg-cyber-panel/80 backdrop-blur-sm
        border ${borderColor}
        p-6 transition-all duration-300
        ${glowClass}
        clip-path-slant
      `}>
        {/* Corner Accents */}
        <div className={`absolute top-0 left-0 w-2 h-2 ${glowColor === 'cyan' ? 'bg-cyan-400' : 'bg-fuchsia-400'}`} />
        <div className={`absolute top-0 right-0 w-2 h-2 ${glowColor === 'cyan' ? 'bg-cyan-400' : 'bg-fuchsia-400'}`} />
        <div className={`absolute bottom-0 left-0 w-2 h-2 ${glowColor === 'cyan' ? 'bg-cyan-400' : 'bg-fuchsia-400'}`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 ${glowColor === 'cyan' ? 'bg-cyan-400' : 'bg-fuchsia-400'}`} />

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

        {title && (
          <h3 className={`font-cyber text-xl font-bold mb-4 ${titleColor} uppercase tracking-widest`}>
            {title}
          </h3>
        )}
        
        <div className="relative z-10 font-mono text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CyberCard;