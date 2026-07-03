import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { bestsellers, categories, CATEGORY_IMAGES, CATEGORY_BLURBS } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { TrustBadges } from "@/components/site/TrustBadges";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-10 md:grid-cols-2 md:items-center md:gap-16 md:px-6 md:pb-20 md:pt-16">
          <div>
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              Clinical skincare
            </span>
            <h1 className="mt-5 text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              Prescription-grade skin,<br />
              <span className="italic text-primary">without the prescription.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              Genuine tretinoin, retinoids and dermatology-formulated treatments.
              Shipped worldwide in 5–7 days, discreetly.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Shop all products <ArrowRight size={16} />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Browse categories
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-secondary/60 blur-2xl" />
            <img
              src={heroImg}
              alt="Curated clinical skincare bottles and jars"
              width={1600}
              height={1024}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_20px_60px_-30px_rgba(15,80,70,0.35)]"
            />
          </div>
        </div>
      </section>

      {/* Trust row */}
      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <TrustBadges compact />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Shop by category</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Every formulation curated by concern — from renewal to lightening to lash growth.
            </p>
          </div>
          <Link to="/categories" className="hidden text-sm font-medium text-primary hover:underline md:block">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-card"
            >
              <div className="aspect-[4/5] overflow-hidden bg-secondary/40">
                <img
                  src={CATEGORY_IMAGES[c.slug]}
                  alt={c.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold tracking-tight md:text-base">{c.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {CATEGORY_BLURBS[c.slug]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Bestsellers</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The formulations customers keep coming back to.
            </p>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-primary hover:underline md:block">
            Shop all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {bestsellers.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promise strip */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="rounded-2xl bg-primary px-8 py-14 text-primary-foreground md:px-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
              The Dermora promise
            </h2>
            <p className="mt-3 text-sm opacity-90 md:text-base">
              Every product is sourced direct, sealed, and shipped from our dispensary in
              tamper-evident packaging. If it doesn't arrive as described, we replace it — no forms,
              no fuss.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
            >
              How we ship <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
