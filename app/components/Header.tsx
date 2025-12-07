"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* МОБИЛЬНАЯ ВЕРСИЯ */}
      <div className="md:hidden relative w-full overflow-hidden">
        <div 
          className="bg-[#5C5552] px-4 py-4 pb-8 flex items-center justify-center relative w-full"
          style={{
            clipPath: 'ellipse(60% 100% at 50% 0%)',
            maxWidth: '100vw'
          }}
        >
          {/* Иконка меню слева */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute left-4 top-4 text-white hover:opacity-70 transition-opacity z-10"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth={2}>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Логотип в центре */}
          <Link href="/" className="flex justify-center relative z-10">
            <img src="/svg/logo.svg" alt="СМЫСЛ есть" className="h-12 w-auto object-contain" />
          </Link>
        </div>
      </div>

      {/* ДЕСКТОПНАЯ ВЕРСИЯ */}
      <div className="hidden md:block relative w-full overflow-hidden">
        <div 
          className="bg-[#5C5552] px-4 py-4 pb-8 flex items-center justify-center relative w-full"
          style={{
            clipPath: 'ellipse(75% 100% at 50% 0%)',
            maxWidth: '100vw'
          }}
        >
          {/* Кнопка МЕНЮ слева */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute left-4 flex items-center gap-3 text-white hover:text-primary transition-colors cursor-pointer z-10"
          >
            <div className="w-16 h-16 flex items-center justify-center">
              {isMenuOpen ? (
                /* Иконка крестика */
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Symbol.svg */
                <img src="/svg/symbol.svg" alt="Меню" style={{ width: '64px', height: '64px', objectFit: 'contain' as const }} />
              )}
            </div>
            <div>
              <div className="text-2xl font-bold">МЕНЮ</div>
            </div>
          </button>

          {/* Логотип по центру */}
          <Link href="/" className="flex justify-center relative z-10">
            <img src="/svg/logo.svg" alt="СМЫСЛ есть" className="h-20 w-auto object-contain" />
          </Link>
        </div>
      </div>

      {/* Полноэкранная навигация при раскрытии меню */}
      <div
        className={`fixed inset-0 top-0 z-[60] transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "#5C5552", width: '100vw', height: '100vh' }}
      >
        <div className="flex flex-col justify-between h-screen pt-8 pb-10 px-4 w-full overflow-y-auto">
          <div className="relative flex items-center justify-center mb-12">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute left-0 top-0 text-white hover:opacity-70 transition-opacity z-10"
              aria-label="Закрыть меню"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src="/svg/logo.svg"
              alt="СМЫСЛ есть"
              className="h-20 w-auto object-contain"
            />
          </div>

          <nav className="flex flex-col items-center gap-8 flex-grow justify-center -mt-8">
            <a
              href="#products"
              className="text-white text-xl font-normal hover:opacity-70 transition-opacity uppercase text-center leading-tight"
              onClick={() => setIsMenuOpen(false)}
            >
              НАША ВЫПЕЧКА
              <br />И ДЕСЕРТЫ
            </a>
            <a
              href="#about"
              className="text-white text-xl font-normal hover:opacity-70 transition-opacity uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              О НАС
            </a>
            <a
              href="#news"
              className="text-white text-xl font-normal hover:opacity-70 transition-opacity uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              НОВОСТИ
            </a>
            <a
              href="#contacts"
              className="text-white text-xl font-normal hover:opacity-70 transition-opacity uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              КОНТАКТЫ
            </a>
          </nav>

          <div className="flex flex-col items-center gap-6 mt-auto">
            <div className="flex justify-center gap-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7" strokeWidth={1.8}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2.5} />
                </svg>
              </a>
              <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.132-.425.132-.425s-.02-1.297.572-1.488c.583-.188 1.333 1.254 2.127 1.809.6.42 1.056.328 1.056.328l2.123-.03s1.11-.07.584-.957c-.043-.073-.308-.66-1.583-1.865-1.336-1.262-1.157-1.059.452-3.246.98-1.332 1.372-2.145 1.25-2.495-.117-.334-.84-.245-.84-.245l-2.388.015s-.177-.025-.308.056c-.127.078-.21.262-.21.262s-.375 1.02-.875 1.887c-1.055 1.829-1.478 1.926-1.65 1.812-.4-.267-.3-1.073-.3-1.645 0-1.788.266-2.532-.518-2.724-.261-.064-.453-.106-1.12-.113-.857-.009-1.583.003-1.994.208-.274.137-.485.442-.356.46.159.021.52.099.711.365.247.343.238 1.114.238 1.114s.142 2.104-.331 2.365c-.325.179-.77-.186-1.726-1.854-.49-.843-.86-1.775-.86-1.775s-.071-.178-.199-.273c-.155-.115-.372-.152-.372-.152l-2.268.015s-.341.01-.466.161c-.112.134-.009.411-.009.411s1.763 4.199 3.757 6.316c1.827 1.942 3.9 1.814 3.9 1.814h.943z"/>
                </svg>
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
            </div>

            <div className="text-center border-t border-white/30 pt-6 w-full">
              <a href="tel:+78002002222" className="block text-white text-lg font-semibold hover:opacity-70 transition-opacity mb-2">
                8 800 200 22 22
              </a>
              <a href="mailto:info@smysl-est.ru" className="block text-white text-sm hover:opacity-70 transition-opacity">
                info@smysl-est.ru
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
