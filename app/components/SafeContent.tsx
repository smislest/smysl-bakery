"use client";

import DOMPurify from 'isomorphic-dompurify';

interface SafeContentProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SafeContent({ content, className, style }: SafeContentProps) {
  const cleanContent = DOMPurify.sanitize(content);
  
  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
}
