import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const BackgroundEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Soft bokeh particles mimicking iPhone moving wallpapers
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 30 + 30, // Extremely slow drifting
    delay: Math.random() * 10,
    blur: Math.random() * 4 + 2, // Built-in optical blur
  }));

  return (
    <>
      {/* Interactive Ambient Mouse Spotlight (Soft white/blue) */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full mix-blend-screen opacity-30 pointer-events-none z-0"
        style={{
            background: 'radial-gradient(circle, rgba(160,180,255,0.6) 0%, rgba(0,0,0,0) 70%)',
        }}
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 1.2 }}
      />

      {/* Floating Bokeh Dust */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20 mix-blend-screen pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            filter: `blur(${p.blur}px)`, // True optical camera blur
          }}
          animate={{
            y: [`${p.y}vh`, `${p.y - 15}vh`, `${p.y}vh`],
            x: [`${p.x}vw`, `${p.x + 5}vw`, `${p.x}vw`],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </>
  );
};

export default BackgroundEffects;
