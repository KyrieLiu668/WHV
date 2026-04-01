import type { Country, Discussion, Post, Profile, VisaInfo } from "@/types"

const now = "2026-03-31T09:00:00.000Z"

function visaTemplate(country: string): VisaInfo {
  return {
    overview: `${country} 打工度假申請以「先理解資格、再排時間線」最穩。棲地無界建議你把簽證、保險、財力證明與住宿搜尋拆成四個週期同步推進。`,
    ageRange: "18-30 歲",
    quota: "依雙邊年度名額公告為準",
    stayDuration: "通常 12 個月，可依國別規範延長",
    estimatedBudget: "建議先準備新台幣 12-18 萬元",
    processingTime: "約 2-8 週，依各國旺季有所浮動",
    steps: [
      "確認該國年齡、護照效期、財力與保險條件",
      "建立申請時程表，包含體檢、良民證、英文文件翻譯",
      "遞交申請後同步安排機票、前兩週住宿與在地聯絡管道",
    ],
    checklist: ["效期 12 個月以上護照", "英文財力證明", "海外醫療與意外保險", "履歷與聯絡方式"],
  }
}

export const countries: Country[] = [
  ["australia", "澳洲", "Australia", "🇦🇺"],
  ["new-zealand", "紐西蘭", "New Zealand", "🇳🇿"],
  ["japan", "日本", "Japan", "🇯🇵"],
  ["korea", "韓國", "South Korea", "🇰🇷"],
  ["canada", "加拿大", "Canada", "🇨🇦"],
  ["uk", "英國", "United Kingdom", "🇬🇧"],
  ["ireland", "愛爾蘭", "Ireland", "🇮🇪"],
  ["france", "法國", "France", "🇫🇷"],
  ["germany", "德國", "Germany", "🇩🇪"],
  ["belgium", "比利時", "Belgium", "🇧🇪"],
  ["netherlands", "荷蘭", "Netherlands", "🇳🇱"],
  ["luxembourg", "盧森堡", "Luxembourg", "🇱🇺"],
  ["austria", "奧地利", "Austria", "🇦🇹"],
  ["czechia", "捷克", "Czechia", "🇨🇿"],
  ["slovakia", "斯洛伐克", "Slovakia", "🇸🇰"],
  ["hungary", "匈牙利", "Hungary", "🇭🇺"],
  ["poland", "波蘭", "Poland", "🇵🇱"],
].map(([slug, name_zh, name_en, flag], index) => ({
  id: `country-${index + 1}`,
  slug,
  name_zh,
  name_en,
  flag_emoji: flag,
  visa_info: visaTemplate(name_zh),
  created_at: now,
}))

export const profiles: Profile[] = [
  {
    id: "user-demo",
    nickname: "晴安",
    avatar_url: null,
    countries_visited: ["australia", "japan"],
    bio: "回國後在棲地無界整理自己的打工度假筆記，想幫更多人少走彎路。",
    can_help: "澳洲農場履歷、雪場面試、行前預算拆解",
    is_verified: true,
    created_at: now,
  },
  {
    id: "user-maya",
    nickname: "Maya",
    avatar_url: null,
    countries_visited: ["new-zealand"],
    bio: "喜歡把繁雜流程拆成清楚清單，適合陪你排第一版時程。",
    can_help: "紐西蘭簽證時間線、住宿落地第一週安排",
    is_verified: false,
    created_at: now,
  },
  {
    id: "user-ken",
    nickname: "Ken",
    avatar_url: null,
    countries_visited: ["canada", "uk"],
    bio: "有客服與餐飲經驗，專長是履歷與面試脈絡整理。",
    can_help: "加拿大履歷優化、英國城市選擇、打工心態調整",
    is_verified: true,
    created_at: now,
  },
]

export const posts: Post[] = [
  {
    id: "post-aus-farm",
    country_slug: "australia",
    title: "澳洲農場求職時間線：從零到拿到第一份工作",
    slug: "australia-first-farm-job-timeline",
    content:
      "我把澳洲農場求職拆成四段：出發前、落地第一週、履歷投遞、現場試工。最重要的是不要把希望押在單一城市，而是提早準備可移動的節奏。\n\n在棲地無界這篇整理裡，我把住宿、交通、履歷、英文自介與詐騙辨識一起收進來。",
    html_content:
      "<h2>四段式節奏</h2><p>我把澳洲農場求職拆成四段：出發前、落地第一週、履歷投遞、現場試工。</p><ul><li>先備好英文履歷與可聯絡電話</li><li>不要把希望押在單一城市</li><li>試工前先確認工時計算方式與住宿條件</li></ul>",
    excerpt: "把澳洲農場求職拆成四段節奏，讓你不會落地後才開始慌。",
    author_id: "user-demo",
    status: "approved",
    tags: ["澳洲", "農場", "求職"],
    views: 381,
    created_at: "2026-03-18T09:00:00.000Z",
    updated_at: "2026-03-20T09:00:00.000Z",
  },
  {
    id: "post-nz-budget",
    country_slug: "new-zealand",
    title: "紐西蘭打工度假 30 天落地預算表",
    slug: "new-zealand-first-30-days-budget",
    content: "第一個月不要只算住宿與伙食，還要把交通卡、手機門號、押金、工具採購都算進去。",
    html_content:
      "<h2>預算分層</h2><p>先拆成不可避免成本與可彈性成本，再決定你要在哪裡保留緩衝。</p>",
    excerpt: "把落地第一個月的必要花費拆開來，才知道真正該準備多少。",
    author_id: "user-maya",
    status: "approved",
    tags: ["紐西蘭", "預算", "新手"],
    views: 214,
    created_at: "2026-03-12T09:00:00.000Z",
    updated_at: "2026-03-15T09:00:00.000Z",
  },
  {
    id: "post-japan-sharehouse",
    country_slug: "japan",
    title: "日本 Share House 怎麼選：通勤、押金、社群感一次看",
    slug: "japan-sharehouse-guide",
    content: "先決定自己重視的是通勤、語言練習還是社群感，這三種需求會直接影響你該選哪種房型。",
    html_content:
      "<h2>先選需求，不是先選房</h2><p>通勤、押金與社群感是日本 share house 最常拉扯的三件事。</p>",
    excerpt: "先搞懂自己要的是節省交通時間、低押金，還是能快速認識人的空間。",
    author_id: "user-demo",
    status: "approved",
    tags: ["日本", "住宿", "Share House"],
    views: 146,
    created_at: "2026-03-08T09:00:00.000Z",
    updated_at: "2026-03-10T09:00:00.000Z",
  },
]

export const discussions: Discussion[] = [
  {
    id: "discussion-1",
    post_id: "post-aus-farm",
    user_id: "user-maya",
    content: "這篇把時間線拆得很清楚，我補充一下：旺季找住宿真的要比工作再早半步。",
    created_at: "2026-03-21T04:30:00.000Z",
    profile: { nickname: "Maya", avatar_url: null, is_verified: false },
  },
  {
    id: "discussion-2",
    post_id: "post-aus-farm",
    user_id: "user-ken",
    content: "第一次出國工作，履歷先找朋友幫你做一輪英文口語化調整，回覆率差很多。",
    created_at: "2026-03-21T05:10:00.000Z",
    profile: { nickname: "Ken", avatar_url: null, is_verified: true },
  },
]

export const mockViewer = {
  userId: "user-demo",
  email: "demo@whv.tw",
  profile: profiles[0],
}
