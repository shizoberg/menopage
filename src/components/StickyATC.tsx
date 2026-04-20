import { useEffect, useState } from "react";
import { Loader2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

interface StickyATCProps {
  product: ShopifyProduct | null | undefined;
  isLoading?: boolean;
}

const StickyATC = ({ product, isLoading }: StickyATCProps) => {
  const [visible, setVisible] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    const hero = document.querySelector("#heroSection");
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const variant = product?.node.variants.edges[0]?.node;
  const priceLabel = variant
    ? `${variant.price.currencyCode === "TRY" ? "₺" : variant.price.currencyCode}${parseFloat(variant.price.amount).toLocaleString("tr-TR")}`
    : "";

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

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] bg-card border-t border-border py-3 px-4 flex items-center justify-center shadow-[0_-6px_24px_rgba(0,0,0,0.10)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        onClick={handleAdd}
        disabled={!variant || cartLoading || isLoading}
        className="w-full max-w-[460px] flex items-center justify-center gap-2.5 bg-primary text-primary-foreground py-4 px-6 rounded-full min-h-[60px] text-[17px] font-bold transition-all hover:bg-primary-medium disabled:opacity-60"
      >
        {cartLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
        )}
        Sepete Ekle {priceLabel && <span className="opacity-90">— {priceLabel}</span>}
      </button>
    </div>
  );
};

export default StickyATC;
