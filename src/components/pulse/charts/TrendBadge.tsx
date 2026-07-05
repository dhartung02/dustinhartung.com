import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type TrendBadgeProps = {
  deltaPct: number;
  invert?: boolean;
  className?: string;
};

export default function TrendBadge({ deltaPct, invert = false, className = "" }: TrendBadgeProps) {
  const isFlat = Math.abs(deltaPct) < 1;
  const isUp = deltaPct > 0;
  const isGood = isFlat ? null : invert ? !isUp : isUp;

  const Icon = isFlat ? Minus : isUp ? TrendingUp : TrendingDown;
  const color = isFlat ? "#94a3b8" : isGood ? "#34d399" : "#f87171";

  return (
    <span className={`inline-flex items-center gap-0.5 text-[9px] font-medium ${className}`} style={{ color }}>
      <Icon aria-hidden="true" className="h-2.5 w-2.5 shrink-0" />
      {isFlat ? "flat" : `${isUp ? "+" : ""}${deltaPct}%`}
    </span>
  );
}
