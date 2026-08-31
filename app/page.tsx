'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const RELEASES_URL = 'https://github.com/onezer00/mu-login-manager-releases/releases';
const COMMUNITY_REPOSITORY_URL = 'https://github.com/onezer00/mu-login-manager-site';
const ISSUES_API_URL = 'https://api.github.com/repos/onezer00/mu-login-manager-site/issues?state=all&per_page=100&sort=updated&direction=desc';
const FALLBACK_DOWNLOAD_URL = `${RELEASES_URL}/download/v0.1.15-beta/Setup-MU-Login-Manager-0.1.15-beta.exe`;
type Tab = 'inicio' | 'recursos' | 'planos' | 'seguranca' | 'changelog' | 'ajuda';
const tabs: { id: Tab; label: string }[] = [{ id: 'inicio', label: 'Início' }, { id: 'recursos', label: 'Recursos' }, { id: 'planos', label: 'Planos' }, { id: 'seguranca', label: 'Segurança' }, { id: 'changelog', label: 'Novidades' }, { id: 'ajuda', label: 'Ajuda' }];
const tabUrls: Record<Tab, string> = {
  inicio: '/',
  recursos: '/recursos/',
  planos: '/planos/',
  seguranca: '/riscos/',
  changelog: '/novidades/',
  ajuda: '/ajuda/',
};
const plans = [
  { name: 'Party', accounts: '5 contas', devices: '1 PC', price: 'R$ 49,90', tone: 'blue' },
  { name: 'Party + Farm', accounts: '10 contas', devices: '1 PC', price: 'R$ 79,90', tone: 'bronze' },
  { name: 'Multi Party', accounts: '20 contas', devices: '2 PCs', price: 'R$ 149,90', tone: 'silver' },
  { name: 'Farm Pro', accounts: '40 contas', devices: '3 PCs', price: 'R$ 179,90', tone: 'gold' },
];
const benefits = [
  ['01', 'Contas organizadas', 'Visualize status, personagem, PID e janela de cada conta em um único painel.'],
  ['02', 'Login em sequência', 'Automatize launcher, servidor e personagem respeitando os limites do seu plano.'],
  ['03', 'Controle preciso', 'Restaure, minimize, religue ou encerre somente as janelas vinculadas pelo Manager.'],
];

export default function Home({ initialTab = 'inicio' }: { initialTab?: Tab }) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [preparingDownload, setPreparingDownload] = useState(false);
  const navigate = (tab: Tab) => { if (tab !== activeTab) { setDirection(tabs.findIndex((item) => item.id === tab) > tabs.findIndex((item) => item.id === activeTab) ? 'next' : 'previous'); setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const downloadLatest = async () => {
    if (preparingDownload) return;
    setPreparingDownload(true);
    let downloadUrl = FALLBACK_DOWNLOAD_URL;
    try {
      const response = await fetch('https://api.github.com/repos/onezer00/mu-login-manager-releases/releases?per_page=1', { headers: { Accept: 'application/vnd.github+json' } });
      if (response.ok) {
        const [release] = await response.json() as GithubRelease[];
        downloadUrl = release?.assets.find((asset) => asset.name.toLowerCase().endsWith('.exe'))?.browser_download_url || downloadUrl;
      }
    } catch { /* O instalador de contingência permanece disponível. */ }
    window.location.assign(downloadUrl);
    window.setTimeout(() => setPreparingDownload(false), 1200);
  };
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  return <main>
    <header className="nav shell">
      <button className="brand brand-button" onClick={() => navigate('inicio')} aria-label="MU Login Manager — início"><span className="brand-mark">MU</span><span>LOGIN MANAGER</span></button>
      <nav className="tab-nav" aria-label="Navegação principal">{tabs.map((tab) => <Link key={tab.id} aria-current={activeTab === tab.id ? 'page' : undefined} className={activeTab === tab.id ? 'active' : ''} href={tabUrls[tab.id]}>{tab.label}</Link>)}</nav>
      <button className={`nav-cta nav-download nav-download-primary ${preparingDownload ? 'preparing' : ''}`} disabled={preparingDownload} onClick={downloadLatest}>{preparingDownload ? 'Preparando…' : 'Baixar beta'}</button>
    </header>
    <div className={`tab-viewport slide-${direction}`} key={activeTab} role="tabpanel" aria-label={tabs.find((tab) => tab.id === activeTab)?.label}>
      {activeTab === 'inicio' && <Inicio onNavigate={navigate} onDownload={downloadLatest} preparingDownload={preparingDownload} />}{activeTab === 'recursos' && <Recursos />}{activeTab === 'planos' && <Planos onDownload={downloadLatest} preparingDownload={preparingDownload} />}{activeTab === 'seguranca' && <Seguranca />}{activeTab === 'changelog' && <Changelog />}{activeTab === 'ajuda' && <Ajuda />}
    </div>
    <div className="carousel-controls shell" aria-label="Controle das páginas"><button disabled={activeIndex === 0} onClick={() => navigate(tabs[activeIndex - 1].id)} aria-label="Página anterior">←</button><div>{tabs.map((tab) => <button key={tab.id} className={tab.id === activeTab ? 'active' : ''} onClick={() => navigate(tab.id)} aria-label={`Abrir ${tab.label}`} />)}</div><button disabled={activeIndex === tabs.length - 1} onClick={() => navigate(tabs[activeIndex + 1].id)} aria-label="Próxima página">→</button></div>
    <footer className="shell"><button className="brand brand-button" onClick={() => navigate('inicio')}><span className="brand-mark">MU</span><span>LOGIN MANAGER</span></button><p>Ferramenta independente e não afiliada à Webzen.</p><div className="footer-links"><a href="./privacidade/">Privacidade</a><a href="./riscos/">Riscos de uso</a><span>© 2026 MU Login Manager</span></div></footer>
  </main>;
}

function Inicio({ onNavigate, onDownload, preparingDownload }: { onNavigate: (tab: Tab) => void; onDownload: () => void; preparingDownload: boolean }) {
  return <><section className="hero shell"><div className="hero-copy"><p className="eyebrow"><span /> BETA PARA WINDOWS</p><h1>Suas contas de MU.<br /><em>Um só comando.</em></h1><p className="hero-lead">Organize, conecte e controle múltiplos clientes com uma experiência feita para quem leva sua party a sério.</p><div className="trial-offer"><div className="trial-offer-days"><strong>7</strong><span>DIAS<br />GRÁTIS</span></div><div><b>Teste o plano escolhido antes de pagar</b><p>Cadastre o cartão e use o Manager hoje. A primeira cobrança acontece somente após o período gratuito.</p></div></div><div className="hero-actions"><button className="primary trial-primary" disabled={preparingDownload} onClick={onDownload}>{preparingDownload ? 'Preparando download…' : 'Começar meus 7 dias grátis'} <b>→</b></button><button className="secondary ghost-cta" onClick={() => onNavigate('recursos')}>Ver como funciona</button></div><div className="trial-terms"><span><b>✓</b> Nenhuma cobrança hoje</span><span><b>✓</b> Cancele antes dos 7 dias e não pague nada</span><span><b>✓</b> Benefício válido na primeira assinatura</span></div></div><ProductPreview /></section><section className="marquee" aria-label="Destaques"><div>LOGIN INTELIGENTE <span>✦</span> 7 DIAS GRÁTIS <span>✦</span> CANCELE ANTES E NÃO PAGUE <span>✦</span> AUTO UPDATE <span>✦</span> LOGIN INTELIGENTE</div></section><section className="final-cta shell compact-cta"><p className="eyebrow"><span /> CONHEÇA O MANAGER</p><h2>Da primeira conta<br /><em>à operação completa.</em></h2><button className="primary" onClick={() => onNavigate('recursos')}>Explorar recursos <b>→</b></button></section></>;
}

function ProductPreview() {
  return <div className="product-stage" aria-label="Prévia do painel do MU Login Manager"><div className="glow" /><div className="app-window"><div className="window-bar"><i /><i /><i /><span>MU Login Manager</span></div><div className="app-body"><aside><div className="mini-logo">MU</div>{['▣', '◉', '⌁', '$', '⚡', '⚙'].map((item, index) => <span className={index === 0 ? 'active' : ''} key={item}>{item}</span>)}</aside><div className="dashboard"><p>GERENCIAMENTO DE CONTAS</p><div className="stats"><div><small>ONLINE</small><strong>5</strong></div><div><small>OFFLINE</small><strong>4</strong></div><div><small>TOTAL</small><strong>9</strong></div></div><div className="controls"><b>▶ Logar todos</b><span>■ Parar execução</span></div><div className="accounts">{[['Rune Wizard', 'ONLINE'], ['Energy Elf', 'ONLINE'], ['Blade Knight', 'OFFLINE']].map(([name, status]) => <div key={name}><i>{name.slice(0, 1)}</i><span>{name}<small>Conta configurada</small></span><b className={status === 'ONLINE' ? 'online' : ''}>● {status}</b><em>•••</em></div>)}</div></div></div></div><div className="floating-card"><span>✓</span><div><b>Party conectada</b><small>5 contas online</small></div></div></div>;
}

function Recursos() {
  return <><section className="section shell tab-section"><div className="section-head"><p className="eyebrow"><span /> FEITO PARA SUA ROTINA</p><h2>Menos repetição.<br /><em>Mais tempo no jogo.</em></h2><p className="tab-intro">Um fluxo projetado para eliminar tarefas mecânicas sem tirar de você o controle das janelas e das contas.</p></div><div className="benefit-grid">{benefits.map(([number, title, copy]) => <article key={number}><span>{number}</span><div className="benefit-icon">{number === '01' ? '▦' : number === '02' ? '▶' : '⌘'}</div><h3>{title}</h3><p>{copy}</p></article>)}</div></section><section className="workflow"><div className="shell workflow-inner"><div><p className="eyebrow"><span /> FLUXO SIMPLES</p><h2>Configure uma vez.<br /><em>Use todos os dias.</em></h2></div><ol><li><b>01</b><span><strong>Cadastre suas contas</strong><small>Credenciais protegidas localmente pelo Windows.</small></span></li><li><b>02</b><span><strong>Calibre a automação</strong><small>Defina launcher, servidor e posições dos personagens.</small></span></li><li><b>03</b><span><strong>Clique em “Logar todos”</strong><small>O Manager cuida da sequência e mantém você no controle.</small></span></li></ol></div></section></>;
}

function Planos({ onDownload, preparingDownload }: { onDownload: () => void; preparingDownload: boolean }) {
  return <section className="section shell tab-section"><div className="section-head split"><div><p className="eyebrow"><span /> PLANOS</p><h2>Do primeiro grupo<br /><em>à operação completa.</em></h2></div><p>Escolha pelo número de contas simultâneas. Você pode manter outras contas configuradas e alternar quando precisar.</p></div><div className="trial-banner"><div><small>AVALIAÇÃO GRATUITA · PRIMEIRA ASSINATURA</small><strong>7 dias para decidir. Nenhuma cobrança hoje.</strong><span>Escolha o plano no Manager, cadastre o cartão e teste todos os limites dele. Cancele antes do fim da avaliação para não gerar a primeira cobrança.</span></div><button disabled={preparingDownload} onClick={onDownload}>{preparingDownload ? 'Preparando…' : 'Baixar e experimentar'} <b>→</b></button></div><div className="plans">{plans.map((plan, index) => <article className={`plan ${plan.tone}`} key={plan.name}><div className="plan-top"><span>{String(index + 1).padStart(2, '0')}</span>{index === 1 && <b>POPULAR</b>}</div><h3>{plan.name}</h3><strong>{plan.price}<small>/ mês após 7 dias</small></strong><ul><li>✓ Até {plan.accounts}</li><li>✓ {plan.devices}</li><li>✓ Nenhuma cobrança hoje</li><li>✓ Cancele durante a avaliação</li></ul><button disabled={preparingDownload} onClick={onDownload}>Testar {plan.name} por 7 dias <b>→</b></button></article>)}</div><p className="trial-legal">É necessário cadastrar uma forma de pagamento. A avaliação é concedida uma única vez por assinante; se não houver cancelamento, a assinatura passa a ser cobrada mensalmente ao término dos 7 dias.</p></section>;
}

function Seguranca() {
  return <><section className="security security-tab"><div className="shell security-grid"><div className="shield">MU<span>!</span></div><div><p className="eyebrow"><span /> TRANSPARÊNCIA DESDE O BETA</p><h2>Entenda antes<br /><em>de automatizar.</em></h2><p>O MU Login Manager é uma ferramenta independente, não afiliada, autorizada ou endossada pela Webzen. Programas de terceiros e automações podem estar sujeitos às regras do MU Online Global e não existe garantia contra sanções ou bloqueios.</p><div className="security-note risk-note"><b>Decisão informada</b><span>Leia os riscos de uso antes de instalar. O Manager foi projetado para automatizar o fluxo de entrada, mas a interpretação e aplicação das regras pertencem à administradora do jogo.</span></div><div className="transparency-links"><a href="./privacidade/"><b>Política de privacidade</b><span>Quais dados ficam no computador e quais serviços recebem informações.</span><strong>→</strong></a><a href="./riscos/"><b>Riscos de uso</b><span>Automação, regras da Webzen e responsabilidades do usuário.</span><strong>→</strong></a></div></div></div></section><section className="final-cta shell compact-cta"><p className="eyebrow"><span /> DOWNLOAD AUTÊNTICO</p><h2>Segurança começa<br /><em>na origem do arquivo.</em></h2><p className="legal-cta-copy">Baixe somente pelos releases publicados por este projeto e confira o SHA-256. Autenticidade do instalador não significa autorização da Webzen para o uso da automação.</p><a className="primary" href={RELEASES_URL}>Acessar releases do projeto <b>↗</b></a></section></>;
}

type GithubAsset = { name: string; size: number; browser_download_url: string };
type GithubRelease = { id: number; tag_name: string; name: string; body: string | null; published_at: string; html_url: string; assets: GithubAsset[] };
const fallbackReleases: GithubRelease[] = [{ id: 15, tag_name: 'v0.1.15-beta', name: 'MU Login Manager 0.1.15-beta', body: 'Avaliação gratuita de 7 dias, fluxo de pagamentos e ativação revisados.', published_at: '2026-08-29T16:08:32Z', html_url: `${RELEASES_URL}/tag/v0.1.15-beta`, assets: [{ name: 'Setup-MU-Login-Manager-0.1.15-beta.exe', size: 203501365, browser_download_url: FALLBACK_DOWNLOAD_URL }] }];

function parseReleaseBody(body: string | null) {
  const result = { description: '', features: [] as string[], fixes: [] as string[], other: [] as string[], checksum: '' };
  let section: 'features' | 'fixes' | 'other' = 'other';
  for (const rawLine of body?.split('\n') ?? []) {
    const line = rawLine.trim();
    if (!line) continue;
    if (/^#{1,6}\s*/.test(line)) {
      const heading = line.replace(/^#{1,6}\s*/, '').toLowerCase();
      section = /corre|fix/.test(heading) ? 'fixes' : /novidade|feature|funcionalidade|melhoria/.test(heading) ? 'features' : 'other';
      continue;
    }
    if (/^sha-?256/i.test(line)) { result.checksum = line.replace(/^sha-?256(?:\s+do instalador)?\s*:?\s*/i, ''); continue; }
    if (/^[-*]\s+/.test(line)) { result[section].push(line.replace(/^[-*]\s+/, '')); continue; }
    if (!result.description) result.description = line;
  }
  return result;
}

function ReleaseBody({ body, compact = false }: { body: string | null; compact?: boolean }) {
  const notes = parseReleaseBody(body);
  if (!notes.description && !notes.features.length && !notes.fixes.length && !notes.other.length && !notes.checksum) return null;
  return <div className={`release-notes ${compact ? 'compact' : ''}`}>{notes.description && <p>{notes.description}</p>}<div className="release-note-groups">{notes.features.length > 0 && <section><b>Novidades e melhorias</b><ul>{notes.features.map((item) => <li key={item}><span>+</span>{item}</li>)}</ul></section>}{notes.fixes.length > 0 && <section><b>Correções</b><ul>{notes.fixes.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></section>}{notes.other.length > 0 && <section><b>Outras alterações</b><ul>{notes.other.map((item) => <li key={item}><span>•</span>{item}</li>)}</ul></section>}</div>{notes.checksum && <div className="release-checksum"><b>SHA-256</b><code>{notes.checksum}</code></div>}</div>;
}

function Changelog() {
  const [releases, setReleases] = useState<GithubRelease[]>(fallbackReleases);
  const [syncing, setSyncing] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loadingMore, setLoadingMore] = useState(false);
  const [revealedFrom, setRevealedFrom] = useState(4);
  const lastLoadScrollRef = useRef(0);
  const loadingMoreRef = useRef(false);
  const loadingTimerRef = useRef<number | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.github.com/repos/onezer00/mu-login-manager-releases/releases?per_page=30', { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('GitHub indisponível')))
      .then((data) => { const releases = data as GithubRelease[]; if (releases.length) setReleases(releases); })
      .catch(() => undefined)
      .finally(() => setSyncing(false));
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (visibleCount >= releases.length) return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const nearEnd = window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 180;
      const movedEnough = scrollTop >= lastLoadScrollRef.current + 140;
      if (nearEnd && movedEnough && !loadingMoreRef.current) {
        lastLoadScrollRef.current = scrollTop;
        loadingMoreRef.current = true;
        setLoadingMore(true);
        loadingTimerRef.current = window.setTimeout(() => {
          setVisibleCount((count) => {
            setRevealedFrom(count);
            return Math.min(count + 4, releases.length);
          });
          loadingMoreRef.current = false;
          setLoadingMore(false);
        }, 650);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [releases.length, visibleCount]);
  useEffect(() => () => { if (loadingTimerRef.current) window.clearTimeout(loadingTimerRef.current); }, []);
  const latest = releases[0];
  const installer = latest?.assets.find((asset) => asset.name.toLowerCase().endsWith('.exe'));
  const visibleReleases = releases.slice(0, visibleCount);
  return <section className="section shell tab-section changelog"><div className="section-head split"><div><p className="eyebrow"><span /> NOVIDADES DO MANAGER</p><h2>Baixe a versão mais<br /><em>recente e verificada.</em></h2></div><p>Confira o que mudou, identifique o instalador correto e faça o download sempre pela publicação do projeto.</p></div>{latest && <article className="latest-release"><div className="latest-copy"><span>VERSÃO RECOMENDADA</span><h3>{latest.name || latest.tag_name}</h3><p>{installer?.name || 'Instalador para Windows'}</p><small>{installer ? `${(installer.size / 1024 / 1024).toFixed(1)} MB` : 'Consulte os arquivos do release'} · Publicado em {new Intl.DateTimeFormat('pt-BR').format(new Date(latest.published_at))}</small><ReleaseBody body={latest.body} compact /></div><div className="latest-actions">{installer && <a className="primary" href={installer.browser_download_url}>Baixar instalador <b>↓</b></a>}<a href={latest.html_url}>Notas da versão <b>↗</b></a></div></article>}<div className="release-status">{syncing ? 'Sincronizando com os releases oficiais…' : 'Histórico sincronizado com o GitHub'}</div><div className="release-list">{visibleReleases.map((release, index) => { const asset = release.assets.find((item) => item.name.toLowerCase().endsWith('.exe')); return <article className={index >= revealedFrom ? 'release-reveal' : ''} style={{ animationDelay: `${Math.max(0, index - revealedFrom) * 90}ms` }} key={release.id}><div className="release-rail"><span>{String(index + 1).padStart(2, '0')}</span><i /></div><div className="release-content"><div className="release-title"><div><small>{index === 0 ? 'MAIS RECENTE' : 'VERSÃO ANTERIOR'}</small><h3>{release.tag_name}</h3></div><time>{new Intl.DateTimeFormat('pt-BR').format(new Date(release.published_at))}</time></div><div className="release-file"><span>{asset?.name || 'Arquivo disponível no release'}</span>{asset && <small>{(asset.size / 1024 / 1024).toFixed(1)} MB</small>}<a href={release.html_url}>{index === 0 ? 'Ver detalhes' : 'Ver release'} ↗</a></div><ReleaseBody body={release.body} /></div></article>; })}</div><div className={`release-loader ${visibleCount >= releases.length ? 'complete' : ''} ${loadingMore ? 'loading' : ''}`}><span />{loadingMore ? 'Carregando versões anteriores…' : visibleCount < releases.length ? 'Continue rolando para carregar versões anteriores' : `${releases.length} versões exibidas`}</div><a className="changelog-link" href={RELEASES_URL}>Ver todos os releases no GitHub <b>↗</b></a></section>;
}

type GithubLabel = { id: number; name: string; color: string };
type GithubIssue = {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: 'open' | 'closed';
  html_url: string;
  comments: number;
  updated_at: string;
  labels: GithubLabel[];
  pull_request?: unknown;
};
type IssueStatus = 'all' | 'open' | 'closed';
type IssueCategory = 'all' | 'faq' | 'bug' | 'sugestao' | 'duvida';

const issueCategories: { id: IssueCategory; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'faq', label: 'FAQ' },
  { id: 'bug', label: 'Problemas' },
  { id: 'sugestao', label: 'Sugestões' },
  { id: 'duvida', label: 'Dúvidas' },
];

function normalizeIssueText(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function issueSummary(issue: GithubIssue) {
  const cleanBody = (issue.body ?? '')
    .replace(/<!--[^]*?-->/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return cleanBody || 'Abra a discussão para conferir os detalhes e acompanhar as respostas.';
}

function IssueCard({ issue, side }: { issue: GithubIssue; side: 'left' | 'right' }) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return <a ref={cardRef} className={`issue-card from-${side} ${visible ? 'visible' : ''}`} href={issue.html_url}>
    <div className="issue-card-top"><span className={`issue-state ${issue.state}`}>{issue.state === 'open' ? 'Aberto' : 'Resolvido'}</span><small>#{issue.number}</small></div>
    <h3>{issue.title}</h3>
    <p>{issueSummary(issue)}</p>
    <div className="issue-labels">{issue.labels.slice(0, 3).map((label) => <span key={label.id} style={{ '--label-color': `#${label.color}` } as React.CSSProperties}>{label.name}</span>)}</div>
    <div className="issue-card-footer"><span>Atualizado em {new Intl.DateTimeFormat('pt-BR').format(new Date(issue.updated_at))}</span><b>{issue.comments} {issue.comments === 1 ? 'resposta' : 'respostas'} · Abrir ↗</b></div>
  </a>;
}

function Ajuda() {
  const [issues, setIssues] = useState<GithubIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<IssueStatus>('all');
  const [category, setCategory] = useState<IssueCategory>('all');
  const [visibleCount, setVisibleCount] = useState(2);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const loadingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(ISSUES_API_URL, { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('GitHub indisponível')))
      .then((data) => setIssues((data as GithubIssue[]).filter((issue) => !issue.pull_request)))
      .catch((error) => { if (error instanceof Error && error.name !== 'AbortError') setLoadError(true); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const normalizedQuery = normalizeIssueText(query.trim());
  const filteredIssues = issues.filter((issue) => {
    const labels = issue.labels.map((label) => normalizeIssueText(label.name));
    const matchesStatus = status === 'all' || issue.state === status;
    const matchesCategory = category === 'all' || labels.some((label) => label === category || label.includes(category));
    const searchable = normalizeIssueText(`${issue.title} ${issue.body ?? ''} ${labels.join(' ')}`);
    return matchesStatus && matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
  });
  const visibleIssues = filteredIssues.slice(0, visibleCount);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || visibleCount >= filteredIssues.length) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || loadingMore) return;
      setLoadingMore(true);
      loadingTimerRef.current = window.setTimeout(() => {
        setVisibleCount((count) => Math.min(count + 2, filteredIssues.length));
        setLoadingMore(false);
      }, 550);
    }, { rootMargin: '180px' });
    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredIssues.length, loadingMore, visibleCount]);
  useEffect(() => () => { if (loadingTimerRef.current) window.clearTimeout(loadingTimerRef.current); }, []);

  return <section className="section shell tab-section help-center">
    <div className="section-head split help-heading"><div><p className="eyebrow"><span /> AJUDA E FEEDBACK</p><h2>Encontre respostas.<br /><em>Ajude a melhorar.</em></h2></div><p>Consulte dúvidas, problemas conhecidos e sugestões da comunidade. Se não encontrar o que procura, envie seu relato pelo canal oficial.</p></div>
    <div className="feedback-actions">
      <a href={`${COMMUNITY_REPOSITORY_URL}/issues/new?template=bug_report.yml`}><span>01</span><div><b>Relatar um problema</b><small>Conte o que aconteceu e como reproduzir.</small></div><strong>↗</strong></a>
      <a href={`${COMMUNITY_REPOSITORY_URL}/issues/new?template=feature_request.yml`}><span>02</span><div><b>Sugerir uma melhoria</b><small>Compartilhe uma ideia para o Manager.</small></div><strong>↗</strong></a>
      <a href={`${COMMUNITY_REPOSITORY_URL}/issues/new?template=question.yml`}><span>03</span><div><b>Fazer uma pergunta</b><small>Peça ajuda à comunidade e acompanhe a resposta.</small></div><strong>↗</strong></a>
    </div>
    <div className="issue-browser">
      <div className="issue-toolbar">
        <label className="issue-search"><span>⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(2); }} placeholder="Pesquisar por título, descrição ou categoria" aria-label="Pesquisar nas dúvidas e feedbacks" />{query && <button onClick={() => { setQuery(''); setVisibleCount(2); }} aria-label="Limpar pesquisa">×</button>}</label>
        <div className="status-filter" aria-label="Filtrar por status">{(['all', 'open', 'closed'] as IssueStatus[]).map((item) => <button className={status === item ? 'active' : ''} key={item} onClick={() => { setStatus(item); setVisibleCount(2); }}>{item === 'all' ? 'Todos' : item === 'open' ? 'Abertos' : 'Resolvidos'}</button>)}</div>
      </div>
      <div className="category-filter" aria-label="Filtrar por categoria">{issueCategories.map((item) => <button className={category === item.id ? 'active' : ''} key={item.id} onClick={() => { setCategory(item.id); setVisibleCount(2); }}>{item.label}</button>)}</div>
      <div className="issue-results-title"><div><b>Discussões da comunidade</b><span>{filteredIssues.length} {filteredIssues.length === 1 ? 'resultado' : 'resultados'}</span></div><a href={`${COMMUNITY_REPOSITORY_URL}/issues`}>Ver tudo no GitHub ↗</a></div>
      {loading && <div className="issue-skeletons" aria-label="Carregando feedbacks">{Array.from({ length: 3 }, (_, index) => <div key={index}><span /><b /><i /></div>)}</div>}
      {!loading && loadError && <div className="issue-empty"><b>Não foi possível carregar as discussões agora.</b><span>Você ainda pode consultar e enviar feedback diretamente pelo GitHub.</span><a href={`${COMMUNITY_REPOSITORY_URL}/issues`}>Abrir central no GitHub ↗</a></div>}
      {!loading && !loadError && visibleIssues.length === 0 && <div className="issue-empty"><b>Nenhum resultado encontrado.</b><span>Tente remover algum filtro ou pesquisar usando outros termos.</span></div>}
      <div className="issue-grid">{visibleIssues.map((issue, index) => <IssueCard issue={issue} side={index % 2 === 0 ? 'left' : 'right'} key={issue.id} />)}</div>
      {!loading && !loadError && filteredIssues.length > 0 && <div className={`issue-load-more ${loadingMore ? 'loading' : ''}`} ref={loadMoreRef}><span />{loadingMore ? 'Carregando mais discussões…' : visibleCount < filteredIssues.length ? 'Continue rolando para carregar mais' : 'Todas as discussões foram exibidas'}</div>}
    </div>
  </section>;
}
