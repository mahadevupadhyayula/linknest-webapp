const steps = [
  {
    step: '1',
    title: 'Define Campaign Goals',
    detail: 'Set campaign objectives and audience criteria to establish strategic direction.',
  },
  {
    step: '2',
    title: 'Draft with AI Guidance',
    detail: 'Use Smart Drafter to quickly produce personalized outreach aligned to your goals.',
  },
  {
    step: '3',
    title: 'Track and Optimize',
    detail: 'Analyze engagement trends and refine campaigns based on actionable performance signals.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How It Works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((item) => (
            <article key={item.step} className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-indigo-600">Step {item.step}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
