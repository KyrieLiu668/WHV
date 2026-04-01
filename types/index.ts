export type VisaInfo = {
  overview: string
  ageRange: string
  quota: string
  stayDuration: string
  estimatedBudget: string
  processingTime: string
  steps: string[]
  checklist: string[]
}

export type Country = {
  id: string
  slug: string
  name_zh: string
  name_en: string
  flag_emoji: string | null
  visa_info: VisaInfo
  created_at: string
}

export type PostStatus = "draft" | "pending" | "approved" | "rejected"

export type Post = {
  id: string
  country_slug: string
  title: string
  slug: string
  content: string | null
  html_content: string | null
  excerpt: string | null
  author_id: string
  status: PostStatus
  tags: string[]
  views: number
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  nickname: string | null
  avatar_url: string | null
  countries_visited: string[]
  bio: string | null
  can_help: string | null
  is_verified: boolean
  created_at: string
}

export type Discussion = {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  profile?: Pick<Profile, "nickname" | "avatar_url" | "is_verified">
}

export type Viewer = {
  userId: string | null
  email: string | null
  profile: Profile | null
}
