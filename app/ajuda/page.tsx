import type { Metadata } from 'next';
import SitePage from '../page';

export const metadata: Metadata = {
  title: 'Ajuda e suporte — MU Login Manager',
  description: 'Encontre respostas, problemas conhecidos e sugestões da comunidade ou envie uma solicitação de suporte para o MU Login Manager.',
  alternates: { canonical: 'https://onezer00.github.io/mu-login-manager-site/ajuda/' },
};

export default function AjudaPage() {
  return <SitePage initialTab="ajuda" />;
}
