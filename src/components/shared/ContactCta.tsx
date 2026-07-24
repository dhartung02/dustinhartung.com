import Link from "next/link";

export default function ContactCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Let’s talk
          </p>
          <p className="mt-3 text-xl font-semibold">
            Reach out directly, or see the work behind it.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:Dustin.Hartung@gmail.com"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950"
          >
            Contact Me
          </a>
          <a
            href="https://www.linkedin.com/in/dustinhartung"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white"
          >
            LinkedIn
          </a>
          <Link
            href="/work"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white"
          >
            View Work
          </Link>
        </div>
      </div>
    </section>
  );
}
