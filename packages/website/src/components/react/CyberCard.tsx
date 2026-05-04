import React from 'react';

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'pink' | 'fuchsia'; // Kept for prop compatibility, but visually ignored
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
  return (
    <div className={`relative group ${className}`}>
      <div className={`
        relative h-full overflow-hidden 
        bg-[#1d1d1f] backdrop-blur-[40px] 
        border border-white/5
        shadow-[0_4px_24px_rgba(0,0,0,0.4)]
        group-hover:scale-[1.01] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]
        transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${noPadding ? '' : 'p-6'}
        rounded-2xl
      `}>
        {title && (
          <div className="relative z-10 mb-4 flex items-center gap-2">
            <h3 className="font-sans text-[1.1rem] font-semibold tracking-tight text-[#f5f5f7]">
              {title}
            </h3>
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
