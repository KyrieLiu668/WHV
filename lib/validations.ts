import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("請輸入有效的 Email"),
  password: z.string().min(6, "密碼至少需要 6 個字元"),
})

export const registerSchema = loginSchema.extend({
  nickname: z.string().min(2, "暱稱至少需要 2 個字元").max(30, "暱稱最多 30 個字元"),
})

export const postSchema = z.object({
  countrySlug: z.string().min(1, "請選擇目的地"),
  title: z.string().min(6, "標題至少需要 6 個字元").max(120, "標題最多 120 個字元"),
  excerpt: z.string().min(20, "摘要至少需要 20 個字元").max(220, "摘要最多 220 個字元"),
  tags: z.string().optional(),
  content: z.string().min(30, "文章內容至少需要 30 個字元"),
  htmlContent: z.string().min(1, "請先輸入文章內容"),
})

export const profileSchema = z.object({
  nickname: z.string().min(2, "暱稱至少需要 2 個字元").max(30, "暱稱最多 30 個字元"),
  bio: z.string().max(240, "自我介紹最多 240 個字元").optional(),
  canHelp: z.string().max(240, "可協助項目最多 240 個字元").optional(),
  countriesVisited: z.string().optional(),
})
