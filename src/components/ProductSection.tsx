import { useState, useCallback, useRef } from "react";
import { Loader2, ShoppingCart, ShieldCheck, Truck, Stethoscope, Check } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

type PlanId = "single" | "triple";

interface ProductSectionProps {
  product: ShopifyProduct | null | undefined;
  isLoading?: boolean;
}

const ProductSection = ({ product, isLoading }: ProductSectionProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [plan, setPlan] = useState<PlanId>("single");
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  const variant = product?.node.variants.edges[0]?.node;
  const basePrice = variant ? parseFloat(variant.price.amount) : 0;
  const currency = variant?.price.currencyCode === "TRY" ? "₺" : variant?.price.currencyCode || "";

  const plans: Record<PlanId, { price: number; label: string; sub: string; badge?: string; quantity: number }> = {
    single: {
      price: basePrice,
      label: "Tek seferlik satın al",
      sub: "30 günlük kullanım",
      quantity: 1,
    },
    triple: {
      price: Math.round(basePrice * 3 * 0.85),
      label: "3'lü paket & %15 tasarruf",
      sub: "3 aylık kullanım + Eczacı ile 15 dk özel görüşme",
      badge: "EN POPÜLER",
      quantity: 3,
    },
  };
  const active = plans[plan];

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
      quantity: active.quantity,
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

            {/* Plan seçimi */}
            <div className="flex flex-col gap-3 mb-5">
              {(Object.keys(plans) as PlanId[]).map((key) => {
                const p = plans[key];
                const selected = plan === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPlan(key)}
                    className={`relative text-left rounded-2xl border-2 px-4 py-4 transition-all ${
                      selected
                        ? "border-primary bg-primary-soft/60 shadow-md"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute -top-2.5 right-3 bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">
                        {p.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          selected ? "border-primary bg-primary" : "border-border bg-card"
                        }`}
                      >
                        {selected && <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[16px] sm:text-[17px] font-bold text-foreground">{p.label}</span>
                          <span className="text-[18px] sm:text-[20px] font-extrabold text-primary whitespace-nowrap">
                            {currency}
                            {p.price.toLocaleString("tr-TR")}
                          </span>
                        </div>
                        <div className="text-[13px] sm:text-[14px] text-muted-foreground mt-1 leading-snug">{p.sub}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
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
              {plan === "triple" ? "3'lü Paketi Sepete Ekle" : "Sepete Ekle"} — {currency}
              {active.price.toLocaleString("tr-TR")}
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
