"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import { useEffect, useState } from "react";
import { getHeroData } from '../../lib/heroData';

export default function HeroSection() {
  const [waveScrolled, setWaveScrolled] = useState(false);
  const hero = getHeroData();

  useEffect(() => {
    const onScroll = () => {
      setWaveScrolled(window.scrollY > 60);
    };
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section 
      className={styles.hero} 
      id="hero" 
      style={{ backgroundImage: `url(${hero.backgroundImage})` }}
    >
      {/* Фоновая волна */}
      <div className={styles.waveBg} aria-hidden="true">
        <img
          src="/svg/muka_wave.svg"
          alt=""
          className={`${styles.waveSvg} ${waveScrolled ? styles.waveScrolled : ''}`}
        />
      </div>

      {/* Декоративные хлеба */}
      <div className={styles.breadsBg} aria-hidden="true">
        <img src="/img/bread_.png" alt="" className={`${styles.bread} ${styles.breadMain}`} />
        <img src="/img/bread_1.png" alt="" className={`${styles.bread} ${styles.bread1}`} />
        <img src="/img/bread_min.png" alt="" className={`${styles.bread} ${styles.breadMin}`} />
        <img src="/img/bread_micro.png" alt="" className={`${styles.bread} ${styles.breadMicro}`} />
      </div>

      {/* Декоративные колосья */}
      <div className={`${styles.wheatDecor} ${styles.wheatLeft}`}>
        <img
          src="/img/l_wheat.png"
          alt="Декоративные колосья"
          className="w-full h-auto select-none"
          draggable={false}
        />
      </div>
      <div className={`${styles.wheatDecor} ${styles.wheatRight}`}>
        <img
          src="/img/r_wheat.png"
          alt="Декоративные колосья"
          className="w-full h-auto select-none"
          draggable={false}
        />
      </div>

      {/* Основной контент */}
      <div className={styles.content}>
        {/* МОБИЛЬНАЯ ВЕРСИЯ - КАРТИНКА СВЕРХУ */}
        <div className={styles.mobileLayout}>
          <div className={`${styles.mobileImageContainer} ${styles.heartbeat}`}>
            <div className={styles.imageGradient} aria-hidden="true" />
            <Image
              src={hero.image || "/img/heart.png"}
              alt={hero.imageAlt || "Хлеб в форме сердца"}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 767px) 90vw, 500px"
            />
          </div>

          <div className={styles.textContainer}>
            <h1 className={styles.title}>
              {hero.title || "Безглютеновый хлеб и десерты в Москве"}
            </h1>
            
            <div className={styles.subtitle}>
              {hero.subtitle || "Развиваем культуру осознанного ежедневного рациона и показываем, что полезная выпечка может быть вкусной и разнообразной."}
            </div>
            
            <Link 
              href={hero.ctaLink || "#"} 
              className={styles.button}
              aria-label={hero.ctaText || "Перейти в каталог"}
            >
              {hero.ctaText || "В каталог"}
            </Link>
          </div>
        </div>

        {/* ДЕСКТОПНАЯ ВЕРСИЯ - ДВЕ КОЛОНКИ */}
        <div className={styles.desktopLayout}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>
              {hero.title || "Безглютеновый хлеб и десерты в Москве"}
            </h1>
            
            <div className={styles.subtitle}>
              {hero.subtitle || "Развиваем культуру осознанного ежедневного рациона и показываем, что полезная выпечка может быть вкусной и разнообразной."}
            </div>
            
            <Link 
              href={hero.ctaLink || "#"} 
              className={styles.button}
              aria-label={hero.ctaText || "Перейти в каталог"}
            >
              {hero.ctaText || "В каталог"}
            </Link>
          </div>

          <div className={`${styles.imageContainer} ${styles.heartbeat}`}>
            <div className={styles.imageGradient} aria-hidden="true" />
            <Image
              src={hero.image || "/img/heart.png"}
              alt={hero.imageAlt || "Хлеб в форме сердца"}
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