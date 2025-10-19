import { Section } from "./section"

const quotes = [
  { body: "A joy to work with and delivers on time.", author: "Jamie C." },
  { body: "Transformed our UI into a polished product.", author: "Priya K." },
  { body: "Strong on design systems and performance.", author: "Marco A." },
]

export function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="Testimonials" title="What clients say">
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {quotes.map((q, i) => (
          <blockquote key={i} className="rounded-xl border p-5">
            <p className="leading-relaxed">&ldquo;{q.body}&rdquo;</p>
            <footer className="mt-3 text-sm text-muted-foreground">— {q.author}</footer>
          </blockquote>
        ))}
      </div>
    </Section>
  )
}
