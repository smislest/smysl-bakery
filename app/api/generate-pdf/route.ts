import { chromium } from '@playwright/test';

export const runtime = 'nodejs';
export const maxDuration = 30; // Timeout 30 секунд

export async function POST(request: Request) {
  try {
    const { url = 'http://localhost:3000' } = await request.json();

    // Валидация URL
    if (!url || typeof url !== 'string') {
      return new Response(
        JSON.stringify({ error: 'URL parameter required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Запускаем браузер
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
      // Переходим на страницу
      await page.goto(url, { waitUntil: 'networkidle' });

      // Ждем загрузки всех изображений
      await page.waitForLoadState('networkidle');

      // Генерируем PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm',
        },
        printBackground: true, // Включаем фоны и градиенты
        scale: 1,
      });

      // Закрываем браузер
      await browser.close();

      // Возвращаем PDF файл
      return new Response(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="document.pdf"',
        },
      });
    } catch (error) {
      await browser.close();
      throw error;
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to generate PDF',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
