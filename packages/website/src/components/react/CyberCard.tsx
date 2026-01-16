import React from 'react';

interface CyberCardProps {
  glowColor?: 'cyan' | 'pink';
  title?: string;
  titleI18n?: string;
  className?: string;
  children?: React.ReactNode;
}

const CyberCard: React.FC<CyberCardProps> = ({ 
  glowColor = 'cyan', 
  title, 
  titleI18n,
  className = '',
  children
}) => {
  const isCyan = glowColor === 'cyan';
  
  const clipPathStyle = {
    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
  };

  return (
    <div className={`relative group ${className}`}>
      <div 
        className={`relative overflow-hidden bg-cyber-panel/80 backdrop-blur-sm border p-6 transition-all duration-300 h-full flex flex-col
          ${isCyan ? 'border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'border-fuchsia-500/30 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)]'}
        `}
        style={clipPathStyle}
      >
        <div className={`absolute top-0 left-0 w-2 h-2 ${isCyan ? 'bg-cyan-400' : 'bg-fuchsia-400'}`} />
        <div className={`absolute top-0 right-0 w-2 h-2 ${isCyan ? 'bg-cyan-400' : 'bg-fuchsia-400'}`} />
        <div className={`absolute bottom-0 left-0 w-2 h-2 ${isCyan ? 'bg-cyan-400' : 'bg-fuchsia-400'}`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 ${isCyan ? 'bg-cyan-400' : 'bg-fuchsia-400'}`} />

        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

        {title && (
          <h3 
            className={`font-cyber text-xl font-bold mb-4 uppercase tracking-widest ${isCyan ? 'text-cyan-400' : 'text-fuchsia-400'}`}
            data-i18n={titleI18n}
          >
            {title}
          </h3>
        )}
        
        <div className="relative z-10 font-mono text-gray-300 flex-grow flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CyberCard;
