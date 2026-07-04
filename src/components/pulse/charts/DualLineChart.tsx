export type LineSeries = { label: string; color: string; data: number[] };

type DualLineChartProps = {
  series: LineSeries[];
  className?: string;
};

export default function DualLineChart({ series, className = "h-20 w-full" }: DualLineChartProps) {
  const allValues = series.reduce<number[]>((acc, item) => acc.concat(item.data), []);
  const max = Math.max(...allValues);
  const min = Math.min(...allValues);
  const range = max - min || 1;
  const length = series[0]?.data.length ?? 0;

  const toPoints = (data: number[]) =>
    data
      .map((value, index) => {
        const x = length > 1 ? (index / (length - 1)) * 100 : 0;
        const y = 100 - ((value - min) / range) * 100;
        return `${x},${y}`;
      })
      .join(" ");

  return (
    <div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden="true">
        {series.map((item) => (
          <polyline
            key={item.label}
            points={toPoints(item.data)}
            fill="none"
            stroke={item.color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <div className="mt-2 flex items-center gap-3">
        {series.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5 text-[9px] text-slate-400">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
