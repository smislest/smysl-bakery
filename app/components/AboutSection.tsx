import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-primary relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-4">
            СМЫСЛ
            <br />
            <span className="font-serif italic text-4xl">есть</span>
          </h2>
        </div>

        {/* Сложная сетка с фото и текстом */}
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Мобильная версия */}
          <div className="md:hidden space-y-4">
            {/* Вектор "Мы..." */}
            <div className="flex justify-center mb-2">
              <Image src="/svg/we_are.svg" alt="Мы" width={150} height={105} />
            </div>

            {/* Фото девушки */}
            <div className="relative rounded-3xl overflow-hidden" style={{ height: '400px' }}>
              <Image src="/img/staf1.png" alt="Сотрудник" fill className="object-contain object-top" />
            </div>

            {/* Текстовый блок "гордимся своим делом" */}
            <div className="bg-beige rounded-3xl p-5">
              <h3 className="text-base font-bold text-white italic font-serif mb-2">гордимся своим делом</h3>
              <p className="text-white text-xs leading-tight">Благодаря нашей страсти к инновациям и строгому контролю качества, мы создаём натуральные продукты, которые наполняют жизнь вкусом</p>
            </div>

            {/* Фото staf2 */}
            <div className="relative rounded-3xl overflow-hidden" style={{ height: '300px' }}>
              <Image src="/img/staf2.png" alt="Сотрудник" fill className="object-contain object-top" />
            </div>

            {/* Текстовый блок "гордимся" */}
            <div className="bg-beige rounded-3xl p-5">
              <p className="font-bold text-white italic font-serif text-sm mb-1">гордимся</p>
              <p className="text-white text-xs leading-tight">Мы с гордостью предлагаем широкий ассортимент вкусной и натуральной выпечки на безглютеновой основе</p>
            </div>

            {/* Фото staf3 */}
            <div className="relative rounded-3xl overflow-hidden" style={{ height: '300px' }}>
              <Image src="/img/staf3.png" alt="Сотрудник" fill className="object-contain object-top" />
            </div>

            {/* Текстовый блок "наша миссия" */}
            <div className="bg-beige rounded-3xl p-5">
              <p className="font-bold text-white italic font-serif text-sm mb-1">наша миссия</p>
              <p className="text-white text-xs leading-tight">Мы стремимся к тому, чтобы питание стало ОСОЗНАННЫМ, понятным и по-настоящему вкусным - без компромиссов между вкусом и пользой</p>
            </div>

            {/* Фото staf5 */}
            <div className="relative rounded-3xl overflow-hidden" style={{ height: '250px' }}>
              <Image src="/img/staf5.png" alt="Сотрудник" fill className="object-contain object-top" />
            </div>
          </div>

          {/* Десктопная версия - как в макете */}
          <div className="hidden md:flex gap-4 items-end">
            {/* Левая колонка - staf2 и staf4 */}
            <div className="w-1/3 flex flex-col gap-4">
              <div className="relative rounded-3xl overflow-hidden h-[280px]">
                <Image src="/img/staf2.png" alt="Сотрудник" fill className="object-cover" />
              </div>
              <div className="relative rounded-3xl overflow-hidden h-[340px]">
                <Image src="/img/staf4.png" alt="Сотрудник" fill className="object-cover" />
              </div>
            </div>

            {/* Центральная колонка - staf1, текстовый блок и staf5 */}
            <div className="w-1/3 flex flex-col gap-0">
              <div className="relative rounded-3xl overflow-hidden h-[420px]">
                <Image src="/img/staf1.png" alt="Сотрудник" fill className="object-contain object-top" />
              </div>
              <div className="bg-beige rounded-3xl p-4 pb-3 flex flex-col justify-center">
                <p className="font-bold text-white italic font-serif text-sm mb-1">гордимся</p>
                <p className="text-white text-xs leading-tight">Мы с гордостью предлагаем широкий ассортимент вкусной и натуральной выпечки на безглютеновой основе</p>
              </div>
              <div className="relative rounded-3xl overflow-hidden h-[200px]">
                <Image src="/img/staf5.png" alt="Сотрудник" fill className="object-cover" />
              </div>
            </div>

            {/* Правая колонка - текстовые блоки */}
            <div className="w-1/3 flex flex-col gap-0">
              <div className="bg-beige rounded-3xl pt-6 px-6 pb-4 flex flex-col justify-start relative overflow-visible">
                <div className="absolute top-4 left-6 z-20">
                  <Image src="/svg/we_are.svg" alt="Мы" width={180} height={120} />
                </div>
                <div className="mt-16">
                  <h3 className="text-base font-bold text-white italic font-serif mb-2">гордимся своим делом</h3>
                  <p className="text-white text-xs leading-tight">Благодаря нашей страсти к инновациям и строгому контролю качества, мы создаём натуральные продукты, которые наполняют жизнь вкусом</p>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden h-[300px]">
                <Image src="/img/staf3.png" alt="Сотрудник" fill className="object-contain object-top" />
              </div>
              <div className="bg-beige rounded-3xl p-4 flex flex-col justify-center">
                <p className="font-bold text-white italic font-serif text-sm mb-1">наша миссия</p>
                <p className="text-white text-xs leading-tight">Мы стремимся к тому, чтобы питание стало ОСОЗНАННЫМ, понятным и по-настоящему вкусным - без компромиссов между вкусом и пользой</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Декоративные колосья пшеницы */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[30rem] h-[30rem] pointer-events-none z-30">
        <Image src="/img/l_wheat.png" alt="Пшеница" fill className="object-contain object-right" />
      </div>
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[30rem] h-[30rem] pointer-events-none z-30">
        <Image src="/img/r_wheat.png" alt="Пшеница" fill className="object-contain object-left" />
      </div>
    </section>
  );
}
