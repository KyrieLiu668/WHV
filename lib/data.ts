import { notFound } from "next/navigation"
import { shouldUseLiveData } from "@/lib/content-mode"
import { countries, discussions, mockViewer, posts, profiles } from "@/lib/mock-data"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { markdownLikeParagraphs, sanitizeHtmlFragment } from "@/lib/utils"
import type { Country, Discussion, Post, Profile, Viewer } from "@/types"

export async function getCountries() {
  if (!shouldUseLiveData()) return countries

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from("countries").select("*").order("name_zh")
  if (error) return countries
  return (data as Country[]) ?? countries
}

export async function getCountryBySlug(slug: string) {
  const allCountries = await getCountries()
  return allCountries.find((country) => country.slug === slug) ?? null
}

export async function getApprovedPosts(countrySlug?: string) {
  if (!shouldUseLiveData()) {
    return posts
      .filter((post) => post.status === "approved")
      .filter((post) => (countrySlug ? post.country_slug === countrySlug : true))
  }

  const supabase = await createSupabaseServerClient()
  let query = supabase
    .from("posts")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })

  if (countrySlug) query = query.eq("country_slug", countrySlug)

  const { data, error } = await query
  if (error) return posts.filter((post) => post.status === "approved").filter((post) => (countrySlug ? post.country_slug === countrySlug : true))
  return (data as Post[]) ?? []
}

export async function getPostBySlug(slug: string) {
  if (!shouldUseLiveData()) {
    return posts.find((post) => post.slug === slug) ?? null
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).maybeSingle()
  if (error) return posts.find((post) => post.slug === slug) ?? null
  return (data as Post | null) ?? null
}

export async function getPostDiscussions(postId: string) {
  if (!shouldUseLiveData()) {
    return discussions.filter((discussion) => discussion.post_id === postId)
  }

  const supabase = await createSupabaseServerClient()
  const { data: rows, error } = await supabase
    .from("discussions")
    .select("id, post_id, user_id, content, created_at")
    .eq("post_id", postId)
    .order("created_at")
  if (error) return discussions.filter((discussion) => discussion.post_id === postId)

  const discussionRows = (rows as Discussion[]) ?? []
  const ids = Array.from(new Set(discussionRows.map((item) => item.user_id)))

  const { data: profileRows } = ids.length
    ? await supabase.from("profiles").select("id, nickname, avatar_url, is_verified").in("id", ids)
    : { data: [] }

  const profileMap = new Map(
    ((profileRows as Array<Pick<Profile, "id" | "nickname" | "avatar_url" | "is_verified">>) ?? []).map(
      (profile) => [profile.id, profile],
    ),
  )

  return discussionRows.map((item) => ({
    ...item,
    profile: profileMap.get(item.user_id)
      ? {
          nickname: profileMap.get(item.user_id)!.nickname,
          avatar_url: profileMap.get(item.user_id)!.avatar_url,
          is_verified: profileMap.get(item.user_id)!.is_verified,
        }
      : undefined,
  }))
}

export async function getProfiles() {
  if (!shouldUseLiveData()) return profiles

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from("profiles").select("*").order("created_at")
  if (error) return profiles
  return (data as Profile[]) ?? []
}

export async function getHelpersByCountry(slug: string) {
  const allProfiles = await getProfiles()
  return allProfiles.filter((profile) => profile.countries_visited.includes(slug))
}

export async function getCurrentViewer(): Promise<Viewer> {
  if (!shouldUseLiveData()) return mockViewer

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { userId: null, email: null, profile: null }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()

  return {
    userId: user.id,
    email: user.email ?? null,
    profile: (profile as Profile | null) ?? null,
  }
}

export async function searchPlatform(query: string) {
  const keyword = query.trim().toLowerCase()
  const [allCountries, allPosts, allProfiles] = await Promise.all([
    getCountries(),
    getApprovedPosts(),
    getProfiles(),
  ])

  if (!keyword) {
    return { countries: allCountries, posts: allPosts, profiles: allProfiles }
  }

  return {
    countries: allCountries.filter((country) =>
      `${country.name_zh} ${country.name_en}`.toLowerCase().includes(keyword),
    ),
    posts: allPosts.filter((post) =>
      `${post.title} ${post.excerpt ?? ""} ${post.tags.join(" ")}`.toLowerCase().includes(keyword),
    ),
    profiles: allProfiles.filter((profile) =>
      `${profile.nickname ?? ""} ${profile.bio ?? ""} ${profile.can_help ?? ""}`.toLowerCase().includes(
        keyword,
      ),
    ),
  }
}

export async function requireCountry(slug: string) {
  const country = await getCountryBySlug(slug)
  if (!country) notFound()
  return country
}

export async function requirePost(slug: string) {
  const post = await getPostBySlug(slug)
  if (!post) notFound()
  return post
}

export function getPostBodyHtml(post: Post) {
  return sanitizeHtmlFragment(post.html_content) || markdownLikeParagraphs(post.content)
}
