import Typograf from 'typograf';

// Инициализация типографа один раз
const tp = new Typograf({ locale: ['ru', 'en-US'] });

// Отключаем все правила по умолчанию для консистентности
tp.disableRule('*');

// Включаем только базовые, стабильные правила
tp.enableRule('ru/nbsp/beforeParticle'); // Неразрывный пробел перед частицей (ли, же, ж)
tp.enableRule('ru/nbsp/afterNumber'); // Неразрывный пробел после числа
tp.enableRule('ru/dash/main'); // Замена дефисов на тире
tp.enableRule('ru/dash/middot'); // Дефис для диапазонов
tp.enableRule('ru/punctuation/exclamation'); // Пунктуация
tp.enableRule('ru/spaces/punctuation'); // Пробелы вокруг пунктуации

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
