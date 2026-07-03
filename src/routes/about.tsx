import { createFileRoute, Link } from "@tanstack/react-router";
import { TrustBadges } from "@/components/site/TrustBadges";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & FAQ — BuyTretinoin" },
      { name: "description", content: "About BuyTretinoin, shipping, delivery times and frequently asked questions." },
    ],
  }),
  component: About,
});

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Every order ships within 24 hours of payment. Standard delivery is 5–7 working days worldwide, tracked and discreetly packaged.",
  },
  {
    q: "Are your products genuine?",
    a: "Yes. We source direct and dispatch sealed, tamper-evident packaging. Batch numbers and expiry dates are always visible.",
  },
  {
    q: "How do I pay?",
    a: "After placing an order we send a secure payment link via WhatsApp. You pay only once you're happy with the order summary.",
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes — we ship to most countries. If your address needs additional customs documentation we'll let you know before dispatch.",
  },
  {
    q: "What if my order arrives damaged?",
    a: "Reply to your order WhatsApp with a photo and we'll ship a replacement free of charge. No forms, no delays.",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
      <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
        About BuyTretinoin
      </span>
      <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight md:text-5xl">
        Clinical skincare, delivered honestly.
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">
        BuyTretinoin is a curated dispensary for genuine tretinoin, retinoids and dermatology-formulated
        treatments. We stock only what we'd use ourselves, ship worldwide in 5–7 days, and answer
        every message personally.
      </p>

      <div className="mt-10">
        <TrustBadges />
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Frequently asked</h2>
        <div className="mt-6 divide-y divide-border/60 rounded-2xl border border-border/60 bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium tracking-tight">
                {f.q}
                <span className="text-lg leading-none text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
        <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Still have a question?</h2>
        <p className="mt-2 text-sm opacity-90">
          Message us on WhatsApp or email hello@buytretinoin.com. We reply within a few hours, 9am–6pm GMT.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-background/90"
        >
          Start shopping
        </Link>
      </section>
    </div>
  );
}
