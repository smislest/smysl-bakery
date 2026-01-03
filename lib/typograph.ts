import Typograf from 'typograf';

// Инициализация типографа один раз
const tp = new Typograf({ locale: ['ru', 'en-US'] });

// Используем все правила по умолчанию для полного типографирования

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
