import { NextResponse } from "next/server"
import { hasSupabaseEnv } from "@/lib/supabase"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { buildUrl } from "@/lib/utils"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (!hasSupabaseEnv) {
    return NextResponse.redirect(buildUrl("/profile?mode=demo-auth"))
  }

  if (code) {
    const supabase = await createSupabaseServerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(buildUrl("/profile"))
}
