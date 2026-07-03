import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — BuyTretinoin" },
      { name: "description", content: "Browse all skincare, retinoids, hair growth and dermatology treatments." },
    ],
  }),
  component: Shop,
});

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

function Shop() {
  const [cat, setCat] = useState<string | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");

  const filtered = useMemo(() => {
    let list = cat === "all" ? [...products] : products.filter((p) => p.categorySlug === cat);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8">
        <h1 className="text-4xl font-medium tracking-tight md:text-5xl">Shop all</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {products.length} clinical formulations, curated by concern.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
          <FilterPill active={cat === "all"} onClick={() => setCat("all")}>All</FilterPill>
          {categories.map((c) => (
            <FilterPill key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
              {c.name}
            </FilterPill>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="h-10 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center text-sm text-muted-foreground">
          Nothing in this filter yet. <Link to="/shop" className="text-primary underline">Reset</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-colors " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-secondary")
      }
    >
      {children}
    </button>
  );
}
