# Especificação do Sistema - Aura Properties

## 1. Visão Geral
Este documento descreve a especificação técnica, os fluxos de interface e os controles de acesso para a plataforma **Aura Properties**, uma aplicação web focada no mercado imobiliário de luxo. A plataforma será dividida em uma interface pública (Landing Page/Vitrine) e um sistema de gestão interno (Painel Administrativo) e uma área restrita para clientes VIP.

---

## 2. Funcionalidades da Interface (Front-end)

### 2.1 Área Pública (Visitantes)
A interface atual exposta na Landing Page possui os seguintes recursos mapeados:
- **Hero Section & Apresentação:** Exibição de vídeos de alta qualidade (Tour Virtual) e introdução da marca.
- **Estatísticas de Mercado:** Mostrador de credibilidade (+R$ 2B em vendas, 15 Anos, etc).
- **Vitrine de Imóveis (Coleções):** 
  - Visualização de propriedades em destaque.
  - Informações sumárias: Preço, Localização, Quartos, Banheiros, Metragem.
- **Diferenciais & Serviços:** Seção informativa sobre a "Experiência Aura".
- **Depoimentos (Social Proof):** Histórias de sucesso de clientes.
- **Geração de Leads (Call to Action):** 
  - Botões para contato direto via WhatsApp.
  - Agendamento de Consultoria.
  - Inscrição em Newsletter para receber "oportunidades off-market".

### 2.2 Área Restrita (Futuras Implementações - Supabase)
Com a integração de um back-end, a interface passará a ter:
- **Painel Administrativo:** Dashboard para corretores e gerentes.
- **Área do Cliente VIP:** Um portal de login para clientes acessarem o portfólio "Off-Market".

---

## 3. Atores e Níveis de Acesso (RBAC - Role-Based Access Control)

O sistema contará com **4 tipos principais de acesso**. Cada perfil terá permissões específicas sobre as funcionalidades e dados do Supabase.

### 3.1 Visitante (Usuário Anônimo)
Usuário público que acessa o site sem autenticação.
- **Pode fazer:**
  - Navegar pela Landing Page e coleções públicas.
  - Visualizar detalhes básicos de imóveis públicos.
  - Inscrever-se na Newsletter.
  - Clicar para entrar em contato com um corretor via WhatsApp.
- **Não pode fazer:**
  - Acessar imóveis marcados como "Off-Market" ou "Restritos".
  - Ver dados sensíveis de propriedades (endereço exato, documentos).

### 3.2 Cliente VIP (Usuário Autenticado)
Cliente cadastrado e aprovado pela equipe da Aura, com foco em investimento e alto padrão.
- **Pode fazer:**
  - Fazer Login via e-mail/senha ou Magic Link.
  - Acessar o portfólio completo, incluindo **Lançamentos Exclusivos** e imóveis **Off-Market**.
  - Visualizar material estendido de imóveis (Plantas baixas, documentação legal básica, endereço completo).
  - Salvar propriedades favoritas (Wishlist).
  - Solicitar agendamento de visita/reunião de forma prioritária.

### 3.3 Corretor / Agente (Administrador Nível 1)
Profissional da equipe Aura responsável pela captação e venda.
- **Pode fazer:**
  - Acessar o Painel Administrativo.
  - **Imóveis (CRUD):** Criar, ler, atualizar e desativar listagens de imóveis sob sua responsabilidade.
  - **Leads:** Visualizar leads gerados pela Newsletter ou formulários de contato vinculados a ele.
  - **Clientes:** Ver lista de Clientes VIP associados à sua carteira.
- **Não pode fazer:**
  - Excluir definitivamente imóveis do banco de dados (soft delete apenas).
  - Alterar configurações globais do site ou gerenciar outros corretores.

### 3.4 Gestor / Super Admin (Administrador Nível 2)
Diretoria ou Gerência Geral da agência.
- **Pode fazer:**
  - **Tudo que o Corretor pode fazer.**
  - **Gestão de Usuários:** Adicionar, editar ou remover Corretores do sistema. Aprovar Visitantes para o status de "Cliente VIP".
  - **Gestão de Imóveis Total:** Editar ou excluir qualquer imóvel de qualquer corretor.
  - **Conteúdo (CMS):** Adicionar/Remover Depoimentos da landing page, editar os Serviços/Diferenciais exibidos no site.
  - **Relatórios:** Acessar estatísticas totais (quantos leads capturados na semana, visualizações de imóveis).

---

## 4. Estrutura de Entidades Sugerida (Supabase / Banco de Dados)

Com base nas funcionalidades e acessos, o banco de dados precisará das seguintes tabelas principais:

1. **`users` (Gerenciado pelo Supabase Auth):** Perfis de autenticação.
2. **`profiles`:** Dados adicionais do usuário (Nome, Telefone, Role [Admin, Corretor, Cliente, Visitante]).
3. **`properties`:** Cadastro de imóveis (Título, Descrição, Preço, Quartos, Banheiros, Metragem, Status [Público, Off-Market, Vendido]).
4. **`property_images`:** Galeria de imagens ligada a cada imóvel.
5. **`leads`:** Pessoas que preencheram formulários de contato ou newsletter.
6. **`testimonials`:** Controle de depoimentos dinâmicos para a página inicial.
7. **`favorites`:** Tabela de relacionamento entre `users` (Clientes VIP) e `properties` salvas.

---
## Próximos Passos
Esta especificação serve como base para a criação do esquema no Supabase. Caso aprovado, o próximo passo é criar o projeto no Supabase, provisionar as tabelas utilizando migrations e implementar os fluxos de Autenticação no Next.js.
