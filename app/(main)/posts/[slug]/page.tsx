import { RealtimeDiscussion } from "@/components/discussion/realtime-discussion"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getCountries, getCurrentViewer, getPostBodyHtml, getPostDiscussions, getProfiles, requirePost } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await requirePost(slug)
  return { title: post.title, description: post.excerpt ?? "棲地無界文章" }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, viewer, countries, profiles] = await Promise.all([requirePost(slug), getCurrentViewer(), getCountries(), getProfiles()])
  const discussionItems = await getPostDiscussions(post.id)
  const country = countries.find((item) => item.slug === post.country_slug)
  const author = profiles.find((item) => item.id === post.author_id)

  return (
    <div className="space-y-8">
      <article className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent className="space-y-6 p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-2">
              {country ? <Badge>{country.flag_emoji} {country.name_zh}</Badge> : null}
              {post.tags.map((tag) => (
                <Badge key={tag} className="bg-white">{tag}</Badge>
              ))}
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">{post.title}</h1>
              <p className="text-base leading-8 text-[var(--muted-ink)]">{post.excerpt}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 rounded-[24px] border border-[var(--line)] bg-white/70 p-4">
              <Avatar name={author?.nickname} />
              <div>
                <p className="font-semibold text-[var(--ink)]">{author?.nickname ?? "棲地無界社群"}</p>
                <p className="text-sm text-[var(--muted-ink)]">發佈於 {formatDate(post.created_at)} · 瀏覽 {post.views}</p>
              </div>
            </div>
            <div className="prose-whv max-w-none text-base" dangerouslySetInnerHTML={{ __html: getPostBodyHtml(post) }} />
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-4 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">閱讀導覽</p>
              <div className="space-y-3 text-sm leading-7 text-[var(--muted-ink)]">
                <p>在棲地無界，一篇文章不只是心得，而是能被搜尋、能被留言補充、能被下一位出發者真正用上的資料節點。</p>
                <p>若你也有相同國家的經驗，最有幫助的補充方式通常是留下明確時間點、地區與你實際怎麼解決問題。</p>
              </div>
            </CardContent>
          </Card>
          <RealtimeDiscussion
            postId={post.id}
            initialDiscussions={discussionItems}
            currentUserId={viewer.userId}
            currentNickname={viewer.profile?.nickname ?? null}
          />
        </div>
      </article>
    </div>
  )
}
