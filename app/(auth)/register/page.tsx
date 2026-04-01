import Link from "next/link"
import { registerAction } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const metadata = { title: "註冊" }

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const error = typeof params.error === "string" ? params.error : null

  return (
    <>
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">Register / 棲地無界</p>
        <h1 className="text-4xl font-semibold text-[var(--ink)]">先把註冊頁的資訊架構與版型感受定下來。</h1>
        <p className="max-w-xl text-base leading-8 text-[var(--muted-ink)]">
          這一頁目前用來確認欄位順序、表單密度與帳號入口的視覺語言，之後再接正式帳號資料。
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>建立棲地無界帳號</CardTitle>
          <CardDescription>目前先用它來預覽帳號建立頁的整體樣子。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? <p className="rounded-2xl bg-[var(--sand)] p-3 text-sm text-[var(--brand-strong)]">{error}</p> : null}
          <form action={registerAction} className="space-y-3">
            <Input name="nickname" placeholder="暱稱" required />
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="密碼" required />
            <Button type="submit" className="w-full">建立帳號</Button>
          </form>
          <p className="text-sm text-[var(--muted-ink)]">
            已經有帳號？
            <Link href="/login" className="ml-2 font-semibold text-[var(--brand)]">返回登入</Link>
          </p>
        </CardContent>
      </Card>
    </>
  )
}
