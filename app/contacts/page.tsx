import type { Metadata } from 'next';
import { buildOpenGraph, buildTwitter } from '../../lib/seo';
import ContactsPageClient from './ContactsPageClient';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Контакты пекарни СМЫСЛ есть в Москве: адрес, телефон, режим работы. Доставка и самовывоз безглютеновой выпечки.',
  alternates: {
    canonical: '/contacts',
  },
  openGraph: buildOpenGraph({
    title: 'Контакты | СМЫСЛ есть',
    description: 'Контакты пекарни СМЫСЛ есть в Москве: адрес, телефон, режим работы. Доставка и самовывоз безглютеновой выпечки.',
    url: '/contacts',
  }),
  twitter: buildTwitter({
    title: 'Контакты | СМЫСЛ есть',
    description: 'Контакты пекарни СМЫСЛ есть в Москве: адрес, телефон, режим работы. Доставка и самовывоз безглютеновой выпечки.',
  }),
};

export default function ContactsPage() {
  return <ContactsPageClient />;
}
