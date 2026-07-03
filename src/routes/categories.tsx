import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, CATEGORY_IMAGES, CATEGORY_BLURBS, byCategory } from "@/data/products";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Dermora" },
      { name: "description", content: "Shop by skincare concern: retinoids, lightening, acne, hair growth and more." },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-medium tracking-tight md:text-5xl">Categories</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a concern. Every category is curated with clinical-grade formulations only.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/category/$slug"
            params={{ slug: c.slug }}
            className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-shadow hover:shadow-[0_10px_40px_-20px_rgba(15,80,70,0.3)]"
          >
            <div className="aspect-[5/4] overflow-hidden bg-secondary/40">
              <img
                src={CATEGORY_IMAGES[c.slug]}
                alt={c.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-start justify-between gap-3 p-5">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">{c.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{CATEGORY_BLURBS[c.slug]}</p>
              </div>
              <span className="whitespace-nowrap rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                {byCategory(c.slug).length} items
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
