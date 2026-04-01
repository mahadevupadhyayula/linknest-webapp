import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchTargetById } from '@/lib/dashboard';

export default function TargetDetailPage() {
  const router = useRouter();
  const targetId = router.query.id;

  const targetQuery = useQuery({
    queryKey: ['target', targetId],
    queryFn: () => fetchTargetById(targetId),
    enabled: Boolean(targetId),
  });

  if (!router.isReady || !targetId || targetQuery.isLoading) {
    return <main className="mx-auto mt-16 max-w-4xl px-6">Loading target profile…</main>;
  }

  if (targetQuery.isError || !targetQuery.data) {
    return (
      <main className="mx-auto mt-16 max-w-4xl px-6">
        <p>Could not load target profile.</p>
        <Link href="/dashboard" className="mt-3 inline-block text-indigo-700 hover:text-indigo-500">
          Back to dashboard
        </Link>
      </main>
    );
  }

  const target = targetQuery.data;

  return (
    <main className="mx-auto my-10 max-w-5xl px-6 pb-12">
      <Link href="/dashboard" className="text-sm font-medium text-indigo-700 hover:text-indigo-500">
        ← Back to dashboard
      </Link>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">{target.name}</h1>
        <p className="mt-2 text-slate-600">
          {target.title} • {target.company}
        </p>
        <p className="mt-4 text-slate-700">{target.fit}</p>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Engagement Timeline</h2>
          <ul className="mt-4 space-y-3">
            {target.timeline.map((entry) => (
              <li key={entry.id} className="rounded-lg bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">{entry.date}</p>
                <p className="mt-1 text-sm text-slate-700">{entry.event}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">AI Suggestion Panel</h2>
          <p className="mt-4 rounded-lg bg-indigo-50 px-4 py-3 text-slate-700">{target.aiSuggestion}</p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Manual Logging</h3>
          <form className="mt-3 space-y-3">
            <input
              type="text"
              placeholder="Activity title"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
            <textarea
              rows={4}
              placeholder="Add notes or context"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Save log entry
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
