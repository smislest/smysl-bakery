
"use client";

import { useEffect, useState } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

type ImageProps = NextImageProps & {
  src: string;
  alt: string;
  className?: string;
};

function getMobileSrc(src: string): string {
  // Если картинка из /img, ищем мобильную версию в /img/mob с суффиксом _mob.webp
  const match = src.match(/\/img\/(.+)\.(png|jpg|jpeg|webp)$/);
  if (match) {
    const base = match[1];
    return `/img/mob/${base}_mob.webp`;
  }
  return src;
}

export default function Image({ src, alt, className, ...props }: ImageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const mobileSrc = isMobile ? getMobileSrc(src) : src;

  if (process.env.NODE_ENV === 'development') {
    return (
      <img
        src={mobileSrc}
        alt={alt}
        className={className}
        loading="lazy"
        {...props as any}
      />
    );
  }
  return (
    <NextImage
      src={mobileSrc}
      alt={alt}
      className={className}
      loading={props.loading || 'lazy'}
      {...props}
    />
  );
}
