import { Stethoscope } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";

interface HeroSectionProps {
  product: ShopifyProduct | null | undefined;
}

const HeroSection = ({ product }: HeroSectionProps) => {
  const heroImage =
    product?.node.images.edges[0]?.node.url ??
    "https://cdn.shopify.com/s/files/1/0759/3659/6219/files/Bor_ac73b305-db28-4f8c-82ab-c938205ac139.png?v=1775133482";

  return (
    <section className="relative bg-gradient-to-b from-primary-soft via-secondary to-background py-12 sm:py-16">
      <div className="container">
        {/* Doktor & Eczacı onayı rozeti — en başta */}
        <div className="mp-reveal flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 bg-card border-2 border-primary/30 rounded-full py-2.5 px-5 shadow-sm">
            <Stethoscope className="w-5 h-5 text-primary" strokeWidth={2.5} />
            <span className="text-[14px] sm:text-[15px] font-bold text-primary tracking-wide">
              Doktor ve Eczacı Onaylı
            </span>
          </div>
        </div>

        <h1 className="mp-reveal mp-reveal-d1 text-center text-[34px] sm:text-[44px] font-extrabold text-foreground leading-tight tracking-tight mb-3">
          Menopoz Döneminde
          <br />
          <span className="text-primary">Yanınızdayız</span>
        </h1>

        <p className="mp-reveal mp-reveal-d2 text-center text-[18px] sm:text-[20px] text-muted-foreground font-medium max-w-[520px] mx-auto mb-9 leading-relaxed">
          Sıcak basması, uyku düzensizliği ve yorgunluğa karşı{" "}
          <strong className="text-foreground font-bold">doğal destek.</strong>
        </p>

        <div className="mp-reveal mp-reveal-d2 flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-75" />
            <img
              src={heroImage}
              alt=".ki Change menopoz takviyesi"
              className="relative h-56 sm:h-72 w-auto object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.18)]"
            />
          </div>
        </div>

        <div className="mp-reveal mp-reveal-d3 flex justify-center">
          <a
            href="#urun"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground text-[18px] font-bold py-4 px-10 rounded-full min-h-[60px] shadow-md transition-all hover:bg-primary-medium hover:-translate-y-0.5 hover:shadow-lg"
          >
            Hemen İncele
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
