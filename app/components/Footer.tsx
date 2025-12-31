import { FaInstagram, FaVk, FaTelegramPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Image from "./Image";
import footerStatic from "../../content/footer.json";

type FooterLink = { label: string; href: string };
type FooterData = { text: string; links?: FooterLink[] };

export default function Footer() {
  const footer: FooterData = footerStatic;
  return (
    <footer id="contacts" className="w-full py-16" style={{ backgroundColor: '#544a44' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Логотип и иконки */}
          <div>
            <div className="mb-6">
              <Image src="/svg/logo_white.svg" alt="СМЫСЛ есть" className="h-12" width={60} height={24} />
            </div>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:bg-opacity-80 transition-all text-2xl"
                style={{ borderColor: '#ffecc6', color: '#ffecc6' }}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:bg-opacity-80 transition-all text-2xl"
                style={{ borderColor: '#ffecc6', color: '#ffecc6' }}
                aria-label="VK"
              >
                <FaVk />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:bg-opacity-80 transition-all text-2xl"
                style={{ borderColor: '#ffecc6', color: '#ffecc6' }}
                aria-label="Telegram"
              >
                <FaTelegramPlane />
              </a>
            </div>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#c1dedc' }}>Контакты</h3>
            <div className="space-y-3 text-white">
              <a
                href="tel:+78002002022"
                className="flex items-center gap-2 hover:opacity-80 transition-colors"
              >
                <FaPhoneAlt className="text-lg" /> 8 800 200 20 22
              </a>
              <a
                href="mailto:info@smysl-est.ru"
                className="flex items-center gap-2 hover:opacity-80 transition-colors"
              >
                <FaEnvelope className="text-lg" /> info@smysl-est.ru
              </a>
            </div>
          </div>

          {/* Адрес */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#c1dedc' }}>Адрес</h3>
            <address className="not-italic space-y-2 text-white">
              <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-lg" /> RU 1675, Россия,</p>
              <p>г. Москва, ул. Святоозёрская, дом 8</p>
            </address>
          </div>

          {/* Покупателям */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#c1dedc' }}>Покупателям</h3>
            <ul className="space-y-2 text-white">
              <li>
                <a
                  href="#"
                  className="hover:opacity-80 transition-colors"
                >
                  Стандарты качества
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:opacity-80 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Карта Яндекса */}
        <div className="rounded-2xl overflow-hidden mt-8" style={{ height: '400px' }}>
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa1b0899bfd294471a0bb5d91ac1e5b3c1c68111a48c26b2d2cdad140c84908ff&amp;source=constructor"
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0, width: '100%', height: '400px' }}
            allowFullScreen={true}
            title="Карта Яндекса"
          ></iframe>
        </div>

        {/* Copyright */}
        <div className="text-center text-white opacity-70 pt-8 border-t" style={{ borderColor: 'rgba(255, 236, 198, 0.2)' }}>
          {footer.text}
          <div className="flex justify-center gap-4 mt-2">
            {(footer.links || []).map((link) => (
              <a key={link.href} href={link.href} className="underline hover:opacity-80 transition-colors">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
