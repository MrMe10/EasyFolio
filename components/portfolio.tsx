"use client"

import { useMemo, useState } from "react"
import { Section } from "./section"
import { cn } from "@/lib/utils"

type Item = {
  id: number
  title: string
  tag: "App" | "Web" | "Card"
  w: number
  h: number
}

const items: Item[] = [
  { id: 1, title: "Finance App", tag: "App", w: 540, h: 360 },
  { id: 2, title: "Marketing Site", tag: "Web", w: 540, h: 360 },
  { id: 3, title: "Promo Card", tag: "Card", w: 540, h: 360 },
  { id: 4, title: "SaaS Dashboard", tag: "Web", w: 540, h: 360 },
  { id: 5, title: "Notes App", tag: "App", w: 540, h: 360 },
  { id: 6, title: "Gift Card", tag: "Card", w: 540, h: 360 },
]

const filters = ["All", "App", "Web", "Card"] as const

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")

  const filtered = useMemo(() => {
    if (filter === "All") return items
    return items.filter((i) => i.tag === filter)
  }, [filter])

  return (
    <Section id="portfolio" eyebrow="Portfolio" title="Selected work">
      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1 text-sm",
              filter === f ? "bg-primary text-primary-foreground" : "hover:bg-accent",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <figure key={i.id} className="group overflow-hidden rounded-xl border">
            <img
              alt={i.title}
              className="h-auto w-full object-cover transition group-hover:scale-[1.03]"
              src={`/generic-placeholder-icon.png?height=${i.h}&width=${i.w}&query=${encodeURIComponent(
                "portfolio preview",
              )}`}
            />
            <figcaption className="flex items-center justify-between border-t px-4 py-3">
              <div>
                <p className="text-sm font-medium">{i.title}</p>
                <p className="text-xs text-muted-foreground">{i.tag}</p>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">
                View
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
