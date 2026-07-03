import raw from "../data-products.json";
import treImg from "@/assets/cat-tretinoin.jpg";
import lightImg from "@/assets/cat-lightening.jpg";
import acneImg from "@/assets/cat-acne.jpg";
import hairImg from "@/assets/cat-hair.jpg";
import eyeImg from "@/assets/cat-eye.jpg";
import serumImg from "@/assets/cat-serum.jpg";
import sunImg from "@/assets/cat-sun.jpg";
import teethImg from "@/assets/cat-teeth.jpg";

export const CATEGORY_IMAGES: Record<string, string> = {
  "tretinoin-retinoids": treImg,
  "skin-lightening": lightImg,
  "acne-azelaic-acid": acneImg,
  "hair-growth": hairImg,
  "eye-lash-care": eyeImg,
  "anti-aging-serums": serumImg,
  "sunscreen-cleansers": sunImg,
  "teeth-whitening": teethImg,
};

export const CATEGORY_BLURBS: Record<string, string> = {
  "tretinoin-retinoids": "Clinical retinoids for renewal, texture and clarity.",
  "skin-lightening": "Even tone. Fade melasma, dark spots and post-acne marks.",
  "acne-azelaic-acid": "Calm breakouts, redness and congestion.",
  "hair-growth": "Reactivate follicles and reduce shedding.",
  "eye-lash-care": "Brighter eyes, longer lashes.",
  "anti-aging-serums": "Firming, smoothing and glow-restoring actives.",
  "sunscreen-cleansers": "Daily protection and gentle everyday cleansing.",
  "teeth-whitening": "Salon-quality whitening at home.",
};

export type Product = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  prescription: boolean;
  description: string;
  rating: number;
  reviews: number;
};

export type Category = { name: string; slug: string };

export const categories: Category[] = raw.categories;
export const products: Product[] = raw.products;

export function productImage(p: Product): string {
  return CATEGORY_IMAGES[p.categorySlug];
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function byCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

// Bestsellers: pick top-rated one per category (up to 8)
export const bestsellers: Product[] = categories
  .map((c) =>
    [...byCategory(c.slug)].sort((a, b) => b.rating - a.rating)[0]
  )
  .filter(Boolean);
