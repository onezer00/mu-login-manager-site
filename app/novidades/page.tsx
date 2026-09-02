import type { Metadata } from 'next';
import SitePage from '../page';

export const metadata: Metadata = {
  title: 'Novidades e versões — MU Login Manager',
  description: 'Consulte as versões, melhorias, correções e downloads oficiais mais recentes do MU Login Manager.',
  alternates: { canonical: 'https://muloginmanager.com.brnovidades/' },
};

export default function NovidadesPage() {
  return <SitePage initialTab="changelog" />;
}
