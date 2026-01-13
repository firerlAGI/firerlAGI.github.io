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
  const decoColor = glowColor === 'cyan' ? 'bg-cyan-500' : 'bg-fuchsia-500';

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
        {/* Corner Accents - Outer */}
        <div className={`absolute top-0 left-0 w-2 h-2 ${decoColor}`} />
        <div className={`absolute top-0 right-0 w-2 h-2 ${decoColor}`} />
        <div className={`absolute bottom-0 left-0 w-2 h-2 ${decoColor}`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 ${decoColor}`} />

        {/* Decorative Lines/Tech Markers */}
        <div className={`absolute top-0 left-6 w-12 h-[1px] ${decoColor} opacity-50`} />
        <div className={`absolute top-6 left-0 w-[1px] h-12 ${decoColor} opacity-50`} />
        <div className={`absolute bottom-0 right-6 w-12 h-[1px] ${decoColor} opacity-50`} />
        <div className={`absolute bottom-6 right-0 w-[1px] h-12 ${decoColor} opacity-50`} />

        {/* Tech ID Number (Decorative) */}
        <div className="absolute top-2 right-2 text-[8px] font-mono text-gray-600 opacity-50 tracking-widest pointer-events-none">
          SYS.ID-{Math.floor(Math.random() * 9999)}
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

        {title && (
          <h3 className={`font-cyber text-xl font-bold mb-4 ${titleColor} uppercase tracking-widest flex items-center gap-2`}>
             <span className="text-xs opacity-50 font-mono">[+]</span> {title}
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