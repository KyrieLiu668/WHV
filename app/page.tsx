import Link from "next/link"
import {
  ArrowRight,
  BookOpenText,
  FileText,
  MessageCircleMore,
  Search,
  UsersRound,
} from "lucide-react"
import { CountryNav } from "@/components/country/country-nav"
import { PostCard } from "@/components/post/post-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getApprovedPosts, getCountries, getProfiles } from "@/lib/data"

const quickLinks = [
  {
    href: "/countries",
    title: "先看國家知識庫",
    description: "直接從 17 國入口開始，先挑你最想去的國家。",
    icon: BookOpenText,
  },
  {
    href: "/search",
    title: "快速搜尋主題",
    description: "用簽證、住宿、找工、預算等關鍵字快速找內容。",
    icon: Search,
  },
  {
    href: "/posts/new",
    title: "預覽投稿流程",
    description: "先看發文欄位與投稿版型，之後再接真實資料。",
    icon: FileText,
  },
]

export default async function HomePage() {
  const [countries, posts, profiles] = await Promise.all([getCountries(), getApprovedPosts(), getProfiles()])

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden">
          <CardContent className="space-y-6 p-8 md:p-10">
            <Badge>棲地無界 WHV</Badge>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-6xl">
                打工度假資訊、經驗分享與互助入口，先從你要去的國家開始。
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted-ink)]">
                這個 prototype 先把整體網站架構、導覽方式與內容版型建立起來。你可以先從國家知識庫進站，再延伸到文章、搜尋、個人頁與投稿流程。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/countries">
                <Button className="gap-2">
                  進入國家知識庫
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/search">
                <Button variant="outline">直接搜尋主題</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <Metric icon={BookOpenText} label="內容骨架" value="17 國" description="每個國家都有獨立入口頁，可延伸簽證、住宿、求職與經驗內容。" />
          <Metric icon={MessageCircleMore} label="討論區預覽" value="Realtime" description="文章頁已預留討論區位置，之後可直接接上即時留言與互動。" />
          <Metric icon={UsersRound} label="示範內容" value={`${posts.length}+`} description="目前先以 mock data 呈現頁面與資訊層級，方便先看體驗。" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Card className="h-full border-[var(--line)] bg-white/75 transition hover:-translate-y-0.5 hover:shadow-sm">
                <CardContent className="space-y-3 p-6">
                  <div className="inline-flex rounded-2xl bg-[var(--sand)] p-3">
                    <Icon className="h-5 w-5 text-[var(--brand)]" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-[var(--ink)]">{item.title}</h2>
                    <p className="text-sm leading-6 text-[var(--muted-ink)]">{item.description}</p>
                  </div>
                  <p className="text-sm font-semibold text-[var(--brand)]">前往查看</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">Country Index</p>
            <h2 className="text-2xl font-semibold text-[var(--ink)]">也可以直接點國旗，從國家頁進站</h2>
          </div>
          <Link href="/countries" className="text-sm font-semibold text-[var(--brand)]">
            查看全部國家
          </Link>
        </div>
        <CountryNav countries={countries} />
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">Latest Stories</p>
            <h2 className="text-2xl font-semibold text-[var(--ink)]">文章卡片與內容頁版型預覽</h2>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              country={countries.find((country) => country.slug === post.country_slug)}
              author={profiles.find((profile) => profile.id === post.author_id)}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Metric icon={BookOpenText} label="找資訊" value="國家入口" description="先進國家頁，再看簽證、住宿、找工與文章脈絡。" />
        <Metric icon={UsersRound} label="找人脈" value="個人頁" description="之後可以延伸成旅伴、學長姐與可提供協助的互助網絡。" />
        <Metric icon={MessageCircleMore} label="找互動" value="文章討論" description="每篇文章都能延伸成留言與交流場景，方便之後接 live 功能。" />
      </section>
    </main>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
}) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="inline-flex rounded-2xl bg-[var(--sand)] p-3">
          <Icon className="h-5 w-5 text-[var(--brand)]" />
        </div>
        <div>
          <p className="text-sm text-[var(--muted-ink)]">{label}</p>
          <p className="text-3xl font-semibold text-[var(--ink)]">{value}</p>
        </div>
        <p className="text-sm leading-6 text-[var(--muted-ink)]">{description}</p>
      </CardContent>
    </Card>
  )
}
