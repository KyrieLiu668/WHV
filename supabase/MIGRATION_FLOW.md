# Supabase Migration Flow

This project now uses a three-step migration flow so the schema is easier to reason about and safer to evolve over time.

## Recommended order

1. `20260401_001_core_schema.sql`
   - Creates extensions and base tables
   - No policies, no seed data, no storage side effects

2. `20260401_002_automation_indexes_and_rls.sql`
   - Adds triggers and profile automation
   - Adds indexes for common access patterns
   - Enables RLS and creates policies

3. `20260401_003_seed_storage_and_realtime.sql`
   - Seeds the 17 WHV countries
   - Creates storage buckets and storage policies
   - Adds `discussions` to `supabase_realtime`

## Why this split

- Core schema changes stay isolated from policy changes
- RLS changes can be reviewed separately from seed content
- Seed data can be rerun safely with `on conflict`
- Storage and realtime setup are grouped into platform-level provisioning

## Execution options

### Option A: Supabase SQL Editor

Run the files in the exact order above.

### Option B: Supabase CLI

If you later adopt the Supabase CLI, keep the same ordering and treat these files as the canonical migration history.

## Notes for future changes

- Add new tables in a new migration file, never edit an already-applied migration in production
- Put indexes and policy updates in a follow-up migration unless they are inseparable from the table creation
- Keep seed updates idempotent with `on conflict`
- Prefer explicit index names and policy names in ASCII for easier maintenance

## Current app expectation

The Next.js app currently expects these public tables:

- `countries`
- `posts`
- `discussions`
- `profiles`

And these platform resources:

- storage bucket `avatars`
- storage bucket `post-images`
- realtime on `public.discussions`
