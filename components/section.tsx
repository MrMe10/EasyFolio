import type React from "react"
import { cn } from "@/lib/utils"

export function Section({
  id,
  title,
  eyebrow,
  className,
  children,
}: {
  id: string
  title?: string
  eyebrow?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn("scroll-mt-24", "py-14 md:py-20", className)} aria-label={title}>
      <div className="mx-auto max-w-6xl px-4">
        {eyebrow ? <p className="text-xs uppercase tracking-widest text-primary">{eyebrow}</p> : null}
        {title ? <h2 className="text-balance mt-2 text-2xl md:text-3xl font-semibold">{title}</h2> : null}
        {children}
      </div>
    </section>
  )
}
