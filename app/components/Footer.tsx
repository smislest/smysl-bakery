export default function Footer() {
  return (
    <footer id="contacts" className="bg-brown text-beige">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Логотип */}
          <div>
            <div className="text-3xl font-serif mb-2">СМЫСЛ</div>
            <div className="text-xl font-serif italic">есть</div>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-beige flex items-center justify-center hover:bg-beige hover:text-brown transition-all"
              >
                📷
              </a>
              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-beige flex items-center justify-center hover:bg-beige hover:text-brown transition-all"
              >
                VK
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-beige flex items-center justify-center hover:bg-beige hover:text-brown transition-all"
              >
                ✈️
              </a>
            </div>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <div className="space-y-3">
              <a
                href="tel:+78002002022"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                📞 8 800 200 20 22
              </a>
              <a
                href="mailto:info@smysl-est.ru"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                ✉️ info@smysl-est.ru
              </a>
            </div>
          </div>

          {/* Адрес */}
          <div>
            <h3 className="text-xl font-bold mb-4">Адрес</h3>
            <address className="not-italic space-y-2">
              <p>📍 RU 1675, Россия,</p>
              <p>г. Москва, ул. Святоозёрская, дом 8</p>
            </address>
          </div>

          {/* Покупателям */}
          <div>
            <h3 className="text-xl font-bold mb-4">Покупателям</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  Стандарты качества
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Карта */}
        <div className="rounded-2xl overflow-hidden h-64 bg-beige-dark mb-8">
          <div className="w-full h-full flex items-center justify-center text-brown text-xl">
            🗺️ Карта (интеграция Google Maps / Яндекс.Карты)
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-lg opacity-70 pt-8 border-t border-beige/20">
          © 2025 СМЫСЛ есть. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
