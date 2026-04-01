import Hero from '@/components/landing/Hero';
import Problem from '@/components/landing/Problem';
import Solution from '@/components/landing/Solution';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
