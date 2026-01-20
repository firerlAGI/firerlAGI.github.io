import React from 'react';

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'pink' | 'fuchsia';
  title?: string;
  noPadding?: boolean;
}

const CyberCard: React.FC<CyberCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  title,
  noPadding = false,
}) => {
  const isCyan = glowColor === 'cyan';
  const glowShadow = isCyan ? 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'group-hover:shadow-[0_0_20px_rgba(217,70,239,0.3)]';
  const titleColor = isCyan ? 'text-cyan-400' : 'text-fuchsia-400';
  const cornerColor = isCyan ? 'border-cyan-400' : 'border-fuchsia-400';

  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${isCyan ? 'from-cyan-500/0 via-cyan-500/50 to-cyan-500/0' : 'from-fuchsia-500/0 via-fuchsia-500/50 to-fuchsia-500/0'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm`} />
      
      <div className={`
        relative h-full overflow-hidden 
        bg-black/40 backdrop-blur-md 
        border ${isCyan ? 'border-cyan-500/30' : 'border-fuchsia-500/30'}
        ${glowShadow}
        transition-all duration-300
        ${noPadding ? '' : 'p-6'}
        rounded-lg
      `}>
        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${cornerColor} rounded-tl-sm opacity-60 group-hover:opacity-100 transition-opacity`} />
        <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${cornerColor} rounded-tr-sm opacity-60 group-hover:opacity-100 transition-opacity`} />
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${cornerColor} rounded-bl-sm opacity-60 group-hover:opacity-100 transition-opacity`} />
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${cornerColor} rounded-br-sm opacity-60 group-hover:opacity-100 transition-opacity`} />

        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-0" />
        
        {title && (
          <div className="relative z-10 mb-4 flex items-center gap-2">
            <div className={`h-1 w-1 ${isCyan ? 'bg-cyan-500' : 'bg-fuchsia-500'}`} />
            <h3 className={`font-cyber text-lg font-bold uppercase tracking-widest ${titleColor}`}>
              {title}
            </h3>
            <div className={`h-[1px] flex-grow bg-gradient-to-r ${isCyan ? 'from-cyan-500/30 to-transparent' : 'from-fuchsia-500/30 to-transparent'}`} />
          </div>
        )}

        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CyberCard;
