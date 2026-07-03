import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — BuyTretinoin" }] }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
  address: z.string().trim().min(4).max(300),
  city: z.string().trim().min(2).max(80),
  postcode: z.string().trim().min(2).max(20),
  country: z.string().trim().min(2).max(80),
});

function Checkout() {
  const { detailed, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState<null | { orderId: string; name: string }>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema>, string>>>({});

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center md:px-6">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 size={28} />
        </div>
        <h1 className="mt-6 text-3xl font-medium tracking-tight md:text-4xl">
          Order received, {placed.name.split(" ")[0]}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Order reference <span className="font-medium text-foreground">{placed.orderId}</span>.
        </p>
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-left">
          <MessageCircle className="mt-0.5 shrink-0 text-primary" size={20} />
          <p className="text-sm text-foreground">
            We'll send you a secure payment link via WhatsApp to complete payment. Once paid,
            your order ships within 24 hours and arrives in 5–7 days.
          </p>
        </div>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to home
        </Link>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center md:px-6">
        <h1 className="text-3xl font-medium tracking-tight">Nothing to check out</h1>
        <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline">
          Browse the shop
        </Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof z.infer<typeof schema>;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    const orderId = "DMR-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setPlaced({ orderId, name: parsed.data.name });
    clear();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="mb-8 text-4xl font-medium tracking-tight md:text-5xl">Checkout</h1>
      <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <Section title="Contact">
            <Field name="name" label="Full name" placeholder="Jane Doe" error={errors.name} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field name="email" label="Email" type="email" placeholder="you@example.com" error={errors.email} />
              <Field name="phone" label="WhatsApp / Phone" placeholder="+44 7…" error={errors.phone} />
            </div>
          </Section>
          <Section title="Shipping address">
            <Field name="address" label="Street address" placeholder="123 Skincare Lane" error={errors.address} />
            <div className="grid gap-4 md:grid-cols-3">
              <Field name="city" label="City" placeholder="London" error={errors.city} />
              <Field name="postcode" label="Postcode" placeholder="SW1A 1AA" error={errors.postcode} />
              <Field name="country" label="Country" placeholder="United Kingdom" error={errors.country} />
            </div>
          </Section>
        </div>

        <aside className="h-fit rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="text-lg font-semibold tracking-tight">Order summary</h2>
          <ul className="mt-4 divide-y divide-border/60 text-sm">
            {detailed.map(({ product, qty, lineTotal }) => (
              <li key={product.id} className="flex items-start justify-between gap-3 py-3">
                <span className="flex-1">
                  <span className="line-clamp-2 font-medium">{product.name}</span>
                  <span className="text-xs text-muted-foreground">× {qty}</span>
                </span>
                <span className="whitespace-nowrap font-medium">£{lineTotal.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-border/60 pt-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>Confirmed on payment</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-border/60 pt-3 text-base font-semibold">
              <span>Total</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Complete order
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
            We'll send you a secure payment link via WhatsApp to complete payment.
          </p>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  error,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={
          "h-11 w-full rounded-lg border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary " +
          (error ? "border-destructive" : "border-border")
        }
        required
      />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
