'use client';

import { useEffect, useRef, useState } from 'react';

const RELEASES_URL = 'https://github.com/onezer00/mu-login-manager-releases/releases';
const FALLBACK_DOWNLOAD_URL = `${RELEASES_URL}/download/v0.1.12-beta/Setup-MU-Login-Manager-0.1.12-beta.exe`;
type Tab = 'inicio' | 'recursos' | 'planos' | 'seguranca' | 'changelog';
const tabs: { id: Tab; label: string }[] = [{ id: 'inicio', label: 'Início' }, { id: 'recursos', label: 'Recursos' }, { id: 'planos', label: 'Planos' }, { id: 'seguranca', label: 'Segurança' }, { id: 'changelog', label: 'Novidades' }];
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

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('inicio');
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
      <nav className="tab-nav" aria-label="Navegação principal" role="tablist">{tabs.map((tab) => <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => navigate(tab.id)}>{tab.label}</button>)}</nav>
      <button className={`nav-cta nav-download ${preparingDownload ? 'preparing' : ''}`} disabled={preparingDownload} onClick={downloadLatest}>{preparingDownload ? 'Preparando…' : 'Baixar beta'}</button>
    </header>
    <div className={`tab-viewport slide-${direction}`} key={activeTab} role="tabpanel" aria-label={tabs.find((tab) => tab.id === activeTab)?.label}>
      {activeTab === 'inicio' && <Inicio onNavigate={navigate} />}{activeTab === 'recursos' && <Recursos />}{activeTab === 'planos' && <Planos onNavigate={navigate} />}{activeTab === 'seguranca' && <Seguranca />}{activeTab === 'changelog' && <Changelog />}
    </div>
    <div className="carousel-controls shell" aria-label="Controle das páginas"><button disabled={activeIndex === 0} onClick={() => navigate(tabs[activeIndex - 1].id)} aria-label="Página anterior">←</button><div>{tabs.map((tab) => <button key={tab.id} className={tab.id === activeTab ? 'active' : ''} onClick={() => navigate(tab.id)} aria-label={`Abrir ${tab.label}`} />)}</div><button disabled={activeIndex === tabs.length - 1} onClick={() => navigate(tabs[activeIndex + 1].id)} aria-label="Próxima página">→</button></div>
    <footer className="shell"><button className="brand brand-button" onClick={() => navigate('inicio')}><span className="brand-mark">MU</span><span>LOGIN MANAGER</span></button><p>Ferramenta independente para gerenciamento de contas.</p><span>© 2026 MU Login Manager</span></footer>
  </main>;
}

function Inicio({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return <><section className="hero shell"><div className="hero-copy"><p className="eyebrow"><span /> BETA PARA WINDOWS</p><h1>Suas contas de MU.<br /><em>Um só comando.</em></h1><p className="hero-lead">Organize, conecte e controle múltiplos clientes com uma experiência feita para quem leva sua party a sério.</p><div className="trial-pill"><b>7 DIAS GRÁTIS</b><span>Experimente o fluxo completo antes de escolher seu plano.</span></div><div className="hero-actions"><button className="primary" onClick={() => onNavigate('changelog')}>Experimentar grátis <b>→</b></button><button className="secondary" onClick={() => onNavigate('recursos')}>Ver como funciona</button></div><div className="trust-row"><span><b>✓</b> Sem cobrança no período</span><span><b>✓</b> Credenciais protegidas</span><span><b>✓</b> Instalação simples</span></div></div><ProductPreview /></section><section className="marquee" aria-label="Destaques"><div>LOGIN INTELIGENTE <span>✦</span> 7 DIAS GRÁTIS <span>✦</span> MULTI CONTAS <span>✦</span> AUTO UPDATE <span>✦</span> LOGIN INTELIGENTE</div></section><section className="final-cta shell compact-cta"><p className="eyebrow"><span /> CONHEÇA O MANAGER</p><h2>Da primeira conta<br /><em>à operação completa.</em></h2><button className="primary" onClick={() => onNavigate('recursos')}>Explorar recursos <b>→</b></button></section></>;
}

function ProductPreview() {
  return <div className="product-stage" aria-label="Prévia do painel do MU Login Manager"><div className="glow" /><div className="app-window"><div className="window-bar"><i /><i /><i /><span>MU Login Manager</span></div><div className="app-body"><aside><div className="mini-logo">MU</div>{['▣', '◉', '⌁', '$', '⚡', '⚙'].map((item, index) => <span className={index === 0 ? 'active' : ''} key={item}>{item}</span>)}</aside><div className="dashboard"><p>GERENCIAMENTO DE CONTAS</p><div className="stats"><div><small>ONLINE</small><strong>5</strong></div><div><small>OFFLINE</small><strong>4</strong></div><div><small>TOTAL</small><strong>9</strong></div></div><div className="controls"><b>▶ Logar todos</b><span>■ Parar execução</span></div><div className="accounts">{[['Rune Wizard', 'ONLINE'], ['Energy Elf', 'ONLINE'], ['Blade Knight', 'OFFLINE']].map(([name, status]) => <div key={name}><i>{name.slice(0, 1)}</i><span>{name}<small>Conta configurada</small></span><b className={status === 'ONLINE' ? 'online' : ''}>● {status}</b><em>•••</em></div>)}</div></div></div></div><div className="floating-card"><span>✓</span><div><b>Party conectada</b><small>5 contas online</small></div></div></div>;
}

function Recursos() {
  return <><section className="section shell tab-section"><div className="section-head"><p className="eyebrow"><span /> FEITO PARA SUA ROTINA</p><h2>Menos repetição.<br /><em>Mais tempo no jogo.</em></h2><p className="tab-intro">Um fluxo projetado para eliminar tarefas mecânicas sem tirar de você o controle das janelas e das contas.</p></div><div className="benefit-grid">{benefits.map(([number, title, copy]) => <article key={number}><span>{number}</span><div className="benefit-icon">{number === '01' ? '▦' : number === '02' ? '▶' : '⌘'}</div><h3>{title}</h3><p>{copy}</p></article>)}</div></section><section className="workflow"><div className="shell workflow-inner"><div><p className="eyebrow"><span /> FLUXO SIMPLES</p><h2>Configure uma vez.<br /><em>Use todos os dias.</em></h2></div><ol><li><b>01</b><span><strong>Cadastre suas contas</strong><small>Credenciais protegidas localmente pelo Windows.</small></span></li><li><b>02</b><span><strong>Calibre a automação</strong><small>Defina launcher, servidor e posições dos personagens.</small></span></li><li><b>03</b><span><strong>Clique em “Logar todos”</strong><small>O Manager cuida da sequência e mantém você no controle.</small></span></li></ol></div></section></>;
}

function Planos({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return <section className="section shell tab-section"><div className="section-head split"><div><p className="eyebrow"><span /> PLANOS</p><h2>Do primeiro grupo<br /><em>à operação completa.</em></h2></div><p>Escolha pelo número de contas simultâneas. Você pode manter outras contas configuradas e alternar quando precisar.</p></div><div className="trial-banner"><div><small>PRIMEIROS PASSOS</small><strong>Experimente 7 dias grátis</strong><span>Conheça o Manager no seu ritmo e escolha um plano depois.</span></div><button onClick={() => onNavigate('changelog')}>Começar período grátis <b>→</b></button></div><div className="plans">{plans.map((plan, index) => <article className={`plan ${plan.tone}`} key={plan.name}><div className="plan-top"><span>{String(index + 1).padStart(2, '0')}</span>{index === 1 && <b>POPULAR</b>}</div><h3>{plan.name}</h3><strong>{plan.price}<small>/ mês</small></strong><ul><li>✓ Até {plan.accounts}</li><li>✓ {plan.devices}</li><li>✓ Atualização automática</li></ul><button onClick={() => onNavigate('changelog')}>Experimentar este plano <b>→</b></button></article>)}</div></section>;
}

function Seguranca() {
  return <><section className="security security-tab"><div className="shell security-grid"><div className="shield">MU<span>✓</span></div><div><p className="eyebrow"><span /> TRANSPARÊNCIA DESDE O BETA</p><h2>Baixe sempre da<br /><em>fonte oficial.</em></h2><p>Durante o beta, o Windows pode exibir “O Windows protegeu o computador”. Isso acontece porque o instalador ainda não possui uma assinatura comercial.</p><div className="security-note"><b>Antes de executar</b><span>Confira o release oficial e o SHA-256 publicado. Nunca instale arquivos recebidos diretamente por terceiros.</span></div></div></div></section><section className="final-cta shell compact-cta"><p className="eyebrow"><span /> DOWNLOAD VERIFICADO</p><h2>Segurança começa<br /><em>na origem do arquivo.</em></h2><a className="primary" href={RELEASES_URL}>Acessar releases oficiais <b>↗</b></a></section></>;
}

type GithubAsset = { name: string; size: number; browser_download_url: string };
type GithubRelease = { id: number; tag_name: string; name: string; body: string | null; published_at: string; html_url: string; assets: GithubAsset[] };
const fallbackReleases: GithubRelease[] = [{ id: 12, tag_name: 'v0.1.12-beta', name: 'MU Login Manager 0.1.12-beta', body: null, published_at: '2026-08-27T19:10:21Z', html_url: `${RELEASES_URL}/tag/v0.1.12-beta`, assets: [{ name: 'Setup-MU-Login-Manager-0.1.12-beta.exe', size: 203450105, browser_download_url: `${RELEASES_URL}/download/v0.1.12-beta/Setup-MU-Login-Manager-0.1.12-beta.exe` }] }];

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
  return <section className="section shell tab-section changelog"><div className="section-head split"><div><p className="eyebrow"><span /> NOVIDADES DO MANAGER</p><h2>Baixe a versão mais<br /><em>recente e segura.</em></h2></div><p>Confira o que mudou, identifique o instalador correto e faça o download sempre pela publicação oficial.</p></div>{latest && <article className="latest-release"><div className="latest-copy"><span>VERSÃO RECOMENDADA</span><h3>{latest.name || latest.tag_name}</h3><p>{installer?.name || 'Instalador para Windows'}</p><small>{installer ? `${(installer.size / 1024 / 1024).toFixed(1)} MB` : 'Consulte os arquivos do release'} · Publicado em {new Intl.DateTimeFormat('pt-BR').format(new Date(latest.published_at))}</small><ReleaseBody body={latest.body} compact /></div><div className="latest-actions">{installer && <a className="primary" href={installer.browser_download_url}>Baixar instalador <b>↓</b></a>}<a href={latest.html_url}>Notas da versão <b>↗</b></a></div></article>}<div className="release-status">{syncing ? 'Sincronizando com os releases oficiais…' : 'Histórico sincronizado com o GitHub'}</div><div className="release-list">{visibleReleases.map((release, index) => { const asset = release.assets.find((item) => item.name.toLowerCase().endsWith('.exe')); return <article className={index >= revealedFrom ? 'release-reveal' : ''} style={{ animationDelay: `${Math.max(0, index - revealedFrom) * 90}ms` }} key={release.id}><div className="release-rail"><span>{String(index + 1).padStart(2, '0')}</span><i /></div><div className="release-content"><div className="release-title"><div><small>{index === 0 ? 'MAIS RECENTE' : 'VERSÃO ANTERIOR'}</small><h3>{release.tag_name}</h3></div><time>{new Intl.DateTimeFormat('pt-BR').format(new Date(release.published_at))}</time></div><div className="release-file"><span>{asset?.name || 'Arquivo disponível no release'}</span>{asset && <small>{(asset.size / 1024 / 1024).toFixed(1)} MB</small>}<a href={release.html_url}>{index === 0 ? 'Ver detalhes' : 'Ver release'} ↗</a></div><ReleaseBody body={release.body} /></div></article>; })}</div><div className={`release-loader ${visibleCount >= releases.length ? 'complete' : ''} ${loadingMore ? 'loading' : ''}`}><span />{loadingMore ? 'Carregando versões anteriores…' : visibleCount < releases.length ? 'Continue rolando para carregar versões anteriores' : `${releases.length} versões exibidas`}</div><a className="changelog-link" href={RELEASES_URL}>Ver todos os releases no GitHub <b>↗</b></a></section>;
}
