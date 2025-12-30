import Typograf from 'typograf';

// Инициализация типографа один раз
const tp = new Typograf({ locale: ['ru', 'en-US'] });

// Конфигурация правил типографирования
tp.enableRule('ru/optalign');     // Оптическое выравнивание
tp.enableRule('ru/nbsp/afterNumber'); // Неразрывный пробел после числа
tp.enableRule('ru/nbsp/beforeParticle'); // Неразрывный пробел перед частицей (ли, же, ж, ать, ель)
tp.enableRule('ru/nbsp/beforeSuspensivePoint'); // Неразрывный пробел перед многоточием
tp.enableRule('ru/nbsp/doulbleSpace'); // Удаление двойных пробелов
tp.enableRule('ru/dash/main'); // Замена дефисов на тире
tp.enableRule('ru/punctuation/exclamation'); // Пунктуация
tp.enableRule('ru/liter/accent'); // Расставление ударений

/**
 * Типографирование текста с применением русских правил
 * @param text Исходный текст
 * @returns Типографированный текст
 */
export function typograph(text: string | undefined | null): string {
  if (!text) return '';
  return tp.execute(String(text));
}

/**
 * Типографирование HTML контента
 * @param html HTML контент
 * @returns Типографированный HTML
 */
export function typographHtml(html: string | undefined | null): string {
  if (!html) return '';
  return tp.execute(String(html));
}

export default tp;
