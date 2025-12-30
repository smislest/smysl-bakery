"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { getProductsData } from '../../../lib/productsData';
import Image from "next/image";
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import styles from './ProductsCarousel.module.css';

interface Product {
  id?: string | number;
  title: string;
  subtitle?: string;
  description: string;
  ingredients?: string;
  weight?: number | string;
  product_photo?: string | { url: string };
}

export default function ProductsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

  useEffect(() => {
    getProductsData().then(data => {
      setProducts(data || []);
    }).catch(e => {
      console.error("Ошибка загрузки продуктов:", e);
    }).finally(() => setLoading(false));
  }, []);

  const getImageUrl = (photo: Product['product_photo']) => {
    if (!photo) return "/img/placeholder.jpg";
    if (typeof photo === 'string') {
      return `${DIRECTUS_URL}/assets/${photo}`;
    }
    if (typeof photo === 'object' && photo.url) {
      return photo.url;
    }
    return "/img/placeholder.jpg";
  };
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const dragContainerRef = useRef<HTMLDivElement>(null);
  
  // Spring для центральной карточки
  const [centerSpring, centerApi] = useSpring(() => ({ 
    scale: 1,
    opacity: 1,
    config: { tension: 300, friction: 30 }
  }));

  // Плавная навигация
  const animateToIndex = useCallback((newIndex: number) => {
    if (isAnimating || !products.length || newIndex === currentIndex) return;
    
    setIsAnimating(true);
    
    // Анимация исчезновения
    centerApi.start({
      scale: 0.95,
      opacity: 0.6,
      config: { tension: 400, friction: 30 }
    });
    
    // Меняем индекс с задержкой
    setTimeout(() => {
      setCurrentIndex(newIndex);
      
      // Анимация появления
      setTimeout(() => {
        centerApi.start({
          scale: 1,
          opacity: 1,
          config: { tension: 350, friction: 25 }
        });
        setIsAnimating(false);
      }, 50);
    }, 150);
  }, [isAnimating, products.length, currentIndex, centerApi]);

  const nextProduct = useCallback(() => {
    if (!products.length) return;
    const nextIndex = (currentIndex + 1) % products.length;
    animateToIndex(nextIndex);
  }, [currentIndex, products.length, animateToIndex]);

  const prevProduct = useCallback(() => {
    if (!products.length) return;
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    animateToIndex(prevIndex);
  }, [currentIndex, products.length, animateToIndex]);

  // Drag для десктопа - ПРАВИЛЬНАЯ РЕАЛИЗАЦИЯ
  const bindDrag = useDrag(({ 
    active, 
    movement: [mx], 
    direction: [dx], 
    velocity: [vx],
    last 
  }) => {
    if (active) {
      // Визуальная обратная связь при драге
      const dragProgress = Math.min(Math.abs(mx) / 100, 1);
      centerApi.start({
        scale: 1 - dragProgress * 0.03,
        opacity: 1 - dragProgress * 0.1,
        immediate: true
      });
    }
    
    if (last) {
      const shouldSwipe = Math.abs(mx) > 80 || vx > 0.3;
      
      if (shouldSwipe) {
        if (mx > 0) {
          prevProduct();
        } else {
          nextProduct();
        }
      }
      // Возвращаем в исходное состояние
      centerApi.start({
        scale: 1,
        opacity: 1,
        config: { tension: 350, friction: 40 }
      });
    }
  }, {
    axis: 'x',
    filterTaps: true,
    rubberband: 0.15,
  });


  // Сначала scrollToMobileIndex, чтобы не было обращения до объявления
  const scrollToMobileIndex = useCallback((index: number) => {
    if (!containerRef.current || !products.length) return;
    const container = containerRef.current;
    const cardWidth = container.clientWidth;
    const gap = 20;
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
    setMobileActiveIndex(index);
  }, [products.length]);

  // Убрали drag для мобильной версии - используем только scroll-snap

  // Мобильная версия - трекинг текущего индекса при скролле
  const handleMobileScroll = useCallback(() => {
    if (!containerRef.current || !products.length) return;
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth;
    const gap = 20;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    if (newIndex >= 0 && newIndex < products.length && newIndex !== mobileActiveIndex) {
      setMobileActiveIndex(newIndex);
    }
  }, [products.length, mobileActiveIndex]);

  const goToIndex = (index: number) => {
    animateToIndex(index);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleMobileScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleMobileScroll);
    }
  }, [handleMobileScroll]);

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevProduct();
      if (e.key === 'ArrowRight') nextProduct();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevProduct, nextProduct]);

  if (loading) {
    return <div className="w-full py-12 text-center text-xl text-white">Загрузка продуктов...</div>;
  }
  
  if (!products.length) {
    return <div className="w-full py-12 text-center text-xl text-white">Нет доступных продуктов</div>;
  }

  // Функция для получения видимых карточек
  const getVisibleCards = () => {
    if (products.length <= 3) {
      // Для малого количества показываем все
      return Array.from({ length: products.length }, (_, i) => i - Math.floor(products.length / 2));
    }
    return [-2, -1, 0, 1, 2];
  };

  return (
    <section id="products" className="w-full py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Навигация */}
        <div className="hidden md:block">
          <button
            onClick={prevProduct}
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            aria-label="Предыдущий"
            disabled={isAnimating}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path 
                d="M14 6L8 12L14 18" 
                stroke="#7BA862" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          <button
            onClick={nextProduct}
            className={`${styles.navButton} ${styles.navButtonNext}`}
            aria-label="Следующий"
            disabled={isAnimating}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path 
                d="M10 6L16 12L10 18" 
                stroke="#7BA862" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Карусель */}
        <div className={styles.carouselWithBackground}>
          <div className={styles.carouselBackground} />
          
          {/* ДЕСКТОПНАЯ ВЕРСИЯ */}
          <div className="hidden md:flex items-center justify-center w-full h-[600px] relative overflow-visible">
            {/* Контейнер для drag */}
            <animated.div
              {...bindDrag()}
              ref={dragContainerRef}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                cursor: isAnimating ? 'default' : 'grab',
                touchAction: 'pan-y'
              }}
              className="z-10"
            >
              {/* Рендерим все карточки */}
              {getVisibleCards().map((offset) => {
                const index = (currentIndex + offset + products.length) % products.length;
                const product = products[index];
                
                if (!product) return null;
                
                const uniqueKey = `${product.id || product.title}-${offset}`;
                
                // Параметры для позиционирования
                let transform = '';
                let scale = 1;
                let opacity = 1;
                let zIndex = 10;
                
                if (offset === 0) {
                  // ЦЕНТРАЛЬНАЯ КАРТОЧКА
                  return (
                    <animated.div
                      key={uniqueKey}
                      className={`${styles.activeCard} ${styles.centeredCard}`}
                      style={{
                        ...centerSpring,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 50,
                      }}
                    >
                      <div className={styles.activeCardInner}>
                        <div className={styles.activeImageContainer}>
                          <Image
                            src={getImageUrl(product.product_photo)}
                            alt={product.title}
                            fill
                            className={styles.activeImage}
                            sizes="432px"
                            priority
                          />
                        </div>
                        
                        <div className={styles.glutenFreeIcon}>
                          <Image
                            src="/svg/gl_free.svg"
                            alt="Gluten Free"
                            fill
                            className="object-contain"
                          />
                        </div>
                        
                        <div className={styles.cardContent}>
                          <div className={styles.productHeader}>
                            <h3 className={styles.productTitle}>{product.title}</h3>
                            <div className={styles.productWeight}>
                              {product.weight}г
                            </div>
                          </div>
                          
                          <p className={styles.productSubtitle}>{product.subtitle}</p>
                          <p className={styles.productDescription}>{product.description}</p>
                          
                          <div className={styles.ingredients}>
                            <h4 className={styles.ingredientsTitle}>Состав:</h4>
                            <p className={styles.ingredientsText}>{product.ingredients}</p>
                          </div>
                        </div>
                      </div>
                    </animated.div>
                  );
                } else {
                  // БОКОВЫЕ КАРТОЧКИ
                  if (Math.abs(offset) === 1) {
                    scale = 0.85;
                    opacity = 0.7;
                    zIndex = 20;
                    transform = `translate(calc(-50% + ${offset * 320}px), -50%) scale(${scale})`;
                  } else {
                    scale = 0.65;
                    opacity = 0.4;
                    zIndex = 10;
                    transform = `translate(calc(-50% + ${offset * 400}px), -50%) scale(${scale})`;
                  }
                  
                  return (
                    <div
                      key={uniqueKey}
                      className={`${styles.desktopOnly} ${styles.sideCard}`}
                      style={
                        {
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: transform,
                          opacity: opacity,
                          zIndex: zIndex,
                          cursor: 'pointer'
                        }
                      }
                      onClick={() => offset < 0 ? prevProduct() : nextProduct()}
                    >
                      <Image
                        src={getImageUrl(product.product_photo)}
                        alt={product.title}
                        width={Math.abs(offset) === 1 ? 260 : 180}
                        height={Math.abs(offset) === 1 ? 220 : 140}
                        className="object-contain drop-shadow-xl"
                      />
                    </div>
                  );
                }
              })}
            </animated.div>
          </div>
          
          {/* МОБИЛЬНАЯ ВЕРСИЯ */}
          <div
            ref={containerRef}
            className={`${styles.scrollSnapContainer} md:hidden`}
          >
            {products.map((product, index) => (
              <div key={product.id || product.title} className={styles.scrollSnapCard}>
                <div className={styles.mobileCard}>
                  <div className={styles.mobileImageWrapper}>
                    <Image
                      src={getImageUrl(product.product_photo)}
                      alt={product.title}
                      width={308}
                      height={220}
                      className={styles.mobileImage}
                    />
                  </div>
                  <div className={styles.mobileIcon}>
                    <Image
                      src="/svg/gl_free.svg"
                      alt="Gluten Free"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <div className={styles.mobileContent}>
                    <div className={styles.mobileHeader}>
                      <h3 className={styles.mobileTitle}>{product.title}</h3>
                      <div className={styles.mobileWeight}>{product.weight}г</div>
                    </div>
                    <p className={styles.mobileSubtitle}>{product.subtitle}</p>
                    <p className={styles.mobileDescription}>{product.description}</p>
                    <div className={styles.mobileIngredients}>
                      <h4 className={styles.mobileIngredientsTitle}>Состав:</h4>
                      <p className={styles.mobileIngredientsText}>{product.ingredients}</p>
                    </div>
                  </div>
                </div> 
              </div> 
            ))}
          </div>
        </div>
        
        {/* Индикаторы */}
        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => {
            const isActive = mobileActiveIndex === index || currentIndex === index;
            
            return (
              <button
                key={index}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    scrollToMobileIndex(index);
                  } else {
                    goToIndex(index);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#fdebc1] scale-110'
                    : 'bg-[#fdebc1] opacity-40 hover:opacity-70'
                }`}
                aria-label={`Продукт ${index + 1}`}
                disabled={isAnimating}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}