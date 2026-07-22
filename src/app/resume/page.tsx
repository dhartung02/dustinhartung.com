import type { Metadata } from "next";
import { resumeStats, resumeIntro, resumeExperience } from "@/components/resume/content";

export const metadata: Metadata = {
  title: "Resume — Dustin Hartung",
  description: "Dustin Hartung's product leadership experience.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
          Resume
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
          My Resume
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 border-y border-white/10 py-10 sm:grid-cols-3">
          {resumeStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-semibold text-cyan-300">{stat.value}</p>
              <p className="mt-2 text-sm font-semibold text-white">{stat.label}</p>
              <p className="mt-1 text-sm text-neutral-400">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-12 md:grid-cols-[minmax(0,320px)_1fr]">
          <div>
            <h2 className="text-2xl font-semibold">My Experience</h2>
            <div className="mt-4 flex flex-col gap-4">
              {resumeIntro.map((paragraph, i) => (
                <p key={i} className="leading-7 text-neutral-400">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col gap-12 border-l border-white/10 pl-8">
            {resumeExperience.map((role) => (
              <div key={`${role.company}-${role.period}`} className="relative">
                <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <p className="text-sm font-medium text-neutral-500">{role.period}</p>
                <h3 className="mt-1 text-2xl font-semibold">{role.company}</h3>
                <p className="mt-1 inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
                  {role.title}
                </p>
                <p className="mt-4 leading-7 text-neutral-400">{role.summary}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 leading-7 text-neutral-300">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
