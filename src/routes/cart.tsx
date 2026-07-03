import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { productImage } from "@/data/products";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — BuyTretinoin" }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal } = useCart();

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center md:px-6">
        <h1 className="text-3xl font-medium tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Start with a bestseller — most customers see results in 6–8 weeks.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Browse shop <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="mb-8 text-4xl font-medium tracking-tight md:text-5xl">Your cart</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card">
          {detailed.map(({ product, qty, lineTotal }) => (
            <div key={product.id} className="flex gap-4 p-4 md:p-5">
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary/40 md:h-28 md:w-28"
              >
                <img
                  src={productImage(product)}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to="/product/$id" params={{ id: product.id }} className="text-sm font-medium tracking-tight hover:text-primary md:text-base">
                      {product.name}
                    </Link>
                    <div className="mt-0.5 text-xs text-muted-foreground">{product.category}</div>
                  </div>
                  <div className="text-sm font-semibold">£{lineTotal.toFixed(2)}</div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-border bg-background">
                    <button
                      onClick={() => setQty(product.id, qty - 1)}
                      className="grid h-9 w-9 place-items-center text-muted-foreground hover:text-primary"
                      aria-label="Decrease"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-7 text-center text-xs font-medium">{qty}</span>
                    <button
                      onClick={() => setQty(product.id, qty + 1)}
                      className="grid h-9 w-9 place-items-center text-muted-foreground hover:text-primary"
                      aria-label="Increase"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(product.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="text-lg font-semibold tracking-tight">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">£{subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium">Calculated at checkout</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-border/60 pt-4 text-base font-semibold">
            <span>Total</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Checkout <ArrowRight size={16} />
          </Link>
          <Link to="/shop" className="mt-3 block text-center text-xs text-muted-foreground hover:text-primary">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
