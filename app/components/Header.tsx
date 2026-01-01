
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import headerStatic from "../../content/header.json";

interface HeaderData {
  logo?: string | { url: string } | null;
  menu: { label: string; href: string }[];
  phone: string;
  email: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [header] = useState<HeaderData>(headerStatic);
  const logoSrc = "/svg/logo.svg";

  const socials = [
    {
      href: "https://instagram.com",
      label: "Instagram",
      viewBox: "0 0 24 24",
      path: "M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm11 1a1 1 0 100 2 1 1 0 000-2zm-6 2a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z",
    },
    {
      href: "https://vk.com",
      label: "VK",
      viewBox: "0 0 24 24",
      path: "M20.46 6.16c.11-.36 0-.63-.52-.63H17.6c-.43 0-.63.23-.74.48 0 0-.86 2.07-2.08 3.41-.39.39-.57.51-.79.51-.11 0-.27-.13-.27-.49V6.16c0-.44-.13-.63-.49-.63H9.79c-.27 0-.44.2-.44.38 0 .42.64.52.71 1.72v2.6c0 .57-.1.67-.32.67-.57 0-1.95-2.09-2.77-4.47-.17-.48-.34-.68-.77-.68H3.34c-.5 0-.6.23-.6.48 0 .45.57 2.69 2.69 5.65 1.4 2.03 3.37 3.14 5.18 3.14 1.08 0 1.21-.24 1.21-.68v-1.57c0-.49.1-.58.45-.58.26 0 .72.13 1.79 1.1 1.22 1.22 1.42 1.77 2.1 1.77h1.78c.5 0 .75-.24.61-.71-.16-.46-.73-1.13-1.48-1.92-.39-.44-.97-.91-1.14-1.15-.24-.31-.17-.45 0-.73 0 0 2.02-2.84 2.24-3.8z",
    },
    {
      href: "https://t.me",
      label: "Telegram",
      viewBox: "0 0 24 24",
      path: "M9.04 15.65l-.39 5.46c.56 0 .81-.24 1.1-.52l2.64-2.52 5.46 4c1 .55 1.71.26 1.98-.92l3.59-16.83c.33-1.56-.56-2.17-1.55-1.8L2.16 9.53c-1.52.6-1.5 1.46-.26 1.85l5.31 1.66 12.3-7.74c.58-.37 1.1-.17.67.25z",
    },
  ];

  const address = "111675, Россия, г. Москва, ул. Святоозерская, дом 8";

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
              <Image src={logoSrc} alt="СМЫСЛ есть" width={120} height={60} priority />
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
              <Image src={logoSrc} alt="СМЫСЛ есть" width={120} height={60} priority />
            </div>
          </Link>
        </div>
      </div>

      {/* ПОЛНОЭКРАННОЕ МЕНЮ */}
      <div className={`${styles.fullscreenMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.menuPanel}>
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
                <Image src={logoSrc} alt="СМЫСЛ есть" width={120} height={60} priority />
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
              <div className={styles.socialIcons}>
                {socials.map((s) => (
                  <Link key={s.href} href={s.href} className={styles.socialIcon} aria-label={s.label} target="_blank">
                    <svg viewBox={s.viewBox} width={36} height={36} aria-hidden="true" focusable="false">
                      <path d={s.path} />
                    </svg>
                  </Link>
                ))}
              </div>

              <div className={styles.contactsRow}>
                <div className={styles.contactLine}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width={22} height={22}>
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.11.37 2.3.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.2 22.02 2 13.82 2 3.99a1 1 0 011-1H6.5a1 1 0 011 1c0 1.28.2 2.47.57 3.59a1 1 0 01-.25 1.01l-2.2 2.2z" />
                    </svg>
                  </span>
                  <a href={`tel:${header.phone}`} className={styles.phone}>{header.phone}</a>
                </div>

                <div className={styles.contactLine}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width={22} height={22}>
                      <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                    </svg>
                  </span>
                  <div className={styles.addressText}>{address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
