import Link from "next/link"
import { loginAction, signInWithGoogleAction } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const metadata = { title: "登入" }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const error = typeof params.error === "string" ? params.error : null

  return (
    <>
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">Login / 棲地無界</p>
        <h1 className="text-4xl font-semibold text-[var(--ink)]">先把登入頁的視覺與操作節奏定下來。</h1>
        <p className="max-w-xl text-base leading-8 text-[var(--muted-ink)]">
          這一頁目前作為帳號入口版型預覽，方便先確認表單結構、按鈕層級與登入流程的頁面氛圍。
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>登入棲地無界</CardTitle>
          <CardDescription>目前先以介面 prototype 為主，後續可再接上正式帳號流程。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? <p className="rounded-2xl bg-[var(--sand)] p-3 text-sm text-[var(--brand-strong)]">{error}</p> : null}
          <form action={loginAction} className="space-y-3">
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="密碼" required />
            <Button type="submit" className="w-full">使用 Email 登入</Button>
          </form>
          <form action={signInWithGoogleAction}>
            <Button type="submit" variant="outline" className="w-full">使用 Google 登入</Button>
          </form>
          <p className="text-sm text-[var(--muted-ink)]">
            還沒有帳號？
            <Link href="/register" className="ml-2 font-semibold text-[var(--brand)]">前往註冊</Link>
          </p>
        </CardContent>
      </Card>
    </>
  )
}
