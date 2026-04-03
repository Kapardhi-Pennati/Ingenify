import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { FluidParticlesBackground } from '@/components/FluidParticlesBackground';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ingenify | Secure, Visible, and Scalable Digital Ecosystems',
  description:
    'High-performance engineering partnership focused on architectural excellence, SEO engineering, and fortress-standard security.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased dark:bg-black dark:text-slate-100 bg-white text-slate-900`}>
        <FluidParticlesBackground>
          <SmoothScroll>{children}</SmoothScroll>
        </FluidParticlesBackground>
      </body>
    </html>
  );
}
