import { Link } from "@tanstack/react-router";
import { productImage, type Product } from "@/data/products";
import { StarRating } from "./StarRating";
import { useCart } from "@/lib/cart";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card transition-all hover:shadow-[0_6px_30px_-15px_rgba(15,80,70,0.25)]">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-secondary/40"
      >
        <img
          src={productImage(product)}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary">
          {product.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="line-clamp-2 min-h-[2.75rem] text-sm font-medium leading-snug tracking-tight text-foreground hover:text-primary"
        >
          {product.name}
        </Link>
        <StarRating value={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-semibold tracking-tight">£{product.price.toFixed(2)}</span>
          <button
            onClick={() => {
              add(product.id);
              toast.success("Added to cart", { description: product.name });
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={13} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
