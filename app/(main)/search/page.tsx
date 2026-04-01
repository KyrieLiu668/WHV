import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { searchPlatform } from "@/lib/data"

export const metadata = { title: "搜尋" }

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const query = typeof params.q === "string" ? params.q : ""
  const results = await searchPlatform(query)

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <Badge>探索搜尋</Badge>
        <h1 className="text-3xl font-semibold text-[var(--ink)]">從國家、文章、過來人三條線一起找答案。</h1>
        <form className="max-w-2xl">
          <Input name="q" defaultValue={query} placeholder="輸入國家、主題、人物，例如：澳洲 求職" />
        </form>
        <div className="flex flex-wrap gap-2">
          {["澳洲 農場", "日本 住宿", "紐西蘭 預算", "加拿大 履歷"].map((suggestion) => (
            <Link
              key={suggestion}
              href={`/search?q=${encodeURIComponent(suggestion)}`}
              className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--muted-ink)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              {suggestion}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <ResultColumn title="國家" count={results.countries.length}>
          {results.countries.length === 0 ? <EmptyState label="還沒有符合的國家結果" /> : null}
          {results.countries.map((country) => (
            <Link key={country.slug} href={`/countries/${country.slug}`} className="block rounded-2xl border border-[var(--line)] bg-white/70 p-4">
              <p className="font-semibold text-[var(--ink)]">{country.flag_emoji} {country.name_zh}</p>
              <p className="mt-1 text-sm text-[var(--muted-ink)]">{country.name_en}</p>
            </Link>
          ))}
        </ResultColumn>
        <ResultColumn title="文章" count={results.posts.length}>
          {results.posts.length === 0 ? <EmptyState label="還沒有符合的文章結果" /> : null}
          {results.posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="block rounded-2xl border border-[var(--line)] bg-white/70 p-4">
              <p className="font-semibold text-[var(--ink)]">{post.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-ink)]">{post.excerpt}</p>
            </Link>
          ))}
        </ResultColumn>
        <ResultColumn title="過來人" count={results.profiles.length}>
          {results.profiles.length === 0 ? <EmptyState label="目前沒有符合的過來人卡片" /> : null}
          {results.profiles.map((profile) => (
            <Card key={profile.id} className="bg-white/70">
              <CardContent className="space-y-2 p-4">
                <p className="font-semibold text-[var(--ink)]">{profile.nickname}</p>
                <p className="text-sm leading-6 text-[var(--muted-ink)]">{profile.can_help}</p>
              </CardContent>
            </Card>
          ))}
        </ResultColumn>
      </section>
    </div>
  )
}

function ResultColumn({
  title,
  count,
  children,
}: {
  title: string
  count: number
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <span className="text-sm font-medium text-[var(--muted-ink)]">{count}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--sand)]/45 p-4 text-sm leading-6 text-[var(--muted-ink)]">
      {label}
    </div>
  )
}
