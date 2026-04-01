create extension if not exists pgcrypto;

create table if not exists countries (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_zh text not null,
  name_en text not null,
  flag_emoji text,
  visa_info jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  country_slug text references countries(slug) on delete cascade,
  title text not null,
  slug text unique not null,
  content text,
  html_content text,
  excerpt text,
  author_id uuid references auth.users(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'pending', 'approved', 'rejected')),
  tags text[] not null default '{}',
  views integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists discussions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text,
  avatar_url text,
  countries_visited text[] not null default '{}',
  bio text,
  can_help text,
  is_verified boolean not null default false,
  created_at timestamptz not null default now()
);
