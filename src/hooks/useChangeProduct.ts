import { useQuery } from "@tanstack/react-query";
import { fetchProductByHandle, type ShopifyProduct, CHANGE_PRODUCT_HANDLE } from "@/lib/shopify";

export function useChangeProduct() {
  return useQuery<ShopifyProduct | null>({
    queryKey: ["shopify", "product", CHANGE_PRODUCT_HANDLE],
    queryFn: () => fetchProductByHandle(CHANGE_PRODUCT_HANDLE),
    staleTime: 5 * 60 * 1000,
  });
}
