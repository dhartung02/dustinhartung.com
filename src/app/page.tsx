import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WorkGrid from "@/components/work/WorkGrid";
import { work } from "@/lib/work";

export default function Home() {
  const featured = work.slice(0, 3);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
              AI-Native Product Leader
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
              Dustin Hartung
            </h1>

            <p className="mt-6 max-w-3xl text-2xl text-neutral-300 md:text-3xl">
              A Principal/Director-level product leader who combines enterprise
              product strategy, commercial ownership, technical depth, and
              unusually hands-on AI execution.
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-400">
              21 years building enterprise SaaS, customer data platforms,
              AI-enabled workflows, and production software — spanning product
              strategy, technical architecture, commercial ownership, and
              hands-on delivery.
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
          </div>

          <div className="h-40 w-40 shrink-0 overflow-hidden rounded-full border border-white/10 md:h-52 md:w-52">
            <Image
              src="/images/dustin-headshot.png"
              alt="Portrait of Dustin Hartung"
              width={512}
              height={512}
              className="h-full w-full object-cover"
              priority
            />
          </div>
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
          <Link
            href="/work"
            className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-cyan-300"
          >
            View all work
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <WorkGrid items={featured} />
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
