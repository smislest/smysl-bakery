import Link from "next/link";

export default function MissionSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* Первая строка с курсивом и жирным текстом */}
          <h2 className="text-3xl md:text-5xl leading-tight">
            <span className="font-normal text-brown uppercase">СОЗДАЁМ </span>
            <span className="font-serif italic text-primary">счастливый и добрый</span>
            <span className="font-normal text-brown uppercase"> МИР</span>
          </h2>
          
          {/* Вторая строка */}
          <p className="text-2xl md:text-4xl leading-tight">
            <span className="font-normal text-brown uppercase">НАПОЛНЕННЫЙ </span>
            <span className="font-serif italic text-primary">тёплыми</span>
            <span className="font-normal text-brown uppercase"> МОМЕНТАМИ</span>
          </p>
          
          {/* Третья строка */}
          <p className="text-2xl md:text-4xl leading-tight">
            <span className="font-serif italic text-brown">И </span>
            <span className="font-serif italic text-primary">любимыми</span>
            <span className="font-normal text-brown uppercase"> ВКУСАМИ</span>
          </p>
          
          {/* Кнопка */}
          <div className="pt-8">
            <Link
              href="#products"
              className="inline-block px-12 py-4 bg-brown text-white rounded-full hover:bg-brown/90 transition-colors text-lg font-medium"
            >
              Посмотреть каталог
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
