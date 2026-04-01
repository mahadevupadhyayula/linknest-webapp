import Link from 'next/link';

const ctaClassName =
  'inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';

export default function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
        LinkNest Landing
      </p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
        Build smarter outreach strategies with AI-powered planning.
      </h1>
      <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
        LinkNest helps teams define goals, draft content, and track engagement in one streamlined workflow.
      </p>
      <Link href="/signup" className={ctaClassName}>
        Start for Free
      </Link>
    </section>
  );
}

export { ctaClassName };
