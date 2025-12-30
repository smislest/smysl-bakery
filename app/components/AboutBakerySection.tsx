import Image from "next/image";
import styles from "./AboutBakerySection.module.css";

export default function AboutBakerySection({
  svgTitle,
  passionText,
  prideText,
  missionText,
  images,
}: {
  svgTitle: string;
  passionText: string;
  prideText: string;
  missionText: string;
  images: {
    main: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
    extra1?: string;
    extra2?: string;
  };
}) {
  return (
    <section className={styles.section} id="about">
      <div className={styles.header}>
        <div className={styles.line} />
        <Image src={svgTitle} alt="Смысл есть" width={160} height={40} />
        <div className={styles.line} />
      </div>

      <div className={styles.desktopGrid}>
        <div className={styles.main}>
          <Image src={images.main} alt="Главное фото" width={400} height={400} />
          <p className={styles.text}>{passionText}</p>
        </div>

        <div className={styles.topRight}>
          <Image src={images.topRight} alt="Верхнее фото" width={200} height={200} />
        </div>

        <div className={styles.bottomLeft}>
          <Image src={images.bottomLeft} alt="Фото слева снизу" width={200} height={200} />
          <p className={styles.text}>{prideText}</p>
        </div>

        <div className={styles.bottomRight}>
          <Image src={images.bottomRight} alt="Фото справа снизу" width={200} height={200} />
          <p className={styles.text}>{missionText}</p>
        </div>
      </div>

      <div className={styles.mobileGrid}>
        <Image src={images.main} alt="Главное фото" width={300} height={300} />
        <p className={styles.text}>{passionText}</p>

        <Image src={images.bottomLeft} alt="Фото слева снизу" width={300} height={300} />
        <p className={styles.text}>{prideText}</p>

        <Image src={images.bottomRight} alt="Фото справа снизу" width={300} height={300} />
        <p className={styles.text}>{missionText}</p>
      </div>
    </section>
  );
}
