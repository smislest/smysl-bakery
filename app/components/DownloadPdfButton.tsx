'use client';

import { useState } from 'react';

export default function DownloadPdfButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: window.location.href }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при генерации PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `smysl-bakery-${new Date().toLocaleDateString('ru-RU')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось скачать PDF');
      console.error('PDF download error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="inline-block">
      <button
        onClick={handleDownloadPdf}
        disabled={isLoading}
        className="group relative inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#7BA862] to-[#5F8A48] hover:from-[#8BB876] hover:to-[#6B9552] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        title={error || 'Скачать страницу в PDF'}
      >
        {isLoading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75" />
            </svg>
            <span>Генерирую...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-7" />
            </svg>
            <span>PDF</span>
          </>
        )}
      </button>
      
      {error && (
        <div className="absolute top-full mt-2 px-3 py-2 bg-red-500 text-white text-xs rounded-lg whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
}
