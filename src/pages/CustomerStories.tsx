import { motion } from 'motion/react';

export default function CustomerStories() {
  return (
    <div className="min-h-screen pt-40 px-6 max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 z-10 relative">
      <motion.h1 
        initial={{opacity: 0, scale: 0.95}} 
        animate={{opacity: 1, scale: 1}}
        className="text-5xl md:text-7xl font-sans font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[#b4c0ff]"
      >
        How They Scaled
      </motion.h1>
      <motion.p 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        transition={{delay: 0.2}}
        className="text-white/70 max-w-2xl text-lg font-sans"
      >
        Read the untold stories behind zero-downtime, fully managed web applications powered completely by Ingenify architects.
      </motion.p>
    </div>
  );
}
