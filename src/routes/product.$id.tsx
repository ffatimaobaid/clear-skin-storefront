import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, productImage, byCategory } from "@/data/products";
import { StarRating } from "@/components/site/StarRating";
import { TrustBadges } from "@/components/site/TrustBadges";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product — Dermora" }] };
    return {
      meta: [
        { title: `${p.name} — Dermora` },
        { name: "description", content: p.description },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md py-24 text-center">
      <h1 className="text-2xl font-semibold">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline">
        Back to shop
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-md py-24 text-center">
      <h1 className="text-2xl font-semibold">Couldn't load this product</h1>
      <button onClick={reset} className="mt-4 text-sm text-primary underline">Retry</button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const related = byCategory(product.categorySlug).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <span className="mx-2">/</span>
        <Link to="/category/$slug" params={{ slug: product.categorySlug }} className="hover:text-primary">
          {product.category}
        </Link>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-secondary/40">
          <img
            src={productImage(product)}
            alt={product.name}
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <span className="inline-block rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-secondary-foreground">
            {product.category}
          </span>
          <h1 className="mt-4 text-3xl font-medium leading-tight tracking-tight md:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3">
            <StarRating value={product.rating} reviews={product.reviews} size={16} />
          </div>
          <div className="mt-6 text-3xl font-semibold tracking-tight">£{product.price.toFixed(2)}</div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8 flex items-stretch gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-background">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center text-muted-foreground hover:text-primary"
                aria-label="Decrease"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-11 w-11 place-items-center text-muted-foreground hover:text-primary"
                aria-label="Increase"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={() => {
                add(product.id, qty);
                toast.success("Added to cart", { description: `${qty} × ${product.name}` });
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ShoppingBag size={16} /> Add to cart
            </button>
          </div>

          {product.prescription && (
            <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              Prescription-only in some regions. We'll confirm eligibility before dispatch.
            </p>
          )}

          <div className="mt-10">
            <TrustBadges compact />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-medium tracking-tight">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
