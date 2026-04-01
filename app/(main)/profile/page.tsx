import { signOutAction, updateProfileAction } from "@/app/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getCurrentViewer } from "@/lib/data"

export const metadata = { title: "個人檔案" }

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const [viewer, params] = await Promise.all([getCurrentViewer(), searchParams])
  const profile = viewer.profile
  const saved = typeof params.saved === "string" ? params.saved : null
  const error = typeof params.error === "string" ? params.error : null

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <Badge>人脈媒合</Badge>
        <h1 className="text-3xl font-semibold text-[var(--ink)]">把你能幫的事，留成一張可被找到的卡片。</h1>
        <p className="max-w-3xl text-base leading-8 text-[var(--muted-ink)]">
          棲地無界希望回國者不只是發完文就離開，而是能把自己熟悉的細節留在這裡。下一位需要的人搜尋時，就能真的找到你留下的方向。
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>編輯個人檔案</CardTitle>
          <CardDescription>{viewer.email ? `目前顯示中的範例 Email：${viewer.email}` : "目前先以個人頁版型預覽為主。"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {saved ? <p className="rounded-2xl bg-[var(--sand)] p-3 text-sm text-[var(--brand-strong)]">個人檔案已更新。</p> : null}
          {error ? <p className="rounded-2xl bg-[var(--sand)] p-3 text-sm text-[var(--brand-strong)]">{error}</p> : null}
          <form action={updateProfileAction} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-[var(--ink)]">
                暱稱
                <Input name="nickname" defaultValue={profile?.nickname ?? "晴安"} required />
              </label>
              <label className="space-y-2 text-sm font-medium text-[var(--ink)]">
                已去過的國家
                <Input name="countriesVisited" defaultValue={profile?.countries_visited.join(", ") ?? ""} placeholder="例如：australia, japan" />
              </label>
            </div>
            <label className="space-y-2 text-sm font-medium text-[var(--ink)]">
              自我介紹
              <Textarea name="bio" defaultValue={profile?.bio ?? ""} />
            </label>
            <label className="space-y-2 text-sm font-medium text-[var(--ink)]">
              我能幫什麼
              <Textarea name="canHelp" defaultValue={profile?.can_help ?? ""} />
            </label>
            <div className="flex flex-wrap justify-end gap-3">
              <Button type="submit">儲存棲地無界檔案</Button>
            </div>
          </form>
          <form action={signOutAction}>
            <Button variant="ghost" type="submit">登出</Button>
          </form>
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-3">
        <ProfileHint
          title="寫清楚你能幫什麼"
          description="比起寫『都可以問』，更有效的是明確寫出你熟悉的城市、工作型態或踩過的坑。"
        />
        <ProfileHint
          title="國家欄位請用 slug"
          description="目前系統會用 `australia`, `japan` 這類 slug 做篩選，這樣國家頁才能正確抓到你的卡片。"
        />
        <ProfileHint
          title="先完成最小可用檔案"
          description="即使只有簡短 bio 與一段可協助事項，也足以讓下一位出發者知道可以先找誰。"
        />
      </section>
    </div>
  )
}

function ProfileHint({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Card className="bg-white/70">
      <CardContent className="space-y-2 p-5">
        <h2 className="font-semibold text-[var(--ink)]">{title}</h2>
        <p className="text-sm leading-6 text-[var(--muted-ink)]">{description}</p>
      </CardContent>
    </Card>
  )
}
