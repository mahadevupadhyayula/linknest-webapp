import Link from 'next/link';

export default function ExtensionSetupPage() {
  return (
    <main className="mx-auto mt-12 max-w-3xl px-6 pb-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Browser Extension</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Set up the LinkNest extension</h1>
        <p className="mt-4 text-slate-600">
          Install the extension to capture leads directly from LinkedIn, enrich contact data, and sync notes
          instantly with your dashboard.
        </p>

        <ol className="mt-6 space-y-3 text-slate-700">
          <li className="rounded-lg bg-slate-50 p-3">1. Download the latest extension package.</li>
          <li className="rounded-lg bg-slate-50 p-3">2. Open your browser&apos;s extension manager.</li>
          <li className="rounded-lg bg-slate-50 p-3">3. Enable Developer Mode and load the downloaded package.</li>
          <li className="rounded-lg bg-slate-50 p-3">4. Pin LinkNest and sign in with your account.</li>
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="https://example.com/linknest-extension.zip"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Download extension
          </a>
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Skip for now
          </Link>
        </div>
      </div>
    </main>
  );
}
