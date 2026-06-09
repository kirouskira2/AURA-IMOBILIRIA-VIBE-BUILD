-- ============================================================
-- AURA PROPERTIES — Schema Supabase
-- Gerado com base no documento de especificação técnica
-- ============================================================

-- ============================================================
-- 0. EXTENSÕES
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- 1. ENUMS
-- ============================================================

-- Perfis de acesso (RBAC)
CREATE TYPE public.user_role AS ENUM (
  'visitante',    -- Usuário anônimo/público (sem conta)
  'cliente_vip',  -- Cliente autenticado e aprovado
  'corretor',     -- Administrador Nível 1
  'gestor'        -- Administrador Nível 2 / Super Admin
);

-- Status do imóvel
CREATE TYPE public.property_status AS ENUM (
  'publico',      -- Visível para todos
  'off_market',   -- Apenas Clientes VIP e Admins
  'vendido',      -- Imóvel vendido (readonly)
  'inativo'       -- Soft delete / desativado
);

-- Status do lead
CREATE TYPE public.lead_status AS ENUM (
  'novo',
  'em_contato',
  'convertido',
  'perdido'
);

-- Origem do lead
CREATE TYPE public.lead_source AS ENUM (
  'newsletter',
  'formulario_contato',
  'whatsapp',
  'agendamento'
);


-- ============================================================
-- 2. TABELA: profiles
-- Estende o auth.users do Supabase com dados adicionais
-- ============================================================
CREATE TABLE public.profiles (
  id              UUID          PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       TEXT          NOT NULL,
  phone           TEXT,
  avatar_url      TEXT,
  role            public.user_role NOT NULL DEFAULT 'cliente_vip',
  is_approved     BOOLEAN       NOT NULL DEFAULT FALSE,  -- Aprovação manual pelo Gestor para acesso VIP
  corretor_id     UUID          REFERENCES public.profiles(id) ON DELETE SET NULL, -- Cliente vinculado a um corretor
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.profiles IS 'Dados adicionais dos usuários autenticados. Extende auth.users.';
COMMENT ON COLUMN public.profiles.role IS 'Papel do usuário no sistema (RBAC).';
COMMENT ON COLUMN public.profiles.is_approved IS 'Visitantes aprovados pelo Gestor se tornam Clientes VIP.';
COMMENT ON COLUMN public.profiles.corretor_id IS 'Corretor responsável pela carteira deste cliente.';


-- ============================================================
-- 3. TABELA: properties
-- Cadastro de imóveis
-- ============================================================
CREATE TABLE public.properties (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  corretor_id     UUID          REFERENCES public.profiles(id) ON DELETE SET NULL,
  title           TEXT          NOT NULL,
  slug            TEXT          UNIQUE NOT NULL,
  description     TEXT,
  price           NUMERIC(15,2) NOT NULL,
  address_full    TEXT,                          -- Endereço completo (visível apenas para VIP+)
  neighborhood    TEXT,
  city            TEXT          NOT NULL,
  state           CHAR(2)       NOT NULL DEFAULT 'SP',
  bedrooms        SMALLINT,
  bathrooms       SMALLINT,
  parking_spots   SMALLINT,
  area_sqm        NUMERIC(10,2),                 -- Metragem em m²
  status          public.property_status NOT NULL DEFAULT 'publico',
  is_featured     BOOLEAN       NOT NULL DEFAULT FALSE, -- Destaque na vitrine
  virtual_tour_url TEXT,                         -- Link para tour virtual
  floor_plan_url  TEXT,                          -- Planta baixa (VIP+)
  legal_docs_url  TEXT,                          -- Documentação legal (VIP+)
  whatsapp_number TEXT,                          -- Número do corretor para este imóvel
  views_count     INTEGER       NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.properties IS 'Cadastro completo de imóveis da Aura Properties.';
COMMENT ON COLUMN public.properties.address_full IS 'Endereço exato — restrito a Clientes VIP e Admins via RLS.';
COMMENT ON COLUMN public.properties.floor_plan_url IS 'Planta baixa — restrito a Clientes VIP e Admins via RLS.';
COMMENT ON COLUMN public.properties.status IS 'Controla a visibilidade pública do imóvel.';


-- ============================================================
-- 4. TABELA: property_images
-- Galeria de imagens por imóvel
-- ============================================================
CREATE TABLE public.property_images (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id     UUID          NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  url             TEXT          NOT NULL,
  alt_text        TEXT,
  is_cover        BOOLEAN       NOT NULL DEFAULT FALSE, -- Imagem principal de capa
  sort_order      SMALLINT      NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.property_images IS 'Galeria de imagens vinculadas a cada imóvel.';
COMMENT ON COLUMN public.property_images.is_cover IS 'Define a imagem exibida na vitrine/card do imóvel.';


-- ============================================================
-- 5. TABELA: leads
-- Captura de contatos via Newsletter e formulários
-- ============================================================
CREATE TABLE public.leads (
  id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
  corretor_id     UUID            REFERENCES public.profiles(id) ON DELETE SET NULL,
  property_id     UUID            REFERENCES public.properties(id) ON DELETE SET NULL,
  name            TEXT            NOT NULL,
  email           TEXT            NOT NULL,
  phone           TEXT,
  message         TEXT,
  source          public.lead_source NOT NULL,
  status          public.lead_status NOT NULL DEFAULT 'novo',
  is_newsletter   BOOLEAN         NOT NULL DEFAULT FALSE, -- Inscrito na newsletter off-market
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.leads IS 'Leads capturados por formulários, CTA e newsletter.';
COMMENT ON COLUMN public.leads.is_newsletter IS 'TRUE se o lead optou por receber oportunidades off-market.';
COMMENT ON COLUMN public.leads.property_id IS 'Imóvel de interesse que originou o lead (se aplicável).';


-- ============================================================
-- 6. TABELA: testimonials
-- Depoimentos gerenciados pelo CMS (Gestor)
-- ============================================================
CREATE TABLE public.testimonials (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name     TEXT          NOT NULL,
  client_title    TEXT,                          -- Ex: "Investidor | São Paulo"
  avatar_url      TEXT,
  content         TEXT          NOT NULL,
  rating          SMALLINT      CHECK (rating BETWEEN 1 AND 5),
  is_active       BOOLEAN       NOT NULL DEFAULT TRUE,
  sort_order      SMALLINT      NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.testimonials IS 'Depoimentos de clientes exibidos na landing page. Gerenciados pelo Gestor.';


-- ============================================================
-- 7. TABELA: favorites
-- Wishlist: relacionamento Cliente VIP ↔ Imóvel
-- ============================================================
CREATE TABLE public.favorites (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID          NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  property_id     UUID          NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, property_id)
);

COMMENT ON TABLE public.favorites IS 'Wishlist de imóveis favoritos por Cliente VIP.';


-- ============================================================
-- 8. TABELA: appointments
-- Agendamentos de visita/reunião por Clientes VIP
-- ============================================================
CREATE TABLE public.appointments (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id       UUID          NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  corretor_id     UUID          REFERENCES public.profiles(id) ON DELETE SET NULL,
  property_id     UUID          REFERENCES public.properties(id) ON DELETE SET NULL,
  scheduled_at    TIMESTAMPTZ   NOT NULL,
  notes           TEXT,
  is_confirmed    BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.appointments IS 'Agendamentos de visitas e reuniões de consultoria solicitados por Clientes VIP.';


-- ============================================================
-- 9. FUNÇÕES AUXILIARES
-- ============================================================

-- Retorna o role do usuário autenticado (usado nas políticas RLS)
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS public.user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Atualiza updated_at automaticamente
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


-- ============================================================
-- 10. TRIGGERS — updated_at automático
-- ============================================================
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- 11. TRIGGER — Criação automática de profile ao registrar
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, is_approved)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'cliente_vip',
    FALSE
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================
-- 12. ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments  ENABLE ROW LEVEL SECURITY;


-- ──────────────────────────────────────────
-- PROFILES
-- ──────────────────────────────────────────

-- Qualquer usuário autenticado pode ver seu próprio perfil
CREATE POLICY "profiles: leitura própria"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Corretor e Gestor podem ver todos os perfis
CREATE POLICY "profiles: leitura por admins"
  ON public.profiles FOR SELECT
  USING (public.get_my_role() IN ('corretor', 'gestor'));

-- Usuário pode atualizar seus próprios dados básicos
CREATE POLICY "profiles: atualização própria"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Apenas Gestor pode alterar roles e aprovar clientes
CREATE POLICY "profiles: gestão pelo gestor"
  ON public.profiles FOR UPDATE
  USING (public.get_my_role() = 'gestor');

-- Apenas Gestor pode inserir/deletar perfis manualmente
CREATE POLICY "profiles: inserção pelo gestor"
  ON public.profiles FOR INSERT
  WITH CHECK (public.get_my_role() = 'gestor');


-- ──────────────────────────────────────────
-- PROPERTIES
-- ──────────────────────────────────────────

-- Visitantes e qualquer um vê imóveis PÚBLICOS (sem dados sensíveis)
CREATE POLICY "properties: leitura pública"
  ON public.properties FOR SELECT
  USING (status = 'publico');

-- Clientes VIP aprovados veem também off-market
CREATE POLICY "properties: leitura cliente_vip"
  ON public.properties FOR SELECT
  USING (
    status IN ('publico', 'off_market')
    AND public.get_my_role() = 'cliente_vip'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_approved = TRUE
    )
  );

-- Corretores veem todos os seus imóveis (qualquer status)
CREATE POLICY "properties: leitura corretor (próprios)"
  ON public.properties FOR SELECT
  USING (
    public.get_my_role() = 'corretor'
    AND corretor_id = auth.uid()
  );

-- Gestor vê todos os imóveis sem restrição
CREATE POLICY "properties: leitura gestor"
  ON public.properties FOR SELECT
  USING (public.get_my_role() = 'gestor');

-- Corretor pode criar imóveis (vinculados a ele)
CREATE POLICY "properties: inserção por corretor"
  ON public.properties FOR INSERT
  WITH CHECK (
    public.get_my_role() IN ('corretor', 'gestor')
    AND corretor_id = auth.uid()
  );

-- Corretor pode atualizar/desativar seus próprios imóveis (sem delete real)
CREATE POLICY "properties: atualização por corretor (próprios)"
  ON public.properties FOR UPDATE
  USING (
    public.get_my_role() = 'corretor'
    AND corretor_id = auth.uid()
  );

-- Gestor pode atualizar qualquer imóvel
CREATE POLICY "properties: atualização pelo gestor"
  ON public.properties FOR UPDATE
  USING (public.get_my_role() = 'gestor');

-- Apenas Gestor pode deletar imóveis definitivamente
CREATE POLICY "properties: exclusão pelo gestor"
  ON public.properties FOR DELETE
  USING (public.get_my_role() = 'gestor');


-- ──────────────────────────────────────────
-- PROPERTY_IMAGES
-- ──────────────────────────────────────────

-- Segue a mesma lógica de visibilidade do imóvel pai
CREATE POLICY "property_images: leitura pública"
  ON public.property_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.id = property_id AND p.status = 'publico'
    )
  );

CREATE POLICY "property_images: leitura admins"
  ON public.property_images FOR SELECT
  USING (public.get_my_role() IN ('corretor', 'gestor'));

CREATE POLICY "property_images: leitura cliente_vip"
  ON public.property_images FOR SELECT
  USING (
    public.get_my_role() = 'cliente_vip'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_approved = TRUE)
  );

CREATE POLICY "property_images: escrita por admins"
  ON public.property_images FOR ALL
  USING (public.get_my_role() IN ('corretor', 'gestor'));


-- ──────────────────────────────────────────
-- LEADS
-- ──────────────────────────────────────────

-- Qualquer pessoa (incluindo anônimos) pode inserir um lead (formulário público)
CREATE POLICY "leads: inserção pública"
  ON public.leads FOR INSERT
  WITH CHECK (TRUE);

-- Corretor vê apenas leads vinculados a ele
CREATE POLICY "leads: leitura por corretor (próprios)"
  ON public.leads FOR SELECT
  USING (
    public.get_my_role() = 'corretor'
    AND corretor_id = auth.uid()
  );

-- Gestor vê todos os leads
CREATE POLICY "leads: leitura pelo gestor"
  ON public.leads FOR SELECT
  USING (public.get_my_role() = 'gestor');

-- Corretor e Gestor podem atualizar status dos leads
CREATE POLICY "leads: atualização por admins"
  ON public.leads FOR UPDATE
  USING (public.get_my_role() IN ('corretor', 'gestor'));


-- ──────────────────────────────────────────
-- TESTIMONIALS
-- ──────────────────────────────────────────

-- Qualquer pessoa vê depoimentos ativos
CREATE POLICY "testimonials: leitura pública"
  ON public.testimonials FOR SELECT
  USING (is_active = TRUE);

-- Gestor gerencia todos os depoimentos
CREATE POLICY "testimonials: gestão pelo gestor"
  ON public.testimonials FOR ALL
  USING (public.get_my_role() = 'gestor');


-- ──────────────────────────────────────────
-- FAVORITES
-- ──────────────────────────────────────────

-- Cliente VIP gerencia apenas sua própria wishlist
CREATE POLICY "favorites: CRUD próprio"
  ON public.favorites FOR ALL
  USING (
    auth.uid() = user_id
    AND public.get_my_role() = 'cliente_vip'
  );

-- Admins podem visualizar favoritos de qualquer cliente
CREATE POLICY "favorites: leitura por admins"
  ON public.favorites FOR SELECT
  USING (public.get_my_role() IN ('corretor', 'gestor'));


-- ──────────────────────────────────────────
-- APPOINTMENTS
-- ──────────────────────────────────────────

-- Cliente VIP pode criar agendamentos
CREATE POLICY "appointments: inserção por cliente_vip"
  ON public.appointments FOR INSERT
  WITH CHECK (
    auth.uid() = client_id
    AND public.get_my_role() = 'cliente_vip'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_approved = TRUE)
  );

-- Cliente vê apenas seus próprios agendamentos
CREATE POLICY "appointments: leitura própria"
  ON public.appointments FOR SELECT
  USING (auth.uid() = client_id);

-- Corretor vê agendamentos vinculados a ele
CREATE POLICY "appointments: leitura por corretor"
  ON public.appointments FOR SELECT
  USING (
    public.get_my_role() = 'corretor'
    AND corretor_id = auth.uid()
  );

-- Gestor vê todos os agendamentos
CREATE POLICY "appointments: leitura pelo gestor"
  ON public.appointments FOR SELECT
  USING (public.get_my_role() = 'gestor');

-- Corretor e Gestor podem confirmar/atualizar agendamentos
CREATE POLICY "appointments: atualização por admins"
  ON public.appointments FOR UPDATE
  USING (public.get_my_role() IN ('corretor', 'gestor'));


-- ============================================================
-- 13. ÍNDICES DE PERFORMANCE
-- ============================================================
CREATE INDEX idx_properties_status         ON public.properties(status);
CREATE INDEX idx_properties_corretor_id    ON public.properties(corretor_id);
CREATE INDEX idx_properties_is_featured    ON public.properties(is_featured);
CREATE INDEX idx_property_images_property  ON public.property_images(property_id);
CREATE INDEX idx_leads_corretor_id         ON public.leads(corretor_id);
CREATE INDEX idx_leads_status              ON public.leads(status);
CREATE INDEX idx_leads_source              ON public.leads(source);
CREATE INDEX idx_favorites_user_id         ON public.favorites(user_id);
CREATE INDEX idx_favorites_property_id     ON public.favorites(property_id);
CREATE INDEX idx_appointments_client_id    ON public.appointments(client_id);
CREATE INDEX idx_appointments_corretor_id  ON public.appointments(corretor_id);
CREATE INDEX idx_profiles_role             ON public.profiles(role);


-- ============================================================
-- 14. DADOS INICIAIS (Seed)
-- ============================================================

-- Depoimento de exemplo
INSERT INTO public.testimonials (client_name, client_title, content, rating, is_active, sort_order)
VALUES
  (
    'Carlos Mendonça',
    'Investidor | São Paulo',
    'A equipe da Aura superou todas as minhas expectativas. Encontrei o apartamento dos sonhos em menos de 30 dias.',
    5,
    TRUE,
    1
  ),
  (
    'Fernanda Alves',
    'Empresária | Rio de Janeiro',
    'Profissionalismo e discrição em toda a negociação. Recomendo a Aura para quem busca o melhor do mercado imobiliário.',
    5,
    TRUE,
    2
  );


-- ============================================================
-- FIM DO SCRIPT
-- ============================================================