import { ShieldCheck, Globe2, Truck, Lock } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Genuine Products" },
  { icon: Globe2, label: "Worldwide Shipping" },
  { icon: Truck, label: "Fast 5–7 Day Delivery" },
  { icon: Lock, label: "Discreet Packaging" },
];

export function TrustBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        "grid grid-cols-2 gap-3 sm:grid-cols-4 " +
        (compact ? "text-xs" : "text-sm")
      }
    >
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2.5"
        >
          <Icon size={compact ? 16 : 18} className="text-primary" />
          <span className="font-medium tracking-tight">{label}</span>
        </div>
      ))}
    </div>
  );
}
