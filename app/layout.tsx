import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MU Login Manager — Suas contas, um só comando',
  description: 'Organize, conecte e controle múltiplas contas de MU em uma única interface para Windows.',
  openGraph: {
    title: 'MU Login Manager — Suas contas, um só comando',
    description: 'Automação e controle para múltiplas contas de MU no Windows.',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/og.png', width: 1680, height: 945, alt: 'MU Login Manager' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MU Login Manager — Suas contas, um só comando',
    description: 'Automação e controle para múltiplas contas de MU no Windows.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
