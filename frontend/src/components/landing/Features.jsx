const features = [
  {
    title: 'Target Manager',
    description: 'Organize audiences, segment contacts, and prioritize opportunities from one central workspace.',
  },
  {
    title: 'Smart Drafter',
    description: 'Generate tailored message drafts with AI guidance that matches your goals and brand tone.',
  },
  {
    title: 'Engagement Tracker',
    description: 'Monitor replies, click-throughs, and activity trends to identify what is resonating quickly.',
  },
  {
    title: 'Goal-Driven Context',
    description: 'Anchor every campaign to measurable outcomes so each action supports clear business objectives.',
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Features Built for Results</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
