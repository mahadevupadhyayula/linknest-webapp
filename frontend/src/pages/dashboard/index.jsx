import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '@/lib/dashboard';

function TargetLink({ target }) {
  return (
    <Link href={`/dashboard/target/${target.id}`} className="font-medium text-indigo-700 hover:text-indigo-500">
      {target.name}
    </Link>
  );
}

export default function DashboardIndexPage() {
  const dashboardQuery = useQuery({ queryKey: ['dashboard'], queryFn: fetchDashboardData });

  if (dashboardQuery.isLoading) {
    return <main className="mx-auto mt-16 max-w-6xl px-6">Loading dashboard…</main>;
  }

  if (dashboardQuery.isError) {
    return <main className="mx-auto mt-16 max-w-6xl px-6">Unable to load dashboard data.</main>;
  }

  const { priorityActions, pipeline, newTargetSuggestions, suggestedDrafts, targets } = dashboardQuery.data;

  return (
    <main className="mx-auto my-10 max-w-6xl px-6 pb-12">
      <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Priority Actions</h2>
        <ul className="mt-4 space-y-3">
          {priorityActions.map((item) => {
            const linkedTarget = targets.find((target) => target.id === item.targetId);
            return (
              <li key={item.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <p className="text-slate-700">
                  {item.action} for <TargetLink target={linkedTarget} />
                </p>
                <span className="text-sm text-slate-500">{item.due}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Target Pipeline (Hot/Warm/Cold)</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { key: 'hot', label: 'Hot', color: 'bg-red-50 text-red-700' },
            { key: 'warm', label: 'Warm', color: 'bg-amber-50 text-amber-700' },
            { key: 'cold', label: 'Cold', color: 'bg-blue-50 text-blue-700' },
          ].map((column) => (
            <div key={column.key} className="rounded-xl border border-slate-100 p-4">
              <p className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${column.color}`}>
                {column.label}
              </p>
              <ul className="mt-3 space-y-2">
                {pipeline[column.key].map((target) => (
                  <li key={target.id} className="text-sm text-slate-700">
                    <TargetLink target={target} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">New Target Suggestions</h2>
          <ul className="mt-4 space-y-3">
            {newTargetSuggestions.map((item) => (
              <li key={item.id} className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <p className="font-medium text-slate-900">{item.name}</p>
                <p>{item.reason}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{item.stage}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Suggested Drafts</h2>
          <ul className="mt-4 space-y-3">
            {suggestedDrafts.map((draft) => {
              const linkedTarget = targets.find((target) => target.id === draft.targetId);
              return (
                <li key={draft.id} className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-900">{draft.title}</p>
                  <p>
                    For <TargetLink target={linkedTarget} />
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
