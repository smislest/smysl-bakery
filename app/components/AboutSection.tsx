
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAboutData } from '../../lib/aboutData';

import type { AboutData } from '../../lib/aboutData';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://smysl-bakery-directus.onrender.com';

// Helper function to convert Directus file reference to asset URL
function getAssetUrl(file?: string | { id: string }): string {
  if (!file) return '/img/staf3.png';
  if (typeof file === 'string') {
    // If it's already a full path, return as-is
    if (file.startsWith('http') || file.startsWith('/')) return file;
    // Otherwise, it's a file ID
    return `${DIRECTUS_URL}/assets/${file}`;
  }
  // If it's an object with id
  return `${DIRECTUS_URL}/assets/${file.id}`;
}

export default function AboutSection() {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    getAboutData().then(setAbout).catch(() => setAbout(null));
  }, []);

  const svgTitle = getAssetUrl(about?.svg_title);
  const passionText = about?.passion_text || about?.text_c || about?.text_r || about?.text_r2 || 'Мы печём хлеб с душой.';
  const prideText = about?.pride_text || 'Гордимся своим делом';
  const missionText = about?.mission_text || 'Наша миссия — натуральность и вкус без компромиссов';
  const images = {
    main: getAssetUrl(about?.image_main),
    topRight: getAssetUrl(about?.image_top_right),
    bottomLeft: getAssetUrl(about?.image_bottom_left),
    bottomRight: getAssetUrl(about?.image_bottom_right),
  };

  return (
    <section id="about" className="w-full py-16 bg-primary relative overflow-visible">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with SVG between lines */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex-1 h-[2px] bg-gray-300" />
          <div className="flex-shrink-0">
            <Image src={svgTitle} alt="Смысл есть" width={160} height={40} />
          </div>
          <div className="flex-1 h-[2px] bg-gray-300" />
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl overflow-hidden">
              <Image src={images.main} alt="Главное фото" width={800} height={800} className="object-cover" />
            </div>
            <p className="mt-4 text-white text-lg">{passionText}</p>
          </div>

          <div className="grid grid-rows-2 gap-4">
            <div className="flex justify-end">
              <div className="w-1/2 rounded-3xl overflow-hidden">
                <Image src={images.topRight} alt="Верхнее фото" width={400} height={400} className="object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-start">
              <div className="flex flex-col gap-4">
                <div className="rounded-3xl overflow-hidden">
                  <Image src={images.bottomLeft} alt="Фото слева снизу" width={400} height={400} className="object-cover" />
                </div>
                <p className="text-white">{prideText}</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-3xl overflow-hidden">
                  <Image src={images.bottomRight} alt="Фото справа снизу" width={400} height={400} className="object-cover" />
                </div>
                <p className="text-white">{missionText}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex flex-col gap-6 max-w-3xl mx-auto">
          <div className="rounded-3xl overflow-hidden">
            <Image src={images.main} alt="Главное фото" width={600} height={600} className="object-cover" />
          </div>
          <p className="text-white">{passionText}</p>

          <div className="rounded-3xl overflow-hidden">
            <Image src={images.bottomLeft} alt="Фото слева снизу" width={600} height={600} className="object-cover" />
          </div>
          <p className="text-white">{prideText}</p>

          <div className="rounded-3xl overflow-hidden">
            <Image src={images.bottomRight} alt="Фото справа снизу" width={600} height={600} className="object-cover" />
          </div>
          <p className="text-white">{missionText}</p>
        </div>
      </div>
    </section>
  );
}
