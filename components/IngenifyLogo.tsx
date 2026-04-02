import { useId } from 'react';

interface IngenifyLogoProps {
  className?: string;
  compact?: boolean;
}

export default function IngenifyLogo({ className = '', compact = false }: IngenifyLogoProps) {
  const gradientId = useId().replace(/:/g, '');

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="8" y1="10" x2="64" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b93ff" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        <path
          d="M14 36C14 25.3 21.6 18 30.2 18C36.6 18 41.2 22.1 45.8 29.1C50.2 35.8 52.7 39 56.7 39C60.8 39 64 35.6 64 30.8C64 24.8 59.2 20 52.9 20"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M58 36C58 46.7 50.4 54 41.8 54C35.4 54 30.8 49.9 26.2 42.9C21.8 36.2 19.3 33 15.3 33C11.2 33 8 36.4 8 41.2C8 47.2 12.8 52 19.1 52"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="36" cy="36" r="4" fill={`url(#${gradientId})`} />
      </svg>

      {!compact && <span className="text-lg font-semibold tracking-tight text-white">Ingenify</span>}
    </div>
  );
}
