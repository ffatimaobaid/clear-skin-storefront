import { Star } from "lucide-react";

export function StarRating({ value, reviews, size = 14 }: { value: number; reviews?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <Star size={size} className="fill-amber-400 stroke-amber-400" />
      <span className="font-medium text-foreground">{value.toFixed(1)}</span>
      {reviews !== undefined && <span>({reviews})</span>}
    </div>
  );
}
