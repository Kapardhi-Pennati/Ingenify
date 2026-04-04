'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import IngenifyLogo from '@/components/IngenifyLogo';
import RequestAccessForm from '@/components/RequestAccessForm';
import { FluidParticlesBackground } from '@/components/FluidParticlesBackground';
import ScrollScene3D from '@/components/ScrollScene3D';

/* ─── Data ─── */

const trustedBy = [
  'Startup Studios',
  'CloudNova',
  'FinEdge Tech',
  'Apex Brands',
  'Meridian Digital',
  'Bolt Commerce',
];

interface FeatureSection {
  id: string;
  index: number;
  label: string;
  title: string;
  description: string;
  tags: string[];
}

const features: FeatureSection[] = [
  {
    id: 'hero',
    index: 0,
    label: '01 — Build',
    title: 'Websites\nEngineered\nto Dominate.',
    description:
      'We design and develop high-performance websites that convert visitors into customers. From pixel-perfect landing pages to full-scale web applications — built for speed, built for growth.',
    tags: ['Web Design', 'Development', 'Conversion'],
  },
  {
    id: 'scale',
    index: 1,
    label: '02 — Scale',
    title: 'Performance\nThat Never\nBlinks.',
    description:
      'Lightning-fast load times, 99.9% uptime, and infrastructure that scales with your business. We optimize every millisecond so your site handles traffic surges without breaking a sweat.',
    tags: ['Speed', 'Uptime', 'Scalability'],
  },
  {
    id: 'security',
    index: 2,
    label: '03 — Protect',
    title: 'Fortified.\nManaged.\nWorry-Free.',
    description:
      'SSL certificates, automated backups, malware scanning, and 24/7 monitoring. We handle the security and maintenance so you can focus entirely on running your business.',
    tags: ['Security', 'Maintenance', 'Backups'],
  },
  {
    id: 'visibility',
    index: 3,
    label: '04 — Grow',
    title: 'Rank Higher.\nGet Found.\nConvert More.',
    description:
      'Technical SEO baked into every build. Structured data, Core Web Vitals optimization, and search-first architecture that puts your brand in front of the right audience.',
    tags: ['SEO', 'Analytics', 'Growth'],
  },
];

/* ─── Mobile Nav ─── */

function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          <nav className="flex flex-col items-center gap-10">
            {[
              { label: 'Services', href: '#scale' },
              { label: 'Security', href: '#security' },
              { label: 'SEO', href: '#visibility' },
              { label: 'Contact', href: '#lead-capture' },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className="font-display text-3xl sm:text-4xl font-bold text-white/80 hover:text-white transition-colors tracking-tight"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#lead-capture"
              onClick={onClose}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black"
            >
              Get Started
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Feature Section ─── */

function FeatureBlock({ id, label, title, description, tags, index }: FeatureSection) {
  const isHero = index === 0;

  return (
    <section
      id={id}
      className="relative w-full min-h-screen min-h-[100dvh] flex items-center"
    >
      {/* On mobile, full width. On desktop, left 48% */}
      <div className="w-full md:w-[48%] px-6 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="h-px w-6 sm:w-8 bg-white/20" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/35">
              {label}
            </span>
          </div>

          {/* Hero badge */}
          {isHero && (
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6 sm:mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/50 font-medium">
                Web Design · Development · Management
              </span>
            </div>
          )}

          {/* Title */}
          <h2
            className={`font-display font-bold leading-[1.05] tracking-tight whitespace-pre-line text-white ${
              isHero
                ? 'text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4.2rem]'
                : 'text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.6rem]'
            }`}
          >
            {title}
          </h2>

          {/* Description */}
          <p className="mt-6 sm:mt-8 text-[14px] sm:text-[15px] md:text-base leading-[1.7] sm:leading-[1.8] text-white/40 max-w-md font-light">
            {description}
          </p>

          {/* CTA for hero */}
          {isHero && (
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-8 sm:mt-10">
              <a
                href="#lead-capture"
                className="group relative inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-white px-6 sm:px-7 py-3 sm:py-3.5 text-[12px] sm:text-[13px] font-bold text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Your Project
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#scale"
                className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] text-white/40 hover:text-white/80 transition-colors duration-300 font-medium"
              >
                What We Do
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-8 sm:mt-10">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.15em] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/[0.08] text-white/30 hover:text-white/60 hover:border-white/20 transition-all duration-300 uppercase cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Trusted by (hero only) */}
          {isHero && (
            <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-white/[0.06]">
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/20 mb-4 sm:mb-5">
                Trusted by
              </p>
              <div className="flex flex-wrap gap-x-5 sm:gap-x-8 gap-y-2 sm:gap-y-3">
                {trustedBy.map((name) => (
                  <span
                    key={name}
                    className="text-[11px] sm:text-[12px] text-white/20 font-medium tracking-wide"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main Landing ─── */

export default function IngenifyLanding() {
  const [activeSection, setActiveSection] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const totalSections = features.length + 1;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const wh = window.innerHeight;
      setActiveSection(Math.min(Math.round(scrollY / wh), totalSections - 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileNavOpen]);

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-black text-white selection:bg-white/20 overflow-x-hidden">
      {/* ── Fixed particle canvas ── */}
      <div className="fixed inset-0 z-0">
        <FluidParticlesBackground className="h-screen h-[100dvh] w-full" />
      </div>

      {/* ── Gradient overlays ── */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
        <div className="absolute top-0 left-0 w-full md:w-2/3 h-full bg-gradient-to-r from-black/60 via-black/30 to-transparent md:from-black/50 md:to-transparent" />
      </div>

      {/* ── 3D Scroll Scene (desktop only) ── */}
      <ScrollScene3D sectionCount={features.length} />

      {/* ── Mobile Nav Overlay ── */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-5 sm:px-8 py-5 sm:py-6 md:px-12">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <IngenifyLogo size={28} compact />
          <span className="font-display text-[12px] sm:text-[13px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold text-white/80">
            Ingenify
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8 items-center">
          {[
            { label: 'Services', href: '#scale' },
            { label: 'Security', href: '#security' },
            { label: 'SEO', href: '#visibility' },
            { label: 'Contact', href: '#lead-capture' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/80 transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#lead-capture"
            className="ml-2 rounded-full bg-white/[0.06] border border-white/[0.1] px-5 py-2 text-[10px] tracking-[0.15em] uppercase text-white/50 hover:text-white hover:bg-white/[0.1] transition-all duration-300 font-bold"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </nav>

      {/* ── Content ── */}
      <main className="relative z-20">
        {features.map((feature) => (
          <FeatureBlock key={feature.id} {...feature} />
        ))}

        {/* ── CTA / Lead Capture ── */}
        <section
          id="lead-capture"
          className="relative min-h-screen min-h-[100dvh] flex items-center py-20 sm:py-32 px-5 sm:px-8 md:px-16 lg:px-24"
        >
          <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-6 sm:w-8 bg-white/20" />
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/35">
                  05 — Connect
                </span>
              </div>
              <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/50 font-medium">
                  Free Consultation
                </span>
              </div>
              <h2 className="font-display text-[1.8rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white">
                Ready to Build<br />
                Something<br />
                Exceptional?
              </h2>
              <p className="max-w-md text-[14px] sm:text-[15px] text-white/35 leading-relaxed font-light">
                Tell us about your project. Whether you need a new website, a
                redesign, or ongoing management — we&apos;ll craft a solution
                that drives real results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/40"
            >
              <RequestAccessForm />
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Side Indicators (desktop only) ── */}
      <div className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-3">
        {[...features, { id: 'lead-capture' }].map((section, idx) => (
          <button
            key={section.id}
            onClick={() => {
              document
                .getElementById(section.id)
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              activeSection === idx
                ? 'bg-white scale-[2]'
                : 'bg-white/15 hover:bg-white/40 hover:scale-150'
            }`}
            aria-label={`Go to section ${idx + 1}`}
          />
        ))}
      </div>

      {/* ── Scroll Hint ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className={`fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100] font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/20 select-none transition-opacity duration-1000 ${
          activeSection > 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        Scroll to explore
      </motion.div>

      {/* ── Footer ── */}
      <footer className="relative z-20 border-t border-white/[0.04] py-10 sm:py-14 px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
          <div className="flex items-center gap-2.5">
            <IngenifyLogo size={22} compact className="opacity-30" />
            <span className="font-display text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.15em] uppercase font-bold text-white/15">
              Ingenify
            </span>
          </div>
          <p className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-white/15 text-center">
            © {new Date().getFullYear()} Ingenify / Web Design &amp; Management
          </p>
          <div className="flex gap-6 sm:gap-8">
            <a
              href="#"
              className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-white/15 hover:text-white/50 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-white/15 hover:text-white/50 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
