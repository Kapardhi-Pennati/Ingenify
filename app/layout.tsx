import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ingenify | Intelligent Automation for Scalable Teams',
  description:
    'Ingenify helps modern SaaS teams automate workflows, scale operational intelligence, and accelerate growth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} bg-[#050505] font-sans antialiased`}>{children}</body>
    </html>
  );
}
