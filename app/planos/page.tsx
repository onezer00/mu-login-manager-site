import type { Metadata } from 'next';
import SitePage from '../page';

export const metadata: Metadata = {
  title: 'Planos e avaliação gratuita — MU Login Manager',
  description: 'Compare os planos Party, Party + Farm, Multi Party e Farm Pro do MU Login Manager e experimente gratuitamente por 7 dias.',
  alternates: { canonical: 'https://onezer00.github.io/mu-login-manager-site/planos/' },
};

export default function PlanosPage() {
  return <SitePage initialTab="planos" />;
}
