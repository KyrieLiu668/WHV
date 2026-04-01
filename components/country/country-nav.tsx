import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Country } from "@/types"

export function CountryNav({
  countries,
  activeSlug,
}: {
  countries: Country[]
  activeSlug?: string
}) {
  return (
    <div className="flex snap-x gap-3 overflow-x-auto pb-2">
      {countries.map((country) => (
        <Link
          key={country.slug}
          href={`/countries/${country.slug}`}
          className={cn(
            "min-w-fit rounded-full border px-4 py-2 text-sm font-medium transition",
            activeSlug === country.slug
              ? "border-[var(--brand)] bg-[var(--brand)] text-white"
              : "border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--brand)]/40",
          )}
        >
          {country.flag_emoji} {country.name_zh}
        </Link>
      ))}
    </div>
  )
}
