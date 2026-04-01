create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
before update on public.posts
for each row
execute function public.set_updated_at();

create or replace function public.create_profile_for_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nickname)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nickname', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.create_profile_for_user();

create index if not exists posts_country_status_created_idx
  on public.posts (country_slug, status, created_at desc);

create index if not exists posts_author_created_idx
  on public.posts (author_id, created_at desc);

create index if not exists discussions_post_created_idx
  on public.discussions (post_id, created_at asc);

create index if not exists profiles_verified_created_idx
  on public.profiles (is_verified, created_at desc);

create index if not exists posts_tags_gin_idx
  on public.posts using gin (tags);

create index if not exists profiles_countries_visited_gin_idx
  on public.profiles using gin (countries_visited);

alter table public.posts enable row level security;
alter table public.discussions enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "posts_public_read" on public.posts;
create policy "posts_public_read"
on public.posts
for select
using (status = 'approved' or auth.uid() = author_id);

drop policy if exists "posts_owner_insert" on public.posts;
create policy "posts_owner_insert"
on public.posts
for insert
with check (auth.uid() = author_id);

drop policy if exists "posts_owner_update" on public.posts;
create policy "posts_owner_update"
on public.posts
for update
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

drop policy if exists "profiles_public_read" on public.profiles;
create policy "profiles_public_read"
on public.profiles
for select
using (true);

drop policy if exists "profiles_owner_manage" on public.profiles;
create policy "profiles_owner_manage"
on public.profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "discussions_public_read" on public.discussions;
create policy "discussions_public_read"
on public.discussions
for select
using (true);

drop policy if exists "discussions_owner_insert" on public.discussions;
create policy "discussions_owner_insert"
on public.discussions
for insert
with check (auth.uid() = user_id);

drop policy if exists "discussions_owner_delete" on public.discussions;
create policy "discussions_owner_delete"
on public.discussions
for delete
using (auth.uid() = user_id);
