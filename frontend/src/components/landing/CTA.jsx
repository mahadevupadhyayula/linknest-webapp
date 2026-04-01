import Link from 'next/link';
import { ctaClassName } from './Hero';

export default function CTA() {
  return (
    <section className="bg-indigo-600 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to launch better outreach?</h2>
          <p className="mt-2 text-indigo-100">Join LinkNest and turn strategy into measurable engagement.</p>
        </div>
        <Link href="/signup" className={`${ctaClassName} bg-white text-indigo-700 hover:bg-indigo-50`}>
          Create Your Account
        </Link>
      </div>
    </section>
  );
}
