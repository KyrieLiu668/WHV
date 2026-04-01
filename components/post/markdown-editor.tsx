"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Heading2, Italic, List } from "lucide-react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function MarkdownEditor({
  initialValue = "<p>從你的出發原因、申請節奏與最想補充的經驗開始寫。</p>",
}: {
  initialValue?: string
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: initialValue,
    editorProps: {
      attributes: {
        class: "min-h-[320px] px-5 py-4 outline-none",
      },
    },
  })

  useEffect(() => {
    if (!editor) return

    const syncHiddenInputs = () => {
      const html = editor.getHTML()
      const text = editor.getText()
      const htmlInput = document.getElementById("htmlContent") as HTMLInputElement | null
      const contentInput = document.getElementById("content") as HTMLInputElement | null

      if (htmlInput) htmlInput.value = html
      if (contentInput) contentInput.value = text
    }

    syncHiddenInputs()
    editor.on("update", syncHiddenInputs)
    return () => {
      editor.off("update", syncHiddenInputs)
    }
  }, [editor])

  if (!editor) {
    return <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 text-sm text-[var(--muted-ink)]">編輯器載入中...</div>
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-white">
      <div className="flex flex-wrap gap-2 border-b border-[var(--line)] px-4 py-3">
        <ToolbarButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
      <input id="htmlContent" name="htmlContent" type="hidden" />
      <input id="content" name="content" type="hidden" />
    </div>
  )
}

function ToolbarButton({
  active,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { active?: boolean }) {
  return <Button variant={active ? "secondary" : "ghost"} className={cn("h-10 w-10 rounded-2xl p-0", className)} {...props} />
}
