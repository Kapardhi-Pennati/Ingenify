'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Bot, Check, Cpu, Gauge, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { useState, type ComponentType, type ReactNode } from 'react';
import IngenifyLogo from '@/components/IngenifyLogo';
import RequestAccessForm from '@/components/RequestAccessForm';

interface FeatureCard {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  className: string;
}

interface PricingPlan {
  name: string;
  monthly: string;
  yearly: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const trustedBy = [
  'TechCore Systems',
  'Velocity Digital',
  'Guardian Security',
  'Apex Platforms',
  'Nexus Innovation',
  'Sentinel Labs',
];

const features: FeatureCard[] = [
  {
    title: 'Architectural Excellence',
    description:
      'Full-stack mastery with modern architectures (Next.js, TypeScript, Distributed Databases). Component-driven design, real-time data synchronization, and cloud-native deployments built for scalability and modularity.',
    icon: Cpu,
    className: 'lg:col-span-2',
  },
  {
    title: 'Core Web Vitals',
    description: 'Server-side rendering and optimized LCP for lightning-fast performance at scale.',
    icon: Gauge,
    className: 'lg:col-span-1',
  },
  {
    title: 'SEO at the Foundation',
    description: 'Automated schema markup and semantic HTML structures engineered for visibility.',
    icon: Sparkles,
    className: 'lg:col-span-1',
  },
  {
    title: 'Security-by-Design',
    description: 'End-to-end encryption, JWT/OAuth2 authentication, and CSRF/XSS mitigation at every layer.',
    icon: ShieldCheck,
    className: 'lg:col-span-1',
  },
  {
    title: 'The Fortress Standard',
    description: 'Proactive vulnerability patching and rigorous compliance standards protecting business logic and user data.',
    icon: Workflow,
    className: 'lg:col-span-2',
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Foundation',
    monthly: '$2,499/mo',
    yearly: '$1,999/mo',
    description: 'Secure and scalable digital ecosystems for growing teams.',
    features: ['Full-stack architecture setup', 'Core security implementation', 'SEO foundation', 'Technical support'],
  },
  {
    name: 'Enterprise',
    monthly: '$7,999/mo',
    yearly: '$6,499/mo',
    description: 'High-performance platforms with complete visibility and fortress-standard security.',
    features: ['Advanced architecture & scaling', 'Comprehensive SEO engineering', 'Enterprise security suite', 'Dedicated engineers', 'Proactive vulnerability patching'],
    highlighted: true,
  },
  {
    name: 'Partnership',
    monthly: 'Custom',
    yearly: 'Custom',
    description: 'Bespoke solutions for mission-critical digital ecosystems.',
    features: ['Custom architecture design', 'Programmatic SEO + schema markup', 'Fortress Standard certification', 'Dedicated team', '24/7 support + SLA'],
  },
];

function SectionReveal({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function IngenifyLanding() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#050505] text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="aurora-blob absolute -left-16 top-0 h-[26rem] w-[26rem] rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="aurora-blob aurora-blob-delay absolute -right-20 top-20 h-[30rem] w-[30rem] rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.09)_1px,transparent_0)] [background-size:42px_42px]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-500/20 bg-[#050505]/72 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#hero" className="shrink-0">
            <IngenifyLogo />
          </a>
          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#lead-capture" className="transition hover:text-white">
              Request Access
            </a>
          </div>
          <a
            href="#lead-capture"
            className="inline-flex items-center gap-2 rounded-full border border-indigo-300/60 bg-indigo-500/15 px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/25"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-28 sm:pt-36">
        <SectionReveal id="hero" className="scroll-mt-28">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/35 bg-indigo-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-indigo-100">
              <Sparkles className="h-3.5 w-3.5" />
              Elite Engineering Partnership
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Secure, Visible, and Scalable Digital Ecosystems
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Ingenify bridges creative vision and technical fortitude. We engineer high-performance platforms with architectural excellence, SEO at the foundation, and security by design.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#lead-capture"
                className="inline-flex items-center gap-2 rounded-full border border-indigo-300/70 bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(99,102,241,0.35)] transition hover:brightness-110"
              >
                Request Access
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-slate-400/35 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-100/70"
              >
                Explore Platform
              </a>
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-slate-500/20 bg-slate-900/35 p-4">
            <div className="flex animate-[marquee_20s_linear_infinite] gap-3 whitespace-nowrap">
              {[...trustedBy, ...trustedBy].map((brand, index) => (
                <span
                  key={`${brand}-${index}`}
                  className="rounded-full border border-slate-400/20 bg-slate-900/60 px-4 py-2 text-sm text-slate-200"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="features" className="scroll-mt-24 py-20">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">The Three Pillars</h2>
            <p className="mt-3 text-slate-300">
              Architectural excellence, visibility by design, and fortress-standard security in every solution.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                  className={`glass-card glow-border rounded-3xl p-6 ${feature.className}`}
                >
                  <div className="mb-4 inline-flex rounded-2xl border border-indigo-300/35 bg-indigo-500/15 p-3 text-indigo-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-medium text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{feature.description}</p>
                </motion.article>
              );
            })}
          </div>
        </SectionReveal>

        <SectionReveal id="pricing" className="scroll-mt-24 py-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Partnership Tiers</h2>
              <p className="mt-3 text-slate-300">Flexible pricing for every stage of your digital ecosystem journey.</p>
            </div>
            <div className="inline-flex rounded-full border border-slate-500/30 bg-slate-900/60 p-1">
              <button
                type="button"
                onClick={() => setYearly(false)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  !yearly ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setYearly(true)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  yearly ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`glass-card glow-border rounded-3xl p-6 ${
                  plan.highlighted ? 'border-indigo-300/55 shadow-[0_0_45px_rgba(99,102,241,0.25)]' : ''
                }`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{plan.name}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{yearly ? plan.yearly : plan.monthly}</p>
                {yearly && plan.monthly !== 'Custom' && (
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-emerald-300">Save 20% annually</p>
                )}
                <p className="mt-3 text-sm text-slate-300">{plan.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-200">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-indigo-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionReveal>
      </main>

      <SectionReveal id="lead-capture" className="scroll-mt-24 border-t border-slate-500/20 bg-black/25 py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/35 bg-indigo-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-indigo-100">
              <Sparkles className="h-3.5 w-3.5" />
              The Ingenify Promise
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Web Solutions as Secure and Visible</h2>
            <p className="max-w-xl text-slate-300">
              Let's discuss how Ingenify can engineer high-performance, scalable digital ecosystems. We manage the complexity of the modern web so you can focus on the ingenuity of your business.
            </p>
          </div>

          <div className="glass-card glow-border rounded-3xl p-6 sm:p-8">
            <RequestAccessForm />
          </div>
        </div>
      </SectionReveal>

      <footer className="border-t border-slate-500/20 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 text-sm text-slate-400">
          <IngenifyLogo compact className="opacity-90" />
          <p>© {new Date().getFullYear()} Ingenify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
