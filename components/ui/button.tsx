import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "outline"
}

export function Button({
  className,
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) {
  const variants = {
    default:
      "bg-[var(--brand)] text-white shadow-[0_12px_30px_rgba(164,85,44,0.24)] hover:bg-[var(--brand-strong)]",
    secondary: "bg-[var(--sand)] text-[var(--ink)] hover:bg-white",
    ghost: "bg-transparent text-[var(--muted-ink)] hover:bg-white/60 hover:text-[var(--ink)]",
    outline: "border border-[var(--line)] bg-white/70 text-[var(--ink)] hover:bg-white",
  }

  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
