import { useState, useCallback, useRef } from "react";
import { Loader2, ShoppingCart, ShieldCheck, Truck, Stethoscope } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

interface ProductSectionProps {
  product: ShopifyProduct | null | undefined;
  isLoading?: boolean;
}

const ProductSection = ({ product, isLoading }: ProductSectionProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  const variant = product?.node.variants.edges[0]?.node;
  const price = variant ? parseFloat(variant.price.amount) : 0;
  const currency = variant?.price.currencyCode === "TRY" ? "₺" : variant?.price.currencyCode || "";

  const handleScroll = useCallback(() => {
    if (!galleryRef.current) return;
    const idx = Math.round(galleryRef.current.scrollLeft / galleryRef.current.offsetWidth);
    setActiveSlide(idx);
  }, []);

  const handleAdd = async () => {
    if (!product || !variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  const images = product?.node.images.edges.map((e) => e.node) ?? [];

  return (
    <section id="urun" className="py-14 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start max-w-[920px] mx-auto">
          {/* Galeri */}
          <div className="mp-reveal relative rounded-2xl overflow-hidden bg-secondary/30 shadow-md">
            <div
              ref={galleryRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
              onScroll={handleScroll}
            >
              {images.length > 0 ? (
                images.slice(0, 4).map((img, i) => (
                  <div key={i} className="flex-none w-full snap-start aspect-square">
                    <img
                      src={img.url}
                      alt={img.altText ?? product?.node.title ?? ".ki Change"}
                      className="w-full h-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))
              ) : (
                <div className="flex-none w-full aspect-square bg-secondary" />
              )}
            </div>
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.slice(0, 4).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full bg-primary transition-opacity ${
                      activeSlide === i ? "opacity-100" : "opacity-30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bilgi */}
          <div className="mp-reveal mp-reveal-d1">
            <div className="inline-flex items-center gap-2 bg-primary-soft text-primary text-[13px] font-bold py-2 px-4 rounded-full mb-4">
              <Stethoscope className="w-4 h-4" strokeWidth={2.5} />
              Doktor ve Eczacı Onaylı
            </div>

            <h2 className="text-[26px] sm:text-[30px] font-extrabold text-foreground mb-3 leading-tight">
              {product?.node.title || ".ki Change | Menopoz Takviyesi"}
            </h2>

            <p className="text-[17px] text-muted-foreground mb-6 leading-relaxed">
              Menopoz döneminde rahat hissetmeniz için{" "}
              <strong className="text-foreground font-semibold">
                doğal ve klinik dozda
              </strong>{" "}
              hazırlandı.
            </p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-[36px] font-extrabold text-primary leading-none">
                {currency}
                {price.toLocaleString("tr-TR")}
              </span>
              <span className="text-[15px] text-muted-foreground font-medium">
                / 30 günlük kullanım
              </span>
            </div>

            <button
              onClick={handleAdd}
              disabled={!variant || cartLoading || isLoading}
              className="flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground text-[18px] font-bold py-4 px-8 rounded-full min-h-[64px] transition-all hover:bg-primary-medium hover:-translate-y-0.5 hover:shadow-lg mb-5 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {cartLoading || isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <ShoppingCart className="w-6 h-6" strokeWidth={2.5} />
              )}
              Sepete Ekle
            </button>

            <div className="flex items-center justify-center gap-5 sm:gap-7 flex-wrap pt-2">
              {[
                { icon: ShieldCheck, label: "Güvenli ödeme" },
                { icon: Truck, label: "Ücretsiz kargo" },
                { icon: Stethoscope, label: "Eczacı desteği" },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.label} className="flex items-center gap-1.5 text-[14px] text-muted-foreground font-semibold">
                    <Icon className="w-5 h-5 text-sage" strokeWidth={2} />
                    {t.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Onay numarası */}
        <div className="mp-reveal mt-12 pt-8 border-t border-border/60 text-center max-w-[640px] mx-auto">
          <p className="text-[15px] font-bold text-foreground mb-1">
            .ki Change — Takviye Edici Gıda
          </p>
          <p className="text-[14px] text-muted-foreground">
            Sağlık Bakanlığı onaylı formül
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
