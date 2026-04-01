import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey)

let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function createSupabaseBrowserClient() {
  if (!hasSupabaseEnv) return null
  if (!browserClient) browserClient = createBrowserClient(supabaseUrl!, supabaseAnonKey!)
  return browserClient
}
