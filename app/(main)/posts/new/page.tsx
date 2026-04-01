import { createPostAction } from "@/app/actions"
import { MarkdownEditor } from "@/components/post/markdown-editor"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getCountries, getCurrentViewer } from "@/lib/data"

export const metadata = { title: "投稿分享" }

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [countries, viewer, params] = await Promise.all([getCountries(), getCurrentViewer(), searchParams])
  const error = typeof params.error === "string" ? params.error : null

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <Badge>投稿與審核</Badge>
        <h1 className="text-3xl font-semibold text-[var(--ink)]">先把投稿頁版型、欄位結構與編輯節奏定下來。</h1>
        <p className="max-w-3xl text-base leading-8 text-[var(--muted-ink)]">
          這一頁現在的任務是確認表單欄位、資訊分區與編輯器使用感。正式投稿流程、審核邏輯與資料儲存之後再接進來也完全可以。
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>投稿頁骨架預覽</CardTitle>
          <CardDescription>
            {viewer.userId
              ? "目前已保留投稿頁的互動位置與欄位結構。"
              : "目前先以版型預覽與欄位確認為主，之後再決定是否接正式送出流程。"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error ? <p className="rounded-2xl bg-[var(--sand)] p-3 text-sm text-[var(--brand-strong)]">{error}</p> : null}
          <form action={createPostAction} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-[var(--ink)]">
                目的地
                <select
                  name="countrySlug"
                  className="h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-[var(--ink)] outline-none"
                  defaultValue={countries[0]?.slug}
                >
                  {countries.map((country) => (
                    <option key={country.slug} value={country.slug}>
                      {country.flag_emoji} {country.name_zh}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-[var(--ink)]">
                標籤
                <Input name="tags" placeholder="例如：澳洲, 求職, 農場" />
              </label>
            </div>
            <label className="space-y-2 text-sm font-medium text-[var(--ink)]">
              標題
              <Input name="title" placeholder="例如：澳洲第一份農場工作怎麼拿到" required />
            </label>
            <label className="space-y-2 text-sm font-medium text-[var(--ink)]">
              摘要
              <Textarea name="excerpt" placeholder="用 2-3 句話說明這篇能幫讀者解決什麼問題。" required />
            </label>
            <div className="space-y-2">
              <p className="text-sm font-medium text-[var(--ink)]">內容編輯器</p>
              <MarkdownEditor />
            </div>
            <div className="flex justify-end">
              <Button type="submit">送出至棲地無界審核</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
