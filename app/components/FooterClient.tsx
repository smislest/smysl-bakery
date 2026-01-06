"use client";
import Footer from "./Footer";

interface FooterClientProps {
  showMapOnMobile?: boolean;
}

export default function FooterClient({ showMapOnMobile = false }: FooterClientProps) {
  return <Footer showMapOnMobile={showMapOnMobile} />;
}
