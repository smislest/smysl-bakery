"use client";

import DOMPurify from 'isomorphic-dompurify';
import styles from './SafeContent.module.css';

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
      'hr', 'div', 'span',
      'video', 'source', 'iframe'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel',
      'src', 'alt', 'width', 'height',
      'class', 'id', 'style',
      'data-*',
      'controls', 'controlsList', 'poster',
      'frameborder', 'allow', 'allowfullscreen'
    ],
  });
  
  return (
    <div
      className={`${styles.wysiwyg} ${className || ''}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
}
