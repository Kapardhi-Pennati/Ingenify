'use client';

interface IngenifyLogoProps {
  className?: string;
  compact?: boolean;
  size?: number;
}

export default function IngenifyLogo({ className = '', compact = false, size = 60 }: IngenifyLogoProps) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {/* 
        The Glass Monolith Optical Illusion. 
        Optimized by removing heavy css drop-shadows and mix-blend-modes from moving elements, 
        using pristine layered SVG opacity instead.
      */}
      <div 
        className="relative flex items-center justify-center overflow-hidden"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer ring */}
          <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          
          {/* Inner crystal architecture */}
          <path d="M50 10 L85 50 L50 90 L15 50 Z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="miter" />
          <path d="M50 10 L50 90" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M15 50 L85 50" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          
          {/* Refractive inner diamond core */}
          <path d="M50 30 L65 50 L50 70 L35 50 Z" fill="rgba(255,255,255,0.7)" />
        </svg>
      </div>

      {!compact && (
        <span className="text-xl font-medium tracking-[0.2em] text-white uppercase font-sans">
          Ingenify
        </span>
      )}
    </div>
  );
}
