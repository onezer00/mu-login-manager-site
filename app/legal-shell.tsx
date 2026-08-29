import Link from 'next/link';
import type { ReactNode } from 'react';

export function LegalShell({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children: ReactNode }) {
  return <main className="legal-page">
    <header className="legal-nav shell"><Link className="brand" href="/"><span className="brand-mark">MU</span><span>LOGIN MANAGER</span></Link><Link href="/">← Voltar ao site</Link></header>
    <section className="legal-hero shell"><p className="eyebrow"><span /> {eyebrow}</p><h1>{title}</h1><p>{lead}</p><small>Última atualização: 29 de agosto de 2026</small></section>
    <article className="legal-document shell">{children}</article>
    <footer className="legal-footer shell"><p>MU Login Manager é uma ferramenta independente e não afiliada à Webzen.</p><div><Link href="/privacidade/">Privacidade</Link><Link href="/riscos/">Riscos de uso</Link><Link href="/">Página inicial</Link></div></footer>
  </main>;
}
