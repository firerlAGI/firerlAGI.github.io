import React from 'react';

interface GlitchTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  [key: string]: any;
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  tag = 'span', 
  className = '', 
  ...rest 
}) => {
  const Tag = tag;
  return (
    <Tag 
      className={`font-sans tracking-tight ${className}`} 
      data-text={text} 
      {...rest}
    >
      {text}
    </Tag>
  );
};

export default GlitchText;
