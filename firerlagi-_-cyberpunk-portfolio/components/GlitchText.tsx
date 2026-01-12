import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component 
      className={`cyber-glitch-effect font-cyber uppercase tracking-widest ${className}`} 
      data-text={text}
    >
      {text}
    </Component>
  );
};

export default GlitchText;