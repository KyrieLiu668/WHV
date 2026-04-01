import type { InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted-ink)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[rgba(164,85,44,0.16)]",
        className,
      )}
      {...props}
    />
  )
}
