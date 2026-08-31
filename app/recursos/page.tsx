import type { Metadata } from 'next';
import SitePage from '../page';

export const metadata: Metadata = {
  title: 'Recursos do MU Login Manager — Login e controle de contas',
  description: 'Conheça os recursos do MU Login Manager para organizar contas, realizar login em sequência e controlar janelas de MU Online no Windows.',
  alternates: { canonical: 'https://onezer00.github.io/mu-login-manager-site/recursos/' },
};

export default function RecursosPage() {
  return <SitePage initialTab="recursos" />;
}
