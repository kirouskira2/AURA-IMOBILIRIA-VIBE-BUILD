# AURA Imobiliaria VIBE Build

Projeto de portal imobiliario de alto padrao.

## Funcionalidades

- Landing Page otimizada e responsiva.
- Area VIP (off-market) com autenticacao de clientes e favoritos.
- CMS/Painel Administrativo para controle de imoveis e leads.
- Integracao com Supabase (Banco de Dados e Autenticacao).

## Tecnologias

- Next.js 15
- Supabase
- TailwindCSS
- TypeScript
- Framer Motion

## Como rodar localmente

1. Instale as dependencias:
   npm install

2. Configure o arquivo .env.local com as chaves do Supabase:
   NEXT_PUBLIC_SUPABASE_URL=seu_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key

3. Inicie o servidor de desenvolvimento:
   npm run dev

4. Para gerar o build de producao:
   npm run build
   npm run start
