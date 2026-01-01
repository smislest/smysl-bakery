"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import { useEffect, useState } from "react";
import type { HeroData } from '../../lib/heroData';

interface HeroSectionProps {
  initialData?: HeroData | null;
}

export default function HeroSection({ initialData = null }: HeroSectionProps) {
  const [waveScrolled, setWaveScrolled] = useState(false);
  const [hero, setHero] = useState<HeroData | null>(initialData);

  useEffect(() => {
    setHero(initialData);
  }, [initialData]);

  useEffect(() => {
    const onScroll = () => {
      setWaveScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Если данные ещё не загрузились, рендерим fallback-контент (чтобы элемент всегда был видим)
  const fallback = {
    title: "Безглютеновый хлеб и десерты в Москве",
    subtitle:
      "Развиваем культуру осознанного ежедневного рациона и показываем, что полезная выпечка может быть вкусной и разнообразной.",
    image: "/img/heart.png",
    imageAlt: "Хлеб в форме сердца",
    ctaLink: "#",
    ctaText: "В каталог",
    backgroundImage: "",
  };
  const data = hero || fallback;
  console.log('🎨 Rendering with:', {
    isFromDirectus: !!hero,
    imageUrl: data.image,
    title: data.title
  });
  return (
    <section
      className={styles.hero}
      id="hero"
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
      {/* Фоновая волна - десктоп */}
      <div className={styles.waveBg} aria-hidden="true">
        <img
          src="/svg/muka_wave.svg"
          alt=""
          className={`${styles.waveSvg} ${waveScrolled ? styles.waveScrolled : ''}`}
        />
      </div>

      {/* Фоновая волна - мобильная */}
      <div className={styles.waveBgMobile} aria-hidden="true">
        <img
          src="/svg/muka_mob.svg"
          alt=""
          className={styles.waveSvgMobile}
          loading="lazy"
        />
      </div>

      {/* Декоративные хлеба */}
      <div className={styles.breadsBg} aria-hidden="true">
        <img src="/img/bread_.png" alt="" className={`${styles.bread} ${styles.breadMain}`} loading="lazy" />
        <img src="/img/bread_1.png" alt="" className={`${styles.bread} ${styles.bread1}`} loading="lazy" />
        <img src="/img/bread_min.png" alt="" className={`${styles.bread} ${styles.breadMin}`} loading="lazy" />
        <img src="/img/bread_micro.png" alt="" className={`${styles.bread} ${styles.breadMicro}`} loading="lazy" />
      </div>

      {/* Декоративные колосья */}
      <div className={`${styles.wheatDecor} ${styles.wheatLeft}`}>
        <img
          src="/img/l_wheat.png"
          alt="Декоративные колосья"
          className="w-full h-auto select-none"
          draggable={false}
          loading="lazy"
        />
      </div>
      <div className={`${styles.wheatDecor} ${styles.wheatRight}`}>
        <img
          src="/img/r_wheat.png"
          alt="Декоративные колосья"
          className="w-full h-auto select-none"
          draggable={false}
          loading="lazy"
        />
      </div>

      {/* Основной контент */}
      <div className={styles.content}>
        {/* МОБИЛЬНАЯ ВЕРСИЯ - КАРТИНКА СВЕРХУ */}
        <div className={styles.mobileLayout}>
          <div className={`${styles.mobileImageContainer} ${styles.heartbeat}`}>
            <div className={styles.imageGradient} aria-hidden="true" />
            <Image
              src={data.image || "/img/heart.png"}
              alt={data.imageAlt || "Хлеб в форме сердца"}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 767px) 90vw, 500px"
            />
          </div>

          <div className={styles.textContainer}>
            <h1 className={styles.title}>
              {data.title}
            </h1>
            
            <div className={styles.subtitle}>
              {data.subtitle}
            </div>
            
            {(() => {
              const ctaLink = data.ctaLink || '#';
              const ctaText = data.ctaText || 'В каталог';
              return (
                <Link href={ctaLink} className={styles.button} aria-label={ctaText}>
                  {ctaText}
                </Link>
              );
            })()}
          </div>
        </div>

        {/* ДЕСКТОПНАЯ ВЕРСИЯ - ДВЕ КОЛОНКИ */}
        <div className={styles.desktopLayout}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>
              {data.title}
            </h1>
            
            <div className={styles.subtitle}>
              {data.subtitle}
            </div>
            
            {(() => {
              const ctaLink = data.ctaLink || '#';
              const ctaText = data.ctaText || 'В каталог';
              return (
                <Link href={ctaLink} className={styles.button} aria-label={ctaText}>
                  {ctaText}
                </Link>
              );
            })()}
          </div>

          <div className={`${styles.imageContainer} ${styles.heartbeat}`}>
            <div className={styles.imageGradient} aria-hidden="true" />
            <Image
              src={data.image || "/img/heart.png"}
              alt={data.imageAlt || "Хлеб в форме сердца"}
              fill
              className="object-contain"
              priority
              sizes="(min-width: 768px) 50vw, (min-width: 1024px) 40vw, 600px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}