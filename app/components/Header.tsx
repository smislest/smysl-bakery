
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { fetchHeaderDataClient } from "@/app/lib/fetch-header-client";

// Типы можно импортировать или дублировать
interface HeaderData {
  logo: { url: string } | null;
  menu: { label: string; href: string }[];
  phone: string;
  email: string;
  social_instagram_icon?: any;
  social_vk_icon?: any;
  social_telegram_icon?: any;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [header, setHeader] = useState<HeaderData | null>(null);

  useEffect(() => {
    fetchHeaderDataClient().then(setHeader);
  }, []);

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
              {header.logo ? (
                <Image src={header.logo.url} alt="СМЫСЛ есть" width={120} height={60} priority />
              ) : (
                <Image src="/img/logo.png" alt="СМЫСЛ есть" width={120} height={60} priority />
              )}
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
              {header.logo ? (
                <Image src={header.logo.url} alt="СМЫСЛ есть" width={120} height={60} priority />
              ) : (
                <Image src="/img/logo.png" alt="СМЫСЛ есть" width={120} height={60} priority />
              )}
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
              {header.logo ? (
                <Image src={header.logo.url} alt="СМЫСЛ есть" width={120} height={60} priority />
              ) : (
                <Image src="/img/logo.png" alt="СМЫСЛ есть" width={120} height={60} priority />
              )}
            </div>
          </div>

          <nav className={styles.menuNav}>
            {Array.isArray(header.menu) && header.menu.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={styles.menuNavLink}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className={styles.menuFooter}>
            <div className={styles.socialIcons}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2.5} />
                </svg>
              </a>
              <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.132-.425.132-.425s-.02-1.297.572-1.488c.583-.188 1.333 1.254 2.127 1.809.6.42 1.056.328 1.056.328l2.123-.03s1.11-.07.584-.957c-.043-.073-.308-.66-1.583-1.865-1.336-1.262-1.157-1.059.452-3.246.98-1.332 1.372-2.145 1.25-2.495-.117-.334-.84-.245-.84-.245l-2.388.015s-.177-.025-.308.056c-.127.078-.21.262-.21.262s-.375 1.02-.875 1.887c-1.055 1.829-1.478 1.926-1.65 1.812-.4-.267-.3-1.073-.3-1.645 0-1.788.266-2.532-.518-2.724-.261-.064-.453-.106-1.12-.113-.857-.009-1.583.003-1.994.208-.274.137-.485.442-.356.46.159.021.52.099.711.365.247.343.238 1.114.238 1.114s.142 2.104-.331 2.365c-.325.179-.77-.186-1.726-1.854-.49-.843-.86-1.775-.86-1.775s-.071-.178-.199-.273c-.155-.115-.372-.152-.372-.152l-2.268.015s-.341.01-.466.161c-.112.134-.009.411-.009.411s1.763 4.199 3.757 6.316c1.827 1.942 3.9 1.814 3.9 1.814h.943z"/>
                </svg>
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
            </div>

            <div className={styles.contacts}>
              <a href="tel:+78002002222" className={styles.phone}>
                8 800 200 22 22
              </a>
              <a href="mailto:info@smysl-est.ru" className={styles.email}>
                info@smysl-est.ru
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}