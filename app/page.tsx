'use client';

import { useState } from 'react';

const RELEASES_URL = 'https://github.com/onezer00/mu-login-manager-releases/releases';
type Tab = 'inicio' | 'recursos' | 'planos' | 'seguranca' | 'changelog';
const tabs: { id: Tab; label: string }[] = [{ id: 'inicio', label: 'Início' }, { id: 'recursos', label: 'Recursos' }, { id: 'planos', label: 'Planos' }, { id: 'seguranca', label: 'Segurança' }, { id: 'changelog', label: 'Changelog' }];
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
  const navigate = (tab: Tab) => { if (tab !== activeTab) { setDirection(tabs.findIndex((item) => item.id === tab) > tabs.findIndex((item) => item.id === activeTab) ? 'next' : 'previous'); setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  return <main>
    <header className="nav shell">
      <button className="brand brand-button" onClick={() => navigate('inicio')} aria-label="MU Login Manager — início"><span className="brand-mark">MU</span><span>LOGIN MANAGER</span></button>
      <nav className="tab-nav" aria-label="Navegação principal" role="tablist">{tabs.map((tab) => <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => navigate(tab.id)}>{tab.label}</button>)}</nav>
      <a className="nav-cta" href={RELEASES_URL}>Baixar beta</a>
    </header>
    <div className={`tab-viewport slide-${direction}`} key={activeTab} role="tabpanel" aria-label={tabs.find((tab) => tab.id === activeTab)?.label}>
      {activeTab === 'inicio' && <Inicio onNavigate={navigate} />}{activeTab === 'recursos' && <Recursos />}{activeTab === 'planos' && <Planos />}{activeTab === 'seguranca' && <Seguranca />}{activeTab === 'changelog' && <Changelog />}
    </div>
    <div className="carousel-controls shell" aria-label="Controle das páginas"><button disabled={activeIndex === 0} onClick={() => navigate(tabs[activeIndex - 1].id)} aria-label="Página anterior">←</button><div>{tabs.map((tab) => <button key={tab.id} className={tab.id === activeTab ? 'active' : ''} onClick={() => navigate(tab.id)} aria-label={`Abrir ${tab.label}`} />)}</div><button disabled={activeIndex === tabs.length - 1} onClick={() => navigate(tabs[activeIndex + 1].id)} aria-label="Próxima página">→</button></div>
    <footer className="shell"><button className="brand brand-button" onClick={() => navigate('inicio')}><span className="brand-mark">MU</span><span>LOGIN MANAGER</span></button><p>Ferramenta independente para gerenciamento de contas.</p><span>© 2026 MU Login Manager</span></footer>
  </main>;
}

function Inicio({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return <><section className="hero shell"><div className="hero-copy"><p className="eyebrow"><span /> BETA PARA WINDOWS</p><h1>Suas contas de MU.<br /><em>Um só comando.</em></h1><p className="hero-lead">Organize, conecte e controle múltiplos clientes com uma experiência feita para quem leva sua party a sério.</p><div className="trial-pill"><b>7 DIAS GRÁTIS</b><span>Experimente o fluxo completo antes de escolher seu plano.</span></div><div className="hero-actions"><a className="primary" href={RELEASES_URL}>Experimentar grátis <b>↗</b></a><button className="secondary" onClick={() => onNavigate('recursos')}>Ver como funciona</button></div><div className="trust-row"><span><b>✓</b> Sem cobrança no período</span><span><b>✓</b> Credenciais protegidas</span><span><b>✓</b> Instalação simples</span></div></div><ProductPreview /></section><section className="marquee" aria-label="Destaques"><div>LOGIN INTELIGENTE <span>✦</span> 7 DIAS GRÁTIS <span>✦</span> MULTI CONTAS <span>✦</span> AUTO UPDATE <span>✦</span> LOGIN INTELIGENTE</div></section><section className="final-cta shell compact-cta"><p className="eyebrow"><span /> CONHEÇA O MANAGER</p><h2>Da primeira conta<br /><em>à operação completa.</em></h2><button className="primary" onClick={() => onNavigate('recursos')}>Explorar recursos <b>→</b></button></section></>;
}

function ProductPreview() {
  return <div className="product-stage" aria-label="Prévia do painel do MU Login Manager"><div className="glow" /><div className="app-window"><div className="window-bar"><i /><i /><i /><span>MU Login Manager</span></div><div className="app-body"><aside><div className="mini-logo">MU</div>{['▣', '◉', '⌁', '$', '⚡', '⚙'].map((item, index) => <span className={index === 0 ? 'active' : ''} key={item}>{item}</span>)}</aside><div className="dashboard"><p>GERENCIAMENTO DE CONTAS</p><div className="stats"><div><small>ONLINE</small><strong>5</strong></div><div><small>OFFLINE</small><strong>4</strong></div><div><small>TOTAL</small><strong>9</strong></div></div><div className="controls"><b>▶ Logar todos</b><span>■ Parar execução</span></div><div className="accounts">{[['Rune Wizard', 'ONLINE'], ['Energy Elf', 'ONLINE'], ['Blade Knight', 'OFFLINE']].map(([name, status]) => <div key={name}><i>{name.slice(0, 1)}</i><span>{name}<small>Conta configurada</small></span><b className={status === 'ONLINE' ? 'online' : ''}>● {status}</b><em>•••</em></div>)}</div></div></div></div><div className="floating-card"><span>✓</span><div><b>Party conectada</b><small>5 contas online</small></div></div></div>;
}

function Recursos() {
  return <><section className="section shell tab-section"><div className="section-head"><p className="eyebrow"><span /> FEITO PARA SUA ROTINA</p><h2>Menos repetição.<br /><em>Mais tempo no jogo.</em></h2><p className="tab-intro">Um fluxo projetado para eliminar tarefas mecânicas sem tirar de você o controle das janelas e das contas.</p></div><div className="benefit-grid">{benefits.map(([number, title, copy]) => <article key={number}><span>{number}</span><div className="benefit-icon">{number === '01' ? '▦' : number === '02' ? '▶' : '⌘'}</div><h3>{title}</h3><p>{copy}</p></article>)}</div></section><section className="workflow"><div className="shell workflow-inner"><div><p className="eyebrow"><span /> FLUXO SIMPLES</p><h2>Configure uma vez.<br /><em>Use todos os dias.</em></h2></div><ol><li><b>01</b><span><strong>Cadastre suas contas</strong><small>Credenciais protegidas localmente pelo Windows.</small></span></li><li><b>02</b><span><strong>Calibre a automação</strong><small>Defina launcher, servidor e posições dos personagens.</small></span></li><li><b>03</b><span><strong>Clique em “Logar todos”</strong><small>O Manager cuida da sequência e mantém você no controle.</small></span></li></ol></div></section></>;
}

function Planos() {
  return <section className="section shell tab-section"><div className="section-head split"><div><p className="eyebrow"><span /> PLANOS</p><h2>Do primeiro grupo<br /><em>à operação completa.</em></h2></div><p>Escolha pelo número de contas simultâneas. Você pode manter outras contas configuradas e alternar quando precisar.</p></div><div className="trial-banner"><div><small>PRIMEIROS PASSOS</small><strong>Experimente 7 dias grátis</strong><span>Conheça o Manager no seu ritmo e escolha um plano depois.</span></div><a href={RELEASES_URL}>Começar período grátis <b>→</b></a></div><div className="plans">{plans.map((plan, index) => <article className={`plan ${plan.tone}`} key={plan.name}><div className="plan-top"><span>{String(index + 1).padStart(2, '0')}</span>{index === 1 && <b>POPULAR</b>}</div><h3>{plan.name}</h3><strong>{plan.price}<small>/ mês</small></strong><ul><li>✓ Até {plan.accounts}</li><li>✓ {plan.devices}</li><li>✓ Atualização automática</li></ul><a href={RELEASES_URL}>Começar agora <b>→</b></a></article>)}</div></section>;
}

function Seguranca() {
  return <><section className="security security-tab"><div className="shell security-grid"><div className="shield">MU<span>✓</span></div><div><p className="eyebrow"><span /> TRANSPARÊNCIA DESDE O BETA</p><h2>Baixe sempre da<br /><em>fonte oficial.</em></h2><p>Durante o beta, o Windows pode exibir “O Windows protegeu o computador”. Isso acontece porque o instalador ainda não possui uma assinatura comercial.</p><div className="security-note"><b>Antes de executar</b><span>Confira o release oficial e o SHA-256 publicado. Nunca instale arquivos recebidos diretamente por terceiros.</span></div></div></div></section><section className="final-cta shell compact-cta"><p className="eyebrow"><span /> DOWNLOAD VERIFICADO</p><h2>Segurança começa<br /><em>na origem do arquivo.</em></h2><a className="primary" href={RELEASES_URL}>Acessar releases oficiais <b>↗</b></a></section></>;
}

function Changelog() {
  const releases = [
    { version: 'v0.1.x-beta', label: 'Ciclo atual', date: 'Em evolução', items: ['Atualização automática integrada ao status do serviço.', 'Seleção individual das contas incluídas no login em lote.', 'Reconhecimento e controle das janelas vinculadas pelo Manager.', 'Experiência visual e instalador refinados para o beta.'] },
    { version: 'Base beta', label: 'Fundação', date: 'Primeiras versões', items: ['Gerenciamento de múltiplas contas em uma única interface.', 'Automação calibrável de launcher, servidor e personagem.', 'Planos com limites de contas e dispositivos.', 'Persistência local protegida pelo Windows.'] },
  ];
  return <section className="section shell tab-section changelog"><div className="section-head split"><div><p className="eyebrow"><span /> HISTÓRICO DE VERSÕES</p><h2>O Manager melhora<br /><em>a cada patch.</em></h2></div><p>Acompanhe as principais mudanças do beta. Os detalhes técnicos completos continuam disponíveis nos releases oficiais.</p></div><div className="release-list">{releases.map((release, index) => <article key={release.version}><div className="release-rail"><span>{String(index + 1).padStart(2, '0')}</span><i /></div><div className="release-content"><div className="release-title"><div><small>{release.label}</small><h3>{release.version}</h3></div><time>{release.date}</time></div><ul>{release.items.map((item) => <li key={item}><b>+</b>{item}</li>)}</ul></div></article>)}</div><a className="changelog-link" href={RELEASES_URL}>Ver todos os releases no GitHub <b>↗</b></a></section>;
}
