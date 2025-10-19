import { Section } from "./section"

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A little about me">
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <p className="leading-relaxed text-muted-foreground">
          I specialize in building accessible, scalable UIs with React, Next.js, and TypeScript. My approach blends
          thoughtful UX, strong fundamentals, and modern tooling.
        </p>
        <ul className="grid grid-cols-2 gap-3 text-sm">
          <li className="rounded-md border p-3">React / Next.js</li>
          <li className="rounded-md border p-3">TypeScript</li>
          <li className="rounded-md border p-3">Tailwind CSS</li>
          <li className="rounded-md border p-3">Node.js</li>
        </ul>
      </div>
    </Section>
  )
}
