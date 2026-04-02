'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IngenifyLogo from '@/components/IngenifyLogo';

export default function GlassOverlayNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-8 mix-blend-difference text-white">
        <a href="#hero" className="relative group origin-left scale-90 sm:scale-100">
          <IngenifyLogo compact />
        </a>

        <button 
          onClick={() => setIsOpen(true)}
          className="text-xs tracking-[0.2em] uppercase font-mono hover:opacity-70 transition-opacity"
        >
          [ Menu ]
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-black/40 flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-xs tracking-[0.2em] text-white uppercase font-mono hover:opacity-70 transition-opacity"
            >
              [ Close ]
            </button>

            <nav className="flex flex-col items-center gap-12 text-center text-4xl sm:text-7xl font-sans tracking-[-0.03em] font-medium text-white">
              <motion.a 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                href="#features" 
                onClick={() => setIsOpen(false)}
                className="hover:text-white/50 transition-colors"
              >
                Features
              </motion.a>
              <motion.a 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                href="#lead-capture" 
                onClick={() => setIsOpen(false)}
                className="hover:text-white/50 transition-colors"
              >
                Request Access
              </motion.a>
              <motion.a 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="hover:text-white/50 transition-colors"
              >
                Contact
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
