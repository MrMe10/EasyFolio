import { Section } from "./section"

const items = [
  {
    title: "Senior Frontend Engineer",
    meta: "Acme Inc · 2022–Present",
    desc: "Lead UI architecture and design systems.",
  },
  { title: "Frontend Engineer", meta: "Globex · 2020–2022", desc: "Built performant dashboards and marketing sites." },
  { title: "B.S. Computer Science", meta: "State University · 2016–2020", desc: "Focus on HCI and web technologies." },
]

export function Resume() {
  return (
    <Section id="resume" eyebrow="Resume" title="Experience & Education">
      <ol className="mt-6 grid gap-4">
        {items.map((item, i) => (
          <li key={i} className="rounded-xl border p-4">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.meta}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
