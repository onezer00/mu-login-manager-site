import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://onezer00.github.io/mu-login-manager-site/'),
  alternates: { canonical: './' },
  title: 'MU Login Manager — Suas contas, um só comando',
  description: 'Gerencie múltiplas contas e clientes de MU Online no Windows com login em sequência, controle de janelas e avaliação gratuita por 7 dias.',
  keywords: ['MU Online', 'MU Login Manager', 'gerenciador de contas MU', 'múltiplas contas MU', 'login MU Online'],
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
