import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { WorkItem } from "@/lib/work";

export default function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => {
        const cardBody = (
          <>
            <p className="text-sm font-semibold text-cyan-300">{item.tag}</p>
            <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
            <p className="mt-4 leading-7 text-neutral-400">{item.text}</p>
            {item.highlights ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            ) : null}
            {item.href ? (
              <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                View case study
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </p>
            ) : null}
          </>
        );

        if (item.href) {
          return (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.06]"
            >
              {cardBody}
            </Link>
          );
        }

        return (
          <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            {cardBody}
          </article>
        );
      })}
    </div>
  );
}
