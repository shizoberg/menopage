import { useReveal } from "@/hooks/useReveal";
import { useChangeProduct } from "@/hooks/useChangeProduct";
import TrustBar from "@/components/TrustBar";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import IngredientsSection from "@/components/IngredientsSection";
import ReviewsSection from "@/components/ReviewsSection";
import ProductSection from "@/components/ProductSection";
import StickyATC from "@/components/StickyATC";

const Index = () => {
  useReveal();
  const { data: product, isLoading } = useChangeProduct();

  return (
    <div className="pb-[88px]">
      <TrustBar />
      <div id="heroSection">
        <HeroSection product={product} />
      </div>
      <BenefitsSection />
      <IngredientsSection />
      <ProductSection product={product} isLoading={isLoading} />
      <ReviewsSection />
      <StickyATC product={product} isLoading={isLoading} />
    </div>
  );
};

export default Index;
