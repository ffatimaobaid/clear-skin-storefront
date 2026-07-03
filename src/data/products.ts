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

const PRODUCT_IMAGES: Record<string, string> = {
  "10-minoxidil-hair-growth-solution-60ml": "webp",
  "20-azelaic-acid-cream-30g-azelderm": "png",
  "20-vitamin-c-vitamin-e-ferulic-acid-serum-30ml-no-box": "jpg",
  "25-hydrogen-peroxide-professional-teeth-whitening-kit": "jpg",
  "3d-face-lift-anti-aging-serum-30ml": "jpg",
  "4-in-1-anti-aging-firming-lifting-serum-30-ml": "jpg",
  "42-urea-cream-salicylic-acid-2-jojoba-oil-aloe-vera-hyaluronic-acid-shea-butter-camellia-seed-oil-100g-no-box": "webp",
  "a-ret-tretinoin-gel-0-025-retin-a-gel-20g": "webp",
  "a-ret-tretinoin-gel-0-05": "webp",
  "acne-scar-removal-stretch-mark-removal-ointment-gel-30g": "jpg",
  "acnelyse-tretinoin-cream-0-1-20g": "webp",
  "adapalene-0-1-gel-15g": "webp",
  "azelaic-acid-cream-20-15g-new-stock": "png",
  "azelaic-acid-cream-20-15g": "png",
  "azelaic-acid-gel-20-20g-azelax": "jpeg",
  "aziderm-azelaic-acid-gel-20-15g": "jpg",
  "biluma-cream-melasma-pigmentation-skin-lightening-acne-scarring-15g": "jpg",
  "blinq-i-lash-3ml-serum": "jpg",
  "careprost-eyelash-growth-serum-drops-1-bottle-3ml-2-months-supply": "jpeg",
  "careprost-eyelash-growth-serum-drops-3-bottles-3ml-6-months-supply": "jpg",
  "demelan-cream-20g": "jpg",
  "eyebliss-under-eye-cream-vitamin-c-20-face-serum-15g": "jpg",
  "hydroquinone-cream-4-melalite-forte-30g": "png",
  "instafil-gel-instant-wrinkle-filler-perfect-primer-15ml-no-box-x2": "webp",
  "kojic-acid-glutamine-brightening-lightening-soap-bar-150g": "webp",
  "kozicare-skin-lightening-cream-with-spf30-15g": "webp",
  "kozimax-skin-lightening-cream-15g": "jpg",
  "lipidz-rapid-barrier-repair-cream-50ml-no-box": "jpg",
  "lumigan-bimatoprost-lash-enhancer-3ml": "png",
  "melacare-hydroquinone-tretinoin-mometasone-furoate-cream-25gm": "webp",
  "melano-tx-tranexamic-acid-cream-15g": "png",
  "my-tret-tretinoin-microsphere-gel-0-1-15g": "webp",
  "perfect-pout-lip-plump-gloss-10ml": "jpg",
  "rapid-hair-growth-hair-loss-caffeine-shampoo-energizer-100ml": "webp",
  "reti-k-premium-pure-micro-capsulized-retinol-anti-aging-cream-30g": "jpg",
  "skin-light-hydroquinone-tretinoin-mometasone-furoate-25g": "jpg",
  "tazorac-cream-tazarotene-cream-0-1": "png",
  "tretimaxx-0-1-tretinoin-cream-20g": "webp",
  "tretin-tretinoin-cream-0-05-large-30g": "webp",
  "tretinoin-0-025-tretiheal-cream-20g": "webp",
  "tretinoin-0-05-tretiheal-cream-20g": "webp",
  "tretinoin-0-1-cream-20g": "webp",
  "tretinoin-0-1-microsphere-20g": "webp",
  "tretinoin-cream-0-025-large-30g-tretin": "jpeg",
  "tretinoin-gel-0-1-20g-alt-batch": "jpg",
  "tretinoin-gel-0-1-20g": "jpg",
  "tri-luma-cream": "jpg",
  "v34-effective-violet-colour-corrector-teeth-whitening-toothpaste-30ml": "jpg",
  "vitamin-c-cleanser-facial-soap-free-70ml": "jpg",
  "wrinkle-blur-under-eye-bag-removal-makeup-primer-30ml": "jpg",
  "xtralight-tretinoin-0-05-azelaic-acid-10-cream-15g": "jpg",
  "z-block-sunscreen-anti-aging-spf-50-water-based-gel-50ml": "jpg",
};

export function productImage(p: Product): string {
  if (PRODUCT_IMAGES[p.id]) {
    return `/images/products/${p.id}.${PRODUCT_IMAGES[p.id]}`;
  }
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
