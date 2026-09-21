-- ============================================================
-- BAGHDASARYAN PRODUCTION — DATABASE SCHEMA
-- Run in Supabase SQL editor, or via `supabase db push`
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- ROLES & ADMIN USERS ----------
-- Admin/editor accounts live in Supabase Auth (auth.users).
-- This table extends them with a role and profile info.
create type app_role as enum ('admin', 'editor');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role app_role not null default 'editor',
  created_at timestamptz not null default now()
);

-- ---------- SITE SETTINGS (single-row config) ----------
create table site_settings (
  id int primary key default 1,
  company_name text not null default 'Baghdasaryan Production',
  phone text not null default '+374 33 033 087',
  email text not null default 'baghdasaryanproduction@gmail.com',
  whatsapp text,
  address text,
  business_hours text,
  social_links jsonb not null default '{}'::jsonb, -- { instagram, facebook, tiktok, youtube }
  default_language text not null default 'hy',
  enabled_languages text[] not null default array['hy','en'],
  analytics jsonb not null default '{}'::jsonb, -- { ga4_id, meta_pixel_id }
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into site_settings (id) values (1);

-- ---------- TRANSLATABLE CONTENT (homepage + generic page sections) ----------
create table pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null, -- 'home', 'about', 'process', ...
  status text not null default 'draft' check (status in ('draft','published')),
  seo_title jsonb not null default '{}'::jsonb,       -- { hy: "...", en: "..." }
  seo_description jsonb not null default '{}'::jsonb,
  sections jsonb not null default '[]'::jsonb,        -- ordered array of section blocks, each translatable
  updated_at timestamptz not null default now()
);

-- ---------- SERVICES ----------
create table service_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name jsonb not null default '{}'::jsonb,
  sort_order int not null default 0
);

create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category_slug text,
  title jsonb not null default '{}'::jsonb,
  short_description jsonb not null default '{}'::jsonb,
  full_description jsonb not null default '{}'::jsonb,
  inclusions jsonb not null default '[]'::jsonb,   -- [{hy:'', en:''}, ...]
  add_ons jsonb not null default '[]'::jsonb,
  cover_image_url text,
  gallery_urls text[] not null default '{}',
  seo_title jsonb not null default '{}'::jsonb,
  seo_description jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- PORTFOLIO ----------
create table portfolio_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  event_type text not null, -- 'wedding' | 'baptism' | 'birthday' | 'engagement' | 'proposal' | 'corporate' | 'private' | 'other'
  location text,
  event_date date,
  title jsonb not null default '{}'::jsonb,
  short_description jsonb not null default '{}'::jsonb,
  full_description jsonb not null default '{}'::jsonb,
  cover_image_url text,
  gallery_urls text[] not null default '{}',
  video_url text,
  is_featured boolean not null default false,
  seo_title jsonb not null default '{}'::jsonb,
  seo_description jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- MEDIA LIBRARY ----------
create table media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null, -- path within the `media` Supabase Storage bucket
  kind text not null default 'image' check (kind in ('image','video')),
  alt_text jsonb not null default '{}'::jsonb,
  title text,
  width int,
  height int,
  created_at timestamptz not null default now()
);

-- ---------- TESTIMONIALS ----------
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  event_type text,
  quote jsonb not null default '{}'::jsonb,
  photo_media_id uuid references media(id) on delete set null,
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- FAQ ----------
create table faqs (
  id uuid primary key default gen_random_uuid(),
  question jsonb not null default '{}'::jsonb,
  answer jsonb not null default '{}'::jsonb,
  page_scope text, -- e.g. 'global' | 'services/weddings' | ...
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order int not null default 0
);

-- ---------- BLOG ----------
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title jsonb not null default '{}'::jsonb,
  excerpt jsonb not null default '{}'::jsonb,
  body jsonb not null default '{}'::jsonb, -- rich text/markdown per language
  cover_media_id uuid references media(id) on delete set null,
  categories text[] not null default '{}',
  tags text[] not null default '{}',
  author text,
  seo_title jsonb not null default '{}'::jsonb,
  seo_description jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- NAVIGATION ----------
create table navigation_items (
  id uuid primary key default gen_random_uuid(),
  label jsonb not null default '{}'::jsonb,
  href text not null,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  is_cta boolean not null default false
);

-- ---------- LEADS ----------
create type lead_status as enum ('new','contacted','qualified','proposal_sent','booked','completed','lost');

create table leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  event_type text not null,
  event_location text not null,
  guest_count int not null check (guest_count > 0),
  email text not null,
  phone text not null,
  budget_range text not null,
  additional_information text,
  privacy_consent boolean not null default false,
  source text,
  status lead_status not null default 'new',
  admin_notes text,
  follow_up_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Configurable option lists referenced by the consultation form
create table lead_form_options (
  id uuid primary key default gen_random_uuid(),
  field text not null check (field in ('event_type','budget_range')),
  value text not null,
  label jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  is_active boolean not null default true
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profiles enable row level security;
alter table site_settings enable row level security;
alter table pages enable row level security;
alter table service_categories enable row level security;
alter table services enable row level security;
alter table portfolio_items enable row level security;
alter table media enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;
alter table blog_posts enable row level security;
alter table navigation_items enable row level security;
alter table leads enable row level security;
alter table lead_form_options enable row level security;

-- Helper: is the current user an admin/editor?
create or replace function is_staff()
returns boolean language sql stable security definer as $$
  select exists (select 1 from profiles where id = auth.uid());
$$;

-- Public (anon) read access to PUBLISHED content only
create policy "public read published pages" on pages for select using (status = 'published');
create policy "public read published services" on services for select using (status = 'published');
create policy "public read categories" on service_categories for select using (true);
create policy "public read published portfolio" on portfolio_items for select using (status = 'published');
create policy "public read media" on media for select using (true);
create policy "public read published testimonials" on testimonials for select using (status = 'published');
create policy "public read published faqs" on faqs for select using (status = 'published');
create policy "public read published blog" on blog_posts for select using (status = 'published');
create policy "public read nav" on navigation_items for select using (is_visible = true);
create policy "public read site settings" on site_settings for select using (true);
create policy "public read active form options" on lead_form_options for select using (is_active = true);

-- Staff (authenticated admin/editor) full read/write on content tables
create policy "staff manage pages" on pages for all using (is_staff()) with check (is_staff());
create policy "staff manage services" on services for all using (is_staff()) with check (is_staff());
create policy "staff manage categories" on service_categories for all using (is_staff()) with check (is_staff());
create policy "staff manage portfolio" on portfolio_items for all using (is_staff()) with check (is_staff());
create policy "staff manage media" on media for all using (is_staff()) with check (is_staff());
create policy "staff manage testimonials" on testimonials for all using (is_staff()) with check (is_staff());
create policy "staff manage faqs" on faqs for all using (is_staff()) with check (is_staff());
create policy "staff manage blog" on blog_posts for all using (is_staff()) with check (is_staff());
create policy "staff manage nav" on navigation_items for all using (is_staff()) with check (is_staff());
create policy "staff manage settings" on site_settings for update using (is_staff());
create policy "staff manage form options" on lead_form_options for all using (is_staff()) with check (is_staff());
create policy "staff read own profile" on profiles for select using (auth.uid() = id or is_staff());

-- Leads: NEVER readable by anon/public. Insert only via server (service role), read only by staff.
create policy "staff read leads" on leads for select using (is_staff());
create policy "staff update leads" on leads for update using (is_staff());
-- No insert/select policy for anon: lead creation happens server-side with the
-- service-role key inside the /api/leads route, never directly from the browser.

-- ============================================================
-- SEED: default lead form options (edit freely from /admin later)
-- ============================================================
insert into lead_form_options (field, value, label, sort_order) values
  ('event_type','wedding','{"hy":"\u0540\u0561\u0580\u057d\u0561\u0576\u0565\u056f\u0561\u0576","en":"Wedding"}', 1),
  ('event_type','destination_wedding','{"hy":"\u0538\u0561\u0576\u0561\u0583\u0561\u0580 \u0570\u0561\u0580\u057d\u0561\u0576\u0565\u056f\u0561\u0576","en":"Destination Wedding"}', 2),
  ('event_type','baptism','{"hy":"\u0544\u056f\u0580\u057f\u0578\u0582\u0569\u0575\u0578\u0582\u0576","en":"Baptism"}', 3),
  ('event_type','birthday','{"hy":"\u056e\u0576\u0576\u0564\u0575\u0561\u0576 \u0585\u0580","en":"Birthday"}', 4),
  ('event_type','engagement','{"hy":"\u0546\u0577\u0561\u0576\u0564\u0561\u057e\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576","en":"Engagement"}', 5),
  ('event_type','proposal','{"hy":"\u0531\u057c\u0561\u057b\u0561\u0580\u056f\u0578\u0582\u0569\u0575\u0578\u0582\u0576","en":"Marriage Proposal"}', 6),
  ('event_type','gender_reveal','{"hy":"Gender Reveal","en":"Gender Reveal"}', 7),
  ('event_type','corporate','{"hy":"\u053f\u0578\u0580\u057a\u0578\u0580\u0561\u057f\u056b\u057e \u0561\u0575\u056c","en":"Corporate Event"}', 8),
  ('event_type','private','{"hy":"\u0544\u0561\u057d\u0576\u0561\u057e\u0578\u0580 \u0561\u0575\u056c","en":"Private Event"}', 9),
  ('event_type','other','{"hy":"\u0531\u0575\u056c","en":"Other"}', 10);

insert into lead_form_options (field, value, label, sort_order) values
  ('budget_range','under_5k','{"hy":"$5,000-\u056b\u0581","en":"Under $5,000"}', 1),
  ('budget_range','5k_10k','{"hy":"$5,000\u2013$10,000","en":"$5,000\u2013$10,000"}', 2),
  ('budget_range','10k_20k','{"hy":"$10,000\u2013$20,000","en":"$10,000\u2013$20,000"}', 3),
  ('budget_range','20k_50k','{"hy":"$20,000\u2013$50,000","en":"$20,000\u2013$50,000"}', 4),
  ('budget_range','50k_plus','{"hy":"$50,000+","en":"$50,000+"}', 5),
  ('budget_range','custom','{"hy":"\u0541\u0587 \u0578\u0580\u0578\u0577\u057e\u0561\u056e / \u0561\u0576\u0578\u0580\u0577\u0575\u0561\u056c \u0567","en":"Custom / Not decided"}', 6);

-- Default nav
insert into navigation_items (label, href, sort_order, is_cta) values
  ('{"hy":"\u0533\u056c\u056d\u0561\u057e\u0578\u0580","en":"Home"}','/',1,false),
  ('{"hy":"\u0541\u0561\u057c\u0561\u0575\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580","en":"Services"}','/services',2,false),
  ('{"hy":"\u0540\u0561\u0580\u057d\u0561\u0576\u0565\u056f\u0561\u0576","en":"Weddings"}','/services/weddings',3,false),
  ('{"hy":"\u0555\u0580\u0565\u0576\u0561\u056f\u0561\u0563\u056b\u0580","en":"Portfolio"}','/portfolio',4,false),
  ('{"hy":"\u0533\u0578\u0580\u056e\u0568\u0576\u0569\u0561\u0581","en":"Process"}','/process',5,false),
  ('{"hy":"\u0544\u0565\u0580 \u0574\u0561\u057d\u056b\u0576","en":"About"}','/about',6,false),
  ('{"hy":"\u0532\u056c\u0578\u0563","en":"Blog"}','/blog',7,false),
  ('{"hy":"\u053f\u0561\u057a","en":"Contact"}','/contact',8,false),
  ('{"hy":"\u0538\u0561\u0576\u0563\u0561\u0570\u0561\u0580\u0578\u0582\u0574","en":"Request a Consultation"}','/consultation',9,true);
