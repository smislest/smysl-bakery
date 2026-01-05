"use client";

import DOMPurify from 'isomorphic-dompurify';

interface SafeContentProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SafeContent({ content, className, style }: SafeContentProps) {
  const cleanContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'pre', 'code',
      'ul', 'ol', 'li',
      'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'td', 'th',
      'hr', 'div', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel',
      'src', 'alt', 'width', 'height',
      'class', 'id', 'style',
      'data-*'
    ],
  });
  
  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
}
