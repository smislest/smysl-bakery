
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import headerStatic from "../../content/header.json";

// Типы можно импортировать или дублировать
interface HeaderData {
  logo: { url: string } | null;
  menu: { label: string; href: string }[];
  phone: string;
  email: string;

}

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [header] = useState<HeaderData>(headerStatic);
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://smysl-bakery-directus.onrender.com";
  // fetchHeaderDataClient отключён, используется статика

  const getLogoUrl = (logo: any) => {
    if (!logo) return "/svg/logo.svg";
    if (typeof logo === 'string') return logo;
    if (logo.filename_disk) {
      return `${DIRECTUS_URL}/assets/${logo.filename_disk}`;
    }
    if (logo.url && typeof logo.url === 'string') {
      return logo.url;
    }
    return "/svg/logo.svg";
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!header) {
    // Пока данные загружаются — показываем логотип по умолчанию
    return (
      <header className={styles.header}>
        <Link href="/">
          <Image src="/img/logo.png" alt="СМЫСЛ есть" width={120} height={60} />
        </Link>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      {/* МОБИЛЬНАЯ ВЕРСИЯ */}
      <div className={styles.mobileContainer}>
        <div className={styles.mobileEllipse}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.mobileMenuButton}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <line x1="3" y1="6" x2="21" y2="6" stroke="#fdebc1" />
              <line x1="3" y1="12" x2="21" y2="12" stroke="#fdebc1" />
              <line x1="3" y1="18" x2="21" y2="18" stroke="#fdebc1" />
            </svg>
          </button>

          <Link href="/">
            <div className={styles.mobileLogo}>
              <Image src={getLogoUrl(header.logo)} alt="СМЫСЛ есть" width={120} height={60} priority />
            </div>
          </Link>
        </div>
      </div>

      {/* ДЕСКТОПНАЯ ВЕРСИЯ */}
      <div className={styles.desktopContainer}>
        <div className={styles.desktopEllipse}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.desktopMenuButton}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <div className={styles.desktopMenuIcon}>
              {isMenuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <img src="/svg/symbol.svg" alt="Меню" />
              )}
            </div>
            <div>
              <div className={styles.desktopMenuText}>МЕНЮ</div>
            </div>
          </button>

          <Link href="/">
            <div className={styles.desktopLogo}>
              <Image src={getLogoUrl(header.logo)} alt="СМЫСЛ есть" width={120} height={60} priority />
            </div>
          </Link>
        </div>
      </div>

      {/* ПОЛНОЭКРАННОЕ МЕНЮ */}
      <div className={`${styles.fullscreenMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.menuContent}>
          <div className={styles.menuHeader}>
            <button
              onClick={() => setIsMenuOpen(false)}
              className={styles.menuCloseButton}
              aria-label="Закрыть меню"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className={styles.menuLogo}>
              <Image src={getLogoUrl(header.logo)} alt="СМЫСЛ есть" width={120} height={60} priority />
            </div>
          </div>

          <nav className={styles.menuNav}>
            {Array.isArray(header.menu) && header.menu.length > 0 ? (
              header.menu.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={styles.menuNavLink}
                >
                  {item.label}
                </button>
              ))
            ) : (
              <div className={styles.menuNavEmpty}>Меню не найдено</div>
            )}
          </nav>

          <div className={styles.menuFooter}>
            {/* Социальные иконки временно убраны */}
          </div>
        </div>
      </div>
    </header>
  );
}
