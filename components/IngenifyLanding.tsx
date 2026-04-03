'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { type ReactNode, useEffect, useRef } from 'react';
import IngenifyLogo from '@/components/IngenifyLogo';
import RequestAccessForm from '@/components/RequestAccessForm';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassOverlayNav from '@/components/GlassOverlayNav';
import { FluidParticlesBackground } from '@/components/FluidParticlesBackground';

interface FeatureCard {
  title: string;
  subtitle: string;
  description: string;
  principle: string;
  className: string;
}


const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(12px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
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
    title: 'I. Structural Supremacy',
    subtitle: 'The Physics of Scale',
    description: 'True scalability is not reactive; it is deterministic. We weaponize modern primitives—edge computing, deterministic rendering, and serverless distribution—to eliminate latency and guarantee structural supremacy under infinite load.',
    principle: 'The Principle: Scale must be absolute, not provisional.',
    className: 'lg:col-span-1',
  },
  {
    title: 'II. Cryptographic Silence',
    subtitle: 'Absolute Logic Sovereignty',
    description: 'Security through obscurity is obsolete. We engineer applications with inherent zero-trust architecture, weaving cryptographic certainty into the atomic logic of the platform. Your intelligence remains impenetrable by default.',
    principle: 'The Principle: The most secure system is the one that demands no trust.',
    className: 'lg:col-span-1',
  },
  {
    title: 'III. Synthetic Intuition',
    subtitle: 'Dominating the Algorithmic Layer',
    description: 'Visibility is a mathematical equation. By manipulating raw Core Web Vitals, executing flawless semantic injection, and structuring predictive metadata, we force digital environments to yield to your brand\'s authority.',
    principle: 'The Principle: Authority is earned through technical perfection.',
    className: 'lg:col-span-1',
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
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroLogoRef.current) {
      // Z-Axis Cinematic Dive
      gsap.to(heroLogoRef.current, {
        scale: 4,
        y: 200,
        opacity: 0,
        filter: 'blur(20px)',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="infinity-theme relative min-h-screen overflow-x-clip dark:text-slate-100 text-slate-900"
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FluidParticlesBackground className="h-full w-full" />
      </div>
      <div className="relative z-10">
        <GlassOverlayNav />

        <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-32 sm:pt-48">
        <SectionReveal id="hero" className="scroll-mt-28 flex flex-col items-center text-center">
          <div className="mb-20 flex justify-center [transform-style:preserve-3d]">
            <div ref={heroLogoRef} className="origin-center">
              <IngenifyLogo size={280} compact />
            </div>
          </div>
          <div className="max-w-4xl">
            <p className="inf-mono inline-flex items-center gap-2 rounded-full border dark:border-white/20 border-slate-400/40 dark:bg-white/5 bg-slate-100/40 px-4 py-2 text-[10px] uppercase tracking-[0.3em] dark:text-slate-300 text-slate-600 font-bold backdrop-blur-md">
              <Sparkles className="h-3 w-3" />
              Elite Engineering Partnership
            </p>
            <h1 className="inf-heading mt-8 text-5xl leading-[1.1] dark:text-white text-slate-900 sm:text-7xl">
              Ingenify: Engineering Sovereign Digital Ecosystems
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed dark:text-slate-300 text-slate-600 sm:text-lg">
              We do not write code; we forge infrastructure. Ingenify partners with elite organizations to architect hyper-scalable, cryptographically secure digital environments. We transform your most complex technical ambitions into flawless, high-velocity reality.
            </p>
            <div className="mt-12 flex justify-center">
              <a
                href="#lead-capture"
                className="inline-flex items-center gap-2 rounded-full dark:bg-white dark:text-black bg-slate-900 text-white px-8 py-4 text-sm font-bold transition dark:hover:bg-slate-200 hover:bg-slate-800 shadow-2xl dark:shadow-white/10 shadow-black/20"
              >
                Request Access
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="features" className="scroll-mt-24 py-32">
          <div className="mb-16 max-w-2xl">
            <p className="inf-mono text-[10px] uppercase tracking-[0.4em] dark:text-slate-400 text-slate-600 font-bold mb-4">/ Pillars</p>
            <h2 className="inf-heading text-4xl dark:text-white text-slate-900 sm:text-5xl">The Technical Standard</h2>
            <p className="mt-4 dark:text-slate-300 text-slate-600">
              Architectural excellence, visibility by design, and fortress-standard security in every solution.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {features.map((feature) => {
              return (
                <motion.article
                  key={feature.title}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`backdrop-blur-xl dark:bg-white/5 bg-slate-100/50 dark:border-white/10 border-slate-300/30 rounded-2xl p-8 dark:hover:border-white/30 hover:border-slate-300/50 dark:hover:bg-white/8 hover:bg-slate-100/70 transition-colors duration-300 flex flex-col justify-between ${feature.className}`}
                >
                  <div>
                    <h3 className="inf-mono text-xs uppercase tracking-widest dark:text-slate-500 text-slate-600 mb-2 font-bold">{feature.title}</h3>
                    <h4 className="inf-heading text-2xl dark:text-white text-slate-900 mb-6 uppercase tracking-wider">{feature.subtitle}</h4>
                    <p className="text-sm leading-relaxed dark:text-slate-300 text-slate-700 mb-8">{feature.description}</p>
                  </div>
                  
                  <div className="pt-6 dark:border-white/10 border-slate-300/30 border-t">
                    <p className="text-xs font-medium dark:text-slate-400 text-slate-600 italic">
                      {feature.principle}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </SectionReveal>

      </main>

      <SectionReveal id="lead-capture" className="scroll-mt-24 dark:border-white/10 border-slate-300/30 border-t dark:bg-black/40 bg-white/40 backdrop-blur-3xl py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-8">
            <p className="inf-mono inline-flex items-center gap-2 rounded-full border dark:border-white/20 border-slate-400/40 dark:bg-white/5 bg-slate-100/40 px-4 py-2 text-[10px] uppercase tracking-[0.2em] dark:text-slate-300 text-slate-600 font-bold backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              The Ingenify Promise
            </p>
            <h2 className="inf-heading text-4xl dark:text-white text-slate-900 sm:text-5xl leading-tight">Web Solutions as Secure and Visible</h2>
            <p className="max-w-xl text-lg dark:text-slate-300 text-slate-600 leading-relaxed">
              Let's discuss how Ingenify can engineer high-performance, scalable digital ecosystems. We manage the complexity of the modern web so you can focus on the ingenuity of your business.
            </p>
          </div>

          <div className="backdrop-blur-xl dark:bg-white/5 bg-slate-100/50 dark:border-white/10 border-slate-300/30 border rounded-2xl p-8 sm:p-10">
            <RequestAccessForm />
          </div>
        </div>
      </SectionReveal>

        <footer className="dark:border-white/10 border-slate-300/30 border-t py-12">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-6 text-xs dark:text-slate-400 text-slate-600 font-bold uppercase tracking-widest">
            <IngenifyLogo compact className="dark:opacity-80 opacity-70" />
            <p>© {new Date().getFullYear()} Ingenify / Technical Standards</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
