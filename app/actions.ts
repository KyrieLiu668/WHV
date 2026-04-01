"use server"

import { redirect } from "next/navigation"
import { hasSupabaseEnv } from "@/lib/supabase"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { profileSchema, loginSchema, postSchema, registerSchema } from "@/lib/validations"
import { slugify } from "@/lib/utils"

export async function loginAction(formData: FormData) {
  const payload = loginSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!hasSupabaseEnv) redirect("/profile?mode=demo-login")

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword(payload)
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`)

  redirect("/profile")
}

export async function registerAction(formData: FormData) {
  const payload = registerSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    nickname: formData.get("nickname"),
  })

  if (!hasSupabaseEnv) redirect("/register?mode=demo-register")

  const supabase = await createSupabaseServerClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
      data: { nickname: payload.nickname },
    },
  })

  if (error) redirect(`/register?error=${encodeURIComponent(error.message)}`)

  if (data.user) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      nickname: payload.nickname,
      countries_visited: [],
    })
  }

  redirect("/profile?welcome=1")
}

export async function signInWithGoogleAction() {
  if (!hasSupabaseEnv) redirect("/login?mode=google-demo")

  const supabase = await createSupabaseServerClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${siteUrl}/auth/callback` },
  })

  redirect(data.url ?? "/login?error=Google%20登入初始化失敗")
}

export async function signOutAction() {
  if (hasSupabaseEnv) {
    const supabase = await createSupabaseServerClient()
    await supabase.auth.signOut()
  }

  redirect("/")
}

export async function createPostAction(formData: FormData) {
  const payload = postSchema.parse({
    countrySlug: formData.get("countrySlug"),
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    tags: formData.get("tags"),
    content: formData.get("content"),
    htmlContent: formData.get("htmlContent"),
  })

  const slug = slugify(payload.title) || `post-${Date.now()}`
  const tags = payload.tags?.split(",").map((item) => item.trim()).filter(Boolean)

  if (!hasSupabaseEnv) redirect(`/posts/${slug}?preview=1`)

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login?error=請先登入後再投稿")

  const { error } = await supabase.from("posts").insert({
    country_slug: payload.countrySlug,
    title: payload.title,
    slug,
    excerpt: payload.excerpt,
    content: payload.content,
    html_content: payload.htmlContent,
    tags,
    author_id: user.id,
    status: "pending",
  })

  if (error) redirect(`/posts/new?error=${encodeURIComponent(error.message)}`)

  redirect(`/posts/${slug}?created=1`)
}

export async function updateProfileAction(formData: FormData) {
  const payload = profileSchema.parse({
    nickname: formData.get("nickname"),
    bio: formData.get("bio"),
    canHelp: formData.get("canHelp"),
    countriesVisited: formData.get("countriesVisited"),
  })

  if (!hasSupabaseEnv) redirect("/profile?saved=demo")

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login?error=請先登入後再更新個人檔案")

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    nickname: payload.nickname,
    bio: payload.bio,
    can_help: payload.canHelp,
    countries_visited: payload.countriesVisited?.split(",").map((item) => item.trim()).filter(Boolean),
  })

  if (error) redirect(`/profile?error=${encodeURIComponent(error.message)}`)

  redirect("/profile?saved=1")
}
