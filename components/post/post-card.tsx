import Link from "next/link"
import { ArrowUpRight, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import type { Country, Post, Profile } from "@/types"

export function PostCard({
  post,
  country,
  author,
}: {
  post: Post
  country?: Country | null
  author?: Profile | null
}) {
  return (
    <Card className="h-full transition hover:-translate-y-1">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          {country ? <Badge>{country.flag_emoji} {country.name_zh}</Badge> : null}
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} className="bg-white">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl">
          <Link href={`/posts/${post.slug}`} className="inline-flex items-start gap-2 hover:text-[var(--brand)]">
            <span>{post.title}</span>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" />
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3 leading-6">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3 pt-0 text-sm text-[var(--muted-ink)]">
        <div>
          <p className="font-medium text-[var(--ink)]">{author?.nickname ?? "棲地無界社群"}</p>
          <p>{formatDate(post.created_at)}</p>
        </div>
        <div className="inline-flex items-center gap-2">
          <Eye className="h-4 w-4" />
          {post.views}
        </div>
      </CardContent>
    </Card>
  )
}
