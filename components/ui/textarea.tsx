import type { TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-[24px] border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted-ink)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[rgba(164,85,44,0.16)]",
        className,
      )}
      {...props}
    />
  )
}
