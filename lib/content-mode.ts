import { hasSupabaseEnv } from "@/lib/supabase"

export type ContentMode = "mock" | "live" | "auto"

export function getContentMode(): ContentMode {
  const raw = (process.env.NEXT_PUBLIC_CONTENT_MODE || process.env.CONTENT_MODE || "auto").toLowerCase()

  if (raw === "mock" || raw === "live") return raw
  return "auto"
}

export function shouldUseLiveData() {
  const mode = getContentMode()

  if (mode === "mock") return false
  if (mode === "live") return hasSupabaseEnv
  return hasSupabaseEnv
}
