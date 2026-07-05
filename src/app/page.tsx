import Link from "next/link";
import { ArrowRight } from "lucide-react";

type WorkItem = {
  title: string;
  tag: string;
  text: string;
  href?: string;
  highlights?: string[];
};

const work: WorkItem[] = [
  {
    title: "Executive Companion Pulse",
    tag: "0→1 production mobile app",
    text: "Conceived, designed, and built a 0→1 executive mobile companion that turned platform and product telemetry into a fast, trusted operating view for executives.",
    href: "/work/executive-companion-pulse",
    highlights: [
      "AI-assisted development",
      "React Native + TypeScript + Okta",
      "LaunchDarkly feature flags + DataDog observability",
      "Product strategy, UX, architecture, and delivery",
      "Grew from an innovation project into an executive-sponsored initiative",
    ],
  },
  {
    title: "Product Catalog",
    tag: "$1.1M+ influenced ARR",
    text: "Led 0→1 strategy for a retail product intelligence capability that became a competitive differentiator across enterprise opportunities.",
    href: "/work/product-catalog",
    highlights: [
      "React + TypeScript + GraphQL",
      "Category-drilldown and analytics-panel interaction model",
      "Product strategy, UX, and delivery",
      "Cited as a differentiator across enterprise sales opportunities",
    ],
  },
  {
    title: "AI Product Operating System",
    tag: "Weeks → days",
    text: "Built an AI-native PM workflow across PRDs, research, roadmap planning, Jira handoffs, release notes, and product knowledge management.",
  },
  {
    title: "Reqon",
    tag: "AI job search CRM",
    text: "Personal product build combining job pipeline management, scout search, AI fit analysis, resume tailoring, autofill, and career intelligence.",
  },
  {
    title: "AI Investment Manager",
    tag: "Explainable AI system",
    text: "Personal product build focused on AI-generated portfolio briefings, evidence-backed recommendations, risk controls, and human review.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
          AI-Native Product Leader
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          Dustin Hartung
        </h1>

        <p className="mt-6 max-w-3xl text-2xl text-neutral-300 md:text-3xl">
          Principal Product Manager building AI-native enterprise products where
          strategy meets execution.
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-400">
          21 years building enterprise SaaS, AI-enabled platforms, customer data
          products, and production software — with a rare blend of product
          strategy, technical fluency, and hands-on AI prototyping.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="mailto:Dustin.Hartung@gmail.com"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950"
          >
            Contact Me
          </a>
          <a
            href="https://github.com/dhartung02"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/dustinhartung"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white"
          >
            LinkedIn
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
              Featured Work
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Products I’ve led and built
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {work.map((item) => {
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
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Current Focus
          </p>
          <h2 className="mt-4 text-3xl font-semibold">
            Building the next generation of AI application experiences
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-neutral-300">
            I’m especially interested in AI products that help users move from intent
            to working software faster — through better templates, workflow
            orchestration, product quality, and rapid iteration.
          </p>
        </div>
      </section>
    </main>
  );
}
