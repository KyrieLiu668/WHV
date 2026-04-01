import Link from "next/link"
import { Compass, Earth, Search, SquarePen, UserRound } from "lucide-react"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Viewer } from "@/types"

const primaryNav = [
  { href: "/", label: "首頁", icon: Compass },
  { href: "/countries", label: "國家知識庫", icon: Earth },
  { href: "/search", label: "搜尋", icon: Search },
  { href: "/profile", label: "個人頁", icon: UserRound },
]

export function Header({ viewer }: { viewer: Viewer }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[rgba(248,242,233,0.82)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex min-w-0 flex-1 items-center gap-3">
            <div className="rounded-full bg-[var(--sand)] p-2">
              <Compass className="h-4 w-4 text-[var(--brand)]" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--ink)]">棲地無界</p>
              <p className="truncate text-xs text-[var(--muted-ink)]">WHV prototype 導覽與內容骨架</p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/countries">
              <Button variant="ghost" className="gap-2">
                <Earth className="h-4 w-4" />
                國家知識庫
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="ghost" className="gap-2">
                <Search className="h-4 w-4" />
                搜尋
              </Button>
            </Link>
            <Link href="/posts/new">
              <Button className="gap-2">
                <SquarePen className="h-4 w-4" />
                發表內容
              </Button>
            </Link>
            <ThemeToggle />
          </div>

          <Link href="/profile" className="flex items-center gap-3 rounded-full border border-[var(--line)] bg-white/70 px-3 py-2">
            <Avatar className="h-9 w-9 text-xs" name={viewer.profile?.nickname ?? "訪客"} />
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-[var(--ink)]">{viewer.profile?.nickname ?? "Prototype 訪客"}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-[var(--muted-ink)]">{viewer.email ?? "prototype@whv.tw"}</p>
                {viewer.profile?.is_verified ? <Badge>已驗證</Badge> : null}
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-1 md:hidden">
          {primaryNav.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--brand)]/40"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
