import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { TrustBadges } from "./TrustBadges";
import logoImg from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-10">
          <TrustBadges compact />
        </div>
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center">
              <img src={logoImg} alt="BuyTretinoin" className="h-9 w-auto object-contain" />
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Clinical-grade skincare shipped worldwide. Genuine products, discreet delivery, honest pricing.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex max-w-sm items-center gap-2 rounded-full border border-border bg-background p-1 pl-4"
            >
              <Mail size={15} className="text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="Your email for 10% off"
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                Join
              </button>
            </form>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold tracking-tight">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-primary">All products</Link></li>
              <li><Link to="/categories" className="hover:text-primary">Categories</Link></li>
              <li><Link to="/about" className="hover:text-primary">About & FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold tracking-tight">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@buytretinoin.com</li>
              <li>Mon–Fri, 9am–6pm GMT</li>
              <li className="flex items-center gap-3 pt-1">
                <a href="#" aria-label="Instagram" className="hover:text-primary"><Instagram size={16} /></a>
                <a href="#" aria-label="Facebook" className="hover:text-primary"><Facebook size={16} /></a>
                <a href="#" aria-label="Twitter" className="hover:text-primary"><Twitter size={16} /></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} BuyTretinoin. All rights reserved.</span>
          <span>Prices in GBP. Shipping calculated at checkout.</span>
        </div>
      </div>
    </footer>
  );
}
