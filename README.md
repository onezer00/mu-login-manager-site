<div align="center">
  <img src="public/og.png" alt="MU Login Manager" width="400" />
  
  ---

  # MU Login Manager 
  ## Suas contas, um só comando
  
  **Gerencie múltiplas contas e clientes de MU Online com automação inteligente**
  
  [🌐 Visite o Site](https://muloginmanager.com.br) • [📥 Baixar App](https://github.com/onezer00/mu-login-manager-releases/releases) • [❓ Ajuda](https://muloginmanager.com.br/ajuda/) • [📋 Novidades](https://muloginmanager.com.br/novidades/)
  
</div>

---

## 📖 Sobre

O **MU Login Manager** é a solução completa para jogadores sérios de MU Online que gerenciam múltiplas contas. Esta é a base do site e documentação do projeto.

### ✨ O que oferecemos

- **🎮 Gerenciamento de Contas** — Visualize status, personagem, PID e janela de cada conta em um único painel
- **⚡ Login em Sequência** — Automatize launcher, servidor e personagem respeitando os limites do seu plano
- **🎯 Controle Preciso** — Restaure, minimize, religue ou encerre somente as janelas vinculadas pelo Manager
- **🆓 7 Dias Grátis** — Teste qualquer plano sem compromisso

---

## 🚀 Quick Start

### Pré-requisitos

- **Node.js** >= 22.13.0
- **pnpm** (recomendado) ou npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/onezer00/mu-login-manager-site.git
cd mu-login-manager-site

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm run dev
```

Acesse `http://localhost:3000` para visualizar o site em desenvolvimento.

---


## 📦 Detalhes das Tecnologias

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| ![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js) | 16.2.6 | Framework React full-stack |
| ![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react) | 19.2.6 | Biblioteca UI |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) | 5.9.3 | Type safety |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css) | 4.2.1 | Estilização |
| ![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite) | 8.0.13 | Build tool |
| ![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=flat-square&logo=eslint) | 9.39.4 | Code linting |

---

## 📁 Estrutura do Projeto

```
mu-login-manager-site/
├── app/                          # Aplicação Next.js
│   ├── layout.tsx               # Layout raiz
│   ├── page.tsx                 # Página inicial
│   ├── globals.css              # Estilos globais
│   ├── legal-shell.tsx          # Shell para páginas legais
│   ├── ajuda/                   # Página de Ajuda
│   ├── novidades/               # Página de Novidades
│   ├── planos/                  # Página de Planos
│   ├── privacidade/             # Política de Privacidade
│   ├── recursos/                # Página de Recursos
│   └── riscos/                  # Aviso de Riscos
├── public/                       # Arquivos estáticos
│   ├── og.png                   # Social media preview
│   ├── favicon.ico              # Favicon
│   ├── robots.txt               # SEO
│   └── sitemap.xml              # Mapa do site
├── scripts/                      # Scripts de build
│   └── inject-favicon.mjs       # Injetor de favicon
├── eslint.config.mjs            # Configuração ESLint
├── next.config.ts               # Configuração Next.js
├── tsconfig.json                # Configuração TypeScript
├── vite.config.ts               # Configuração Vite
└── package.json                 # Dependências
```

---

## 💰 Planos e Preços

| Plano | Contas | PCs | Preço |
|-------|--------|-----|-------|
| **Party** | 5 | 1 | R$ 49,90/mês |
| **Party + Farm** | 10 | 1 | R$ 79,90/mês |
| **Multi Party** | 20 | 2 | R$ 149,90/mês |
| **Farm Pro** | 40 | 3 | R$ 179,90/mês |

✅ **7 dias gratuitos** em qualquer plano  
✅ **Cancele antes dos 7 dias** e não pague nada  
✅ **Sem cobranças iniciais**

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev          # Inicia servidor de desenvolvimento

# Build
pnpm run build        # Build Next.js + injeção de favicon
pnpm run build:pages  # Build para GitHub Pages

# Produção
pnpm run start        # Inicia servidor de produção

# Validação
pnpm run lint         # Executa ESLint
```

---

## 🌐 Deploy

### GitHub Pages

O projeto está configurado para deploy automático no GitHub Pages. O build está otimizado para exportação estática:

```bash
# Build para GitHub Pages (com favicon injetado)
pnpm run build:pages
```

**Configuração automática** via `next.config.ts`:
- Output estático
- Imagens sem otimização
- Trailing slashes

### Cloudflare Workers

O projeto suporta deploy via Cloudflare Workers:

```bash
# Autenticação
wrangler auth login

# Deploy
wrangler deploy
```

---

## 📄 Documentação

### Páginas Disponíveis

- 🏠 **[Início](https://muloginmanager.com.br)** — Landing page principal
- 🎯 **[Recursos](https://muloginmanager.com.br/recursos/)** — Funcionalidades em detalhes
- 💳 **[Planos](https://muloginmanager.com.br/planos/)** — Preços e comparação
- ⚠️ **[Segurança](https://muloginmanager.com.br/riscos/)** — Avisos e precauções
- 📰 **[Novidades](https://muloginmanager.com.br/novidades/)** — Histórico de versões
- ❓ **[Ajuda](https://muloginmanager.com.br/ajuda/)** — Dúvidas frequentes
- 🔒 **[Privacidade](https://muloginmanager.com.br/privacidade/)** — Política de privacidade

---

## 🔍 SEO

O projeto está otimizado para SEO com:

- ✅ Metadados estruturados (Open Graph, Twitter Card)
- ✅ Sitemap dinâmico (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)
- ✅ Verificação Google Search Console
- ✅ URLs limpas e semânticas
- ✅ Canonical tags

---

## 🐛 Bugs e Issues

Encontrou um bug ou tem uma sugestão? 

👉 [Abra uma issue no GitHub](https://github.com/onezer00/mu-login-manager-site/issues)

**Ao reportar:**
1. Descreva o problema em detalhes
2. Especifique seu SO (Windows)
3. Indique passos para reproduzir
4. Anexe screenshots se necessário

---

## 📱 Suporte

- 💬 **[Centro de Ajuda](https://muloginmanager.com.br/ajuda/)** — Dúvidas frequentes
- 🔗 **[GitHub Issues](https://github.com/onezer00/mu-login-manager-site/issues)** — Reporte bugs
- 📥 **[Baixe a App](https://github.com/onezer00/mu-login-manager-releases/releases)** — Versão mais recente

---

## ⚖️ Avisos Importantes

- ⚠️ **Ferramenta independente** — Não é afiliada à Webzen
- 🎮 **Apenas para MU Online** — Compatível com Windows
- 📋 **Leia a [Política de Privacidade](https://muloginmanager.com.br/privacidade/)** antes de usar
- ⚠️ **Conheça os [Riscos de Uso](https://muloginmanager.com.br/riscos/)** antes de utilizar

---

## 📜 Licença

Este projeto está licenciado sob a MIT License — veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📊 Status do Projeto

```
Versão: v0.1.27-beta
Status: Em Desenvolvimento
Plataforma: Windows (Desktop App)
Última atualização: Agosto de 2026
```

---

<div align="center">
  
  ### Desenvolvido com ❤️ por [onezer00](https://github.com/onezer00)
  
  **[🌐 Visite muloginmanager.com.br](https://muloginmanager.com.br)**
  
  ⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!
  
</div>
