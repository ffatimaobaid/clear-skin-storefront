import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { byCategory, getCategory, CATEGORY_BLURBS } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.cat.name ?? "Category";
    return {
      meta: [
        { title: `${name} — BuyTretinoin` },
        { name: "description", content: `Shop ${name.toLowerCase()} at BuyTretinoin — clinical-grade formulations.` },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md py-24 text-center">
      <h1 className="text-2xl font-semibold">Category not found</h1>
      <Link to="/categories" className="mt-4 inline-block text-sm text-primary underline">
        Back to categories
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-md py-24 text-center">
      <h1 className="text-2xl font-semibold">Couldn't load this category</h1>
      <button onClick={reset} className="mt-4 text-sm text-primary underline">
        Retry
      </button>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const items = byCategory(cat.slug);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link to="/categories" className="hover:text-primary">Categories</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{cat.name}</span>
      </nav>
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-medium tracking-tight md:text-5xl">{cat.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{CATEGORY_BLURBS[cat.slug]}</p>
      </header>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
